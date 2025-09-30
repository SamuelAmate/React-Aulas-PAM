// Importa a instância do Realtime Database já inicializada (config/firebase.js)
import { db } from "../config/firebase.js";

// Importa funções do Web SDK do Realtime Database usadas no CRUD
import { ref, get, push, set, child, update, remove } from "firebase/database";

// Cria uma referência "raiz" para o nó/coleção "professor" no banco
const rootRef = ref(db, "professor");

// Exporta o controller como módulo ES (usado nas rotas)
export default {
  // [READ] Lista todos os professor
  async list(req, res) {
    try {
      const tabela = await get(rootRef);
      const professor = tabela.exists() ? tabela.val() : [];
      res.render("professor/list", {
        title: "Lista de professor",
        professor: professor
    });
  } catch (e) {
    console.error("Erro ao listar professor do Realtime Database:", e);
    res.status(500).send("Erro ao listar professor");
  }
},

  // [CREATE - FORM] Mostra o formulário de criação (sem acessar o DB)
  createForm(req, res) {
    // Apenas renderiza a página de criação
    res.render("professor/create", { title: "Novo Aluno" });
  },

  // [CREATE - ACTION] Cria um aluno novo
  async create(req, res) {
    try {
      const { nome, curso } = req.body;
      const novo = await push(rootRef);
      await set(novo, { nome, curso });
      res.redirect("/professor");
    } catch (e) {
      console.error("Erro ao criar aluno no Realtime Database:", e);
    }
  },
  

  // [UPDATE - FORM] Carrega dados para edição de uma categoria específica

  // [UPDATE - ACTION] Salva a edição de uma categoria

  // [DELETE] Remove uma categoria pelo id
};
