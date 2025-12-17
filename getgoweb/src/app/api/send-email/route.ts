import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  // Configura el transporter
const transporter = nodemailer.createTransport({
  host: "mail.getgoapp.cl", // Reemplázalo con tu host SMTP
  port: 465, // 465 para SSL, 587 para TLS
  secure: true, // true para SSL, false para TLS
  auth: {
    user: "web@getgoapp.cl", // Tu correo en cPanel
    pass: "6DN,+w#R=ZMK", // La contraseña de tu cuenta
  },
});

const mailOptions = {
  from: "web@getgoapp.cl",
  to: email,
  subject: name,
  text: message,
};

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Correo enviado exitosamente" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al enviar el correo" },
      { status: 500 }
    );
  }
}
