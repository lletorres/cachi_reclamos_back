import express from "express";
import cors from "cors";
import { PORT } from "./src/config.js";
import { connectDB } from "./db.js";
import { reporteRoute } from "./src/routes/reporteRoute.js";
import { userRoute } from "./src/routes/userRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("🚀 Servidor Cachi Activa funcionando!");
});

// USAR LA RUTA 👇
app.use("/api/reportes", reporteRoute);
app.use("/api/users", userRoute);

app.listen(PORT, () => {
  console.log(`💻 Servidor corriendo en http://localhost:${PORT}`);
});
