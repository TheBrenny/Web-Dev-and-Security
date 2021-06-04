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
const session = require("express-session");

// Make the app
const app = express();
const db = require("./db/db");
app.use(morgan('common', config.morgan));
app.use(helmet(config.helmet));
app.use(cors());
app.use(express.json());
app.use(session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false,
    store: db.sessionStore,
    name: config.session.sessionCookieName
}));
app.use(express.urlencoded({
    extended: true
}));

app.set('views', './app/views');
app.engine('sce', scetch.engine);
app.set('view engine', 'sce');

app.use("/assets", express.static("./app/assets"));

app.use("/", require("./app/routes/public"));
app.use(require("./errorRouter"));
app.use(require("./errorRouter").handler);

// LISTEN!
app.listen(serverInfo.port, serverInfo.host, () => {
    if (config.env.isDev && config.env.gulping) serverInfo.port = 81;
    console.log(`Server is listening at http://${serverInfo.host}:${serverInfo.port}...`);
});