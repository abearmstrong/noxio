import { NextResponse } from "next/server";

// In production, this would write to Supabase
const waitlist: string[] = [];

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  waitlist.push(email);
  console.log(`Waitlist signup: ${email} (total: ${waitlist.length})`);

  return NextResponse.json({ success: true });
}
