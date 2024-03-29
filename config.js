require("dotenv").config();

const isDevSwitch = false;

module.exports = {};

module.exports.db = {
    url: new URL(process.env.MYSQL_URL)
};

module.exports.env = {
    node: process.env.NODE_ENV || "production",
    deploy: process.env.DEPLOY || "local",
    gulping: process.env.GULPING == "true",
    isDev: isDevSwitch
};
module.exports.env.isDev = module.exports.env.node.startsWith("dev") || module.exports.env.deploy.startsWith("local") || isDevSwitch;

module.exports.helmet = !module.exports.env.gulping ? {
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            scriptSrc: ["'self'", "'unsafe-inline'"] // TODO: Change this to `nonce-`s -- you can use res.locals.nonce to have the nonce variable available in scetch
        }
    }
} : {
    contentSecurityPolicy: false
};

module.exports.morgan = {
    stream: process.env.IS_VSCODE ? {
        write: console.log
    } : process.stdout
};


module.exports.serverInfo = {
    host: process.env.HOST || "localhost",
    port: process.env.PORT || 80,
};

module.exports.session = {
    sessionCookieName: process.env.SESSION_COOKIE_NAME || "wdsSesNam",
    rememberCookieName: process.env.REMEMBER_COOKIE_NAME || "wdsRemNam",
    secret: process.env.SESSION_SECRET || "secret"
};