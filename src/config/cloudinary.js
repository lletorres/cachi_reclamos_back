import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// 1. Le decimos a Cloudinary quiénes somos
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Configuramos la carpeta de almacenamiento en la nube
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "cachi_activa_evidencias", // Así se llamará la carpeta en tu Cloudinary
    format: async (req, file) => "webp", // 🌟 Convierte TODO a WebP (súper liviano)
    transformation: [
      {
        width: 1000, // Ancho máximo de 1000 píxeles
        height: 1000, // Alto máximo de 1000 píxeles
        crop: "limit", // Solo la achica si es más grande que 1000px, no la deforma
        quality: "auto", // 🌟 Cloudinary decide cuánta calidad quitar sin que el ojo humano lo note
      },
    ],
  },
});

// 3. Exportamos "upload", que será nuestro middleware (el portero)
export const upload = multer({ storage: storage });
