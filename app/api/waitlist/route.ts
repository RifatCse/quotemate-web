import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
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

    const { email, trade } = body as { email?: string; trade?: string };

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address", code: "invalid_email" },
        { status: 422 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabaseKey = serviceKey && !serviceKey.startsWith("eyJ...") ? serviceKey : anonKey;

    // If Supabase is not configured, return success (dev/preview mode)
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ success: true, data: { email } });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase.from("waitlist").insert({
      email: email.toLowerCase().trim(),
      trade: trade || null,
      source: "website",
    });

    if (error) {
      if (error.code === "23505") {
        // Unique violation — already registered, still show success
        return NextResponse.json({ success: true, data: { email } });
      }
      console.error("Waitlist insert error:", error);
      return NextResponse.json(
        { success: false, error: "Server error", code: "server_error" },
        { status: 500 }
      );
    }

    // Send confirmation email via Resend if configured
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "QuoteMate <noreply@quotemate.com.au>",
          to: email,
          subject: "You're on the QuoteMate waitlist! 🎉",
          html: buildConfirmationEmail(email),
        }),
      }).catch(() => {/* Non-fatal — email failure doesn't block success */});
    }

    return NextResponse.json({ success: true, data: { email } });
  } catch {
    return NextResponse.json(
      { success: false, error: "Server error", code: "server_error" },
      { status: 500 }
    );
  }
}

function buildConfirmationEmail(email: string) {
  return `
<!DOCTYPE html>
<html>
<body style="background:#080808;color:#fff;font-family:sans-serif;padding:40px 20px;max-width:480px;margin:0 auto">
  <div style="text-align:center;margin-bottom:32px">
    <div style="display:inline-flex;align-items:center;gap:8px;background:#1e1040;padding:10px 20px;border-radius:12px">
      <span style="font-weight:800;font-size:18px">QuoteMate</span>
    </div>
  </div>
  <h1 style="font-size:24px;font-weight:800;margin-bottom:8px">You&apos;re on the list!</h1>
  <p style="color:#a1a1aa;line-height:1.6;margin-bottom:24px">
    Thanks for joining the QuoteMate waitlist. We&apos;ll email you at <strong style="color:#fff">${email}</strong> the moment we launch.
  </p>
  <div style="background:#151515;border:1px solid #262626;border-radius:16px;padding:24px;margin-bottom:24px">
    <p style="color:#a1a1aa;font-size:14px;margin-bottom:16px">Here&apos;s what&apos;s coming:</p>
    <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px">
      <li style="color:#c4b5fd;font-size:14px">⚡ Voice &amp; photo to quote in 60 seconds</li>
      <li style="color:#c4b5fd;font-size:14px">📐 AR/LiDAR measurements on iPhone Pro</li>
      <li style="color:#c4b5fd;font-size:14px">🔗 Bunnings live pricing built in</li>
    </ul>
  </div>
  <p style="color:#52525b;font-size:12px;text-align:center">
    You&apos;re receiving this because you signed up at quotemate.com.au.<br/>
    &copy; ${new Date().getFullYear()} QuoteMate
  </p>
</body>
</html>
  `.trim();
}
