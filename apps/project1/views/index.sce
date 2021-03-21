[[i= partials/header ]]
<link rel="stylesheet" href="/project1/assets/css/index.css">

<div class="container" style="align-items: center;">
    <div class="header">
        <img class="logo" src="/project1/assets/img/logo.png" alt="Quick Mark Logo">
    </div>
    <div class="app">
        <div id="welcome" class="homeBlock">
            <h1>Welcome!</h1>
            <hr>
            <div class="flex homeBlockInner" style="flex-flow: column;">
                [[?= user.authed ]]
                    <p>Welcome back, [[ user.name ]]!</p>
                [[3=]]
                    <p>Welcome!</p>
                [[?==]]
                
                <p>Quickly sell your unwanted belongings, and buy your next treasure!</p>
                <div class="flex homeBlockLogin">
                    <a href="/project1/listings" class="btn">Browse</a>
                    <a href="/project1/sell" class="btn">Sell Something</a>
                </div>
                
                <div class="flex homeBlockLogin">
                    [[?= user.authed ]]
                        <a href="/project1/logout" class="btn red">Logout</a>
                    [[3=]]
                        <a href="/project1/login" class="btn">Login</a>
                        <a href="/project1/register" class="btn">Register</a>
                    [[?==]]
                </div>
            </div>
        </div>
        <div id="listings" class="homeBlock">
            <h1>Random Listings</h1>
            <hr>
            <div class="flex homeBlockInner" style="flex-flow: row wrap;">
                [[e= item in listings ]]
                    [[c= components/listing || item=item ]]
                [[?==]]
            </div>
        </div>
    </div>
</div>

[[i= partials/footer ]]