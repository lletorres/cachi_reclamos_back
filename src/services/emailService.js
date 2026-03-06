import { resend, EMAIL_FROM, ADMIN_EMAIL } from "../config/email.js";

// Enviar email al administrador cuando se crea un nuevo reporte
export const enviarEmailAdministrador = async (reporte) => {
  try {
    await resend.emails.send({
      from: EMAIL_FROM,
      to: ADMIN_EMAIL,
      subject: `🚨 NUEVO RECLAMO: ${reporte.titulo}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #d32f2f;">📢 Nuevo Reclamo Registrado</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Título:</strong> ${reporte.titulo}</p>
            <p><strong>Categoría:</strong> ${reporte.categoria}</p>
            <p><strong>Descripción:</strong><br>${reporte.descripcion}</p>
            <p><strong>Usuario:</strong> ${reporte.usuario.nombre} ${reporte.usuario.apellido}</p>
            <p><strong>Email del Usuario:</strong> ${reporte.usuario.email}</p>
            <p><strong>Fecha:</strong> ${new Date(reporte.createdAt).toLocaleString("es-AR")}</p>
            <p><strong>Estado:</strong> ${reporte.estado}</p>
            ${reporte.imageUrl ? `<p><strong>Imagen:</strong> <a href="${reporte.imageUrl}">Ver imagen</a></p>` : ""}
          </div>

          <p style="color: #666;">Por favor, revisa este reclamo en el panel de administración.</p>
        </div>
      `,
    });
    console.log("✅ Email enviado al administrador:", ADMIN_EMAIL);
  } catch (error) {
    console.error("❌ Error al enviar email al administrador:");
    console.error("    Destinatario:", ADMIN_EMAIL);
    console.error("    Error:", error.message);
  }
};

// Enviar email de confirmación al usuario
export const enviarEmailConfirmacionUsuario = async (usuario, reporte) => {
  try {
    await resend.emails.send({
      from: EMAIL_FROM,
      to: usuario.email,
      subject: "✅ Reclamo Enviado Correctamente",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #4caf50;">✅ ¡Reclamo Enviado Correctamente!</h2>
          
          <p>Estimado/a ${usuario.nombre},</p>

          <p>Tu reclamo ha sido registrado exitosamente. Aquí están los detalles:</p>

          <div style="background-color: #e8f5e9; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #4caf50;">
            <p><strong>Título:</strong> ${reporte.titulo}</p>
            <p><strong>Categoría:</strong> ${reporte.categoria}</p>
            <p><strong>Estado:</strong> ${reporte.estado}</p>
            <p><strong>Número de Reclamo:</strong> ${reporte.id}</p>
            <p><strong>Fecha:</strong> ${new Date(reporte.createdAt).toLocaleString("es-AR")}</p>
          </div>

          <p>El administrador revisará tu reclamo lo antes posible. Nos pondremos en contacto contigo si necesitamos más información.</p>

          <p style="color: #666; margin-top: 30px;">
            Gracias por ayudarnos a mejorar nuestro barrio.<br>
            <strong>Sistema de Reclamos - Cachi Activa</strong>
          </p>
        </div>
      `,
    });
    console.log("✅ Email de confirmación enviado a:", usuario.email);
  } catch (error) {
    console.error("❌ Error al enviar email de confirmación:");
    console.error("    Destinatario:", usuario.email);
    console.error("    Error:", error.message);
  }
};
