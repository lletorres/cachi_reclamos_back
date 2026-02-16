import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  // 1. Verificamos si hay token
  if (!token) {
    return res
      .status(401)
      .json({ message: "No estás autorizado (Falta Token)" });
  }

  // 2. Limpiamos el token (quitamos la palabra "Bearer ")
  const tokenLimpio = token.split(" ")[1];

  try {
    // 3. Verificamos si es válido usando nuestra palabra secreta
    const decoded = jwt.verify(tokenLimpio, SECRET);

    // 4. Guardamos los datos del usuario en la petición para usarlos luego
    req.user = decoded;

    next(); // ¡Pase usted!
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};
