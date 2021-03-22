const Database = require("./db/database");
const fs = require("fs");
const path = require("path");
const config = require("./config");

let dbScripts = path.join(__dirname, "db", "scripts");
let readScript = (s, vars) => {
    let sql = fs.readFileSync(path.join(dbScripts, s)).toString();
    for (let key of Object.keys(vars)) {
        sql = sql.replace(new RegExp("\$\{" + key + "\}", "g"), vars[key]);
    }
    return sql;
};
let prom = Promise.resolve();

if (process.argv.includes("cleanDB")) {
    prom = prom.then(() => {
            let sql = readScript("clean.sql", {
                db: config.db.url.pathname.substr(1)
            });
            console.log(sql);
            return sql;
        }).then((sql) => Database.query(sql))
        .then((ret) => console.log(ret.toString()));
}
if (process.argv.includes("installDB")) {
    prom = prom.then(() => {
            let sql = readScript("install.sql");
            console.log(sql);
            return sql;
        }).then((sql) => Database.query(sql))
        .then((ret) => console.log(ret.toString()));
}
if (process.argv.includes("demoDB")) {
    prom = prom.then(() => {
            let sql = readScript("demo.sql");
            console.log(sql);
            return sql;
        }).then((sql) => Database.query(sql))
        .then((ret) => console.log(ret.toString()));
}
prom.then(() => {
    console.log("\nAll Done!");
    process.exit(0);
}).catch(err => console.error(err) && process.exit(1));