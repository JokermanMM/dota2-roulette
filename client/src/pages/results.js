import { rollResults } from './roulette.js';
import { setupState } from './setup.js';
import { navigateTo } from '../router.js';
import { api } from '../utils/api.js';
import { HEROES, getHeroesByRole } from '../data/heroes.js';
import { ROLES, getRoleById, META_PICKS, LANE_COMBOS, FUN_COMBOS } from '../data/combos.js';
import { createConfetti } from '../components/particles.js';
import { HeroSpinner } from '../components/spinner.js';

export async function renderResults(container) {
  container.innerHTML = '';

  if (!rollResults.heroes.length) {
    navigateTo('/setup');
    return;
  }

  // Confetti celebration
  createConfetti(document.body);

  const page = document.createElement('div');
  page.className = 'results-page';

  const modeNames = { lane: '🛡️ Сильная линия', fun: '🎉 Весёлые комбо', meta: '🏆 На победу' };

  page.innerHTML = `
    <h1 class="page__title">Ваша команда готова!</h1>
    <p class="page__subtitle">Режим: ${modeNames[rollResults.mode] || rollResults.mode}</p>
    <div class="results-grid" id="resultsGrid"></div>
    <div class="results-actions" id="resultsActions">
      <button class="btn btn--secondary" id="rerollAllBtn">🔄 Перекрутить всех</button>
      <button class="btn btn--primary" id="saveBtn">💾 Сохранить</button>
      <button class="btn btn--secondary" id="newRollBtn">🎮 Новый ролл</button>
    </div>
  `;

  container.appendChild(page);

  const grid = page.querySelector('#resultsGrid');

  // Render hero cards
  rollResults.heroes.forEach((hero, i) => {
    const role = getRoleById(rollResults.roles[i]);
    const card = document.createElement('div');
    card.className = 'result-card glass-card';
    card.style.animationDelay = `${i * 0.15}s`;

    card.innerHTML = `
      <div class="result-card__player">Игрок ${i + 1}</div>
      <div class="result-card__nickname">${rollResults.players[i]}</div>
      <img class="result-card__hero-img" src="${hero.img}" alt="${hero.locName}" 
           onerror="this.style.background='var(--bg-secondary)'" />
      <div class="result-card__hero-name">${hero.locName}</div>
      <div class="result-card__role">${role?.icon || '🎲'} ${role?.nameRu || rollResults.roles[i]}</div>
      <div class="result-card__reroll">
        <button class="btn btn--secondary btn--small reroll-one-btn" data-idx="${i}">
          🔄 Перекрутить
        </button>
      </div>
    `;

    grid.appendChild(card);
  });

  // Single hero reroll
  grid.querySelectorAll('.reroll-one-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const idx = parseInt(e.target.dataset.idx);
      const role = rollResults.roles[idx];
      const usedNames = rollResults.heroes.map(h => h.name);
      
      const candidates = getHeroesByRole(role).filter(h => !usedNames.includes(h.name));
      if (candidates.length === 0) return;
      
      const newHero = candidates[Math.floor(Math.random() * candidates.length)];
      rollResults.heroes[idx] = newHero;

      // Animate the card
      const card = grid.children[idx];
      card.style.animation = 'none';
      card.offsetHeight; // trigger reflow
      card.style.animation = 'scaleIn 0.4s ease';

      const img = card.querySelector('.result-card__hero-img');
      const name = card.querySelector('.result-card__hero-name');
      img.src = newHero.img;
      img.alt = newHero.locName;
      name.textContent = newHero.locName;
    });
  });

  // Reroll all
  page.querySelector('#rerollAllBtn').addEventListener('click', () => {
    // Go back to roulette with same settings
    navigateTo('/roulette');
  });

  // Save
  page.querySelector('#saveBtn').addEventListener('click', async (e) => {
    const btn = e.target;
    btn.disabled = true;
    btn.textContent = '⏳ Сохранение...';

    try {
      await api.saveRoll(
        rollResults.players,
        rollResults.roles,
        rollResults.heroes.map(h => ({ name: h.name, locName: h.locName, img: h.img })),
        rollResults.mode
      );
      btn.textContent = '✅ Сохранено!';
      btn.classList.remove('btn--primary');
      btn.classList.add('btn--secondary');
    } catch (err) {
      btn.disabled = false;
      btn.textContent = '💾 Сохранить';
      alert('Ошибка сохранения: ' + err.message);
    }
  });

  // New roll
  page.querySelector('#newRollBtn').addEventListener('click', () => {
    navigateTo('/setup');
  });
}
