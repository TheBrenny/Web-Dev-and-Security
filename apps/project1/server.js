const express = require("express");
const scetch = require("scetch")();
const bcrypt = require("bcrypt");
const session = require("express-session");
const config = require("../../config");

let app = express();

const db = require("../../db/db");

app.set('views', 'apps/project1/views');
app.engine('sce', scetch.engine);
app.set('view engine', 'sce');

app.use(session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false,
    store: db.sessionStore
}));
app.use("/assets", express.static(__dirname + '/assets'));
app.use(express.json());
app.use(express.urlencoded());

app.use("/", require("./routes/public"));

module.exports = app;