import * as reporteService from "../services/reporteService.js";

export const crearReporte = async (req, res) => {
  try {
    // req.user.id vendrá del token (lo configuraremos en la ruta)
    // req.body trae título, descripción, ubicación, etc.
    const nuevoReporte = await reporteService.createReporte(
      req.body,
      req.user.id,
    );
    res.status(201).json(nuevoReporte);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerReportes = async (req, res) => {
  try {
    const reportes = await reporteService.getReportes();
    res.status(200).json(reportes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const reporteActualizado = await reporteService.updateEstadoReporte(
      id,
      estado,
    );

    if (!reporteActualizado) {
      return res.status(404).json({ message: "Reporte no encontrado" });
    }

    res.status(200).json(reporteActualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Obtener todos los reportes (Ordenados del más nuevo al más viejo)
export const getAllReportes = async (req, res) => {
  try {
    // .find() busca todo. .sort({ createdAt: -1 }) pone los nuevos arriba
    // .populate() trae el nombre del usuario en lugar de solo su ID
    const reportes = await Reporte.find()
      .sort({ createdAt: -1 })
      .populate("usuario", "nombre");
    res.status(200).json(reportes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
