const router = require("express").Router();
const checks = require("./checks");
const session = require("./session");
const crypto = require("bcrypt");
const Database = require("../../db/database");
const helpers = require("./helpers");

router.get("/register", checks.isGuest, async (req, res) => {
    res.render("register", {
        badRegister: session(req).isBadRegister(),
        navList: helpers.getNavList(req)
    });
});

router.get("/login", checks.isGuest, async (req, res) => {
    res.render("login", {
        badLogin: session(req).isBadLogin(),
        navList: helpers.getNavList(req)
    });
    // session(req).remove("badLogin");
});

router.get("/logout", checks.isAuthed, async (req, res) => {
    session(req).setAccount();
    res.redirect("/");
});


// let hash = crypto.hashSync(password, 12); // 12 rounds of bcrypt salting
// upper line is used for registering!

router.post("/login", checks.isGuest, async (req, res) => {
    let {
        username,
        password
    } = req.body;

    let bad = false;
    let target = (await Database.getUser(username));

    // found user
    if (target.length > 0) {
        const passMatch = password == target[0].users_plainPassword; //bcrypt.compareSync(password, target[0].password);
        if (passMatch) {
            session(req).setAccount(target[0].users_id, target[0].users_username);
            // req.session.account = {
            //     name: target[0].username,
            //     id: target[0].id
            // };
            res.redirect("/");
        } else {
            bad = true;
        }
    } else {
        // bcrypt.hashSync(password, 12); // hash anyway to waste time.
        bad = true;
    }

    if (bad) {
        session(req).badLogin();
        res.status(401).redirect("/login");
    }
});

router.post("/register", checks.isGuest, async (req, res) => {
    let {
        username,
        password
    } = req.body;

    let bad = false;
    let target = (await Database.getUser(username));

    // found user
    if (target.length > 0) {
        bad = true;
    } else {
        let bcryptPass = crypto.hashSync(password, 12);
        let target = await Database.addUser(username, bcryptPass, password);
        session(req).setAccount(target[0].insertId, username);
        res.redirect("/");
    }

    if (bad) {
        session(req).badRegister();
        res.status(401).redirect("/register");
    }
});

module.exports = router;