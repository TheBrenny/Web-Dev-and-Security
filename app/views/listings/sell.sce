[[i= partials/header ]]
[[i= partials/navbar ]]

<div class="container" style="width: 100%;flex-flow: column;align-items: stretch;">
    <div class="flex row product">
        <div class="container center productImg">
            <img src="/assets/img/products/defaultImage.svg" alt="img">
            <input type="text" name="image" placeholder="defaultImage.svg" disabled />
        </div>
        <div class="container center productData" style="width:78%;">
            <input type="text" name="name" placeholder="Item Name" />
            <span class="costWrapper"><input type="number" name="cost" placeholder="Cost" /></span>
            <!-- <label for="cost">$</label> -->
            <textarea placeholder="Description" class="productDescription" name="description"></textarea>
        </div>
    </div>
    <div class="flex row actions">
        <div class="btn" action="sellProduct">Sell Product</div>
        <div class="btn red" action="cancelSell">Cancel</div>
    </div>
</div>

<link rel="stylesheet" href="/assets/css/listings.css">
<script src="/assets/js/listings.js"></script>
[[i= partials/footer ]]