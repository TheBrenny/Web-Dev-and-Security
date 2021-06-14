[[i= partials/header ]]
[[i= partials/navbar ]]

<div class="container center">
    <form enctype="application/json" class="loginBox displayBox" method="POST" action="/login">
        <h1>Login</h1>
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <div class="switchBox">
            <input type="checkbox" name="rememberme" class="switch">
            <label for="rememberme">Remember Me</label>
        </div>
        <input type="submit" value="Login">
        <div class="actions flex row">
            <a href="/register" class="btn white">Register</a>
            <a href="/forgot" class="btn white">Forgot Password</a>
        </div>
        [[?= badLogin ]]
            <div class="error">
                <p>[[ badLogin ]]</p>
            </div>
        [[?==]]
    </form>
</div>

<link rel="stylesheet" href="/assets/css/account.css">
<script src="/assets/js/placeholder.js"></script>
<script src="/assets/js/forgot.js"></script>
[[i= partials/footer ]]