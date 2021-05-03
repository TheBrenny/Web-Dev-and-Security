const db = require("./db");

// TODO: Clean this up so we're not writing full queries in here.
//       Plan is to move the queries into their individual schemas,
//       so each Class can do it's own operations, rather than
//       having the DB class handle it all.
class Database {
    constructor() {
        this.db = db;
    }

    async query(query) {
        let opts = {
            sql: query,
            nestTables: '_'
        };
        let ret = await db.query(opts);
        return (ret)[0];
    }

    async addUser(name, password, plainPassword) {
        return (await db.query(`INSERT INTO users (username, password, plainPassword) VALUES ("${name}", "${password}", "${plainPassword}")`));
    }

    async getUser(username) {
        return this.query(`SELECT * FROM users WHERE username="${username}" AND active=1`);
    }

    async getAllProducts(options, addNameLike) {
        if ((!!addNameLike || addNameLike === undefined) && typeof options === 'string') options = `name LIKE "%${options}%"`;
        options = handleOptions(options);
        let query = !options.fullQuery ? `SELECT * FROM products INNER JOIN users ON products.owner=users.id WHERE ${options.query}` : options.query;
        return this.query(query);
    }

    async getAvailableProducts(options, addNameLike) {
        if ((!!addNameLike || addNameLike === undefined) && typeof options === 'string') options = `name LIKE "%${options}%"`;
        options = handleOptions(options);
        let query = !options.fullQuery ? `SELECT * FROM products INNER JOIN users ON products.owner=users.id WHERE products.purchased_date IS NULL AND ${options.query}` : options.query;
        return this.query(query);
    }
    async getRandomAvailableProducts(options, addNameLike) {
        if ((!!addNameLike || addNameLike === undefined) && typeof options === 'string') options = `name LIKE "%${options}%"`;
        options = handleOptions(options);
        let query = !options.fullQuery ? `SELECT * FROM products INNER JOIN users ON products.owner=users.id WHERE products.purchased_date IS NULL AND ${options.query} ORDER BY RAND()` : options.query;
        return this.query(query);
    }

    async getPurchasedProducts(options, addNameLike) {
        if ((!!addNameLike || addNameLike === undefined) && typeof options === 'string') options = `name LIKE "%${options}%"`;
        options = handleOptions(options);
        let query = !options.fullQuery ? `SELECT * FROM products INNER JOIN users ON products.owner=users.id WHERE products.purchased_date > 0 AND ${options.query}` : options.query;
        return this.query(query);
    }

    async getListedProducts(...list) {
        list = list.reduce((a, c) => a.concat(c), []); // make a flattened copy so we stop breaking things
        for (let i in list) list[i] = "products.id=" + list[i];
        list = list.length > 0 ? list.join(" OR ") : "1=0";
        let query = `SELECT * FROM products INNER JOIN users ON products.owner=users.id WHERE ${list}`;
        return this.query(query);
    }
}

function handleOptions(options) {
    if (!options || typeof options === 'string') {
        options = {
            query: options || "1=1"
        };
    }
    options.query = options.query || "1=1";
    options.pagination = options.pagination || 0;
    if (typeof options.pagination === 'number') options.pagination = module.exports.pagination(options.pagination);
    options.fullQuery = !!options.fullQuery;
    return options;
}

function pagination(page) {
    return [page * module.exports.paginationSize, module.exports.paginationSize];
}

module.exports = new Database();
module.exports.handleOptions = handleOptions;
module.exports.paginationSize = 10;
module.exports.pagination = pagination;