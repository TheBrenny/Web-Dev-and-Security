[[i= partials/header ]]

<div class="container">
    <div class="wrapper">
        <h1>Welcome!</h1>
    </div>
    <div class="wrapper">
        [[e= app in apps ]]
            <div class="box">
                <a href="./[[app.slug]]">[[app.display]]</a>
            </div>
        [[?==]]
    </div>
</div>

[[i= partials/footer ]]