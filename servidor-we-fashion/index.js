const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3001; // O servidor vai morar na porta 3001

app.use(cors()); // Permite que o site (porta 5173) fale com o servidor
app.use(express.json()); // Permite que o servidor entenda textos em formato JSON

// ROTA 1: Para receber novas inscrições (POST)
app.post('/inscrever', (req, res) => {
    const { nome, email } = req.body;
    const linha = `Nome: ${nome}, E-mail: ${email}, Data: ${new Date().toLocaleString()}\n`;

    fs.appendFile('alunos.txt', linha, (err) => {
        if (err) return res.status(500).send("Erro ao salvar");
        console.log("💾 Novo aluno salvo!");
        res.status(200).send({ mensagem: "Sucesso!" });
    });
});

// ROTA 2: Para o Admin ler a lista (GET)
app.get('/admin/alunos', (req, res) => {
    fs.readFile('alunos.txt', 'utf8', (err, data) => {
        if (err) return res.status(500).send("Erro ao ler arquivo");
        const lista = data.trim().split('\n');
        res.send(lista);
    });
});

app.listen(PORT, () => {
    console.log(`✅ Servidor WE FASHION rodando em http://localhost:${PORT}`);
});