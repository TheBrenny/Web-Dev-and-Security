document.onreadystatechange = function (ev) {
    const searchBar = $(`[name="search"]`);
    const searchButton = $(`[name="search"]+.btn`);
    if(!!searchButton) searchButton.addEventListener('click', function (_e) {
        document.location.pathname = "/project1/listings/search/" + searchBar.value;
    });

    const addButtons = $$(`.btn[action="addToCart"]`);
    addButtons.forEach((btn) => btn.addEventListener("click", addToCart));
    const removeButtons = $$(`.btn[action="removeFromCart"]`);
    removeButtons.forEach((btn) => btn.addEventListener("click", removeFromCart));
};

function addToCart(event) {
    return modifyCart(event, "Add");
}

function removeFromCart(event) {
    return modifyCart(event, "Remove");
}

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
        .catch(() => {
            event.target.textContent = "❌";
        })
        .then(() => wait(3000))
        .then(() => event.target.classList.remove("loading"))
        .then(() => event.target.textContent = modName);
}