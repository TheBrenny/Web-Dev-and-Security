class Schema {
    constructor(...args) {
        args = Array.from(args);
        // if (Object.isOneNull(args.filter(a => a[2]).map(a => a[0]))) throw new BadSchemaErrorNullValue(...args);
        if (args.length > 0 && !args.every(confirmArgTypes)) throw new BadSchemaErrorBadTypes(...args);

        function confirmArgTypes(v) {
            if (v === undefined) return true; // undefined is okay
            if (v === null) return true; // null is okay
            if (Array.isArray(v[1])) {
                if (v[0] === undefined) return true;
                if (v[0] === null) return true;
                return Array.from(v[1]).includes(v[0].constructor.name);
            }
            if (v[0] === undefined) return true; // undefined is okay
            if (v[0] === null) return true; // null is okay
            return v[0].constructor.name === v[1];
        }
    }

    insertInto() {
        let table = this.constructor.name;
        let objs = Object.entries(this).filter(e => [e[1]].containsNull()); //!Object.isOneNull(e[1]));
        let cols = objs.map(e => e[0]).join(",");
        let vals = objs.map(e => e[1]).map(e => typeof e === "number" ? e : `"${e}"`).join(",");
        let ret = `INSERT INTO ${table} (${cols}) VALUES (${vals});`;
        // TODO: Wrap strings in quotes, and convert Dates to SQL Date Objects
        return ret;
    }
    insertValues() {
        let objs = Object.entries(this).filter(e => [e[1]].containsNull()); //!Object.isOneNull(e[1]));
        let vals = objs.map(e => e[1]).join(",");
        return `(${vals})`;
    }
}

class Record {
    constructor(table, data) {
        this.table = table;
        this.cols = Object.keys(data);
        this.vals = Object.values(data);
    }
    insertInto() {
        return `INSERT INTO ${table} (${cols.join(",")}) VALUES ${this.insertValues()}`;
    }
    insertValues() {
        return `(${vals.join(",")})`;
    }
}

class BadSchemaError extends Error {
    constructor(msg, args) {
        super();
        this.message = msg + ': [' + args.join(', ') + ']';
    }
}
class BadSchemaErrorNullValue extends BadSchemaError {
    constructor(...args) {
        super("One of the following args is null when it can't be", Array.from(args));
    }
}
class BadSchemaErrorBadTypes extends BadSchemaError {
    constructor(types, ...args) {
        super("There is a mismatch in type expectations", Array.from(args).map((el, i) => [typeof el, types[i]]));
    }
}

module.exports = {
    Schema,
    Record,
    errors: {
        BadSchemaError,
        BadSchemaErrorNullValue,
        BadSchemaErrorBadTypes
    }
};

module.exports.insertMany = function (...vals) {
    if (vals.length === 0) return "";
    if (Array.isArray(vals[0])) vals = vals[0];
    if (vals.some(v => !v.doesExtend(Schema))) return "";
    if (vals.map(v => v.constructor.name).some(v => v !== vals[0].constructor.name)) return "";
    let table = vals[0].constructor.name;
    let objs = Object.entries(vals[0]).filter(e => [e[1]].containsNull()); //!Object.isOneNull(e[1]));
    let cols = objs.map(e => e[0]).join(",");
    let theVals = vals.map(v => v.insertValues());
    let ret = `INSERT INTO ${table} (${cols}) VALUES ${theVals.join(",")};`;
    // TODO: Wrap strings in quotes, and convert Dates to SQL Date Objects
    return ret;
};
module.exports.formatDateToSQL = function (date) {
    if (!date.doesExtend(Date)) return date;
    let ret = [date.getFullYear(), ("" + date.getMonth()).padStart(2, "0"), ("" + date.getDate()).padStart(2, "0")];
    return ret.join("-");

    // TODO: SET THE DATE TO YYYY-MM-DD format!
};