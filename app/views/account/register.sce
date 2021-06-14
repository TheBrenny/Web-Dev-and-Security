[[i= partials/header ]]
[[i= partials/navbar ]]

<div class="container center">
    <form enctype="application/json" class="loginBox displayBox" method="POST" action="/register" style="width: 800px;">
        <h1>Register</h1>
        <input type="text" name="username" placeholder="Username" required />
        <hr>
        <input type="password" name="password" placeholder="Password" required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" required />
        <hr>
        <input type="text" name="questions[0]" value="What is your mother's maiden name?" placeholder="Question 1" />
        <input type="text" name="answers[0]" value="" placeholder="Answer 1" />
        <input type="text" name="questions[1]" value="Who was your childhood superhero?" placeholder="Question 2" />
        <input type="text" name="answers[1]" value="" placeholder="Answer 2" />
        <hr>
        <input type="submit" value="Register">
        [[?= badRegister ]]
            <div class="error">
                <p>[[badRegister]]</p>
            </div>
        [[?==]]
    </form>
</div>

<link rel="stylesheet" href="/assets/css/account.css">
<script src="/assets/js/placeholder.js"></script>
[[i= partials/footer ]]