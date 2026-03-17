const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(cors()); // Libera o acesso para o site React
app.use(express.json());

app.post('/inscrever', (req, res) => {
  const { nome, email } = req.body;
  const linhaParaSalvar = `Nome: ${nome}, E-mail: ${email}, Data: ${new Date().toLocaleString()}\n`;

  fs.appendFile('alunos.txt', linhaParaSalvar, (erro) => {
    if (erro) {
      console.error("❌ Erro ao salvar:", erro);
      return res.status(500).send({ mensagem: "Erro no servidor" });
    }
    console.log("💾 Aluno salvo com sucesso!");
    res.status(200).send({ mensagem: "Inscrição realizada!" });
  });
});
// Rota para ler a lista de alunos
app.get('/admin/alunos', (req, res) => {
  fs.readFile('alunos.txt', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send("Erro ao ler lista");
    }
    // Transformamos o texto em uma lista organizada
    const linhas = data.trim().split('\n');
    res.send(linhas);
  });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});