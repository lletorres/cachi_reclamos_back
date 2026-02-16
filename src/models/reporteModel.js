import mongoose from "mongoose";

const reporteSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    },
    categoria: {
      type: String,
      enum: ["Alumbrado", "Bacheo", "Basura", "Otros"],
      default: "Otros",
    },

    fotoUrl: {
      type: String,
      default: "", // Aquí guardaremos la URL de la imagen más adelante
    },
    estado: {
      type: String,
      enum: ["Pendiente", "En Proceso", "Resuelto"],
      default: "Pendiente",
    },
    // Relación con el Usuario (quién creó el reporte)
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }, // Agrega createdAt y updatedAt automáticamente
);

export default mongoose.model("Reporte", reporteSchema);
