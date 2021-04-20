<div class="navbar">
    <img src="/assets/img/logo_small.png" alt="z5217759 // QM" class="logo">
    <nav>
        [[e= navItem in navList ]]
            <a href="/[[navItem.slug]]" class="navItem
            [[?= navItem.active ]]
                navActive
            [[?==]]
            ">[[navItem.title]]</a>
        [[?==]]
    </nav>
</div>