[[i= partials/header ]]
[[i= partials/navbar ]]

<div class="container center">
    <form enctype="application/json" class="loginBox displayBox" method="POST" action="/register">
        <h1>Register</h1>
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <input type="submit" value="Register">
        [[?= badRegister ]]
            <div class="error">
                <p>Username already in use. Try again!</p>
            </div>
        [[?==]]
    </form>
</div>

<link rel="stylesheet" href="/assets/css/account.css">
<script src="/assets/js/placeholder.js"></script>
[[i= partials/footer ]]