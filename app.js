const express = require("express");
const path = require("path");
const app = express();

//configuração do EJS como view
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Rota principal
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

//Rota de Categorias
const categoriesRouter = require("./routes/categorias");
app.use("/categorias", categoriesRouter);

//Rota de Cursos
const cursoRouter = require("./routes/curso");
app.use("/curso", cursoRouter);

//Rota de Alunos
const alunosRouter = require("./routes/alunos");
app.use("/alunos", alunosRouter);

//rodar o server
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});