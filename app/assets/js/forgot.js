$('a[href="/forgot"').addEventListener("click", (e) => {
    e.preventDefault();

    let username = $('input[name="username"').value;

    if (username == "") {
        alert("What's the username of the account which you forgot the password for? (Username can't be null!)");
    } else {
        document.location.href = "/forgot/" + username;
    }
});