function onSubmit(f) {
    f.encoding = f.enctype = "application/json";
}

$$("form").forEach(f => {
    f.onsubmit = onSubmit;
});