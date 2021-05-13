class CommentModel {
    constructor(databaseModel) {
        this.db = databaseModel;
    }

    async getComments(productID) {
        let sql = `SELECT * FROM comments INNER JOIN users ON comments.user=users.id WHERE comments.product=?`;
        return this.db.query(sql, productID);
    }

    async insertComment(comment) {
        let keepKeys = ["product", "comment", "comment_date", "user"];
        for (let k of Object.keys(comment))
            if (!keepKeys.includes(k)) delete comment[k]; // no foreign/untrusted keys please.

        let cols = Object.keys(comment);
        let vals = Object.values(comment);

        let sql = `INSERT INTO comments (${cols.join(", ")}) VALUES (${vals.map(() => "?").join(", ")})`; // builds the prepped statement

        return this.db.query(sql, ...vals).then(this.db.changedResponse);
    }

    async getSpecificComment(id) {
        let sql = `SELECT * FROM comments INNER JOIN users ON comments.user=users.id WHERE comments.id=?`;
        return this.db.query(sql, id).then(this.db.firstRecord);
    }
}

module.exports = CommentModel;