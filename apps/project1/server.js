const express = require("express");
const scetch = require("scetch")();
const bcrypt = require("bcrypt");

let app = express();

const db = require("../../db/db");

app.set('views', 'apps/project1/views');
app.engine('sce', scetch.engine);
app.set('view engine', 'sce');

app.use("/assets", express.static(__dirname + '/assets'));
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (_, res) => {
    // res.send(app.engine().render(index, {}));
    // res.end();
    res.render("index", {});
});

// let hash = crypto.hashSync(password, 12); // 12 rounds of bcrypt salting
// upper line is used for registering!

app.post("/login", async (req, res) => {
    let {
        username,
        password
    } = req.body;
    let target = (await db.query(`SELECT username, password, active FROM Users WHERE username="${username}" AND active=1`))[0]; // the zeroth index is the actual set of results

    // found user
    if (target.length > 0) {
        const passMatch = bcrypt.compareSync(password, target[0].password);
        if (passMatch) {
            res.status(200).json({
                success: true
            });
        } else {
            res.status(401).json({
                success: false
            });
        }
    } else {
        bcrypt.hashSync(password, 12); // hash anyway to waste time.
        res.status(401).json({
            success: false
        });
    }


    // look at using the same sort of DB methods from the SAD assignment
    // also look up how to do a simple auth page in nodejs
});

module.exports = app;