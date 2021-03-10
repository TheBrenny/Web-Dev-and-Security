require("dotenv").config();

const isDevSwitch = false;

module.exports.env = {
    node: process.env.NODE_ENV || "production",
    deploy: process.env.DEPLOY || "local",
    gulping: process.env.GULPING == "true",
    isDev: isDevSwitch
};
module.exports.env.isDev = module.exports.env.node.startsWith("dev") || module.exports.env.deploy.startsWith("local") || isDevSwitch;

module.exports = {
    morgan: {
        stream: process.env.IS_VSCODE ? {
            write: console.log
        } : process.stdout
    },
    helmet: {}
};

module.exports.helmet = !module.exports.env.gulping ? {} : {
    contentSecurityPolicy: false
};

module.exports.serverInfo = {
    host: process.env.HOST || "localhost",
    port: process.env.PORT || 80,
};

module.exports.db = {
    url: process.env.MYSQL_URL || process.env.JAWSDB_URL
};