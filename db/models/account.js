class AccountModel {
    constructor(databaseModel) {
        this.db = databaseModel;
    }

    async addUser(username, password, plainPassword, question1, answer1, question2, answer2) {
        let sql = `INSERT INTO users (username, password, plainPassword, question1, answer1, question2, answer2) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        return this.db.query(sql, username, password, plainPassword, question1, answer1, question2, answer2).then(this.db.changedResponse).then(r => r.success);
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

        sql += Object.keys(newDetails).map(e => e + "=?").join(", ");
        vars = Object.values(newDetails);

        // for (let e of Object.entries(newDetails)) {
        //     sql += `${e[0]}=? `;
        //     vars.push(e[1]);
        // }

        sql += ` WHERE id=?`;
        vars.push(targetID);

        return this.db.query(sql, ...vars).then(this.db.changedResponse).then(r => r.success);
    }

    async getRemembered(selector) {
        let sql = `SELECT * FROM rememberTokens WHERE selector=?`;
        return this.db.query(sql, selector).then(this.db.firstRecord);
    }

    async setRemembered(user, selector, validatorHash) {
        let sql = `INSERT INTO rememberTokens (selector, validator, user) VALUES (?,?,?)`;
        return this.db.query(sql, selector, validatorHash, user).then(this.db.changedResponse);
    }

    async deleteRemembered(selector) {
        let sql = `DELETE FROM rememberTokens WHERE selector=?`;
        return this.db.query(sql, selector).then(this.db.changedResponse);
    }

    async getSecurityQuestions(username) {
        let sql = `SELECT id, username, question1, question2, answer1, answer2 FROM users WHERE username=? AND active=1`;
        return this.db.query(sql, username).then(this.db.firstRecord);
    }

    async getSecurityQuestionsByID(id) {
        let sql = `SELECT id, username, question1, question2, answer1, answer2 FROM users WHERE id=? AND active=1`;
        return this.db.query(sql, id).then(this.db.firstRecord);
    }
}

module.exports = AccountModel;