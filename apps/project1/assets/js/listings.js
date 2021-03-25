document.onreadystatechange = function (ev) {
    const searchBar = $(`[name="search"]`);
    const searchButton = $(`[name="search"]+.btn`);
    if (!!searchButton) searchButton.addEventListener('click', function (_e) {
        document.location.pathname = "/project1/listings/search/" + searchBar.value;
    });

    const addButtons = $$(`.btn[action="addToCart"]`);
    addButtons.forEach((btn) => btn.addEventListener("click", (e) => modifyCart(e, "Add")));
    const removeButtons = $$(`.btn[action="removeFromCart"]`);
    removeButtons.forEach((btn) => btn.addEventListener("click", (e) => modifyCart(e, "Remove")));

    const shipping = $(`.btn[action="shipping"]`);
    if (!!shipping) shipping.addEventListener('click', function (_e) {
        document.location.pathname = "/project1/cart/shipping";
    });
    const checkout = $(`.btn[action="processCheckout"]`);
    if (!!checkout) checkout.addEventListener('click', processCheckout);
};

function modifyCart(event, modName) {
    if (event.target.classList.contains("loading")) return false;
    let data = {
        target: event.target.getAttribute("target")
    };
    Promise.resolve()
        .then(() => event.target.classList.add("loading"))
        .then(() => fetch("/project1/cart/" + modName.toLowerCase(), {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }))
        .then(res => res.json())
        .then(json => {
            console.log(json);
            if (json.success) {
                event.target.textContent = "✔";
            }
        })
        .catch(() => event.target.textContent = "❌")
        .then(() => wait(3000))
        .then(() => event.target.classList.remove("loading"))
        .then(() => event.target.textContent = modName);
}

function processCheckout(event) {
    if (event.target.classList.contains("loading")) return false;
    let data = {
        process: true
    };
    Promise.resolve()
        .then(() => event.target.classList.add("loading"))
        .then(() => fetch("/project1/cart/checkout", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }))
        .then(res => res.json())
        .then(json => {
            console.log(json);
            if (json.success) {
                event.target.context = "✔";
                wait(3000).then(() => document.location.href = "/project1");
            }
        })
        .catch(() => event.target.textContent = "❌")
        .then(() => wait(3000))
        .then(() => event.target.classList.remove("loading"))
        .then(() => event.target.textContent = "Proceed 💸");
}