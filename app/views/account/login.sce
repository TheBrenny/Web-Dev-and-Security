[[i= partials/header ]]
[[i= partials/navbar ]]

<div class="container center">
    <form enctype="application/json" class="loginBox displayBox" method="POST" action="/login">
        <h1>Login</h1>
        <input type="text" name="username" required />
        <label for="username">Username</label>
        <input type="password" name="password" required />
        <label for="password">Password</label>
        <input type="submit" value="Login">
        <a href="/register" class="btn white">Register</a>
        [[?= badLogin ]]
            <div class="error">
                <p>Invalid username or password. Try again!</p>
            </div>
        [[?==]]
    </form>
</div>

<link rel="stylesheet" href="/assets/css/account.css">
[[i= partials/footer ]]