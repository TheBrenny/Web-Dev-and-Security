const router = require("express").Router();
const helpers = require("./helpers");

// ================================= STATIC PAGES =================================
router.get("/about", async (req, res) => {
    res.render("static/about", {
        ...helpers.getPageOptions(req, [])
    });
});
router.all("/about/contact", async (req, res) => { // not static but fits in well
    res.render("static/contact", {
        ...helpers.getPageOptions(req, [])
    });
});
router.post("/about/contact", async (_req, _res) => {
    // TODO: MANAGE THESE
    // res.json({
    //     "msg": "thanks!"
    // });
});
router.get("/about/contactinfo", async (req, res) => {
    res.render("static/contactinfo", {
        ...helpers.getPageOptions(req, [])
    });
});
router.get("/about/mission", async (req, res) => {
    res.render("static/mission", {
        ...helpers.getPageOptions(req, [])
    });
});
router.get("/about/future", async (req, res) => {
    res.render("static/future", {
        ...helpers.getPageOptions(req, [])
    });
});
router.get("/about/sponsors", async (req, res) => {
    res.render("static/sponsors", {
        ...helpers.getPageOptions(req, [])
    });
});

module.exports = router;