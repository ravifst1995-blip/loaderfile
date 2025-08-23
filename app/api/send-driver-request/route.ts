import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function isValidPhone(phone) {
  return /^[0-9+\-\s()]{7,20}$/.test(String(phone || ""));
}

export async function POST(req) {
  try {
    const body = await req.json();
    const fullname = String(body?.fullname || "").trim();
    const printermodel = String(body?.printermodel || "").trim();
    const phonenumber = String(body?.phonenumber || "").trim();

    if (!fullname || !printermodel || !phonenumber) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!isValidPhone(phonenumber)) {
      return NextResponse.json(
        { ok: false, error: "Invalid phone number." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT || 587) === 465, // true for 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const html = `
      <h2>New Driver Finder Request</h2>
      <p><strong>Full Name:</strong> ${fullname}</p>
      <p><strong>Printer Model:</strong> ${printermodel}</p>
      <p><strong>Phone Number:</strong> ${phonenumber}</p>
      <hr />
      <p>Sent from Driver Finder form.</p>
    `;

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      subject: `Driver Finder: ${fullname} (${printermodel})`,
      text: `Full Name: ${fullname}\nPrinter Model: ${printermodel}\nPhone: ${phonenumber}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Failed to send email." },
      { status: 500 }
    );
  }
}
