export default function header() {
  const headerElem = document.createElement("header");
  headerElem.innerHTML = `header`;
  document.getElementById("app").append(headerElem);
}
