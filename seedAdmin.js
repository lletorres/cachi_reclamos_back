import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./src/models/userModel.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Conectado a MongoDB");

    const email = "admin@cachi.com";
    const password = "admin123"; // La contraseña que quieras usar

    // Verificar si ya existe
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log("⚠️ El admin ya existe. No se hizo nada.");
      process.exit();
    }

    // Encriptar password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear Admin
    await User.create({
      nombre: "Administrador Cachi",
      email,
      password: hashedPassword,
      rol: "admin", // <--- IMPORTANTE: ROL ADMIN
    });

    console.log("🚀 Usuario ADMIN creado con éxito");
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Pass: ${password}`);

    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

createAdmin();
