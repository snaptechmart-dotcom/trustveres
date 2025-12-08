import { getServerSession } from "next-auth";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";

// ⭐ Yeh BADAL DIYA: Ab hum authOptions ko import nahi karte
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// ⭐ Local authOptions banaya so this route does NOT import a route file
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize() {
        return null;
      }
    })
  ],
  session: { strategy: "jwt" }
};

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findById(session.user.id).lean();

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({
      id: user._id,
      name: user.name,
      email: user.email,
      plan: user.plan,
      planValidTill: user.planValidTill,
      trustChecksUsed: user.trustChecksUsed,
      reportsUsed: user.reportsUsed,
      subscriptionId: user.subscriptionId,
      subscriptionStatus: user.subscriptionStatus,
      lastPaymentId: user.lastPaymentId,
    });

  } catch (err) {
    console.error("USER ME API ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
