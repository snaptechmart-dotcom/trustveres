import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials.email });

        if (!user) return null;

        const isValid = credentials.password === user.password; 
        if (!isValid) return null;

        return {
          id: user._id,
          name: user.name,
          email: user.email,
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login"
  }
};

// ⭐ NEW — This replaces old “export default NextAuth(authOptions)”
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
