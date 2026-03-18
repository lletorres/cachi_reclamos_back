// Archivo: src/middlewares/verifyRole.js

export const verifyRole = (rolesPermitidos) => {
  return (req, res, next) => {
    // Verificamos que req.user exista (esto lo crea verifyToken antes de llegar aca)
    if (!req.user || !req.user.rol) {
      return res.status(403).json({
        message: "No se encontró información de roles. Acceso denegado.",
      });
    }

    // Comprobamos si el rol del usuario está dentro del array de roles permitidos
    if (!rolesPermitidos.includes(req.user.rol)) {
      return res.status(403).json({
        message:
          "Acceso denegado: No tienes los privilegios necesarios para esta acción.",
      });
    }

    next();
  };
};
