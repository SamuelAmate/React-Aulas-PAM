import path from "path";
import express from "express";
import morgan from "morgan";
import expressLayouts from "express-ejs-layouts";
import methodOverride from "method-override";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Rotas
import alunosRoutes from "./routes/alunosRoutes.js";
import cursosRoutes from "./routes/cursosRoutes.js";
import equipeRoutes from "./routes/equipeRoutes.js";
import professorRoutes from "./routes/professorRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// -------------------- EJS + LAYOUTS --------------------
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "index");

// -------------------- MIDDLEWARES (ORDEM CORRETA) --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // ✅ AQUI - ANTES DAS ROTAS
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// -------------------- ROTAS --------------------
app.use("/alunos", alunosRoutes);
app.use("/cursos", cursosRoutes);
app.use("/equipe", equipeRoutes);
app.use("/professor", professorRoutes);

app.get("/", (req, res) => {
  res.render("home", { title: "Página Inicial" });
});

// 404
app.use((req, res) => {
  res.status(404).render("notfound", { title: "Página não encontrada" });
});

// -------------------- SERVIDOR --------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});