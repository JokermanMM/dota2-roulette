import { api } from '../utils/api.js';
import { navigateTo } from '../router.js';
import { createParticles } from '../components/particles.js';

// Store username globally so setup page can use it as Player 1
export let currentUsername = '';

export function renderAuth(container) {
  container.className = 'auth-page';

  // Background particles
  const bg = document.createElement('div');
  bg.className = 'auth-page__bg';
  createParticles(bg, 40);
  container.appendChild(bg);

  // Auth card
  const card = document.createElement('div');
  card.className = 'auth-card glass-card';

  card.innerHTML = `
    <div class="auth-card__logo">
      <span class="logo-dota">Dota</span><span class="logo-roulette">Roulette</span>
    </div>
    <p class="auth-card__tagline">🎰 Крути рулетку — выбирай героев для пати!</p>

    <div class="auth-card__form">
      <input type="text" class="input-field" id="usernameInput" 
             placeholder="Введи свой никнейм..." maxlength="30" autocomplete="off" />
      
      <button class="btn btn--primary btn--large" id="loginBtn">
        ⚡ Войти и крутить
      </button>
    </div>
  `;

  container.appendChild(card);

  // Login
  const loginBtn = card.querySelector('#loginBtn');
  const usernameInput = card.querySelector('#usernameInput');

  async function doLogin() {
    const username = usernameInput.value.trim();
    if (username.length < 2) {
      usernameInput.style.borderColor = 'var(--accent-red)';
      usernameInput.setAttribute('placeholder', 'Минимум 2 символа!');
      usernameInput.focus();
      return;
    }

    loginBtn.disabled = true;
    loginBtn.textContent = '⏳ Подключение...';

    try {
      await api.login(username, 'demo');
      currentUsername = username;
      navigateTo('/setup');
    } catch (err) {
      loginBtn.disabled = false;
      loginBtn.textContent = '⚡ Войти и крутить';
      alert('Ошибка входа: ' + err.message);
    }
  }

  loginBtn.addEventListener('click', doLogin);
  usernameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doLogin();
    usernameInput.style.borderColor = '';
  });

  // Animate card entrance
  card.style.animation = 'scaleIn 0.5s ease';
}
