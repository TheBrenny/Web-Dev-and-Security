const session = require("./session");

function getPageOptions(req, listings) {
    listings = !!listings ? getListings(listings) : [];

    return {
        navList: getNavList(req),
        listings: listings,
        listingCount: listings.length,
        user: session(req).getAccount(),
        cartSize: session(req).getCartSize(),
        cartCost: session(req).getCartCost()
    };
}

function getNavList(req) {
    let isAuthed = session(req).isAuthed();
    let statics = [
        "/about",
        "/about/contact",
        "/about/contactinfo",
        "/about/future",
        "/about/mission",
        "/about/sponsors",
    ];
    let navList = [{
            slug: "/",
            title: "Home",
            active: false
        },
        {
            slug: "/listings",
            title: "Listings",
            active: false
        },
        {
            slug: "/cart",
            title: "Cart",
            active: false
        },
        {
            slug: "/sell",
            title: "Sell",
            active: false
        },
        {
            slug: isAuthed ? "/account" : "/login",
            title: isAuthed ? session(req).name() : "Login",
            active: false
        },
        // {
        //     slug: "/about",
        //     title: "About",
        //     active: false
        // },
    ];

    for (let i in navList) {
        if (navList[i].slug == "/") continue;
        navList[i].active = req.path.startsWith(navList[i].slug);
        if (navList[i].slug == "/about" && statics.includes(req.path)) navList[i].active = true;
    }

    return navList;
}

function getListings(listings) {
    let outListings = [];
    for (let l of listings) {
        outListings.push({
            image: l.products_image,
            name: l.products_name,
            description: l.products_description,
            cost: l.products_cost,
            id: l.products_id,
            seller: {
                name: l.users_username
            }
        });
    }
    return outListings;
}

function getDateString(dateObj) {
    let iso = dateObj.toISOString();
    return iso.substring(0, iso.indexOf('T'));
}

module.exports = {
    getPageOptions,
    getNavList,
    getListings,
    getDateString,
};