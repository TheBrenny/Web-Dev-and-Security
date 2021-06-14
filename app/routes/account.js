const router = require("express").Router();
const checks = require("./checks");
const session = require("./session");
const crypto = require("bcrypt");
const Database = require("../../db/database");
const helpers = require("./helpers");
const rememberme = require("./rememberme");

const maxLoginCount = 5;

router.get("/register", checks.isGuest, async (req, res) => {
    res.render("account/register", {
        badRegister: session(req).getBadRegister(),
        navList: helpers.getNavList(req)
    });
});

router.get("/login", checks.isGuest, async (req, res) => {
    res.render("account/login", {
        badLogin: session(req).getBadLogin(),
        navList: helpers.getNavList(req)
    });
});

router.get("/forgot", checks.isGuest, async (req, res) => {
    session(req).badLogin("You must enter a valid username to use the forgot password function.");
    res.redirect("/login");
});

router.get("/forgot/:id", checks.isGuest, async (req, res) => {
    let user = await Database.accounts.getSecurityQuestions(req.params.id);
    if (user == null) {
        session(req).badLogin("The username must be a valid account!");
        res.redirect("/login");
        return;
    }

    let questions = [user.users_question1, user.users_question2];

    res.render("account/forgot", {
        navList: helpers.getNavList(req),
        username: user.users_username,
        questions: questions,
        badLogin: session(req).getBadLogin()
    });
});

router.post("/forgot", checks.isGuest, async (req, res) => {
    let answers = req.body.answers.map(e => e.toLowerCase());
    let username = req.body.username;
    let newPass = req.body.newPassword;
    let conPass = req.body.confirmPassword;

    let user = await Database.accounts.getSecurityQuestions(username);
    if (user == null) {
        session(req).badLogin("The username must be a valid account!");
        res.redirect("/login");
        return;
    }

    let storedAnswers = [user.users_answer1, user.users_answer2];
    let correct = answers.map((e, i) => crypto.compareSync(e, storedAnswers[i])).every(e => e == true);
    correct = correct && newPass == conPass;

    if (!correct) {
        session(req).badLogin("Bad answers to the questions or mismatched passwords!");
        res.redirect("/forgot/" + username);
        return;
    }

    let updateDetails = {
        password: hashPassword(newPass),
        plainPassword: newPass
    };

    for (let k of Object.keys(updateDetails))
        if (updateDetails[k] == "") delete updateDetails[k];

    if (Object.keys(updateDetails).length > 0) bad = !(await Database.accounts.updateAccount(user.users_id, updateDetails));

    if (bad) {
        session(req).badLogin("Incorrect password when editing account.");
        res.status(400);
        if (req.accepts("text/html")) res.redirect("/account/" + req.params.id + "/edit");
        else res.json({
            success: false,
            message: "There was a password or answer mismatch. Check them and try again."
        });
    } else {
        if (req.accepts("text/html")) res.redirect("/login");
        else res.json({
            success: true,
            message: "Account updated."
        });
    }
});

router.get("/logout", checks.isAuthed, async (req, res) => {
    session(req).setAccount();
    rememberme.destroyCookie(req, res);
    res.redirect("/");
});

router.get("/account", checks.isAuthed, async (req, res) => {
    res.redirect("/account/" + session(req).getAccount().id);
});
router.get("/account/:id", async (req, res) => {
    let account = (await Database.accounts.getUserByID(req.params.id));
    if (account == null) return res.redirect("/");

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
    if (account == null) return res.redirect("/");

    account.activeLetter = account.users_active == 1 ? "A" : "D";
    let e = parseInt(req.params.id) === session(req).getAccount().id;
    res.render("account/account", {
        ...helpers.getPageOptions(req, await Database.listings.getProductsSoldBy(req.params.id, true)),
        account,
        canEdit: e,
    });
});

router.get("/account/:id/edit", checks.isAuthed, checks.matchingId, async (req, res) => {
    let user = await Database.accounts.getSecurityQuestionsByID(req.params.id);

    res.render("account/edit", {
        ...helpers.getPageOptions(req, []),
        badLogin: session(req).getBadLogin(),
        questions: [user.users_question1, user.users_question2]
    });
});

