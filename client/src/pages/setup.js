import { navigateTo } from '../router.js';
import { ROLES } from '../data/combos.js';
import { currentUsername } from './auth.js';

// Shared state
export const setupState = {
  playerCount: 2,
  players: [],
  mode: 'lane',
  reset() {
    this.playerCount = 2;
    this.players = [];
    this.mode = 'lane';
  }
};

export function renderSetup(container) {
  container.innerHTML = '';

  const page = document.createElement('div');
  page.className = 'setup-page';

  // Auto-fill Player 1 with login username
  if (setupState.players.length === 0 || !setupState.players[0]?.nickname) {
    setupState.players = [];
    for (let i = 0; i < 5; i++) {
      setupState.players.push({ nickname: i === 0 ? currentUsername : '', role: 'auto' });
    }
  }

  page.innerHTML = `
    <h1 class="page__title">Настройка пати</h1>
    <p class="page__subtitle">Выбери количество игроков, укажи ники и роли</p>

    <!-- Step 1: Player Count -->
    <div class="setup-step" style="animation-delay: 0.1s">
      <div class="setup-step__label">
        <span class="setup-step__number">1</span>
        Сколько игроков в пати?
      </div>
      <div class="player-count" id="playerCount">
        ${[1,2,3,4,5].map(n => `
          <button class="player-count__btn ${n === setupState.playerCount ? 'player-count__btn--active' : ''}" 
                  data-count="${n}">${n}</button>
        `).join('')}
      </div>
    </div>

    <!-- Step 2: Player Nicknames & Roles -->
    <div class="setup-step" style="animation-delay: 0.2s">
      <div class="setup-step__label">
        <span class="setup-step__number">2</span>
        Никнеймы и роли
      </div>
      <div class="players-grid" id="playersGrid"></div>
    </div>

    <!-- Step 3: Mode -->
    <div class="setup-step" style="animation-delay: 0.3s">
      <div class="setup-step__label">
        <span class="setup-step__number">3</span>
        Режим подбора героев
      </div>
      <div class="mode-selector" id="modeSelector">
        <div class="mode-card ${setupState.mode === 'lane' ? 'mode-card--active' : ''}" data-mode="lane">
          <span class="mode-card__icon">🛡️</span>
          <div class="mode-card__title">Сильная линия</div>
          <div class="mode-card__desc">Герои с мощной синергией на линии</div>
        </div>
        <div class="mode-card ${setupState.mode === 'fun' ? 'mode-card--active' : ''}" data-mode="fun">
          <span class="mode-card__icon">🎉</span>
          <div class="mode-card__title">Весёлые комбо</div>
          <div class="mode-card__desc">Забавные и сильные связки героев</div>
        </div>
        <div class="mode-card ${setupState.mode === 'meta' ? 'mode-card--active' : ''}" data-mode="meta">
          <span class="mode-card__icon">🏆</span>
          <div class="mode-card__title">На победу</div>
          <div class="mode-card__desc">Метовые герои для максимального импакта</div>
        </div>
      </div>
    </div>

    <!-- Validation message -->
    <div id="validationMsg" style="text-align: center; color: var(--accent-red); font-size: 0.95rem; margin-bottom: var(--space-md); display: none;"></div>

    <!-- GO Button -->
    <div class="spin-btn-container">
      <button class="btn btn--gold btn--large" id="spinBtn">
        🎰 КРУТИТЬ РУЛЕТКУ
      </button>
    </div>
  `;

  container.appendChild(page);

  // Player count selection
  const playerCountEl = page.querySelector('#playerCount');
  const playersGrid = page.querySelector('#playersGrid');

  function updatePlayerRows() {
    playersGrid.innerHTML = '';

    for (let i = 0; i < setupState.playerCount; i++) {
      if (!setupState.players[i]) {
        setupState.players[i] = { nickname: '', role: 'auto' };
      }

      const row = document.createElement('div');
      row.className = 'player-row';
      row.style.animationDelay = `${i * 0.1}s`;

      const isP1 = i === 0;
      row.innerHTML = `
        <div class="player-row__number">P${i + 1}</div>
        <input type="text" class="input-field" placeholder="Никнейм игрока ${i + 1}" 
               value="${setupState.players[i].nickname}" data-idx="${i}" data-field="nickname" 
               maxlength="25" autocomplete="off" ${isP1 ? 'style="border-color: var(--accent-teal); opacity: 0.85;"' : ''} />
        <select class="input-field" data-idx="${i}" data-field="role">
          <option value="auto" ${setupState.players[i].role === 'auto' ? 'selected' : ''}>🎲 Авто</option>
          ${ROLES.map(r => `
            <option value="${r.id}" ${setupState.players[i].role === r.id ? 'selected' : ''}>
              ${r.icon} ${r.nameRu} (${r.name})
            </option>
          `).join('')}
        </select>
      `;

      playersGrid.appendChild(row);
    }

    // Bind inputs
    playersGrid.querySelectorAll('input, select').forEach(el => {
      const handler = () => {
        const idx = parseInt(el.dataset.idx);
        const field = el.dataset.field;
        setupState.players[idx][field] = el.value;
        // Hide validation message when user types
        page.querySelector('#validationMsg').style.display = 'none';
      };
      el.addEventListener('change', handler);
      el.addEventListener('input', handler);
    });
  }

  playerCountEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.player-count__btn');
    if (!btn) return;
    playerCountEl.querySelectorAll('.player-count__btn').forEach(b => b.classList.remove('player-count__btn--active'));
    btn.classList.add('player-count__btn--active');
    setupState.playerCount = parseInt(btn.dataset.count);
    updatePlayerRows();
  });

  updatePlayerRows();

  // Mode selection
  const modeSelector = page.querySelector('#modeSelector');
  modeSelector.addEventListener('click', (e) => {
    const card = e.target.closest('.mode-card');
    if (!card) return;
    modeSelector.querySelectorAll('.mode-card').forEach(c => c.classList.remove('mode-card--active'));
    card.classList.add('mode-card--active');
    setupState.mode = card.dataset.mode;
  });

  // Spin button
  page.querySelector('#spinBtn').addEventListener('click', () => {
    const validationMsg = page.querySelector('#validationMsg');

    // Validate all nicknames are filled
    const emptyNicks = [];
    for (let i = 0; i < setupState.playerCount; i++) {
      if (!setupState.players[i].nickname.trim()) {
        emptyNicks.push(i + 1);
      }
    }

    if (emptyNicks.length > 0) {
      validationMsg.textContent = `⚠️ Введи никнейм для ${emptyNicks.length > 1 ? 'игроков' : 'игрока'} ${emptyNicks.join(', ')} или измени количество игроков!`;
      validationMsg.style.display = 'block';
      validationMsg.style.animation = 'none';
      validationMsg.offsetHeight;
      validationMsg.style.animation = 'fadeSlideUp 0.3s ease';
      // Highlight empty fields
      playersGrid.querySelectorAll('input[data-field="nickname"]').forEach(input => {
        const idx = parseInt(input.dataset.idx);
        if (emptyNicks.includes(idx + 1)) {
          input.style.borderColor = 'var(--accent-red)';
          input.style.boxShadow = '0 0 0 3px var(--accent-red-glow)';
        }
      });
      return;
    }

    // Check for duplicate manual roles
    const manualRoles = setupState.players
      .slice(0, setupState.playerCount)
      .filter(p => p.role !== 'auto')
      .map(p => p.role);
    const uniqueRoles = new Set(manualRoles);
    if (uniqueRoles.size !== manualRoles.length) {
      validationMsg.textContent = '⚠️ Два игрока не могут играть на одной и той же роли!';
      validationMsg.style.display = 'block';
      return;
    }

    navigateTo('/roulette');
  });
}
