[[i= partials/header ]]
[[i= partials/navbar ]]

<div class="container center">
    [[?= user.authed ]]
        <h1 style="text-align:center;">[[user.name]]'s Shipping Details</h1>
    [[3=]]
        <h1 style="text-align:center;">Your Shipping Details</h1>
    [[?==]]
    <hr style="margin:2em;height:2px;">
    <form enctype="application/json" class="loginBox displayBox" method="POST" action="/cart/payment" style="margin-bottom:1em;">
        <input type="text" name="voucher" required />
        <label for="voucher">Voucher Code</label>
        <input type="submit" value="Submit // Checkout ▶">
        <small style="text-align:center;"><i>Psst! Any voucher code will work! Type whatever you want!</i></small>
    </form>
    <!--<div class="btn flexEnd" action="payment">Payment ▶</div>-->
</div>

<link rel="stylesheet" href="/assets/css/listings.css">
<script src="/assets/js/listings.js"></script>
[[i= partials/footer ]]