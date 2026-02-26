import * as userService from "../services/userService.js";
import User from "../models/userModel.js";
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

// Obtener todos los usuarios (Para el panel admin)
export const getAllUsers = async (req, res) => {
  try {
    // Buscamos todos los usuarios pero omitimos la contraseña por seguridad
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

// Cambiar el rol de un usuario
export const updateRol = async (req, res) => {
  try {
    const { id } = req.params;
    const { rol } = req.body;

    const usuarioActualizado = await User.findByIdAndUpdate(
      id,
      { rol },
      { new: true },
    ).select("-password");

    if (!usuarioActualizado) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el rol" });
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioEliminado = await User.findByIdAndDelete(id);

    if (!usuarioEliminado) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};
