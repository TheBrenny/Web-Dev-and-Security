[[i= partials/header ]]
[[i= partials/navbar ]]

<div class="container center">
    <div class="flex row userDetails">
        <h2>[[account.users_username]]</h2>
        #[[account.users_id]]/[[account.activeLetter]]
        [[?= canEdit ]]
            <a href="/account/[[account.users_id]]/edit" class="btn blue">Edit</a>
        [[?==]]
    </div>
    <hr style="height:2px;">
    [[?= listings.length > 0 ]]
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
                [[c= components/listingrow || item=item link="true" showAddButton="false" ]]
            [[?==]]
        </div>
    [[3=]]
        <p>This user hasn't sold anything before.</p>
    [[?==]]
</div>

<link rel="stylesheet" href="/assets/css/account.css">
<link rel="stylesheet" href="/assets/css/listings.css">
<script src="/assets/js/listings.js"></script>
[[i= partials/footer ]]