import * as userService from "../services/userService.js";

export const register = async (req, res) => {
  try {
    const result = await userService.registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    // CORREGIDO: Enviamos error.message en lugar del objeto error
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    // CORREGIDO: Ahora sí verás si es "Usuario no encontrado" o "Contraseña incorrecta"
    res.status(401).json({ message: error.message });
  }
};
