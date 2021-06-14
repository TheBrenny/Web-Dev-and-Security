[[i= partials/header ]]
[[i= partials/navbar ]]

<div class="container center">
    <form enctype="application/json" class="loginBox displayBox" method="POST" action="/account/[[user.id]]/edit" style="width: 800px;">
        <h1>Edit Your Account</h1>
        <input type="text" name="username" value="[[user.name]]" required placeholder="Username" />
        <input type="password" name="currentPassword" required placeholder="Current Password" />
        <hr>
        <input type="password" name="newPassword" placeholder="New Password" />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" />
        <hr>
        <input type="text" name="questions[0]" value="[[questions.0]]" placeholder="Question 1" />
        <input type="text" name="answers[0]" value="" placeholder="Answer 1" />
        <input type="text" name="questions[1]" value="[[questions.1]]" placeholder="Question 2" />
        <input type="text" name="answers[1]" value="" placeholder="Answer 2" />
        <hr>
        <div class="actions flex row">
            <input class="btn" type="submit" value="Update">
            <input class="btn white" type="reset" value="Reset">
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