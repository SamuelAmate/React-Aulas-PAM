// Importa a instância do Realtime Database já inicializada (config/firebase.js)
import { db } from "../config/firebase.js";

// Importa funções do Web SDK do Realtime Database usadas no CRUD
import { ref, get, push, set, child, update, remove } from "firebase/database";

// Cria uma referência "raiz" para o nó/coleção "alunos" no banco
const rootRef = ref(db, "alunos");

// Exporta o controller como módulo ES (usado nas rotas)
export default {
  // [READ] Lista todos os alunos
  async list(req, res) {
    const snapshot = await get(rootRef);
    const alunos = [];
    
    if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
            alunos.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
    }
    
    res.render("alunos/list", {
        title: "Lista de Alunos",
        alunos: alunos
    });
},

  // [CREATE - FORM] Mostra o formulário de criação (sem acessar o DB)
  createForm(req, res) {
    // Apenas renderiza a página de criação
    res.render("alunos/create", { title: "Novo Aluno" });
  },

  // [CREATE - ACTION] Cria um aluno novo
  async create(req, res) {
    try {
      const { nome, curso } = req.body;
      const novo = await push(rootRef);
      await set(novo, { nome, curso });
      res.redirect("/alunos");
    } catch (e) {
      console.error("Erro ao criar aluno no Realtime Database:", e);
    }
  },
  

  // [UPDATE - FORM] Carrega dados para edição de uma categoria específica

  // [UPDATE - ACTION] Salva a edição de uma categoria

  // [DELETE] Remove uma categoria pelo id
};
