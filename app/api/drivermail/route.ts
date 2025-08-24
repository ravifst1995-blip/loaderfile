// app/api/drivermail/route.js
import nodemailer from "nodemailer";

export const runtime = "nodejs";          // ensure Node.js runtime (not edge)
export const dynamic = "force-dynamic";   // avoid static optimization for API

export async function POST(req) {
  try {
    const { fullName, phoneNumber, bromodel } = await req.json();

    if (!fullName || !phoneNumber || !bromodel) {
      return Response.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    // Create transporter from env vars
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,           // e.g. "smtp.gmail.com" (for Gmail use OAuth or App Password)
      port: Number(process.env.SMTP_PORT),   // e.g. 465 (secure) or 587
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Compose email
    const to = process.env.MAIL_TO || process.env.SMTP_USER;
    const from = process.env.MAIL_FROM || process.env.SMTP_USER;

    const subject = `Driver Request: ${bromodel} from ${fullName}`;
    const html = `
      <div style="font-family:Arial, sans-serif; line-height:1.6">
        <h2>New Driver Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phoneNumber)}</p>
        <p><strong>Printer Model:</strong> ${escapeHtml(bromodel)}</p>
        <hr />
        <p>Sent from your website drivermail form.</p>
      </div>
    `;
    const text = `New Driver Request
Name: ${fullName}
Phone: ${phoneNumber}
Printer Model: ${bromodel}`;

    await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
      replyTo: from,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("drivermail error:", err);
    return Response.json(
      { success: false, message: "Email send failed." },
      { status: 500 }
    );
  }
}

// Basic HTML escape to prevent markup injection in emails
function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
