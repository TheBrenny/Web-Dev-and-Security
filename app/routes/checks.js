const session = require("./session");

function matchingId(req, _res, next) {
    if (parseInt(req.params.id) === session(req).getAccount().id) next();
    else {
        let e = new Error("You don't seem to be the right user to access this operation");
        e.statusCode = 403;
        throw e;
    }
}

function isAuthed(req, res, next) {
    if (session(req).isAuthed()) next();
    else {
        res.status(401);
        if (req.accepts("text/html")) res.redirect("/login");
        else res.json({
            success: false,
            message: "You need to be authenticated to do this."
        });

    }
}

function isGuest(req, res, next) {
    if (session(req).isAuthed()) {
        res.status(400);
        if (req.accepts("text/html")) res.redirect("/");
        else res.json({
            success: false,
            message: "This action is only for guests. Please log out first."
        });
    } else next();
}

function hasCart(req, res, next) {
    if (Object.keys(session(req).getCart()).length === 0) {
        res.status(400);
        if (req.accepts("text/html")) res.redirect("/cart");
        else res.json({
            success: false,
            message: "You need to have items in your cart to do this."
        });
    } else next();
}

function attemptAdmin(req, res, next) {
    const auth = {
        login: "alladin",
        password: "opensesame"
    };

    const b64 = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64, 'base64').toString().split(':');

    if (!login || !password || login !== auth.login || password !== auth.password) {
        res.set('WWW-Authenticate', 'Basic realm=401');
        res.status(401).send("Authentication required.");
        return;
    } else next();
}

module.exports = {
    matchingId,
    isAuthed,
    isGuest,
    hasCart,
    attemptAdmin
};