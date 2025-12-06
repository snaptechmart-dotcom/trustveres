import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

// IMPORTANT: Disable bodyParser
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    await dbConnect();

    // Get raw body for signature validation
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    // Verify Razorpay Signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    const event = JSON.parse(rawBody);

    // -------------------------------
    // 1️⃣ PAYMENT SUCCESS (Main Event)
    // -------------------------------
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      const subscriptionId = payment.subscription_id;
      if (!subscriptionId) {
        return NextResponse.json(
          { error: "No subscription ID in payment" },
          { status: 400 }
        );
      }

      // Find the user with this subscription
      const user = await User.findOne({ subscriptionId });

      if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      // Determine plan type
      let planName = user.plan;

      // Calculate expiry date
      const now = new Date();
      const expiry = new Date();

      // Monthly → +30 days
      // Yearly → +365 days
      if (payment.notes?.duration === "yearly") {
        expiry.setDate(now.getDate() + 365);
      } else {
        expiry.setDate(now.getDate() + 30);
      }

      // Update user plan
      user.plan = planName;
      user.planValidTill = expiry;
      user.subscriptionStatus = "active";

      // Reset usage
      user.trustChecksUsed = 0;
      user.reportsUsed = 0;

      await user.save();

      return NextResponse.json({ success: true });
    }

    // -----------------------------------
    // 2️⃣ SUBSCRIPTION ACTIVATED (Optional)
    // -----------------------------------
    if (event.event === "subscription.activated") {
      const sub = event.payload.subscription.entity;

      await User.updateOne(
        { subscriptionId: sub.id },
        {
          subscriptionStatus: "active",
          planValidTill: new Date(sub.current_end * 1000),
        }
      );

      return NextResponse.json({ success: true });
    }

    // -----------------------------------
    // 3️⃣ SUBSCRIPTION CANCELLED
    // -----------------------------------
    if (event.event === "subscription.cancelled") {
      const sub = event.payload.subscription.entity;

      await User.updateOne(
        { subscriptionId: sub.id },
        {
          subscriptionStatus: "cancelled",
          plan: "free",
          planValidTill: null,
        }
      );

      return NextResponse.json({ success: true });
    }

    // Ignore other events
    return NextResponse.json({ received: true });

  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json(
      { error: "Webhook processing error" },
      { status: 500 }
    );
  }
}
