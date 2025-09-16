// Importa a instância do Realtime Database já inicializada (config/firebase.js)
import { db } from "../config/firebase.js";

// Importa funções do Web SDK do Realtime Database usadas no CRUD
import { ref, get, push, set, child, update, remove } from "firebase/database";

// Cria uma referência "raiz" para o nó/coleção "cursos" no banco
const rootRef = ref(db, "cursos");

// Exporta o controller como módulo ES (usado nas rotas)
export default {
  // [READ] Lista todos os cursos
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
        title: "Lista de Cursos",
        cursos: cursos
    });
},

  // [CREATE - FORM] Mostra o formulário de criação (sem acessar o DB)
  createForm(req, res) {
    // Apenas renderiza a página de criação
    res.render("cursos/create", { title: "Novo Curso" });
  },

  // [CREATE - ACTION] Cria um curso novo
  async create(req, res) {
    try {
        const { curso } = req.body;
        const novo = await push(rootRef);
        await set(novo, { nome: curso }); // Mudança aqui: salvando como 'nome'
        res.redirect("/cursos");
    } catch (e) {
        console.error("Erro ao criar curso no Realtime Database:", e);
    }
  },

  // [UPDATE - FORM] Carrega dados para edição de uma categoria específica

  // [UPDATE - ACTION] Salva a edição de uma categoria

  // [DELETE] Remove uma categoria pelo id
};
