const sessionSchema = {
    account: {
        name: "",
        id: -1,
        authed: false,
        badLogin: false
    },
    cart: {} // key is item id, value is quantity
};

const general = {
    add(key, value) {
        this[key] = value;
    },
    remove(key) {
        delete this[key];
    }
};

const account = {
    getAccount() {
        if (this.account === undefined) this.account = Object.assign({}, sessionSchema.account);
        return this.account;
    },
    setAccount(id, name) {
        if (id < 0 || id == null) {
            this.account = Object.assign({}, sessionSchema.account);
        } else {
            this.getAccount().id = id;
            this.getAccount().name = name;
            this.getAccount().authed = true;
            this.getAccount().badLogin = false;
        }
    },
    name() {
        return this.getAccount().name;
    },
    isAuthed() {
        return this.getAccount().authed;
    },
    isBadLogin() {
        let b = this.getAccount().badLogin;
        this.getAccount().badLogin = false;
        return b;
    },
    badLogin() {
        setAccount.call(this);
        this.getAccount().badLogin = true;
    },
    isBadRegister() {
        let b = this.badReg;
        this.badReg = false;
        return b;
    },
    badRegister() {
        setAccount.call(this);
        this.badReg = true;
    }
};

const cart = {
    getCart() {
        if (this.cart == undefined) this.cart = {
            ...sessionSchema.cart
        };
        return this.cart;
    },
    addToCart(obj) {
        let cart = this.getCart();
        let inCart = cart[obj.products_id] !== undefined;

        if (!inCart) cart[obj.products_id] = Object.assign({}, obj);

        return this.getCartSize();
    },
    removeFromCart(id) {
        delete this.getCart()[id];
        return this.getCartSize();
    },
    cartContains(id) {
        return this.getCart()[id] !== undefined;
    },
    clearCart() {
        this.cart = [];
        return 0;
    },
    getCartSize() {
        return Object.keys(this.getCart()).length;
    },
    getCartCost() {
        let cart = this.getCart();
        let total = 0;
        for (let id in cart) {
            total += parseFloat(cart[id].products_cost);
        }
        return total.toFixed(2);
    }
};

const checkout = {
    getAddress() {
        return this.address;
    },
    setAddress(street, town, suburb) {
        this.address = {
            street,
            town,
            suburb
        };
    },
    getVoucher() {
        return this.voucher;
    },
    setVoucher(code) {
        this.voucher = code;
    }
};

const functions = {
    ...general,
    ...account,
    ...cart,
    ...checkout,
};

module.exports = function (req) {
    let func = {};
    for (let f in functions) func[f] = functions[f].bind(req.session);
    return Object.assign(req.session, functions);
};