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

app.get("/clients", function (req, res) {
    res.json(data);
});


app.get("/clients/:id", function (req, res) {
    const {
        id
    } = req.params;
    const client = data.find(cli => cli.id == id);

    if (!client) return res.status(204).json();

    res.json(client);
});

app.post("/clients", function (req, res) {
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

app.put("/clients/:id", function (req, res) {
    const {
        id
    } = req.params;
    const client = data.find(cli => cli.id == id);

    if (!client) return res.status(204).json();

    const {
        title
    } = req.body;

    client.title = title;

    res.json(client);

});

app.delete("/clients/:id", function (req, res) {
    const {
        id
    } = req.params;
    const clientsFiltered = data.filter(client => client.id != id)

    res.json(clientsFiltered);
});


app.listen(3000, function () {
    console.log("Server is running")
});