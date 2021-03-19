const router = require("express").Router();
const checks = require("./checks");
const session = require("./session");
const Database = require("../../../db/database");

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

router.get("/", (req, res) => {
    res.render("index", {
        navList: getNavList(req),
        listings: Database.getRandomAvailableProducts()
    });
});

router.get("/listings", (req, res) => {
    res.render("listings", {
        navList: getNavList(req),
        listings: Database.getAvailableProducts()
    });
});

router.get("/listings/search/:query/all?", (req, res) => {
    //do a like search and return results
    res.render("listings", {
        navList: getNavList(req),
        listings: Database.getAllProducts(req.params.query)
    });
});

router.get("/listings/search/:query", (req, res) => {
    //do a like search and return results
    res.render("listings", {
        navList: getNavList(req),
        listings: Database.getAvailableProducts(req.params.query)
    });
});

router.get("/login", checks.isGuest, (req, res) => {
    res.render("login", {
        badLogin: session(req).isBadLogin(),
        navList: getNavList(req)
    });
    // session(req).remove("badLogin");
});

router.get("/logout", checks.isAuthed, (req, res) => {
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

module.exports = router;