export default function ProductLists(data) {
  const itemList = document.createDocumentFragment();
  data.forEach(() => {
    let liElem = document.createElement("li");
    liElem.classList.add("product-list");
    liElem.innerHTML = `
      <a href="">
        <div class="img-wrap">
          <img src="" alt="">
        </div>
        <div>
          <p class="product-brand">${data}</p>
          <p class="product-name">제품명</p>
          <p class="product-price"><b>20,000</b>원</p>
        </div>
      </a>
    `;
    itemList.append(liElem);
  });

  return itemList;
}
