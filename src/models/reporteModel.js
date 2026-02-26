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

    imageUrl: { type: String, default: null },
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
reporteSchema.set("toJSON", {
  virtuals: true,
  transform: (documento, objetoRetornado) => {
    objetoRetornado.id = objetoRetornado._id; // Crea el 'id' limpio
    delete objetoRetornado._id; // Borra el '_id' feo
    delete objetoRetornado.__v; // Borra la versión interna de Mongo
  },
});
export default mongoose.model("Reporte", reporteSchema);
