import { renderAuth } from './pages/auth.js';
import { renderSetup } from './pages/setup.js';
import { renderRoulette } from './pages/roulette.js';
import { renderResults } from './pages/results.js';
import { renderHistory } from './pages/history.js';
import { renderNotFound } from './pages/notfound.js';
import { renderNavbar } from './components/navbar.js';
import { api } from './utils/api.js';

const routes = [
  { path: '/', handler: renderAuth },
  { path: '/setup', handler: renderSetup },
  { path: '/roulette', handler: renderRoulette },
  { path: '/results', handler: renderResults },
  { path: '/history', handler: renderHistory },
];

export function navigateTo(url) {
  const path = new URL(url, window.location.origin).pathname;
  history.pushState(null, null, path);
  router();
}

export async function router() {
  const app = document.getElementById('app');
  const path = window.location.pathname;

  const protectedPaths = ['/setup', '/roulette', '/results', '/history'];
  if (protectedPaths.includes(path)) {
    const user = await api.getUser();
    if (!user) {
      navigateTo('/');
      return;
    }
  }

  const route = routes.find(r => r.path === path);

  app.innerHTML = '';

  if (path !== '/' && path !== '/404') {
    const nav = renderNavbar(path);
    app.appendChild(nav);
  }

  const container = document.createElement('main');
  container.className = 'main-content';
  app.appendChild(container);

  if (route) {
    await route.handler(container);
  } else {
    renderNotFound(container);
  }
}
