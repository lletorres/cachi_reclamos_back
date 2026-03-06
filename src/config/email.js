import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

// Verificar que la API Key está configurada
if (!process.env.RESEND_API_KEY) {
  console.error("❌ ERROR CRÍTICO: RESEND_API_KEY no está configurada");
}

// Instancia de Resend
export const resend = new Resend(process.env.RESEND_API_KEY);

// Email desde el cual se enviarán los correos
export const EMAIL_FROM = process.env.EMAIL_FROM || "onboarding@resend.dev";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

console.log("✅ Resend configurado correctamente");
console.log("    EMAIL_FROM:", EMAIL_FROM);
console.log("    ADMIN_EMAIL:", ADMIN_EMAIL);
