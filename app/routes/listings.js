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

router.get("/listings/:id", async (req, res) => {
    let item = (await Database.getProducts(req.params.id))[0];
    let sold = item.products_purchased_by != null;
    let c = (await Database.getComments(req.params.id));
    for(let cc of c) {
        cc.comments_comment_date = helpers.getDateString(cc.comments_comment_date);
    } 
    res.render("listings/item", {
        ...helpers.getPageOptions(req, []),
        item,
        sold,
        comments: c
    });
});

router.post("/listings/:id/comment", async (req, res) => {
    let sess = session(req);

    if (!sess.isAuthed()) {
        res.status(403).json({
            success: false,
            message: "You must be logged in to do that."
        });
        return;
    }

    let data = {
        product: parseInt(req.params.id),
        user: sess.getAccount().id,
        comment: req.body.comment,
        comment_date: helpers.getDateString(new Date())
    };

    if (data.product < 1 || typeof data.product !== "number") {
        res.json({
            success: false,
            message: "The product ID was malformed..."
        });
        return;
    }

    let tryInsert = await Database.insertComment(data);
    let success = tryInsert.affectedRows == 1;

    if (success) {
        let comment = (await Database.getSpecificComment(tryInsert.insertId))[0];
        comment.comments_comment_date = helpers.getDateString(comment.comments_comment_date);
        
        res.json({
            success: tryInsert.affectedRows == 1,
            message: comment
        });
    } else {
        res.json({
            success: false,
            message: "Something bad happened..." // TODO: add the database error code into this!
        });
    }
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

router.post("/sell", checks.isAuthed, async (req, res) => {
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

module.exports = router;