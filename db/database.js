const db = require("./db");

// TODO: Clean this up so we're not writing full queries in here.
//       Plan is to move the queries into their individual schemas,
//       so each Class can do it's own operations, rather than
//       having the DB class handle it all.
class Database {
    constructor() {
        this.db = db;
        // TODO: Split this into more models
        // something like
        // this.accounts = require("./models/accounts")(this);
        // and that would create an account class/object which can call the query method in this class.
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
    async getUserByID(id) {
        return this.query(`SELECT * FROM users WHERE id="${id}" AND active=1`);
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

    async getProducts(...list) {
        list = list.reduce((a, c) => a.concat(c), []); // make a flattened copy so we stop breaking things
        for (let i in list) list[i] = "products.id=" + list[i];
        list = list.length > 0 ? list.join(" OR ") : "1=0";
        let query = `SELECT * FROM products INNER JOIN users ON products.owner=users.id WHERE ${list}`;
        return this.query(query);
    }

    async insertSellable(item) {
        // Double check the keys
        let keepKeys = ["name", "description", "image", "owner", "cost", "quantity", "post_date", "purchased_date", "purchased_by"];
        for (let k of Object.keys(item))
            if (!keepKeys.includes(k)) delete item[k]; // no foreign/untrusted keys please.

        let cols = Object.keys(item).join(", ");
        let vals = JSON.stringify(Object.values(item)).substring(1, -1);

        let query = `INSERT INTO products (${cols}) VALUES (${vals})`;
        return this.query(query);
    }

    async getComments(productID) {
        let query = `SELECT * FROM comments INNER JOIN users ON comments.user=users.id WHERE comments.product=${productID}`;
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