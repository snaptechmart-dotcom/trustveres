import Razorpay from "razorpay";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Connect DB
    await dbConnect();

    // Verify user logged in
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const { planId } = await req.json();

    if (!planId) {
      return NextResponse.json(
        { error: "Plan ID missing" },
        { status: 400 }
      );
    }

    // Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // CREATE SUBSCRIPTION
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      total_count: 120, // auto renew
      quantity: 1,
      customer_notify: 1,
    });

    // Save subscription ID to user
    await User.findByIdAndUpdate(session.user.id, {
      subscriptionId: subscription.id,
      subscriptionStatus: "created",
    });

    return NextResponse.json({
      success: true,
      subscriptionId: subscription.id,
    });

  } catch (err) {
    console.error("Razorpay Subscribe Error:", err);
    return NextResponse.json(
      { error: "Subscription failed. Try again." },
      { status: 500 }
    );
  }
}
