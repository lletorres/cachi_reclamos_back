import express from "express";
import {
  register,
  login,
  getAllUsers,
  updateRol,
  deleteUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js"; // Importamos el middleware

const router = express.Router();

// Rutas públicas
router.post("/register", register);
router.post("/login", login);

// Rutas protegidas (Para el Admin)
router.get("/", verifyToken, getAllUsers);
router.patch("/:id/rol", verifyToken, updateRol);
router.delete("/:id", verifyToken, deleteUser);

export { router as userRoute };
