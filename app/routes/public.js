const router = require("express").Router();
const checks = require("./checks");
const session = require("./session");
const crypto = require("bcrypt");
const Database = require("../../db/database");

function getPageOptions(req, listings) {
    let outListings = [];
    for (let l of listings) {
        outListings.push({
            image: l.products_image,
            name: l.products_name,
            description: l.products_description,
            cost: l.products_cost,
            id: l.products_id,
            seller: {
                name: l.users_username
            }
        });
    }

    return {
        navList: getNavList(req),
        listings: outListings,
        listingCount: outListings.length,
        user: session(req).getAccount(),
        cartSize: session(req).getCartSize(),
        cartCost: session(req).getCartCost()
    };
}

function getNavList(req) {
    let isAuthed = session(req).isAuthed();
    let statics = [
        "/about",
        "/contact",
        "/contactinfo",
        "/future",
        "/mission",
        "/sponsors",
    ];
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
        {
            slug: "/about",
            title: "About",
            active: false
        },
    ];

    for (let i in navList) {
        if (navList[i].slug == "/") continue;
        navList[i].active = req.path.startsWith(navList[i].slug);
        if (navList[i].slug == "/about" && statics.includes(req.path)) navList[i].active = true;
    }

    return navList;
}

router.get("/", async (req, res) => {
    res.render("index", {
        ...getPageOptions(req, await Database.getRandomAvailableProducts())
    });
});

router.get("/listings", async (req, res) => {
    res.render("listings", {
        ...getPageOptions(req, await Database.getAvailableProducts()),
        search: ""
    });
});

router.get("/listings/search/", async (_req, res) => {
    res.redirect("/listings");
});

router.get("/listings/search/:query", async (req, res) => {
    res.render("listings", {
        ...getPageOptions(req, await Database.getAvailableProducts(req.params.query)),
        search: req.params.query
    });
});

router.get("/listings/search/:query/all?", async (req, res) => {
    //do a like search and return results
    res.render("listings", {
        ...getPageOptions(req, await Database.getAllProducts(req.params.query)),
        search: req.params.query
    });
});

router.get("/sell", async (req, res) => {
    res.render("comingsoon", {
        ...getPageOptions(req, [])
    });
});

router.get("/cart", async (req, res) => {
    res.render("cart/cart", {
        // ...getPageOptions(req, await Database.getListedProducts(Object.keys(session(req).getCart())))
        ...getPageOptions(req, Object.values(session(req).getCart()))
    });
});

router.post("/cart/add", async (req, res) => {
    let itemID = req.body.target;
    if (session(req).cartContains(itemID)) {
        res.json({
            success: false,
            message: "Item already exists in cart."
        });
        return;
    }

    let obj = await Database.getListedProducts(itemID);
    if (obj.length === 0) {
        res.json({
            success: false,
            message: "Could not find item specified."
        });
        return;
    }

    session(req).addToCart(obj[0]);
    res.json({
        success: true,
        cartSize: session(req).getCartSize(),
        cartCost: session(req).getCartCost()
    });
});
router.post("/cart/remove", async (req, res) => {
    let itemID = req.body.target;

    if (!session(req).cartContains(itemID)) {
        res.json({
            success: false,
            message: "Item does not exist in cart."
        });
        return;
    }

    session(req).removeFromCart(itemID);
    res.json({
        success: true,
        cartSize: session(req).getCartSize(),
        cartCost: session(req).getCartCost()
    });
});

router.get("/cart/shipping", checks.hasCart, async (req, res) => {
    res.render("cart/shipping", {
        ...getPageOptions(req, [])
    });
});
router.post("/cart/shipping", checks.hasCart, async (req, res) => {
    session(req).setAddress(req.body.street, req.body.town, req.body.suburb);
    res.redirect("/cart/payment");
});
router.get("/cart/payment", async (req, res) => {
    res.render("cart/payment", {
        ...getPageOptions(req, [])
    });
});
router.post("/cart/payment", checks.hasCart, async (req, res) => {
    session(req).setVoucher(req.body.voucher);
    res.redirect("/cart/checkout");
});
router.get("/cart/checkout", checks.hasCart, async (req, res) => {
    res.render("cart/checkout", {
        ...getPageOptions(req, await Database.getListedProducts(session(req).getCart())),
        address: session(req).getAddress(),
        voucher: session(req).getVoucher()
    });
});
router.post("/cart/checkout", checks.hasCart, async (req, res) => {
    session(req).clearCart();
    res.json({
        success: true
    });
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


// ================================= STATIC PAGES =================================
router.get("/about", async (req, res) => {
    res.render("static/about", {
        ...getPageOptions(req, [])
    });
});
router.all("/contact", async (req, res) => { // not static but fits in well
    res.render("contact", {
        ...getPageOptions(req, [])
    });
});
router.post("/contact", async (req, res) => {
    // TODO: MANAGE THESE
    res.json({
        "msg": "thanks!"
    });
});
router.get("/contactinfo", async (req, res) => {
    res.render("static/contactinfo", {
        ...getPageOptions(req, [])
    });
});
router.get("/mission", async (req, res) => {
    res.render("static/mission", {
        ...getPageOptions(req, [])
    });
});
router.get("/future", async (req, res) => {
    res.render("static/future", {
        ...getPageOptions(req, [])
    });
});
router.get("/sponsors", async (req, res) => {
    res.render("static/sponsors", {
        ...getPageOptions(req, [])
    });
});

module.exports = router;