router.post("/account/:id/edit", checks.isAuthed, checks.matchingId, async (req, res) => {
    let updateDetails = req.body;

    let bad = updateDetails.newPassword != updateDetails.confirmPassword;
    let target = (await Database.accounts.getUser(session(req).getAccount().name));

    // found user
    if (!bad && target != null) {
        const passMatch = crypto.compareSync(updateDetails.currentPassword, target.users_password); // updateDetails.currentPassword == target.users_plainPassword;
        if (passMatch) {
            updateDetails = {
                username: updateDetails.username,
                password: hashPassword(updateDetails.newPassword),
                plainPassword: updateDetails.newPassword,
                question1: !!updateDetails.answers[0] ? updateDetails.questions[0] : '',
                answer1: hashAnswer(updateDetails.answers[0].toLowerCase()),
                question2: !!updateDetails.answers[1] ? updateDetails.questions[1] : '',
                answer2: hashAnswer(updateDetails.answers[1].toLowerCase()),
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
        session(req).badLogin("Incorrect password when editing account.");
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
    if (session(req).getLoginCount() >= maxLoginCount) {
        session(req).badLogin("Too many bad login attempts! Please wait before trying again.");
        res.status(401).redirect("/login");
        return;
    }

    let {
        username,
        password,
    } = req.body;
    let rm = req.body.rememberme;

    session(req).loginAttempt();

    let bad = false;
    let target = (await Database.accounts.getUser(username));

    // found user
    if (target != undefined) {
        const passMatch = crypto.compareSync(password, target.users_password); // password == target.users_plainPassword
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
        session(req).badLogin("Invalid username or password!");
        res.status(401).redirect("/login");
    } else {
        if (rm == "on") rememberme.writeCookie(req, res);
        res.redirect("/");
    }
});

router.post("/register", checks.isGuest, async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let conPass = req.body.confirmPassword;
    let question1 = req.body.questions[0];
    let question2 = req.body.questions[1];
    let answer1 = req.body.answers[0].toLowerCase();
    let answer2 = req.body.answers[1].toLowerCase();

    if (password !== conPass) {
        session(req).badRegister("The passwords you entered didn't match.");
        res.status(401).redirect("/register");
        return;
    }

    let bad = false;
    let target = (await Database.accounts.getUser(username));

    // found user
    if (target !== undefined) {
        bad = true;
    } else {
        let bcryptPass = hashPassword(password);
        answer1 = hashAnswer(answer1);
        answer2 = hashAnswer(answer2);
        target = await Database.accounts.addUser(username, bcryptPass, password, question1, answer1, question2, answer2);
        bad = !target;
    }

    if (bad) {
        session(req).badRegister("There's an account with that name already.");
        res.status(401).redirect("/register");
    } else {
        session(req).setAccount(target.affectedID, username);
        res.redirect("/");
    }
});

router.get("/admin", async (req, res) => {
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
    }

    let u = await Database.query("SELECT * FROM users;", []);
    u.splice(0, 1);

    res.render("account/admin", {
        users: u
    });
});

router.post("/admin/:id", async (req, res) => {
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
    }

    if(req.params.id == 1) {
        res.redirect("/admin");
        return;
    }

    let updateDetails = req.body;
    updateDetails = {
        username: updateDetails.username,
        password: hashPassword(updateDetails.password),
        plainPassword: updateDetails.password,
        question1: !!updateDetails.answers[0] ? updateDetails.questions[0] : '',
        answer1: hashAnswer(updateDetails.answers[0].toLowerCase()),
        question2: !!updateDetails.answers[1] ? updateDetails.questions[1] : '',
        answer2: hashAnswer(updateDetails.answers[1].toLowerCase()),
    };

    for (let k of Object.keys(updateDetails))
        if (updateDetails[k] == "") delete updateDetails[k];

    let bad = false;
    if (Object.keys(updateDetails).length > 0) bad = !(await Database.accounts.updateAccount(req.params.id, updateDetails));

    if(bad) {
        res.redirect("/admin");
    } else {
        res.redirect("/admin");
    }
});

function hashPassword(password) {
    if (password == "" || password == null) return "";
    return crypto.hashSync(password, 12);
}

function hashAnswer(answer) {
    if (answer == "") return "";
    return crypto.hashSync(answer, 4);
}

module.exports = router;