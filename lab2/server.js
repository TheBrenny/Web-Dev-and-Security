const express = require("express");
const scetch = require("scetch")();

let app = express();

app.set('views', 'lab2/views');
app.engine('sce', scetch.engine);
app.set('view engine', 'sce');

app.get("/", (_, res) => {
    // res.send(app.engine().render(index, {}));
    // res.end();
    res.render("index", {});
});

app.get("/*", (req, res) => {
    res.render("test", {
        url: req.url,
        time: new Date().toLocaleString()
    });
});

module.exports = app;