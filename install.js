const Database = require("./db/database");
const fs = require("fs");
const path = require("path");

let dbScripts = path.join(__dirname, "db", "scripts");
let readScript = (s) => fs.readFileSync(path.join(dbScripts, s)).toString();
let prom = Promise.resolve();

if (process.argv.includes("cleanDB")) {
    prom.then(() => {
        let sql = readScript("clean.sql");
        console.log(sql);
        return sql;
    });
    prom.then((sql) => Database.query(sql));
    prom.then((ret) => console.log(ret.toString()));
}
if (process.argv.includes("installDB")) {
    prom.then(() => {
        let sql = readScript("install.sql");
        console.log(sql);
        return sql;
    });
    prom.then((sql) => Database.query(sql));
    prom.then((ret) => console.log(ret.toString()));
}
if (process.argv.includes("demoDB")) {
    prom.then(() => {
        let sql = readScript("demo.sql");
        console.log(sql);
        return sql;
    });
    prom.then((sql) => Database.query(sql));
    prom.then((ret) => console.log(ret.toString()));
}
prom.then(() => {
    console.log("\nAll Done!");
    process.exit(0);
}).catch(err => console.error(err) && process.exit(1));