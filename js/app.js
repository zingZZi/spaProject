import route from "./router_test.js";

document.addEventListener("DOMContentLoaded", function () {
  route();
});

window.addEventListener("hashchange", function () {
  route();
});
