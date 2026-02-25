import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import * as reporteController from "../controllers/reporteController.js";
import { upload } from "../config/cloudinary.js"; // <--- Importamos al portero

const router = express.Router();

// Añadimos upload.single('imagen') en el medio.
// OJO: 'imagen' debe llamarse igual que en el dataParaEnviar.append("imagen", file) del Frontend

// Ruta para CREAR un reporte (Protegida: solo usuarios logueados)
router.post(
  "/",
  verifyToken,
  upload.single("imagen"),
  reporteController.crearReporte,
);

// Ruta para VER reportes (Pública o protegida, según prefieras. La dejamos pública por ahora)
router.get("/", reporteController.obtenerReportes);

router.get("/", reporteController.getAllReportes); //Leer todos

// Ruta para CAMBIAR ESTADO (Protegida)
router.patch("/:id", verifyToken, reporteController.actualizarEstado);

export { router as reporteRoute };
