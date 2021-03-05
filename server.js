require("./util_and_polyfill"); // only needs to be called once for the app!

// Config
const config = require("./config");
const serverInfo = config.serverInfo;

// Express related requires
const path = require("path");
const express = require("express");
const scetch = require("scetch")();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

// Make the app
const mainApp = express();
mainApp.use(morgan('common', config.morgan));
mainApp.use(helmet(config.helmet));
mainApp.use(cors());
mainApp.use(express.json());

mainApp.set('views', 'views');
mainApp.engine('sce', scetch.engine);
mainApp.set('view engine', 'sce');

mainApp.use("/assets", express.static(path.join(__dirname, "assets")));

// Generate app listing
let allApps = [{
    display: "Lab 2",
    slug: "lab2",
    app: require("./lab2/server.js")
}];

for (let a of allApps) {
    mainApp.use("/" + a.slug, a.app);
}

mainApp.get("/", (_, res) => {
    return res.render('index', {
        apps: allApps
    });
});

// Setup error handler
mainApp.use(require("./errorRouter"));
mainApp.use(require("./errorRouter").handler);

// LISTEN!
mainApp.listen(serverInfo.port, serverInfo.host, () => {
    if (process.env.NODE_ENV === 'dev' && process.env.GUPLING == 'true') serverInfo.port = 81;
    console.log(`Server is listening at http://${serverInfo.host}:${serverInfo.port}...`);
});