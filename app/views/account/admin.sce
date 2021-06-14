[[i= partials/header ]]
[[i= partials/navbar ]]

<div class="container center">
    [[e= user in users ]]
        <form enctype="application/json" class="loginBox displayBox" method="POST" action="/admin/[[user.users_id]]" style="width: 800px; margin-bottom: 2em;">
            <h1>[[user.users_username]]</h1>
            <input type="text" name="username" value="[[user.users_username]]" required placeholder="Username" />
            <input type="password" name="password" placeholder="Change Password" />
            <hr>
            <input type="text" name="questions[0]" value="[[user.users_question1]]" placeholder="Question 1" />
            <input type="text" name="answers[0]" value="" placeholder="Answer 1" />
            <input type="text" name="questions[1]" value="[[user.users_question2]]" placeholder="Question 2" />
            <input type="text" name="answers[1]" value="" placeholder="Answer 2" />
            <hr>
            <div class="actions flex row">
                <input class="btn" type="submit" value="Update">
                <input class="btn white" type="reset" value="Reset">
            </div>
            [[?= badLogin ]]
                <div class="error">
                    <p>[[ badLogin ]]</p>
                </div>
            [[?==]]
        </form>
    [[?==]]
</div>

<link rel="stylesheet" href="/assets/css/account.css">
<script src="/assets/js/placeholder.js"></script>
[[i= partials/footer ]]