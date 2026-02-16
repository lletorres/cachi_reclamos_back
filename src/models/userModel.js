import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    rol: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

// 🪄 TRUCO DE LIMPIEZA AUTOMÁTICA
// Esto borra el password y arregla el ID antes de enviar la respuesta
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password; // 🔒 ¡Adiós password!
  },
});

export default mongoose.model("User", userSchema);
