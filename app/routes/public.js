const router = require("express").Router();
const Database = require("../../db/database");
const helpers = require("./helpers");
const rememberme = require("./rememberme");
// This is the remember me functionality
router.use(rememberme.rememberme);

router.get("/", async (req, res) => {
    res.render("index", {
        ...helpers.getPageOptions(req, await Database.listings.getRandomProducts())
    });
});


// Ideally these would "use" specific endpoints
router.use(require("./listings"));
router.use(require("./account"));
router.use(require("./about"));
router.use(require("./checkout"));

module.exports = router;