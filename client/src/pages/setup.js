import { navigateTo } from '../router.js';
import { ROLES } from '../data/combos.js';

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
    // Ensure players array matches count
    while (setupState.players.length < setupState.playerCount) {
      setupState.players.push({ nickname: '', role: 'auto' });
    }
    setupState.players.length = setupState.playerCount;

    for (let i = 0; i < setupState.playerCount; i++) {
      const row = document.createElement('div');
      row.className = 'player-row';
      row.style.animationDelay = `${i * 0.1}s`;

      row.innerHTML = `
        <div class="player-row__number">P${i + 1}</div>
        <input type="text" class="input-field" placeholder="Никнейм игрока ${i + 1}" 
               value="${setupState.players[i].nickname}" data-idx="${i}" data-field="nickname" 
               maxlength="25" autocomplete="off" />
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
      el.addEventListener('change', () => {
        const idx = parseInt(el.dataset.idx);
        const field = el.dataset.field;
        setupState.players[idx][field] = el.value;
      });
      el.addEventListener('input', () => {
        const idx = parseInt(el.dataset.idx);
        const field = el.dataset.field;
        setupState.players[idx][field] = el.value;
      });
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
    // Validate: at least nicknames filled
    let valid = true;
    for (let i = 0; i < setupState.playerCount; i++) {
      if (!setupState.players[i].nickname.trim()) {
        setupState.players[i].nickname = `Игрок ${i + 1}`;
      }
    }

    // Check for duplicate manual roles
    const manualRoles = setupState.players
      .filter(p => p.role !== 'auto')
      .map(p => p.role);
    const uniqueRoles = new Set(manualRoles);
    if (uniqueRoles.size !== manualRoles.length) {
      alert('Два игрока не могут играть на одной и той же роли!');
      return;
    }

    // Navigate to roulette
    navigateTo('/roulette');
  });
}
