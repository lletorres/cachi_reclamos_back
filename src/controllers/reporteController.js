import * as reporteService from "../services/reporteService.js";

export const crearReporte = async (req, res) => {
  try {
    // 1. Clonamos los datos de texto (título, categoría, descripción)
    const datosDelReporte = { ...req.body };

    // 2. Si el usuario subió una imagen, Multer nos deja el link en req.file.path
    if (req.file) {
      datosDelReporte.imageUrl = req.file.path; // Añadimos el link a los datos
    }

    // 3. Enviamos los datos completos al servicio (tu código intacto)
    const nuevoReporte = await reporteService.createReporte(
      datosDelReporte,
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
