[[i= partials/header ]]
[[i= partials/navbar ]]

<div class="container center">
    [[?= user.authed ]]
        <h1 style="text-align:center;">[[user.name]]'s Cart</h1>
    [[3=]]
        <h1 style="text-align:center;">Your Cart</h1>
    [[?==]]
    <hr style="margin:2em;height:2px;">
    [[?= listings.length == 0 ]]
        <p>It seems you haven't added anything to your cart yet. Check out some items <a href="/listings">here</a>!</p>
    [[3=]]
    <div id="listingTable" class="table">
        <div class="row head">
            <div class="cell center">Preview</div>
            <div class="cell center">Name</div>
            <div class="cell center">Description</div>
            <div class="cell center">Cost</div>
            <div class="cell center">Seller</div>
            <div class="cell center" style="width:4em;">Remove</div>
        </div>
        [[e= item in listings ]]
            <div class="row">
                <div class="cell center"><img src="/assets/img/products/[[item.image]]" alt="Preview Image"></div>
                <div class="cell center">[[item.name]]</div>
                <div class="cell center">[[item.description]]</div>
                <div class="cell center">$[[item.cost]]</div>
                <div class="cell center">[[item.seller.name]]</div>
                <div class="cell center" style="width:4em;">
                    <div class="btn red" style="padding:0.55rem;" action="removeFromCart" target="[[item.id]]">Remove</div>
                </div>
            </div>
        [[?==]]
        <div class="row">
            <span class="cell center">Items: <span target="cartSize">[[cartSize]]</span></span>
        </div>
        <div class="row">
            <span class="cell center">Total Cost: $<span target="cartCost">[[cartCost]]</span></span>
        </div>
    </div>
    <div class="btn flexEnd" action="shipping">Shipping 🚢</div>
    [[?==]]
</div>

<link rel="stylesheet" href="/assets/css/listings.css">
<script src="/assets/js/listings.js"></script>
[[i= partials/footer ]]