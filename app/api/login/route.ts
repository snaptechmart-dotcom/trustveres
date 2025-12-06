import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "../../lib/mongodb";
import User from "../../models/User";


import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Incorrect password" },
        { status: 400 }
      );
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "TRUSTVERSE_SECRET_KEY",
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      { success: true, message: "Login successful", token },
      { status: 200 }
    );
  } catch (err) {
    console.log("Login Error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
