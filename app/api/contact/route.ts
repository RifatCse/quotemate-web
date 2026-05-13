import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function stripHtml(str: string) {
  return str.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, error: "Invalid request body", code: "invalid_body" },
        { status: 400 }
      );
    }

    const { name, email, trade, message } = body as {
      name?: string;
      email?: string;
      trade?: string;
      message?: string;
    };

    if (!name || name.length > 100) {
      return NextResponse.json(
        { success: false, error: "Name is required (max 100 chars)", code: "invalid_name" },
        { status: 422 }
      );
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address", code: "invalid_email" },
        { status: 422 }
      );
    }
    if (!message || message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        { success: false, error: "Message must be 10–2000 characters", code: "invalid_message" },
        { status: 422 }
      );
    }

    const cleanName = stripHtml(name);
    const cleanMessage = stripHtml(message);
    const cleanTrade = trade ? stripHtml(trade) : null;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && serviceKey) {
      const supabase = createClient(supabaseUrl, serviceKey);
      await supabase.from("contact_submissions").insert({
        name: cleanName,
        email: email.toLowerCase().trim(),
        trade: cleanTrade,
        message: cleanMessage,
      });
    }

    // Admin notification via Resend
    const resendKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL || "rifatcse17@gmail.com";
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "QuoteMate Contact <noreply@quotemate.com.au>",
          to: adminEmail,
          subject: `[QuoteMate Contact] ${cleanTrade || "Tradie"} from ${cleanName}`,
          html: `
<p><strong>Name:</strong> ${cleanName}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Trade:</strong> ${cleanTrade || "Not specified"}</p>
<p><strong>Message:</strong></p>
<blockquote style="border-left:3px solid #8b5cf6;padding-left:12px;color:#666">${cleanMessage}</blockquote>
          `,
        }),
      }).catch(() => {/* Non-fatal */});
    }

    return NextResponse.json({ success: true, data: { received: true } });
  } catch {
    return NextResponse.json(
      { success: false, error: "Server error", code: "server_error" },
      { status: 500 }
    );
  }
}
