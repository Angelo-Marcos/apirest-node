/* 
Descricao : Arquivo server.js para implementação de api rest usando verbos HTTP.
Aluno : Angelo Marcos de Oliveira
Data : 25/07/2021
*/

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const app = express()

/**
 * Database setup
 */
mongoose.connect(
    process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

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
app.use(express.urlencoded({
    extended: true
}))
app.use(morgan('dev'))
app.use(cors())
app.use(require("./routes"));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));

app.listen(3000, function () {
    console.log("Server is running")
});