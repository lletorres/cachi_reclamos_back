import Reporte from "../models/reporteModel.js";

// 1. Crear un nuevo reporte
export const createReporte = async (reporteData, userId) => {
  // Creamos el reporte combinando los datos del formulario + el ID del usuario
  const nuevoReporte = await Reporte.create({
    ...reporteData,
    usuario: userId, // Asociamos el reporte al vecino que lo creó
  });
  return nuevoReporte;
};

// 2. Obtener todos los reportes (para el admin o el mapa)
export const getReportes = async () => {
  // .populate("usuario") sirve para que Mongo nos traiga el Nombre y Email del usuario,
  // en lugar de solo su ID raro.
  const reportes = await Reporte.find()
    .populate("usuario", "nombre apellido email")
    .sort({ createdAt: -1 }); // Ordenamos del más nuevo al más viejo
  return reportes;
};

// 3. Cambiar estado (Ej: de 'Pendiente' a 'Resuelto')
export const updateEstadoReporte = async (id, nuevoEstado) => {
  const reporteActualizado = await Reporte.findByIdAndUpdate(
    id,
    { estado: nuevoEstado },
    { new: true }, // Esto hace que nos devuelva el reporte YA actualizado
  );
  return reporteActualizado;
};
