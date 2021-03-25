[[i= partials/header ]]
[[i= partials/navbar ]]

<div class="container center">
    [[?= user.authed ]]
        <h1 style="text-align:center;">[[user.name]]'s Shipping Details</h1>
    [[3=]]
        <h1 style="text-align:center;">Your Shipping Details</h1>
    [[?==]]
    <hr style="margin:2em;height:2px;">
    <form enctype="application/json" class="loginBox displayBox" method="POST" action="/project1/cart/shipping" style="margin-bottom:1em;">
        <input type="text" name="street" required />
        <label for="street">Street Address</label>
        <input type="text" name="town" required />
        <label for="town">Town/City</label>
        <input type="text" name="suburb" required />
        <label for="suburb">Suburb</label>
        <input type="submit" value="Submit // Payment ▶">
    </form>
    <!--<div class="btn flexEnd" action="payment">Payment ▶</div>-->
</div>

<link rel="stylesheet" href="/project1/assets/css/listings.css">
<script src="/project1/assets/js/listings.js"></script>
[[i= partials/footer ]]