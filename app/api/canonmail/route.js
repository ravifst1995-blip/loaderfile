import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { canonmodel } = await req.json();

    if (!canonmodel) {
      return new Response(JSON.stringify({ success: false, error: "HP model missing" }), { status: 400 });
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_CAN_USER,
        pass: process.env.MAIL_CAN_PASS,
      },
    });

    await transporter.sendMail({
      from: `"HP Form" <${process.env.MAIL_HP_USER}>`,
      to: process.env.MAIL_HP_TO,
      subject: "New CANON Printer Submission",
      text: `CANON Printer Model: ${canonmodel}`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Mail error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
