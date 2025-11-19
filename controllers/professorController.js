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
    const snapshot = await get(rootRef);
    const professor = [];
    
    if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
            professor.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
    }
    
    res.render("professor/list", {
        title: "Lista de professor",
        professor: professor
    });
},

  // [CREATE - FORM] Mostra o formulário de criação (sem acessar o DB)
  createForm(req, res) {
    // Apenas renderiza a página de criação
    res.render("professor/create", { title: "Novo professor" });
  },

  // [CREATE - ACTION] Cria um professor novo
  async create(req, res) {
    try {
      const { nome, curso } = req.body;
      const novo = await push(rootRef);
      await set(novo, { nome, curso });
      res.redirect("/professor");
    } catch (e) {
      console.error("Erro ao criar professor no Realtime Database:", e);
    }
  },
  

  // [UPDATE - FORM] Carrega dados para edição de uma categoria específica

  // [UPDATE - ACTION] Salva a edição de uma categoria
  async editForm(req, res) {
    const { id } = req.params;
    const professor = child(rootRef, id);

    try {
      const snapshot = await get(professor);
      if (snapshot.exists()) {
        res.render("professor/edit", {
          title: "Editar professor",
          id: id,
          professor: snapshot.val(),
        });
      } else {
        res.status(404).send("professor não encontrado.");
      }
    } catch (e) {
      console.error("Erro ao carregar professor para edição:", e);
      res.status(500).send("Erro ao carregar professor.");
    }
  },

  async edit(req, res) {
    const { id } = req.params;
    const { nome, curso } = req.body;
    const professor = child(rootRef, id);

    try {
      await update(professor, { nome, curso });
      res.redirect("/professor");
    } catch (e) {
      console.error("Erro ao atualizar professor no Realtime Database:", e);
      res.status(500).send("Erro ao atualizar professor.");
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    const professor = child(rootRef, id);

    try {
      await remove(professor);
      res.redirect("/professor");
    } catch (e) {
      console.error("Erro ao remover professor no Realtime Database:", e);
      res.status(500).send("Erro ao remover professor.");
    }
  }

  
  // [DELETE] Remove uma categoria pelo id
};
