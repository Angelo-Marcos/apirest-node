/* 
Descricao : Arquivo server.js para implementação de api rest usando verbos HTTP.
Aluno : Angelo Marcos de Oliveira
Data : 25/07/2021
*/

const express = require('express');
const app = express()
const data = require("./data.json");
const cors = require("cors");

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
app.listen(port);

// Verbos HTTP
// GET: Receber dados de uma Resource.
// POST: Enviar dados ou informações para serem processados por um Resource.
// PUT: Atualizar dados de um Resource.
// DELETE: Deletar um Resource.

app.use(express.json())
app.use(cors())

app.get("/", function (req, res) {
    res.json(data);
});


app.get("/books/:id", function (req, res) {
    const {
        id
    } = req.params;
    const book = data.find(bok => bok.id == id);

    if (!book) return res.status(204).json();

    res.json(book);
});

app.post("/books", function (req, res) {
    const {
        title,
        author,
        release_year,
        state
    } = req.body;

    // salvar

    res.json({
        title,
        author,
        release_year,
        state
    });
});

app.put("/books/:id", function (req, res) {
    const {
        id
    } = req.params;
    const book = data.find(bok => bok.id == id);

    if (!book) return res.status(204).json();

    const {
        title
    } = req.body;

    book.title = title;

    res.json(book);
});

app.delete("/books/:id", function (req, res) {
    const {
        id
    } = req.params;
    const booksFiltered = data.filter(client => book.id != id)

    res.json(booksFiltered);
});


app.listen(3000, function () {
    console.log("Server is running")
});