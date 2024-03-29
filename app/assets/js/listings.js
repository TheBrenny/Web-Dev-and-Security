document.onreadystatechange = function (ev) {
    const searchBar = $(`[name="search"]`);
    const searchButton = $(`[name="search"]+.btn`);
    if (!!searchButton) searchButton.addEventListener('click', function (_e) {
        document.location.pathname = "/listings/search/" + searchBar.value;
    });

    const rows = $$(`.row.linkedRow`);
    rows.forEach((r) => r.addEventListener('click', (_e) => document.location.href = r.getAttribute("target")));

    const addButtons = $$(`.btn[action="addToCart"]`);
    addButtons.forEach((btn) => btn.addEventListener("click", (e) => (e.stopPropagation(), modifyCart(e, "Add"))));

    const removeButtons = $$(`.btn[action="removeFromCart"]`);
    removeButtons.forEach((btn) => btn.addEventListener("click", (e) => modifyCart(e, "Remove")));

    const shipping = $(`.btn[action="shipping"]`);
    if (!!shipping) shipping.addEventListener('click', function (_e) {
        document.location.pathname = "/cart/shipping";
    });

    const checkout = $(`.btn[action="processCheckout"]`);
    if (!!checkout) checkout.addEventListener('click', processCheckout);

    const sell = $(`.btn[action="sellProduct"]`);
    if (!!sell) sell.addEventListener('click', sellProduct);

    const comment = $(`.btn[action="postComment"]`);
    if (!!comment) comment.addEventListener('click', postComment);
};

function modifyCart(event, modName) {
    if (event.target.classList.contains("loading")) return false;
    let data = {
        target: event.target.getAttribute("target")
    };
    Promise.resolve()
        .then(() => event.target.classList.add("loading"))
        .then(() => fetch("/cart/" + modName.toLowerCase(), {
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
                let cartSize = $(`[target="cartSize"]`);
                let cartCost = $(`[target="cartCost"]`);
                if (!!cartSize) cartSize.textContent = json.cartSize;
                if (!!cartCost) cartCost.textContent = json.cartCost;
                event.target.textContent = "✔";
            } else {
                throw new Error(json.message);
            }
        })
        .then(() => wait(1000))
        .then(() => {
            return new Promise((resolve) => {
                if (modName !== "Remove") resolve();

                let t = event.target;
                t.opacity = 1;

                const fadeOut = () => {
                    t.opacity -= 0.05;
                    if (t.opacity <= 0) {
                        t.opacity = 0;

                        resolve();
                    } else {
                        requestAnimationFrame(fadeOut);
                    }
                };
                requestAnimationFrame(fadeOut);
            });
        })
        .then(() => {
            if (modName !== "Remove") return;
            let row = event.target.parentNode.parentNode;
            row.parentNode.removeChild(row);
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
        .then(() => fetch("/cart/checkout", {
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
                wait(3000).then(() => document.location.href = "/");
            }
        })
        .catch(() => event.target.textContent = "❌")
        .then(() => wait(3000))
        .then(() => event.target.classList.remove("loading"))
        .then(() => event.target.textContent = "Proceed 💸");
}

function sellProduct(event) {
    let name = $(`[name="name"]`).value;
    let cost = $(`[name="cost"]`).value;
    let description = $(`[name="description"]`).value;

    let json = {
        name,
        cost,
        description,
    };

    Promise.resolve()
        .then(() => event.target.classList.add("loading"))
        .then(() => {
            if ([name, cost, description].includes("")) throw new Error("All fields are required.");
        })
        .then(() => fetch("/sell", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }))
        .then(res => res.json())
        .then((json) => {
            console.log(json);
            if (json.success) {
                document.location.pathname = "/listings/" + json.message;
            } else {
                throw new Error(json.message);
            }
        })
        .catch(async (e) => {
            console.log(e);
            let r = event.target.textContent;
            event.target.classList.remove("loading");
            event.target.textContent = "❌";
            await wait(3000);
            event.target.textContent = r;
        });
}

function postComment(event) {
    let commentBox = $(`[name="commentBox"]`);
    let comment = commentBox.value;
    commentBox.value = "";

    let id = event.target.getAttribute("target");
    let r = event.target.textContent;

    Promise.resolve()
        .then(() => event.target.classList.add("loading"))
        .then(() => {
            if ([comment].includes("")) throw new Error("Comment is required.");
        })
        .then(() => fetch(`/listings/${id}/comment`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment
            })
        }))
        .then(res => res.json())
        .then(json => {
            console.log(json);
            if (json.success) {
                event.target.textContent = "✔";
                scetchInsert($(".comments > div:last-of-type"), "beforeBegin", scetch.comment, {
                    comment: json.message
                });
            } else {
                throw new Error(json.message);
            }
        })
        .then(() => wait(1000))
        .then(() => {
            event.target.textContent = r;
        })
        .then(() => {})
        .catch(async (e) => {
            console.error(e);
            event.target.classList.remove("loading");
            event.target.textContent = "❌";
            await wait(3000);
            event.target.textContent = r;
        });
}