[[i= partials/header ]]
[[i= partials/navbar ]]

<div class="container center">
    <form enctype="application/json" class="loginBox displayBox" method="POST" action="/forgot" style="width: 800px;">
        <h1>Forgot Password</h1>
        <input type="text" name="username" value="[[username]]" placeholder="Username" required />
        <hr>
        <p style="margin:0">[[ questions.0 ]]</p>
        <input type="text" name="answers[0]" value="" placeholder="Answer" required />
        <hr>
        <p style="margin:0">[[ questions.1 ]]</p>
        <input type="text" name="answers[1]" value="" placeholder="Answer" required />
        <hr>
        <input type="password" name="newPassword" value="" placeholder="New Password" required />
        <input type="password" name="confirmPassword" value="" placeholder="Confirm Password" required />
        <div class="actions flex row">
            <input class="btn" type="submit" value="Recover">
            <a class="btn red" href="/account/[[user.id]]">Cancel</a>
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
[[i= partials/footer ]]