import Main from "./pages/main.js";
import Cart from "./pages/cart.js";
import SignIn from "./pages/signin.js";
import Render404 from "./pages/render404.js";

const routes = {
  "/": Main,
  "/cart": Cart,
  "/signin": SignIn,
};

export default function route() {
  const path = location.hash.replace("#", "") || "/";
  const route = routes[path];
  const app = document.getElementById("app");

  if (route) {
    app.innerHTML = "";
    route();
  } else {
    Render404();
  }
}
