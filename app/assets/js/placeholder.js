(() => {
    let inputs = $$('input[placeholder]');
    inputs.forEach((e) => {
        let label = document.createElement("label");
        label.setAttribute("for", e.name);
        label.textContent = e.placeholder;
        if(e.value == "") label.classList.add("placeholder");
        e.placeholder = "";
        e.insertAdjacentElement("afterend", label);

        e.addEventListener("input", (e) => {
            if (e.target.value == "") label.classList.add("placeholder");
            else label.classList.remove("placeholder");
        });
    });
})();