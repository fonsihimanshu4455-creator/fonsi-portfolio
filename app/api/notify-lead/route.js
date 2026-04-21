import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const TO = process.env.LEAD_NOTIFY_TO;

  // If Resend isn't configured, the lead is still saved in Supabase via the
  // client; we just can't email. Return ok so the client doesn't show an error.
  if (!RESEND_API_KEY || !TO) {
    return NextResponse.json({ ok: true, skipped: "resend-not-configured" });
  }

  let lead;
  try {
    lead = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const subject = `New FONSI lead: ${lead.name || "Unknown"} — ${lead.service || "general"}`;
  const body = [
    `Name: ${lead.name || "-"}`,
    `Email: ${lead.email || "-"}`,
    `Phone: ${lead.phone || "-"}`,
    `Service: ${lead.service || "-"}`,
    `Budget: ${lead.budget || "-"}`,
    "",
    "Message:",
    lead.message || "-",
    "",
    `Referrer: ${lead.referrer || "-"}`,
    `User agent: ${lead.user_agent || "-"}`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.LEAD_FROM || "FONSI <onboarding@resend.dev>",
        to: [TO],
        reply_to: lead.email,
        subject,
        text: body,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Resend failed");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 200 });
  }
}
