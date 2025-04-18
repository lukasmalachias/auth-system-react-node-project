const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = []; // simulação de banco de dados na memória

app.post("/register", (req, res) => {
  const { name, cpf, email, password } = req.body;

  // Verifica se o usuário já existe
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: "Email já cadastrado!" });
  }

  // Cria novo usuário
  const newUser = { name, cpf, email, password };
  users.push(newUser);

  res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json({ message: "Email ou senha incorretos!" });
  }

  res.json({ message: "Login realizado com sucesso!" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});