import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import * as reporteController from "../controllers/reporteController.js";

const router = express.Router();

// Ruta para CREAR un reporte (Protegida: solo usuarios logueados)
router.post("/", verifyToken, reporteController.crearReporte);

// Ruta para VER reportes (Pública o protegida, según prefieras. La dejamos pública por ahora)
router.get("/", reporteController.obtenerReportes);

router.get("/", reporteController.getAllReportes); //Leer todos

// Ruta para CAMBIAR ESTADO (Protegida)
router.patch("/:id", verifyToken, reporteController.actualizarEstado);

export { router as reporteRoute };
