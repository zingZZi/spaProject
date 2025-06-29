import header from "../components/header.js";
import Footer from "../components/footer.js";
import ProductLists from "../components/product-lists.js";

let mainBannerElem = null;
let productListElem = null;

function MainContent() {
  const mainElem = document.createElement("main");
  mainElem.append(MainBanner(), productList());

  document.getElementById("app").append(mainElem);
}

function MainBanner() {
  mainBannerElem = document.createElement("section");
  mainBannerElem.classList.add("main-banner");
  mainBannerElem.innerHTML = `
   <h2 class="text-ir">메인베너영역</h2>
   <div class="swiper">메인배너</div>
  `;
  return mainBannerElem;
}

function productList() {
  productListElem = document.createElement("ul");
  productListElem.classList.add("product-lists");
  productListElem.innerHTML = ProductLists([1, 2, 3, 4]);
  return productListElem;
}

export default function Main() {
  header();
  MainContent();
  Footer();
}
