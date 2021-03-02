const express = require("express");
const scetch = require("scetch")();

const app = express();
const port = 80;
const addr = "127.10.1.1";

app.set('views', 'views');
app.engine('sce', scetch.engine);
app.set('view engine', 'sce');

app.get("/", (_, res) => {
    res.render("index", {});
});

app.get("/*", (req, res) => {
    res.render("test", {
        url: req.url,
        time: new Date().toLocaleString()
    });
});

app.listen(port, addr, () => {
    console.log(`Example app listening at http://${addr}:${port}`);
});