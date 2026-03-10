import { setupState } from './setup.js';
import { navigateTo } from '../router.js';
import { HEROES, getHeroesByRole, getHeroesByTier } from '../data/heroes.js';
import { LANE_COMBOS, FUN_COMBOS, META_PICKS, ROLES, getRoleById } from '../data/combos.js';
import { HeroSpinner } from '../components/spinner.js';

// Store results globally so results page can access them
export const rollResults = {
  players: [],
  roles: [],
  heroes: [],
  mode: ''
};

function assignRoles(players) {
  const allRoles = ROLES.map(r => r.id);
  const assigned = [];
  const takenRoles = [];

  // First pass: assign manual roles
  players.forEach((p, i) => {
    if (p.role !== 'auto') {
      assigned[i] = p.role;
      takenRoles.push(p.role);
    }
  });

  // Second pass: auto-assign remaining roles
  const availableRoles = allRoles.filter(r => !takenRoles.includes(r));
  const shuffledAvailable = [...availableRoles].sort(() => Math.random() - 0.5);

  let autoIdx = 0;
  players.forEach((p, i) => {
    if (p.role === 'auto') {
      assigned[i] = shuffledAvailable[autoIdx] || allRoles[Math.floor(Math.random() * allRoles.length)];
      autoIdx++;
    }
  });

  return assigned;
}

function selectHeroes(roles, mode) {
  const chosen = [];

  if (mode === 'lane') {
    return selectLaneHeroes(roles, chosen);
  } else if (mode === 'fun') {
    return selectFunHeroes(roles, chosen);
  } else {
    return selectMetaHeroes(roles, chosen);
  }
}

function selectLaneHeroes(roles) {
  const chosen = [];
  const usedHeroes = new Set();

  // Try to find lane combos that match assigned roles
  for (let i = 0; i < roles.length; i++) {
    if (chosen[i]) continue;

    const role = roles[i];
    // Look for a combo partner
    for (let j = i + 1; j < roles.length; j++) {
      if (chosen[j]) continue;

      const combo = LANE_COMBOS.find(c => {
        const h0 = HEROES.find(h => h.name === c.heroes[0]);
        const h1 = HEROES.find(h => h.name === c.heroes[1]);
        if (!h0 || !h1) return false;
        if (usedHeroes.has(h0.name) || usedHeroes.has(h1.name)) return false;

        return (h0.roles.includes(role) && h1.roles.includes(roles[j])) ||
               (h1.roles.includes(role) && h0.roles.includes(roles[j]));
      });

      if (combo) {
        const h0 = HEROES.find(h => h.name === combo.heroes[0]);
        const h1 = HEROES.find(h => h.name === combo.heroes[1]);

        if (h0.roles.includes(role)) {
          chosen[i] = h0;
          chosen[j] = h1;
        } else {
          chosen[i] = h1;
          chosen[j] = h0;
        }
        usedHeroes.add(h0.name);
        usedHeroes.add(h1.name);
        break;
      }
    }
  }

  // Fill remaining with role-appropriate heroes
  for (let i = 0; i < roles.length; i++) {
    if (!chosen[i]) {
      const candidates = getHeroesByRole(roles[i]).filter(h => !usedHeroes.has(h.name));
      if (candidates.length > 0) {
        const pick = candidates[Math.floor(Math.random() * candidates.length)];
        chosen[i] = pick;
        usedHeroes.add(pick.name);
      } else {
        // Fallback: any hero
        const fallback = HEROES.filter(h => !usedHeroes.has(h.name));
        const pick = fallback[Math.floor(Math.random() * fallback.length)];
        chosen[i] = pick;
        usedHeroes.add(pick.name);
      }
    }
  }

  return chosen;
}

function selectFunHeroes(roles) {
  const chosen = [];
  const usedHeroes = new Set();

  // Try to match fun combos
  for (let i = 0; i < roles.length; i++) {
    if (chosen[i]) continue;

    for (let j = i + 1; j < roles.length; j++) {
      if (chosen[j]) continue;

      const combo = FUN_COMBOS.find(c => {
        const h0 = HEROES.find(h => h.name === c.heroes[0]);
        const h1 = HEROES.find(h => h.name === c.heroes[1]);
        if (!h0 || !h1) return false;
        if (usedHeroes.has(h0.name) || usedHeroes.has(h1.name)) return false;

        return (h0.roles.includes(roles[i]) && h1.roles.includes(roles[j])) ||
               (h1.roles.includes(roles[i]) && h0.roles.includes(roles[j]));
      });

      if (combo) {
        const h0 = HEROES.find(h => h.name === combo.heroes[0]);
        const h1 = HEROES.find(h => h.name === combo.heroes[1]);

        if (h0.roles.includes(roles[i])) {
          chosen[i] = h0;
          chosen[j] = h1;
        } else {
          chosen[i] = h1;
          chosen[j] = h0;
        }
        usedHeroes.add(h0.name);
        usedHeroes.add(h1.name);
        break;
      }
    }
  }

  // Fill remaining with random picks from role pool
  for (let i = 0; i < roles.length; i++) {
    if (!chosen[i]) {
      const candidates = getHeroesByRole(roles[i]).filter(h => !usedHeroes.has(h.name));
      const shuffled = [...candidates].sort(() => Math.random() - 0.5);
      const pick = shuffled[0] || HEROES.filter(h => !usedHeroes.has(h.name))[0];
      chosen[i] = pick;
      usedHeroes.add(pick.name);
    }
  }

  return chosen;
}

