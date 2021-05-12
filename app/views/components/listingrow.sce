<div class="row
[[?= link == 'true' ]]
    linkedRow
[[?==]]
" target="/listings/[[item.id]]">
    <div class="cell center"><img src="/assets/img/products/[[item.image]]" alt="Preview Image"></div>
    <div class="cell center">[[item.name]]</div>
    <div class="cell center">[[item.description]]</div>
    <div class="cell center">$[[item.cost]]</div>
    <div class="cell center">[[item.seller.name]]</div>
    <div class="cell center" style="width:2em;">
        [[?= showAddButton == "true" ]]
            <div class="btn white" style="padding:0.55rem;" action="addToCart" target="[[item.id]]">Add</div>
        [[?==]]
    </div>
</div>