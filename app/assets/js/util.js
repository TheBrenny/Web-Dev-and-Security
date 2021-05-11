function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

async function wait(time, v) {
    return new Promise(function (resolve) {
        setTimeout(() => resolve(v), time);
    });
}