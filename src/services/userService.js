import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";

// 1. REGISTRAR USUARIO
export const registerUser = async (userData) => {
  // Validamos la longitud ANTES de encriptar
  if (!userData.password || userData.password.length < 6) {
    throw new Error("La contraseña debe tener al menos 6 caracteres");
  }
  // A. Verificamos si ya existe el email
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("El email ya está registrado");
  }

  // B. Encriptamos la contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  // C. Creamos el usuario
  const newUser = await User.create({
    nombre: userData.nombre,
    email: userData.email,
    password: hashedPassword,
    rol: userData.rol || "user", // Si no envían rol, es 'user' por defecto
  });

  // D. Generamos el Token inmediatamente para que ya quede logueado
  const token = jwt.sign({ id: newUser._id, rol: newUser.rol }, SECRET, {
    expiresIn: "24h",
  });

  return { user: newUser, token };
};

// 2. LOGIN USUARIO
export const loginUser = async (email, password) => {
  // A. Buscamos el usuario
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  // B. Comparamos las contraseñas (La que escribe vs la encriptada)
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Contraseña incorrecta");
  }

  // C. Generamos el token
  const token = jwt.sign({ id: user._id, rol: user.rol }, SECRET, {
    expiresIn: "24h",
  });

  // Retornamos el token y los datos limpios del usuario (SIN la contraseña, pero CON el rol)
  return {
    user: {
      _id: user._id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol, // <--- Esto es lo que el Frontend usará para mostrar el botón "Panel Admin"
    },
    token,
  };
};
