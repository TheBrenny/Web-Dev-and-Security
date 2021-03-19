const db = require("./db");

class Database {
    constructor() {
        this.db = db;
    }

    async query(query) {
        return (await db.query(query))[0];
    }

    async getUser(username) {
        return query(`SELECT * FROM users WHERE username="${username}" AND active=1`);
    }

    async getAllProducts(query) {
        if (!query) query = "1=1";
        return query(`SELECT * FROM products WHERE ${query}`);
    }

    async getAvailableProducts(query) {
        if (!query) query = "1=1";
        return query(`SELECT * FROM products WHERE purchased_date IS NULL AND ${query}`);
    }
    async getRandomAvailableProducts(query) {
        if (!query) query = "1=1";
        return query(`SELECT * FROM products WHERE purchased_date IS NULL AND ${query} ORDER BY RAND()`);
    }

    async getPurchasedProducts(query) {
        if (!query) query = "1=1";
        return query(`SELECT * FROM products WHERE purchased_date > 0 AND ${query}`);
    }
}

module.exports = new Database();