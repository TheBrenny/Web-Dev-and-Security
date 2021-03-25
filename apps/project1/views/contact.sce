[[i= partials/header ]]
[[i= partials/navbar ]]

<div class="container" style="width: 100%;flex-flow:row;">
    <div class="container center" style="width:22%;">
        <ul>
            <li><a href="/project1/about">About Us</a></li>
            <li><a href="/project1/contact">Contact Us</a></li>
            <li><a href="/project1/contactinfo">Contact Info</a></li>
            <li><a href="/project1/future">Future Plans</a></li>
            <li><a href="/project1/sponsors">Sponsors</a></li>
            <li><a href="/project1/mission">Mission Statement</a></li>
        </ul>
    </div>
    <div class="container center" style="width:78%;">
        <h1>Contact Us</h1>
        <form enctype="application/json" style="gap:1em;display:flex;flex-flow:column;" method="POST" action="/project1/contact">
            <input type="text" name="name" placeholder="Your Name" value="[[user.name]]">
            <input type="email" name="email" placeholder="Your Email">
            <textarea name="message" style="width:100%;height:10em" placeholder="Your Message"></textarea>
            <input type="submit" value="Submit">
        </form>
    </div>
</div>

[[i= partials/footer ]]