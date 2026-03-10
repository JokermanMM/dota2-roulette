import { rollResults, smartRerollHero } from './roulette.js';
import { navigateTo } from '../router.js';
import { api } from '../utils/api.js';
import { HEROES, getHeroesByRole } from '../data/heroes.js';
import { getRoleById } from '../data/combos.js';
import { createConfetti } from '../components/particles.js';

export async function renderResults(container) {
  container.innerHTML = '';

  if (!rollResults.heroes.length) {
    navigateTo('/setup');
    return;
  }

  createConfetti(document.body);

  const page = document.createElement('div');
  page.className = 'results-page';

  const modeNames = { lane: '🛡️ Сильная линия', fun: '🎉 Весёлые комбо', meta: '🏆 На победу' };

  page.innerHTML = `
    <h1 class="page__title">Ваша команда готова!</h1>
    <p class="page__subtitle">Режим: ${modeNames[rollResults.mode] || rollResults.mode}</p>

    <!-- Combo Summary -->
    <div class="combo-summary glass-card" id="comboSummary">
      <h3 style="font-family: var(--font-display); color: var(--accent-gold); margin-bottom: 8px; font-size: 1.1rem;">
        📋 Стратегия команды
      </h3>
      <p style="color: var(--text-secondary); line-height: 1.6; font-size: 0.95rem;">
        ${rollResults.comboDescription || 'Герои подобраны для вашей пати!'}
      </p>
    </div>

    <div class="results-grid" id="resultsGrid"></div>
    <div class="results-actions" id="resultsActions">
      <button class="btn btn--secondary" id="rerollAllBtn">🔄 Перекрутить всех</button>
      <button class="btn btn--primary" id="saveBtn">💾 Сохранить</button>
      <button class="btn btn--secondary" id="newRollBtn">🎮 Новый ролл</button>
    </div>
  `;

  container.appendChild(page);

  // Add combo summary styles
  const summaryEl = page.querySelector('.combo-summary');
  summaryEl.style.cssText = 'margin-bottom: 24px; padding: 20px; text-align: center; border-left: 3px solid var(--accent-gold);';

  const grid = page.querySelector('#resultsGrid');
  renderHeroCards(grid);

  // Reroll all
  page.querySelector('#rerollAllBtn').addEventListener('click', () => {
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

function renderHeroCards(grid) {
  grid.innerHTML = '';

  rollResults.heroes.forEach((hero, i) => {
    const role = getRoleById(rollResults.roles[i]);
    const recommendedFacet = hero.facets?.find(f => f.recommended) || hero.facets?.[0];
    const otherFacets = hero.facets?.filter(f => f !== recommendedFacet) || [];

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
      
      ${hero.facets && hero.facets.length > 0 ? `
        <div class="result-card__facets">
          <div class="facet-label">⭐ Рекомендуемый аспект:</div>
          <div class="facet-recommended">${recommendedFacet?.name || '—'}</div>
          <div class="facet-desc">${recommendedFacet?.desc || ''}</div>
          ${otherFacets.length > 0 ? `
            <div class="facet-alt">Альт: ${otherFacets.map(f => f.name).join(', ')}</div>
          ` : ''}
        </div>
      ` : ''}

      <div class="result-card__reroll">
        <button class="btn btn--secondary btn--small reroll-one-btn" data-idx="${i}">
          🔄 Перекрутить
        </button>
      </div>
    `;

    grid.appendChild(card);
  });

  // Smart reroll handler
  grid.querySelectorAll('.reroll-one-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.idx);
      const { hero: newHero, comboDesc } = smartRerollHero(
        idx, rollResults.heroes, rollResults.roles, rollResults.mode
      );

      if (newHero) {
        rollResults.heroes[idx] = newHero;

        // Update combo description if we found a new combo
        if (comboDesc) {
          rollResults.comboDescription = comboDesc;
          const summaryP = document.querySelector('#comboSummary p');
          if (summaryP) summaryP.textContent = comboDesc;
        }

        // Re-render this card with animation
        renderHeroCards(grid);
      }
    });
  });
}

// Inject facet styles
if (!document.getElementById('facet-styles')) {
  const style = document.createElement('style');
  style.id = 'facet-styles';
  style.textContent = `
    .result-card__facets {
      margin-top: 12px;
      padding: 12px;
      background: rgba(255, 215, 0, 0.05);
      border: 1px solid rgba(255, 215, 0, 0.15);
      border-radius: 8px;
      text-align: left;
    }
    .facet-label {
      font-family: var(--font-display);
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .facet-recommended {
      font-family: var(--font-display);
      font-size: 1rem;
      font-weight: 700;
      color: var(--accent-gold);
      margin-bottom: 2px;
    }
    .facet-desc {
      font-size: 0.8rem;
      color: var(--text-secondary);
      line-height: 1.4;
      margin-bottom: 4px;
    }
    .facet-alt {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-style: italic;
    }
  `;
  document.head.appendChild(style);
}
