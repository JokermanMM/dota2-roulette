import { api } from '../utils/api.js';
import { navigateTo } from '../router.js';

export function renderNavbar(currentPath) {
  const nav = document.createElement('nav');
  nav.className = 'navbar';

  nav.innerHTML = `
    <a class="navbar__logo" data-link href="/setup">
      <span class="logo-dota">Dota</span><span class="logo-roulette">Roulette</span> 🎰
    </a>
    <ul class="navbar__links">
      <li>
        <a class="navbar__link ${currentPath === '/setup' ? 'navbar__link--active' : ''}" 
           data-link href="/setup">🎮 Новый ролл</a>
      </li>
      <li>
        <a class="navbar__link ${currentPath === '/history' ? 'navbar__link--active' : ''}" 
           data-link href="/history">📜 История</a>
      </li>
    </ul>
    <div class="navbar__user">
      <button class="navbar__logout" id="logoutBtn">Выйти ↗</button>
    </div>
  `;

  nav.querySelector('#logoutBtn').addEventListener('click', async () => {
    await api.logout();
    navigateTo('/');
  });

  return nav;
}
