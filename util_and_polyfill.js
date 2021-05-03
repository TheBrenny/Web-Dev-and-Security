const util = require('util');

// ARRAYS

Object.defineProperties(Array.prototype, {
    hasCombination: {
        value: function (a2) {
            return this.length === a2.length && this.every(val => a2.includes(val)) && a2.every(val => this.includes(val));
        }
    },
    containsNull: {
        value: function (count) {
            count = count || 1;
            if (count === 0) return this.length === 0;
            return this.filter(e => e === undefined || e === null).length >= count;
        }
    },
});


// REGEXPS

RegExp.escape = function (s) {
    return String(s).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
};

// STRINGS
let ogMatchAll = String.prototype.matchAll;
let ogSubstr = String.prototype.substr;
let ogSubstring = String.prototype.substring;
Object.defineProperties(String.prototype, {
    replaceAll: {
        value: function (find, replace) {
            if (find.constructor.name === "String") {
                find = new RegExp(RegExp.escape(find), "g");
            }
            if (find.constructor.name !== "RegExp") return this;
            if (!find.global) find = new RegExp(find, find.flags + "g");
            return this.replace(find, replace);
        }
    },
    matchAll: {
        value: function (rx) {
            // Matchall polyfill - this is how we handle Node <12
            if (ogMatchAll) return ogMatchAll.call(this, rx);

            if (typeof rx === "string") rx = new RegExp(rx, "g");
            rx = new RegExp(rx);
            let cap = [];
            let all = [];
            while ((cap = rx.exec(this)) !== null) all.push(cap);
            return all;
        }
    },
    substr: {
        value: function (start, length) {
            if (start < 0) start = (start % this.length) + this.length;
            if (length < 0) {
                length = Math.abs(length);
                start -= length;
            }
            return ogSubstr.call(this, start, length);
        }
    },
    substring: {
        value: function (start, end) {
            if (start < 0) start = (start % this.length) + this.length;
            if (end < 0) end = (end % this.length) + this.length;
            return ogSubstring.call(this, start, end);
        }
    },
});

// OBJECTS

Object.defineProperties(Object.prototype, {
    doesExtend: {
        value: function (theSuper) { // rename to doesExtend ?
            return util.inherits(this.constructor || this, theSuper.constructor || theSuper);
        }
    },
});