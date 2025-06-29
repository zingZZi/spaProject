
import Main from './pages/main.js';
import Cart from './pages/cart.js';
import SignIn from './pages/signin.js';
const routes = {
  '/' : Main,
  '/cart' : Cart,
  '/signin' : SignIn,
};

export default async function router() {
  const app = document.getElementById('app');
  const path = location.hash.replace('#', '') || '/';

  if (path.startsWith('/product/')) {
    const id = path.split('/')[2];
    await ProductDetailPage(id);
    return;
  }

  const renderPage = routes[path];

   if (renderPage) {
    app.innerHTML = '';
    await renderPage();
  } else {
    app.innerHTML = '';
    app.appendChild(NotFoundPage());
  }
}