import { api } from '../utils/api.js';
import { navigateTo } from '../router.js';
import { createParticles } from '../components/particles.js';

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

  let selectedProvider = 'steam';

  card.innerHTML = `
    <div class="auth-card__logo">
      <span class="logo-dota">Dota</span><span class="logo-roulette">Roulette</span>
    </div>
    <p class="auth-card__tagline">🎰 Крути рулетку — выбирай героев для пати!</p>

    <div class="auth-card__form">
      <div class="auth-providers" id="providers">
        <button class="auth-provider-btn auth-provider-btn--active" data-provider="steam">
          <span class="provider-icon">🎮</span> Steam
        </button>
        <button class="auth-provider-btn" data-provider="discord">
          <span class="provider-icon">💬</span> Discord
        </button>
        <button class="auth-provider-btn" data-provider="telegram">
          <span class="provider-icon">✈️</span> Telegram
        </button>
        <button class="auth-provider-btn" data-provider="dotabuff">
          <span class="provider-icon">📊</span> Dotabuff
        </button>
      </div>

      <input type="text" class="input-field" id="usernameInput" 
             placeholder="Введи свой никнейм..." maxlength="30" autocomplete="off" />
      
      <button class="btn btn--primary btn--large" id="loginBtn">
        ⚡ Войти и крутить
      </button>
    </div>

    <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: var(--space-md);">
      Демо-режим: просто введи никнейм и выбери провайдер
    </p>
  `;

  container.appendChild(card);

  // Provider selection
  const providers = card.querySelector('#providers');
  providers.addEventListener('click', (e) => {
    const btn = e.target.closest('.auth-provider-btn');
    if (!btn) return;
    providers.querySelectorAll('.auth-provider-btn').forEach(b => b.classList.remove('auth-provider-btn--active'));
    btn.classList.add('auth-provider-btn--active');
    selectedProvider = btn.dataset.provider;
  });

  // Login
  const loginBtn = card.querySelector('#loginBtn');
  const usernameInput = card.querySelector('#usernameInput');

  async function doLogin() {
    const username = usernameInput.value.trim();
    if (username.length < 2) {
      usernameInput.style.borderColor = 'var(--accent-red)';
      usernameInput.focus();
      return;
    }

    loginBtn.disabled = true;
    loginBtn.textContent = '⏳ Подключение...';

    try {
      await api.login(username, selectedProvider);
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
