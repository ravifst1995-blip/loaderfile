import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { EPmodel } = await req.json();

    if (!EPmodel) {
      return new Response(JSON.stringify({ success: false, error: "HP model missing" }), { status: 400 });
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_EP_USER,
        pass: process.env.MAIL_EP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"EPSON Form" <${process.env.MAIL_HP_USER}>`,
      to: process.env.MAIL_HP_TO,
      subject: "New EPSON Printer Submission",
      text: `EPSON Printer Model: ${EPmodel}`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Mail error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
