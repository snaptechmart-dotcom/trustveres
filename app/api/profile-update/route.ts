import { NextResponse } from "next/server";
import User from "@/app/models/User";
import { connectDB } from "@/app/lib/mongodb";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { token, name, email } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.decode(token);
    if (!decoded?.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      { name, email },
      { new: true }
    );

    // Create new token with updated info
    const newToken = jwt.sign(
      {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      message: "Profile updated",
      token: newToken,
    });

    // Set updated cookie
    response.cookies.set("token", newToken, {
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
