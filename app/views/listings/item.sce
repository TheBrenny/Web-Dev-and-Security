[[i= partials/header ]]
[[i= partials/navbar ]]

<div class="container" style="width: 100%;flex-flow: column;align-items: stretch;">
    <div class="flex row product">
        <div class="container center productImg">
            <img src="/assets/img/products/[[item.products_image]]" alt="img">
        </div>
        <div class="container center productData" style="width:78%;">
            <h2 name="name">[[item.products_name]]</h2>
            <span>$[[item.products_cost]]</span>
            <!-- <label for="cost">$</label> -->
            <p class="productDescription" name="description">[[item.products_description]]</p>
        </div>
    </div>
    <div class="flex row actions">
        [[?= sold ]]
            <div class="btn red" disabled>Sold to: [[ item.users_username]]</div>
        [[3= ]]
            <div class="btn" action="addToCart" target="[[item.products_id]]">Add to Cart</div>
        [[?==]]
    </div>
    <hr>
    <div class="container comments">
        <h3>Comments</h3>
        [[e= c in comments ]]
            this should be a comment...
        [[?==]]
    </div>
</div>

<link rel="stylesheet" href="/assets/css/listings.css">
<script src="/assets/js/listings.js"></script>
[[i= partials/footer ]]