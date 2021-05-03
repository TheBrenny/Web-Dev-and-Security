[[i= partials/header ]]
[[i= partials/navbar ]]

<div class="container" style="width: 100%;flex-flow:row;">
    [[i= static/sidebar ]]
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