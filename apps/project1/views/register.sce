[[i= partials/header ]]
[[i= partials/navbar ]]

<div class="container center">
    <form enctype="application/json" class="loginBox displayBox" method="POST" action="/project1/register">
        <h1>Register</h1>
        <input type="text" name="username" required />
        <label for="username">Username</label>
        <input type="password" name="password" required />
        <label for="password">Password</label>
        <input type="submit" value="Register">
        [[?= badRegister ]]
            <div class="error">
                <p>Username already in use. Try again!</p>
            </div>
        [[?==]]
    </form>
</div>

[[i= partials/footer ]]