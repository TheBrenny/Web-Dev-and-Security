const router = require("express").Router();
const Database = require("../../db/database");
const helpers = require("./helpers");
const checks = require("./checks");
const session = require("./session");

router.get("/listings", async (req, res) => {
    res.render("listings/listings", {
        navList: helpers.getNavList(req),
        ...helpers.getPageOptions(req, await Database.getAvailableProducts()),
        search: ""
    });
});

router.get("/listings/search/", async (_req, res) => {
    res.redirect("/listings");
});

router.get("/listings/search/:query", async (req, res) => {
    res.render("listings/listings", {
        ...helpers.getPageOptions(req, await Database.getAvailableProducts(req.params.query)),
        search: req.params.query
    });
});

router.get("/listings/search/:query/all?", async (req, res) => {
    //do a like search and return results
    res.render("listings/listings", {
        ...helpers.getPageOptions(req, await Database.getAllProducts(req.params.query)),
        search: req.params.query
    });
});

router.get("/sell", checks.isAuthed, async (req, res) => {
    res.render("listings/sell", {
        navList: helpers.getNavList(req),
    });
});

router.post("/sell", async (req, res) => {
    let sess = session(req);

    if (!sess.isAuthed()) {
        res.status(403).json({
            success: false,
            message: "You must be logged in to do that."
        });
        return;
    }

    let data = req.body;

    // TODO: sanitise data here

    Object.assign(data, {
        image: "defaultImage.svg",
        owner: sess.getAccount().id,
        quantity: 1,
        post_date: helpers.getDateString(new Date()),
        purchased_date: null,
        purchased_by: null,
    });

    let keepKeys = ["name", "description", "image", "owner", "cost", "quantity", "post_date", "purchased_date", "purchased_by"];

    for (let k of Object.keys(data))
        if (!keepKeys.includes(k)) delete data[k]; // no foreign/untrusted keys please.

    let tryInsert = await Database.insertSellable(data);

    res.json({
        success: tryInsert.affectedRows == 1,
        message: tryInsert.insertId
    });
});

router.get("/item", async (req, res) => res.redirect("/listings"));
router.get("/item/:id", async (req, res) => {
    let item = (await Database.getProducts(req.params.id))[0];
    let sold = item.products_purchased_by != null;
    console.log(item.products_purchased_by != null);
    console.log(item.products_purchased_by);
    res.render("listings/item", {
        ...helpers.getPageOptions(req, []),
        item,
        sold,
        comments: (await Database.getComments(req.params.id))
    });
});

module.exports = router;