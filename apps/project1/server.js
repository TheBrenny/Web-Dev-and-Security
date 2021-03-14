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

function isAuthed(req, res, next) {
    if (req.session.account != null) next();
    else res.redirect("/project1/login");
}

function isGuest(req, res, next) {
    if (req.session.account != null) {
        res.redirect("/project1");
    } else next();
}

app.get("/", isAuthed, (req, res) => {
    res.render("index", {
        user: req.session.account
    });
});

app.get("/login", isGuest, (req, res) => {
    res.render("login", {
        badLogin: req.session.badLogin === true
    });
    delete req.session.badLogin;
});

app.get("/logout", isAuthed, (req, res) => {
    delete req.session.account;
    res.redirect("/project1");
});

// let hash = crypto.hashSync(password, 12); // 12 rounds of bcrypt salting
// upper line is used for registering!

app.post("/login", isGuest, async (req, res) => {
    let {
        username,
        password
    } = req.body;
    let bad = false;
    let target = (await db.query(`SELECT id, username, password, active FROM users WHERE username="${username}" AND active=1`))[0]; // the zeroth index is the actual set of results

    // found user
    if (target.length > 0) {
        const passMatch = bcrypt.compareSync(password, target[0].password);
        if (passMatch) {
            req.session.account = {
                name: target[0].username,
                id: target[0].id
            };
            res.redirect("/project1");
        } else {
            bad = true;
        }
    } else {
        bcrypt.hashSync(password, 12); // hash anyway to waste time.
        bad = true;
    }

    if (bad) {
        req.session.badLogin = true;
        res.status(401).redirect("/project1/login");
    }

    // look at using the same sort of DB methods from the SAD assignment
    // also look up how to do a simple auth page in nodejs
});

module.exports = app;