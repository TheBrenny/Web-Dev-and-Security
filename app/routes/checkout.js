const router = require("express").Router();
const helpers = require("./helpers");
const Database = require("../../db/database");
const checks = require("./checks");
const session = require("./session");

router.get("/cart", async (req, res) => {
    res.render("cart/cart", {
        ...helpers.getPageOptions(req, Object.values(session(req).getCart()))
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

    let obj = (await Database.listings.getProducts(itemID));
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
        ...helpers.getPageOptions(req)
    });
});
router.post("/cart/shipping", checks.hasCart, async (req, res) => {
    session(req).setAddress(req.body.street, req.body.town, req.body.suburb);
    res.redirect("/cart/payment");
});
router.get("/cart/payment", async (req, res) => {
    res.render("cart/payment", {
        ...helpers.getPageOptions(req)
    });
});
router.post("/cart/payment", checks.hasCart, async (req, res) => {
    session(req).setVoucher(req.body.voucher);
    res.redirect("/cart/checkout");
});
router.get("/cart/checkout", checks.hasCart, async (req, res) => {
    res.render("cart/checkout", {
        ...helpers.getPageOptions(req, await Database.listings.getProducts(session(req).getCartIDs())),
        address: session(req).getAddress(),
        voucher: session(req).getVoucher()
    });
});
router.post("/cart/checkout", checks.hasCart, async (req, res) => {
    // TODO: Make this actually hit the DB!
    session(req).clearCart();
    res.json({
        success: true
    });
});

module.exports = router;