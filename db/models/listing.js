class ListingModel {
    constructor(databaseModel) {
        this.db = databaseModel;
    }

    async searchAllProducts(query) {
        // let sql = `SELECT * FROM products INNER JOIN users ON products.owner=users.id WHERE name LIKE ?`;
        // return this.db.query(sql, `%${query}%`);
        return this.searchAvailableProducts(query, true);
    }
    async searchAvailableProducts(query, getAll) {
        let sql = `SELECT * FROM products INNER JOIN users ON products.owner=users.id`;
        if (!!query) sql += ` WHERE name LIKE ?`;
        if (!getAll) sql += ` AND products.purchased_date IS NULL`;
        return this.db.query(sql, `%${query}%`);
    }

    async getProductsSoldBy(id, getAll) {
        let sql = `SELECT * FROM products INNER JOIN users ON products.owner=users.id WHERE products.owner=?`;
        if (!getAll) sql += ` AND products.purchased_date IS NULL`;
        return this.db.query(sql, id);
    }

    async getRandomProducts(getAll) {
        let sql = `SELECT * FROM products INNER JOIN users ON products.owner=users.id`;
        if (!getAll) sql += ` WHERE products.purchased_date IS NULL`;
        sql += ` ORDER BY RAND()`;
        return this.db.query(sql);
    }

    async getProducts(...list) {
        list = list.reduce((a, c) => a.concat(c), []); // make a flattened copy so we stop breaking things
        if (list.length == 0) return []; // early exit because of zero response

        let sql = `SELECT * FROM products INNER JOIN users ON products.owner=users.id WHERE ` + (list.map(() => "products.id=?").join(" OR "));
        return this.db.query(sql, ...list);
    }

    async sellProduct(item) {
        // Double check the keys
        let keepKeys = ["name", "description", "image", "owner", "cost", "quantity", "post_date"];
        for (let k of Object.keys(item))
            if (!keepKeys.includes(k)) delete item[k]; // no foreign/untrusted keys please.

        let cols = Object.keys(item);
        let vals = Object.values(item);

        let sql = `INSERT INTO products (${cols.join(", ")}) VALUES (${vals.map(() => "?").join(", ")})`;
        return this.db.query(sql, ...vals).then(this.db.changedResponse);
    }

    async purchaseProduct(id, purchasedDate, purchasedBy) {
        let sql = `UPDATE products SET purchased_date=?, purchased_by=? WHERE id=?`;
        return this.db.query(sql, id, purchasedDate, purchasedBy).then(this.db.changedResponse);
    }

}

module.exports = ListingModel;