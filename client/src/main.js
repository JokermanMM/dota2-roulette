import { router, navigateTo } from './router.js';
import './styles/index.css';

window.addEventListener('DOMContentLoaded', () => {
  router();
});

window.addEventListener('popstate', () => {
  router();
});

document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-link]');
  if (link) {
    e.preventDefault();
    navigateTo(link.href);
  }
});
