const sessionSchema = {
    account: {
        name: null,
        id: -1,
        authed: false,
        badLogin: false
    }
};

function add(key, value) {
    this[key] = value;
}

function remove(key) {
    delete this[key];
}

function getAccount() {
    if (this.account === undefined) this.account = Object.assign({}, sessionSchema.account);
    return this.account;
}

function setAccount(id, name) {
    if (id < 0 || id == null) {
        this.account = Object.assign({}, sessionSchema.account);
    } else {
        this.getAccount().id = id;
        this.getAccount().name = name;
        this.getAccount().authed = true;
        this.getAccount().badLogin = false;
    }
}

function name() {
    return this.getAccount().name;
}

function isAuthed() {
    return this.getAccount().authed;
}

function isBadLogin() {
    let b = this.getAccount().badLogin;
    this.getAccount().badLogin = false;
    return b;
}

function badLogin() {
    setAccount.call(this);
    this.getAccount().badLogin = true;
}

function isBadRegister() {
    let b = this.badReg;
    this.badReg = false;
    return b;
}

function badRegister() {
    setAccount.call(this);
    this.badReg = true;
}


const functions = {
    add,
    remove,
    getAccount,
    setAccount,
    name,
    isAuthed,
    isBadLogin,
    badLogin,
    isBadRegister,
    badRegister,
};

module.exports = function (req) {
    let func = {};
    for (let f in functions) func[f] = functions[f].bind(req.session);
    return Object.assign(req.session, functions);
};