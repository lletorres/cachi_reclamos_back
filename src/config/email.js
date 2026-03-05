import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configurar el transporte de email
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verificar que la configuración de email es válida
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Error en la configuración de email:", error);
  } else {
    console.log("✅ Email service listo para enviar mensajes");
  }
});

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
