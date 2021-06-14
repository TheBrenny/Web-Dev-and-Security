// https://paragonie.com/blog/2015/04/secure-authentication-php-with-long-term-persistence
// Provided a lot of helpful thoughts when coming up with this solution!

const config = require("../../config");
const session = require("./session");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const db = require("../../db/db");
const accounts = require("../../db/database").accounts;

const cookieName = config.session.rememberCookieName;

async function rememberme(req, _, next) {
    // get cookie
    let rmCookie = null;
    try {
        rmCookie = req.headers.cookie.split("; ").find(e => e.startsWith(cookieName + "="));
        if (rmCookie) rmCookie = rmCookie.substring((cookieName + "=").length);
    } catch (e) {
        console.log(e);
    }

    if (!session(req).isAuthed() && !!rmCookie) {
        let [selector, validator] = rmCookie.split(":");
        let r = await accounts.getRemembered(selector);
        let successful = r !== null && bcrypt.compareSync(validator, r.rememberTokens_validator);

        if (successful) {
            let user = await accounts.getUserByID(r.rememberTokens_user);
            session(req).setAccount(user.users_id, user.users_username);
        }
    }

    next();
}

async function writeCookie(req, res) {
    let selector = genToken();
    let validator = genToken();
    let future = new Date();
    future.setFullYear(future.getFullYear() + 1);
    res.setHeader("Set-Cookie", [
        cookieName + "=" + [selector, validator].join(":"),
        "Expires=" + future.toUTCString(),
        "Secure",
        "HttpOnly"
    ].join("; "));

    await accounts.setRemembered(session(req).getAccount().id, selector, hashToken(validator));
}

async function destroyCookie(req, res) {
    let rmCookie = null;
    try {
        rmCookie = req.headers.cookie.split("; ").find(e => e.startsWith(cookieName + "="));
        if (rmCookie) rmCookie = rmCookie.substring((cookieName + "=").length);
        if (!!rmCookie) {
            let [selector, _] = rmCookie.split(":");
            await accounts.deleteRemembered(selector);
        }
    } catch (e) {
        console.log(e);
    }
    
    res.setHeader("Set-Cookie", [
        cookieName + "=",
        "Expires=" + new Date(0).toUTCString(),
        "Secure",
        "HttpOnly"
    ].join("; "));
}

function genToken() {
    const size = 40;
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let bytes = Array.from(crypto.randomBytes(size)).map(b => alphabet.charAt(parseInt(b) % alphabet.length));
    return bytes.join("");
}

function hashToken(token) {
    return bcrypt.hashSync(token, 3);
}

async function installTokenTable() {
    let sql = db.sqlFromFile("rememberMeTable");
    await db.query(sql);
}

module.exports = (() => {
    installTokenTable();

    return {
        rememberme,
        writeCookie,
        destroyCookie
    };
})();