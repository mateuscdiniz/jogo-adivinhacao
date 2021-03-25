// Lê os dados do arquivo .env
require("dotenv").config();

// Importa os frameworks
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./db");

// Cria o servidor web
const app = express();
const http = require("http").createServer(app);

// Configura o middlewate do servidor web
app.use(cors()); // permite requisições CORS de qualquer host
app.use(cookieParser()); // popula req.cookies (os nomes dos cookies são as chaves)
app.use(express.json()); // popula req.body

// Configura os roteamentos
app.use("/", require("./controllers/jogador-controller"));
app.use("/ranking", require("./controllers/jogador-controller"));

console.log("Conectando ao banco de dados ...");
db.conecta(() => {
  console.log("Conectado ao banco de dados com sucesso");
  http.listen(parseInt(process.env.SERVER_PORT), () => {
    console.log("Servidor iniciado com sucesso");
    console.log(
      `Servidor rodando em http://localhost:${process.env.SERVER_PORT}`
    );
  });
});
