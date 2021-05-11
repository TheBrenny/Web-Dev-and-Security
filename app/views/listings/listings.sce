[[i= partials/header ]]
[[i= partials/navbar ]]

<div class="container center">
    <div class="search">
        <input placeholder="Search" type="text" name="search" value="[[search]]">
        <div class="btn">Search</div>
    </div>
    <hr style="margin:2em;height:2px;">
    [[?= listings.length == 0 ]]
        <p>It seems that you're looking for something that's already been bought, or is not yet up for sale. Check back later, or try a different search term.</p>
    [[3=]]
    <div id="listingTable" class="table">
        <div class="row head">
            <div class="cell center">Preview</div>
            <div class="cell center">Name</div>
            <div class="cell center">Description</div>
            <div class="cell center">Cost</div>
            <div class="cell center">Seller</div>
            <div class="cell center" style="width:2em;">Add</div>
        </div>
        [[e= item in listings ]]
            <div class="row">
                <div class="cell center"><img src="/assets/img/products/[[item.image]]" alt="Preview Image"></div>
                <div class="cell center">[[item.name]]</div>
                <div class="cell center">[[item.description]]</div>
                <div class="cell center">$[[item.cost]]</div>
                <div class="cell center">[[item.seller.name]]</div>
                <div class="cell center" style="width:2em;">
                    <div class="btn white" style="padding:0.55rem;" action="addToCart" target="[[item.id]]">Add</div>
                </div>
            </div>
        [[?==]]
    </div>
    [[?==]]
</div>

<link rel="stylesheet" href="/assets/css/listings.css">
<script src="/assets/js/listings.js"></script>
[[i= partials/footer ]]