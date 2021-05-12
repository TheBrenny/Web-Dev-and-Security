[[i= partials/header ]]
[[i= partials/navbar ]]

<div class="container center">
    <form enctype="application/json" class="loginBox displayBox" method="POST" action="/account/[[user.id]]/edit">
        <h1>Edit Your Account</h1>
        <input type="text" name="username" required value="[[user.name]]" />
        <label for="username">Username</label>
        <input type="password" name="currentPassword" required />
        <label for="currentPassword">Current Password</label>
        <input type="password" name="newPassword" required />
        <label for="newPassword">New Password</label>
        <input type="password" name="confirmPassword" required />
        <label for="confirmPassword">Confirm Password</label>
        <!--
        <div class="switchBox">
            <input type="checkbox" name="active" class="switch"
            [[?= user.active ]]
                checked
            [[?==]]
            >
            <label for="active">Active</label>
        </div>
        -->
        [[?= badLogin ]]
            <div class="error">
                <p>Something went wrong... Try again!</p>
            </div>
        [[?==]]
        <div class="actions flex row">
            <input class="btn" type="submit" value="Update">
            <input class="btn white" type="reset" value="Reset">
            <a class="btn red" href="/account/[[user.id]]">Cancel</a>
        </div>
    </form>
</div>

<link rel="stylesheet" href="/assets/css/account.css">
[[i= partials/footer ]]