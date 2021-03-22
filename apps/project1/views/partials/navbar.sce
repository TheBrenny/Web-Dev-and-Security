<div class="navbar">
    <img src="/project1/assets/img/logo_small.png" alt="z5217759 // QM" class="logo">
    <nav>
        [[e= navItem in navList ]]
            <a href="/project1[[navItem.slug]]" class="navItem
            [[?= navItem.active ]]
                navActive
            [[?==]]
            ">[[navItem.title]]</a>
        [[?==]]
    </nav>
</div>