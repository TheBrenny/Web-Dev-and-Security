const sessionSchema = {
    account: {
        name: null,
        id: -1,
        authed: false,
        badLogin: false
    },
    cart: [] // TODO: I'm just saving item IDs. I should be saving the whole Product object.
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

function getCart() {
    if (this.cart == undefined) this.cart = [...sessionSchema.cart];
    return this.cart;
}

function addToCart(id) {
    if (this.cart == undefined) this.cart = [...sessionSchema.cart];
    this.cart.push(id);
}

function removeFromCart(id) {
    if (this.cart == undefined) this.cart = [...sessionSchema.cart];
    let loc = this.cart.indexOf(id);
    if (loc >= 0) this.cart.splice(loc, 1);
}

function clearCart() {
    this.cart = [];
}

function setAddress(street, town, suburb) {
    this.address = {
        street,
        town,
        suburb
    };
}

function getAddress() {
    return this.address;
}

function getVoucher() {
    return this.voucher;
}

function setVoucher(code) {
    this.voucher = code;
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
    getCart,
    addToCart,
    removeFromCart,
    clearCart,
    setAddress,
    getAddress,
    setVoucher,
    getVoucher,
};

module.exports = function (req) {
    let func = {};
    for (let f in functions) func[f] = functions[f].bind(req.session);
    return Object.assign(req.session, functions);
};