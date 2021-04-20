const session = require("./session");

// ====================== API Side ======================
let api = {};

// ====================== Public Side ======================
function isAuthed(req, res, next) {
    if (session(req).isAuthed()) next();
    else res.status(401).redirect("/login");
}

function isGuest(req, res, next) {
    if (session(req).isAuthed()) {
        res.status(400).redirect("/");
    } else next();
}

function hasCart(req, res, next) {
    if (session(req).getCart().length == 0) res.redirect("/cart");
    else next();
}

// ====================== Exports ======================
module.exports = {
    isAuthed,
    isGuest,
    hasCart,
    api: api
};