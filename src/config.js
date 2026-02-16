import dotenv from "dotenv";

// Cargar las variables del archivo .env
dotenv.config();

export const PORT = process.env.PORT || 4000;
export const MONGODB_URI = process.env.MONGODB_URI;
export const SECRET = process.env.SECRET;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
