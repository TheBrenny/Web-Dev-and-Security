const router = require("express").Router();
const Database = require("../../db/database");
const helpers = require("./helpers");

router.get("/", async (req, res) => {
    res.render("index", {
        ...helpers.getPageOptions(req, await Database.getRandomAvailableProducts())
    });
});


router.get("/sell", async (req, res) => {
    res.render("comingsoon", {
        ...helpers.getPageOptions(req, [])
    });
});

// Ideally these would "use" specific endpoints
router.use(require("./listings"));
router.use(require("./account"));
router.use(require("./about"));
router.use(require("./checkout"));

module.exports = router;