[[i= partials/header ]]
[[i= partials/navbar ]]

<div class="container">
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
            <div class="btn red" disabled>Sold to: [[item.users_username]]</div>
        [[3= ]]
            <div class="btn" action="addToCart" target="[[item.products_id]]">Add to Cart</div>
        [[?==]]
    </div>
</div>
<hr>
<div class="container comments">
    <h3>Comments</h3>
    [[?= comments.length > 0 ]]
        [[e= comment in comments ]]
            [[c= components/comment || comment=comment ]]
        [[?==]]
    [[3=]]
        <p><i>No comments have been left yet...</i></p>
    [[?==]]
    [[?= user.authed ]]
        <div class="flex" style="gap:1em;">
            <textarea name="commentBox" placeholder="Leave a comment, or ask a question..."></textarea>
            <div class="btn" action="postComment" target="[[item.products_id]]">Post Comment</div>
        </div>
    [[?==]]
</div>
<link rel="stylesheet" href="/assets/css/listings.css">
<script src="/assets/js/listings.js"></script>
[[l= components/comment ]]
[[i= partials/footer ]]