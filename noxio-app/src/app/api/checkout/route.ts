import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET() {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    // If Stripe isn't configured, redirect to dashboard with mock trial
    return NextResponse.redirect(new URL("/dashboard?trial=true", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"));
  }

  const stripe = new Stripe(stripeKey);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Noxio Pro",
            description: "Autonomous AI operator for your SaaS business",
          },
          unit_amount: 4900,
          recurring: { interval: "month" },
        },
        quantity: 1,
      },
    ],
    subscription_data: {
      trial_period_days: 14,
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/#pricing`,
  });

  return NextResponse.redirect(session.url!);
}
