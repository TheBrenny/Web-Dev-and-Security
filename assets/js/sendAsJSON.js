function onSubmit(f) {
    f.preventDefault();

    const opts = {
        method: this.method,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(Object.fromEntries(new FormData(this).entries()))
    };

    fetch(this.action, opts)
        .then(async res => {
            console[res.ok ? "log" : "error"](await res.json());
            return res;
        });
}

$$("form").forEach(f => {
    f.onsubmit = onSubmit;
});