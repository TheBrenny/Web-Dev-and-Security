const express = require('express');
const router = express.Router();
const isProd = !(require("./config").env.isDev);

// 404
router.use((req, res, _) => {
    res.status(404);
    throw new Error(`404 Not Found. Could not ${req.method.toLowerCase()} ${req.url}`);
});

module.exports = router;
module.exports.handler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    const statusCode = res.statusCode !== 200 ? res.statusCode : err.statusCode || 500;
    res.status(statusCode);
    req.headers.accept = req.headers.accept.replaceAll(/\*\/\*(;q=.+?|\s+?)(,|$)/g, "");

    let e = {
        statusCode: statusCode,
        message: err.message
    };

    // don't send the stack because of security risk!
    if (!isProd) e.message += "\nStack:\n" + err.stack;

    if (req.accepts("text/html")) {
        res.render("error", e);
    } else if (req.accepts("application/json")) {
        res.json(e);
    } else res.end();

    console.error(err);
};