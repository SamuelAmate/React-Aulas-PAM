# CRUD 🔥Firebase MVC (Web SDK) — 🌐Node.js + Express + EJS + 🅱️Bootstrap

- **🔥Firebase Realtime Database** via **Firebase Web SDK (modular)** usado nos **controllers**.
- 🔀Arquitetura **MVC**: rotas → controllers → DB. Views **EJS** apenas renderizam.
- **🅱️Bootstrap 5** via CDN e **express-ejs-layouts** para layout base.
- **💼Colaboradores:**

   👨‍💼Samuel Amate(https://github.com/SamuelAmate)

   👨‍💼 Thomas Adrian(https://github.com/Thomas-Adrian-Soler-Nilsson)
  
- **👀Link do Render:**
    https://react-aulas-pam.onrender.com/
  
> ⚠️ Observação de segurança: Usar Web SDK no servidor expõe `apiKey` (que não é um segredo, mas a configuração do projeto é pública). **Recomenda-se** utilizar regras do Realtime Database adequadas (ou considerar Admin SDK quando possível).

## Rodando

1. Instale dependências:
```bash
npm install
```

2. Copie `.env.example` para `.env` e preencha com suas credenciais do Firebase (SDK Web).

3. Inicie:
```bash
npm run dev
```

4. Acesse:
- `http://localhost:3000/` (home)
- `http://localhost:3000/usuarios`
- `http://localhost:3000/categorias`

## Estrutura
```
controllers/  # CRUD (Web SDK)
routes/       # define rotas
views/        # EJS com layout base index.ejs
config/       # inicialização Firebase (Web SDK)
public/       # assets estáticos
```

## Regras Realtime Database (exemplo mínima para testes)
> Ajuste para produção!
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}










