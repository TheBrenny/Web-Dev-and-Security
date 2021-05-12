const router = require("express").Router();
const checks = require("./checks");
const session = require("./session");
const crypto = require("bcrypt");
const Database = require("../../db/database");
const helpers = require("./helpers");

router.get("/register", checks.isGuest, async (req, res) => {
    res.render("account/register", {
        badRegister: session(req).isBadRegister(),
        navList: helpers.getNavList(req)
    });
});

router.get("/login", checks.isGuest, async (req, res) => {
    res.render("account/login", {
        badLogin: session(req).isBadLogin(),
        navList: helpers.getNavList(req)
    });
});

router.get("/logout", checks.isAuthed, async (req, res) => {
    session(req).setAccount();
    res.redirect("/");
});

router.get("/account", checks.isAuthed, async (req, res) => {
    res.redirect("/account/" + session(req).getAccount().id);
});

router.get("/account/:id", async (req, res) => {
    let account = (await Database.getUserByID(req.params.id))[0];
    account.activeLetter = account.users_active[0] == 1 ? "A" : "D";
    let e = parseInt(req.params.id) === session(req).getAccount().id;
    res.render("account/account", {
        ...helpers.getPageOptions(req, await Database.getProductsSoldBy(req.params.id, true, true)),
        account,
        canEdit: e,
    });
});

router.get("/account/:id/edit", checks.isAuthed, checks.matchingId, async (req, res) => {
    res.render("account/edit", {
        ...helpers.getPageOptions(req, []),
        badAttempt: session(req).isBadUpdate()
    });
});

router.post("/account/:id/edit", checks.isAuthed, checks.matchingId, async (req, res) => {
    let updateDetails = req.body;

    let bad = updateDetails.newPassword != updateDetails.confirmPassword;
    let target = (await Database.getUser(session(req).getAccount().name));

    // found user
    if (!bad && target.length > 0) {
        const passMatch = updateDetails.currentPassword == target[0].users_plainPassword; //bcrypt.compareSync(password, target[0].password);
        if (passMatch) {
            updateDetails = {
                username: updateDetails.username,
                password: hashPassword(updateDetails.newPassword),
                plainPassword: updateDetails.newPassword
            };

            for (let k of Object.keys(updateDetails))
                if (updateDetails[k] == "") delete updateDetails[k];

            bad = !(await Database.updateAccount(target[0].users_id, updateDetails));
        } else {
            bad = true;
        }
    } else {
        bad = true;
    }

    if (bad) {
        session(req).badUpdate();
        res.status(400);
        if (req.accepts("text/html")) res.redirect("/account/" + req.params.id + "/edit");
        else res.json({
            success: false,
            message: "There was a password mismatch. Check them and try again."
        });
    } else {
        session(req).getAccount().name = updateDetails.username; // THIS ISN"T A SMART IDEA!
        if (req.accepts("text/html")) res.redirect("/account/" + req.params.id + "/");
        else res.json({
            success: true,
            message: "Account updated."
        });
    }
});

router.post("/login", checks.isGuest, async (req, res) => {
    let {
        username,
        password
    } = req.body;

    let bad = false;
    let target = (await Database.getUser(username));

    // found user
    if (target.length > 0) {
        const passMatch = password == target[0].users_plainPassword; //bcrypt.compareSync(password, target[0].password);
        if (passMatch) {
            session(req).setAccount(target[0].users_id, target[0].users_username);
            res.redirect("/");
        } else {
            bad = true;
        }
    } else {
        // hashPassword(password); // hash anyway to waste time.
        bad = true;
    }

    if (bad) {
        session(req).badLogin();
        res.status(401).redirect("/login");
    }
});

router.post("/register", checks.isGuest, async (req, res) => {
    let {
        username,
        password
    } = req.body;

    let bad = false;
    let target = (await Database.getUser(username));

    // found user
    if (target.length > 0) {
        bad = true;
    } else {
        let bcryptPass = hashPassword(password);
        let target = await Database.addUser(username, bcryptPass, password);
        session(req).setAccount(target[0].insertId, username);
        res.redirect("/");
    }

    if (bad) {
        session(req).badRegister();
        res.status(401).redirect("/register");
    }
});

function hashPassword(password) {
    return crypto.hashSync(password, 12);
}

module.exports = router;