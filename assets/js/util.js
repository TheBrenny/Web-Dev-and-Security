function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

async function wait(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}