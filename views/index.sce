[[i= partials/header ]]

<div class="container" style="font-size: 2rem;">
    <div class="wrapper">
        <h1>Welcome!</h1>
    </div>
    <div class="wrapper">
        [[e= app in apps ]]
            <a href="./[[app.slug]]" class="box">[[app.display]]</a>
        [[?==]]
    </div>
</div>

[[i= partials/footer ]]