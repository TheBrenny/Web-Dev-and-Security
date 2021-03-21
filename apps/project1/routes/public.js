const router = require("express").Router();
const checks = require("./checks");
const session = require("./session");
const crypto = require("bcrypt");
const Database = require("../../../db/database");

function getPageOptions(req, listings) {
    return {
        navList: getNavList(req),
        listings: listings,
        user: getUser(req)
    };
}

function getNavList(req) {
    let isAuthed = session(req).isAuthed();
    let navList = [{
            slug: "/",
            title: "Home",
            active: false
        },
        {
            slug: "/listings",
            title: "Listings",
            active: false
        },
        {
            slug: "/cart",
            title: "Cart",
            active: false
        },
        {
            slug: isAuthed ? "/account" : "/login",
            title: isAuthed ? session(req).name() : "Login",
            active: false
        },
    ];

    for (let i in navList) {
        navList[i].active = req.path === navList[i].slug;
    }

    return navList;
}

function getUser(req) {
    return session(req).getAccount();
}

router.get("/", async (req, res) => {
    res.render("index", getPageOptions(req, await Database.getRandomAvailableProducts()));
});

router.get("/listings", async (req, res) => {
    res.render("listings", getPageOptions(req, await Database.getAvailableProducts()));
});

router.get("/listings/search/:query", async (req, res) => {
    //do a like search and return results
    res.render("listings", getPageOptions(req, await Database.getAvailableProducts(req.params.query)));
});

router.get("/listings/search/:query/all?", async (req, res) => {
    //do a like search and return results
    res.render("listings", getPageOptions(req, await Database.getAllProducts(req.params.query)));
});

router.get("/register", checks.isGuest, async (req, res) => {
    res.render("register", {
        badRegister: session(req).isBadRegister(),
        navList: getNavList(req)
    });
});

router.get("/login", checks.isGuest, async (req, res) => {
    res.render("login", {
        badLogin: session(req).isBadLogin(),
        navList: getNavList(req)
    });
    // session(req).remove("badLogin");
});

router.get("/logout", checks.isAuthed, async (req, res) => {
    session(req).setAccount();
    res.redirect("/project1");
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
        const passMatch = password == target[0].plainPassword; //bcrypt.compareSync(password, target[0].password);
        if (passMatch) {
            session(req).setAccount(target[0].id, target[0].username);
            // req.session.account = {
            //     name: target[0].username,
            //     id: target[0].id
            // };
            res.redirect("/project1");
        } else {
            bad = true;
        }
    } else {
        // bcrypt.hashSync(password, 12); // hash anyway to waste time.
        bad = true;
    }

    if (bad) {
        session(req).badLogin();
        res.status(401).redirect("/project1/login");
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
        res.redirect("/project1");
    }

    if (bad) {
        session(req).badRegister();
        res.status(401).redirect("/project1/register");
    }
});

module.exports = router;