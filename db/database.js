const db = require("./db");

// TODO: Clean this up so we're not writing full queries in here.
//       Plan is to move the queries into their individual schemas,
//       so each Class can do it's own operations, rather than
//       having the DB class handle it all.
// TODO: Might be worthwhile to handle specific object types, such
//       as the buffer, to turn it into a binary string, or a number
//       that can be bit operated on.
class Database {
    constructor() {
        this.db = db;
        // TODO: Split this into more models
        // something like
        // this.accounts = require("./models/accounts")(this);
        // and that would create an account class/object which can call the query method in this class.
        this.accounts = new(require("./models/account"))(this);
        this.listings = new(require("./models/listing"))(this);
        this.comments = new(require("./models/comment"))(this);
    }

    async query(query, ...args) {
        let opts = {
            sql: query,
            nestTables: '_'
        };
        let ret = await this.db.execute(opts, args).catch((e) => (console.error(e), [
            []
        ]));
        return (ret)[0]; // returns the result set
    }

    async changedResponse(results) {
        return {
            success: results.affectedRows > 0,
            affectedRows: results.affectedRows,
            affectedID: results.insertId
        };
    }
    async firstRecord(results) {
        return results[0];
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