import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Verificar que las variables de entorno estén configuradas
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
  console.error(
    "❌ ERROR CRÍTICO: Las variables EMAIL_USER o EMAIL_PASSWORD no están configuradas",
  );
  console.error("Variables disponibles:", {
    EMAIL_USER: process.env.EMAIL_USER ? "✅ Configurada" : "❌ Falta",
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? "✅ Configurada" : "❌ Falta",
    ADMIN_EMAIL: process.env.ADMIN_EMAIL ? "✅ Configurada" : "❌ Falta",
  });
}

// Configurar el transporte de email con puerto 587 (TLS)
// Este puerto funciona mejor en servidores como Render
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true = 465, false = 587 (TLS)
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  connectionUrl: undefined,
});

// Verificar que la configuración de email es válida
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Error en la configuración de email:");
    console.error("    Código:", error.code);
    console.error("    Mensaje:", error.message);
    console.error("    EMAIL_USER:", process.env.EMAIL_USER);
    console.error(
      "    EMAIL_PASSWORD configurada:",
      !!process.env.EMAIL_PASSWORD,
    );
  } else {
    console.log("✅ Email service listo para enviar mensajes");
    console.log("    HOST: smtp.gmail.com");
    console.log("    PORT: 587 (TLS)");
    console.log("    EMAIL_USER:", process.env.EMAIL_USER);
  }
});

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
