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
    let account = (await Database.accounts.getUserByID(req.params.id));
    account.activeLetter = account.users_active == 1 ? "A" : "D";
    let e = parseInt(req.params.id) === session(req).getAccount().id;
    res.render("account/account", {
        ...helpers.getPageOptions(req, await Database.listings.getProductsSoldBy(req.params.id, false)),
        account,
        canEdit: e,
    });
});
router.get("/account/:id/all", async (req, res) => {
    let account = (await Database.accounts.getUserByID(req.params.id));
    account.activeLetter = account.users_active == 1 ? "A" : "D";
    let e = parseInt(req.params.id) === session(req).getAccount().id;
    res.render("account/account", {
        ...helpers.getPageOptions(req, await Database.listings.getProductsSoldBy(req.params.id, true)),
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
    let target = (await Database.accounts.getUser(session(req).getAccount().name));

    // found user
    if (!bad && target.length > 0) {
        const passMatch = updateDetails.currentPassword == target.users_plainPassword; //bcrypt.compareSync(password, target[0].password);
        if (passMatch) {
            updateDetails = {
                username: updateDetails.username,
                password: hashPassword(updateDetails.newPassword),
                plainPassword: updateDetails.newPassword
            };

            for (let k of Object.keys(updateDetails))
                if (updateDetails[k] == "") delete updateDetails[k];

            if (Object.keys(updateDetails).length > 0) bad = !(await Database.accounts.updateAccount(target.users_id, updateDetails));
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
    let target = (await Database.accounts.getUser(username));

    // found user
    if (target != undefined) {
        const passMatch = password == target.users_plainPassword; //bcrypt.compareSync(password, target[0].password);
        if (passMatch) {
            session(req).setAccount(target.users_id, target.users_username);
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
    } else res.redirect("/");

});

router.post("/register", checks.isGuest, async (req, res) => {
    let {
        username,
        password
    } = req.body;

    let bad = false;
    let target = (await Database.accounts.getUser(username));

    // found user
    if (target !== undefined) {
        bad = true;
    } else {
        let bcryptPass = hashPassword(password);
        target = await Database.accounts.addUser(username, bcryptPass, password);
        bad = !target.success;
    }

    if (bad) {
        session(req).badRegister();
        res.status(401).redirect("/register");
    } else {
        session(req).setAccount(target.affectedID, username);
        res.redirect("/");
    }
});

function hashPassword(password) {
    if (password == "") return "";
    return crypto.hashSync(password, 12);
}

module.exports = router;