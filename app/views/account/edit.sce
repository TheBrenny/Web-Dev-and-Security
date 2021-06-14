[[i= partials/header ]]
[[i= partials/navbar ]]

<div class="container center">
    <form enctype="application/json" class="loginBox displayBox" method="POST" action="/account/[[user.id]]/edit">
        <h1>Edit Your Account</h1>
        <input type="text" name="username" value="[[user.name]]" required placeholder="Username" />
        <input type="password" name="currentPassword" required placeholder="Current Password" />
        <input type="password" name="newPassword" placeholder="New Password" />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" />
        <div class="actions flex row">
            <input class="btn" type="submit" value="Update">
            <input class="btn white" type="reset" value="Reset">
            <a class="btn red" href="/account/[[user.id]]">Cancel</a>
        </div>
    </form>
</div>

<link rel="stylesheet" href="/assets/css/account.css">
<script src="/assets/js/placeholder.js"></script>
[[i= partials/footer ]]