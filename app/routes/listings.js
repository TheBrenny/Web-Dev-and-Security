const router = require("express").Router();
const Database = require("../../db/database");
const helpers = require("./helpers");

router.get("/listings", async (req, res) => {
    res.render("listings", {
        navList: helpers.getNavList(req),
        ...helpers.getPageOptions(req, await Database.getAvailableProducts()),
        search: ""
    });
});

router.get("/listings/search/", async (_req, res) => {
    res.redirect("/listings");
});

router.get("/listings/search/:query", async (req, res) => {
    res.render("listings", {
        ...helpers.getPageOptions(req, await Database.getAvailableProducts(req.params.query)),
        search: req.params.query
    });
});

router.get("/listings/search/:query/all?", async (req, res) => {
    //do a like search and return results
    res.render("listings", {
        ...helpers.getPageOptions(req, await Database.getAllProducts(req.params.query)),
        search: req.params.query
    });
});

module.exports = router;