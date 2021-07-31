const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");
const data = require("../data.json");
const Post = require("./models/Post");


routes.get("/books", async function (req, res) {
    const posts = await Post.find();

    return res.json(posts);
});


routes.get("/books/:id", function (req, res) {
    const {
        id
    } = req.params;
    const book = data.find(bok => bok.id == id);

    if (!book) return res.status(204).json();

    res.json(book);
});

routes.post("/books", multer(multerConfig).single("file"), async function (req, res) {
    // const {
    //     title,
    //     author,
    //     release_year,
    //     state
    // } = req.body;
    const {
        originalname: name,
        size,
        key,
        location: url = "",
    } = req.file;

    const post = await Post.create({
        name,
        size,
        key,
        url,
    });

    return res.json(post);

    // salvar

    // res.json({
    //     title,
    //     author,
    //     release_year,
    //     state
    // });
});

routes.put("/books/:id", function (req, res) {
    const {
        id
    } = req.params;
    const book = data.find(bok => bok.id == id);

    if (!book) return res.status(204).json();

    const {
        title,
        author
    } = req.body;

    book.title = title;
    book.author = author;

    res.json(book);
});

routes.delete("/books/:id", async function (req, res) {
    const post = await Post.findById(req.params.id);

    await post.remove();

    return res.send();
});

module.exports = routes;