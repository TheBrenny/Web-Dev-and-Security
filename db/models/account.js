class AccountModel {
    constructor(databaseModel) {
        this.db = databaseModel;
    }

    async addUser(username, password, plainPassword) {
        let sql = `INSERT INTO users (username, password, plainPassword) VALUES (?, ?, ?)`;
        return this.db.query(sql, username, password, plainPassword).then(this.db.changedResponse);
    }

    async getUser(username) {
        let sql = `SELECT * FROM users WHERE username=? AND active=1`;
        return this.db.query(sql, username).then(this.db.firstRecord);
    }

    async getUserByID(id) {
        let sql = `SELECT * FROM users WHERE id=? AND active=1`;
        return this.db.query(sql, id).then(this.db.firstRecord);
    }

    async updateAccount(targetID, newDetails) {
        let vars = [];
        let sql = `UPDATE users SET `;

        for (let e in Object.entries(newDetails)) {
            sql += `${e[0]}=? `;
            vars.push(e[1]);
        }

        sql += `WHERE id=?`;
        vars.push(targetID);

        return this.db.query(sql, ...vars).then(this.db.changedResponse);
    }

}

module.exports = AccountModel;