import mongoose from "mongoose";
import { MONGODB_URI } from "./src/config.js";

export const connectDB = async () => {
  try {
    // Sin opciones extra, Mongoose 6+ ya las maneja por defecto
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Conectado a MongoDB Exitosamente");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error.message);
    process.exit(1); // Detiene la app si no hay base de datos
  }
};
