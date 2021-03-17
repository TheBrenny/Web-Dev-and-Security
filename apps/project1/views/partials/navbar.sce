<div class="navbar">
    <p class="logo">z5217759</p>
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