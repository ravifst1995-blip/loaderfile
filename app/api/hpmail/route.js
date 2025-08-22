import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { hpmodel } = await req.json();

    if (!hpmodel) {
      return new Response(JSON.stringify({ success: false, error: "HP model missing" }), { status: 400 });
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_HP_USER,
        pass: process.env.MAIL_HP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"HP Form" <${process.env.MAIL_HP_USER}>`,
      to: process.env.MAIL_HP_TO,
      subject: "New HP Printer Submission",
      text: `HP Printer Model: ${hpmodel}`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Mail error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
