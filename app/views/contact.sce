[[i= partials/header ]]
[[i= partials/navbar ]]

<div class="container" style="width: 100%;flex-flow:row;">
    <div class="container center" style="width:22%;">
        <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/contactinfo">Contact Info</a></li>
            <li><a href="/future">Future Plans</a></li>
            <li><a href="/sponsors">Sponsors</a></li>
            <li><a href="/mission">Mission Statement</a></li>
        </ul>
    </div>
    <div class="container center" style="width:78%;">
        <h1>Contact Us</h1>
        <form enctype="application/json" style="gap:1em;display:flex;flex-flow:column;" method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your Name" value="[[user.name]]">
            <input type="email" name="email" placeholder="Your Email">
            <textarea name="message" style="width:100%;height:10em" placeholder="Your Message"></textarea>
            <input type="submit" value="Submit">
        </form>
    </div>
</div>

[[i= partials/footer ]]