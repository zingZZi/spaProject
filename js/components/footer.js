export default function Footer() {
  const footerElem = document.createElement("footer");
  footerElem.innerHTML = `footer`;
  document.getElementById("app").append(footerElem);
}
