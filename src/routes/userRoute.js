import express from "express";
import {
  register,
  login,
  getAllUsers,
  updateRol,
  deleteUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyRole } from "../middlewares/verifyRole.js";

const router = express.Router();

// Rutas públicas
router.post("/register", register);
router.post("/login", login);

// Rutas protegidas (Para el Admin)
router.get("/", verifyToken, verifyRole(["admin"]), getAllUsers);
router.patch("/:id/rol", verifyToken, verifyRole(["admin"]), updateRol);
router.delete("/:id", verifyToken, verifyRole(["admin"]), deleteUser);

export { router as userRoute };
