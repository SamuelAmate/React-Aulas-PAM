// Importa a instância do Realtime Database já inicializada (config/firebase.js)
import { db } from "../config/firebase.js";

// Importa funções do Web SDK do Realtime Database usadas no CRUD
import { ref, get, push, set, child, update, remove } from "firebase/database";

// Cria uma referência "raiz" para o nó/coleção "curso" no banco
const rootRef = ref(db, "cursos");

// Exporta o controller como módulo ES (usado nas rotas)
export default {
  // [READ] Lista todos os curso
  async list(req, res) {
    const snapshot = await get(rootRef);
    const cursos = [];
    
    if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
            cursos.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
    }
    
    res.render("cursos/list", {
        title: "Lista de cursos",
        cursos: cursos
    });
},

  // [CREATE - FORM] Mostra o formulário de criação (sem acessar o DB)
  createForm(req, res) {
    // Apenas renderiza a página de criação
    res.render("cursos/create", { title: "Novo cursos" });
  },

  // [CREATE - ACTION] Cria um cursos novo
  async create(req, res) {
    try {
      const { nome} = req.body;
      const novo = await push(rootRef);
      await set(novo, { nome});
      res.redirect("/cursos");
    } catch (e) {
      console.error("Erro ao criar cursos no Realtime Database:", e);
    }
  },
  

  // [UPDATE - FORM] Carrega dados para edição de uma categoria específica

  // [UPDATE - ACTION] Salva a edição de uma categoria
  async editForm(req, res) {
    const { id } = req.params;
    const cursos = child(rootRef, id);

    try {
      const snapshot = await get(cursos);
      if (snapshot.exists()) {
        res.render("cursos/edit", {
          title: "Editar cursos",
          id: id,
          cursos: snapshot.val(),
        });
      } else {
        res.status(404).send("cursos não encontrado.");
      }
    } catch (e) {
      console.error("Erro ao carregar cursos para edição:", e);
      res.status(500).send("Erro ao carregar cursos.");
    }
  },

  async edit(req, res) {
    const { id } = req.params;
    const { nome} = req.body;
    const cursos = child(rootRef, id);

    try {
      await update(cursos, { nome});
      res.redirect("/cursos");
    } catch (e) {
      console.error("Erro ao atualizar cursos no Realtime Database:", e);
      res.status(500).send("Erro ao atualizar cursos.");
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    const cursos = child(rootRef, id);

    try {
      await remove(cursos);
      res.redirect("/cursos");
    } catch (e) {
      console.error("Erro ao remover cursos no Realtime Database:", e);
      res.status(500).send("Erro ao remover cursos.");
    }
  }

  
  // [DELETE] Remove uma categoria pelo id
};
