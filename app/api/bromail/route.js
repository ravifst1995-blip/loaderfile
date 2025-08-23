import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { bromodel, fullName, phoneNumber } = await req.json();

    if (!bromodel) {
      return new Response(
        JSON.stringify({ success: false, error: "HP model missing" }),
        { status: 400 }
      );
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_BRO_USER,
        pass: process.env.MAIL_BRO_PASS,
      },
    });

    await transporter.sendMail({
      from: `"BROTHER Form" <${process.env.MAIL_BRO_USER}>`,
      to: process.env.MAIL_HP_TO,
      subject: "New BROTHER Printer Submission",
      text: `BROTHER Printer Model: ${bromodel}\nFull Name: ${fullName}\nPhone Number: ${phoneNumber}`,
      html: `
        <p><b>BROTHER Printer Model:</b> ${bromodel}</p>
        <p><b>Full Name:</b> ${fullName}</p>
        <p><b>Phone Number:</b> ${phoneNumber}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Mail error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