function selectMetaHeroes(roles) {
  const chosen = [];
  const usedHeroes = new Set();

  for (let i = 0; i < roles.length; i++) {
    const role = roles[i];
    const metaPool = META_PICKS[role] || META_PICKS.support;
    const available = metaPool.filter(m => !usedHeroes.has(m.name));

    if (available.length > 0) {
      // Weighted random: S tier heroes 3x more likely
      const weighted = [];
      available.forEach(m => {
        const weight = m.tier === 'S' ? 3 : 1;
        for (let w = 0; w < weight; w++) weighted.push(m);
      });
      const pick = weighted[Math.floor(Math.random() * weighted.length)];
      const hero = HEROES.find(h => h.name === pick.name);
      chosen[i] = hero;
      usedHeroes.add(pick.name);
    } else {
      // Fallback to role heroes with high tier
      const candidates = getHeroesByRole(role)
        .filter(h => !usedHeroes.has(h.name) && ['S', 'A'].includes(h.tier));
      const fallback = candidates.length > 0 ? candidates : getHeroesByRole(role).filter(h => !usedHeroes.has(h.name));
      const pick = fallback[Math.floor(Math.random() * fallback.length)] || HEROES.filter(h => !usedHeroes.has(h.name))[0];
      chosen[i] = pick;
      usedHeroes.add(pick.name);
    }
  }

  return chosen;
}

export async function renderRoulette(container) {
  container.innerHTML = '';

  // Ensure we have setup data
  if (!setupState.players.length) {
    navigateTo('/setup');
    return;
  }

  const page = document.createElement('div');
  page.className = 'roulette-page';
  container.appendChild(page);

  // Calculate roles and heroes
  const roles = assignRoles(setupState.players);
  const heroes = selectHeroes(roles, setupState.mode);

  // Save to results
  rollResults.players = setupState.players.map(p => p.nickname);
  rollResults.roles = roles;
  rollResults.heroes = heroes;
  rollResults.mode = setupState.mode;

  // Sequential spin animation
  for (let i = 0; i < setupState.playerCount; i++) {
    await spinForPlayer(page, i, setupState.players[i].nickname, roles[i], heroes[i]);
  }

  // All done — show summary and navigate
  page.innerHTML = `
    <div class="roulette-complete-card glass-card" style="animation: scaleIn 0.5s ease">
      <h2 style="font-family: var(--font-display); color: var(--accent-gold); font-size: 2rem;">
        ✅ Все герои выбраны!
      </h2>
      <p style="color: var(--text-secondary); margin: var(--space-md) 0 var(--space-xl);">
        Переходим к результатам...
      </p>
    </div>
  `;

  setTimeout(() => navigateTo('/results'), 1500);
}

function spinForPlayer(page, index, nickname, role, hero) {
  return new Promise(resolve => {
    page.innerHTML = '';

    const roleInfo = getRoleById(role);

    const label = document.createElement('div');
    label.className = 'roulette-player-label';
    label.textContent = `🎮 ${nickname}`;
    label.style.animation = 'fadeSlideUp 0.3s ease';
    page.appendChild(label);

    const roleBadge = document.createElement('div');
    roleBadge.className = 'roulette-role-badge';
    roleBadge.textContent = `${roleInfo?.icon || '🎲'} ${roleInfo?.nameRu || role}`;
    roleBadge.style.animation = 'fadeSlideUp 0.4s ease';
    page.appendChild(roleBadge);

    const spinnerEl = document.createElement('div');
    spinnerEl.style.animation = 'scaleIn 0.3s ease';
    page.appendChild(spinnerEl);

    // Duration decreases slightly for each player for excitement
    const duration = 3500 + index * 300;

    const spinner = new HeroSpinner(spinnerEl, {
      targetHero: hero,
      duration: duration,
      onComplete: () => {
        // Show the selected hero briefly
        const reveal = document.createElement('div');
        reveal.className = 'roulette-complete-card';
        reveal.innerHTML = `
          <img src="${hero.img}" alt="${hero.locName}" 
               onerror="this.style.background='var(--bg-secondary)'" />
          <h2>${hero.locName}</h2>
          <p>${roleInfo?.icon || ''} ${roleInfo?.nameRu || role}</p>
        `;
        page.appendChild(reveal);

        setTimeout(resolve, 1200);
      }
    });

    // Start spinning after a short delay
    setTimeout(() => spinner.spin(), 500);
  });
}
