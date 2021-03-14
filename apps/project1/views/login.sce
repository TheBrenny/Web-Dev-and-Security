[[i= partials/header ]]

<div class="container">
    <form class="loginBox" method="POST" action="/project1/login">
        <h1>Login</h1>
        <input type="text" name="username" required />
        <label for="username">Username</label>
        <input type="password" name="password" required />
        <label for="password">Password</label>
        <input type="submit" value="Login">
        [[?= badLogin ]]
        <p>Invalid username or password. Try again!</p>
        [[?==]]
    </form>
</div>

[[i= partials/footer ]]