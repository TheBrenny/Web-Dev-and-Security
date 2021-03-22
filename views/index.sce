[[i= partials/header ]]

<div class="container center" style="font-size: 2rem;height:100%;">
    <div class="wrapper" style="flex-direction:column;align-items:center;margin-bottom:1em;">
        <h1 style="margin:0;">Welcome!</h1>
        <h6 style="margin:0;">Jarod Brennfleck // z5217759</h6>
    </div>
    <div class="wrapper">
        [[e= app in apps ]]
            <a href="./[[app.slug]]" class="box">[[app.display]]</a>
        [[?==]]
    </div>
</div>

[[i= partials/footer ]]