const db = require("./db");

class Database {
    constructor() {
        this.db = db;
    }

    async query(query) {
        return (await db.query(query))[0];
    }

    async addUser(name, password, plainPassword) {
        return (await db.query(`INSERT INTO users (username, password, plainPassword) VALUES ("${name}", "${password}", "${plainPassword}")`));
    }

    async getUser(username) {
        return this.query(`SELECT * FROM users WHERE username="${username}" AND active=1`);
    }

    async getAllProducts(query) {
        query = !!query ? `name LIKE %${query}%` : "1=1";
        return this.query(`SELECT * FROM products WHERE ${query}`);
    }

    async getAvailableProducts(query, pagination) {
        query = !!query ? `name LIKE %${query}%` : "1=1";
        // pagination = !!pagination ? pagination : {}; // TODO: deal with this later!
        return this.query(`SELECT * FROM products WHERE purchased_date IS NULL AND ${query}`);
    }
    async getRandomAvailableProducts(query) {
        query = !!query ? `name LIKE %${query}%` : "1=1";
        return this.query(`SELECT * FROM products WHERE purchased_date IS NULL AND ${query} ORDER BY RAND()`);
    }

    async getPurchasedProducts(query) {
        query = !!query ? `name LIKE %${query}%` : "1=1";
        return this.query(`SELECT * FROM products WHERE purchased_date > 0 AND ${query}`);
    }
}

module.exports = new Database();