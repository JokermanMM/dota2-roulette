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
  mode: '',
  comboDescription: ''
};

// Track last roll to prevent duplicates
let lastRollHeroes = [];

function assignRoles(players) {
  const allRoles = ROLES.map(r => r.id);
  const assigned = [];
  const takenRoles = [];

  players.forEach((p, i) => {
    if (p.role !== 'auto') {
      assigned[i] = p.role;
      takenRoles.push(p.role);
    }
  });

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
  const MAX_ATTEMPTS = 10;
  let heroes;
  let description = '';

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    let result;
    if (mode === 'lane') {
      result = selectLaneHeroes(roles);
    } else if (mode === 'fun') {
      result = selectFunHeroes(roles);
    } else {
      result = selectMetaHeroes(roles);
    }
    heroes = result.heroes;
    description = result.description;

    // Check for duplicate roll
    const currentNames = heroes.map(h => h.name).sort().join(',');
    const lastNames = lastRollHeroes.sort().join(',');
    if (currentNames !== lastNames || lastRollHeroes.length === 0) {
      break;
    }
  }

  lastRollHeroes = heroes.map(h => h.name);
  return { heroes, description };
}

function selectLaneHeroes(roles) {
  const chosen = [];
  const usedHeroes = new Set();
  const descriptions = [];

  for (let i = 0; i < roles.length; i++) {
    if (chosen[i]) continue;
    const role = roles[i];

    for (let j = i + 1; j < roles.length; j++) {
      if (chosen[j]) continue;

      const combos = LANE_COMBOS.filter(c => {
        const h0 = HEROES.find(h => h.name === c.heroes[0]);
        const h1 = HEROES.find(h => h.name === c.heroes[1]);
        if (!h0 || !h1) return false;
        if (usedHeroes.has(h0.name) || usedHeroes.has(h1.name)) return false;
        return (h0.roles.includes(role) && h1.roles.includes(roles[j])) ||
               (h1.roles.includes(role) && h0.roles.includes(roles[j]));
      });

      if (combos.length > 0) {
        const combo = combos[Math.floor(Math.random() * combos.length)];
        const h0 = HEROES.find(h => h.name === combo.heroes[0]);
        const h1 = HEROES.find(h => h.name === combo.heroes[1]);

        if (h0.roles.includes(role)) {
          chosen[i] = h0; chosen[j] = h1;
        } else {
          chosen[i] = h1; chosen[j] = h0;
        }
        usedHeroes.add(h0.name); usedHeroes.add(h1.name);
        descriptions.push(combo.desc);
        break;
      }
    }
  }

  for (let i = 0; i < roles.length; i++) {
    if (!chosen[i]) {
      const candidates = getHeroesByRole(roles[i]).filter(h => !usedHeroes.has(h.name));
      const pick = candidates.length > 0
        ? candidates[Math.floor(Math.random() * candidates.length)]
        : HEROES.filter(h => !usedHeroes.has(h.name))[0];
      chosen[i] = pick;
      usedHeroes.add(pick.name);
    }
  }

  const desc = descriptions.length > 0
    ? `🛡️ Лейн-связки: ${descriptions.join(' | ')}`
    : '🛡️ Герои подобраны по ролям для сильных линий';

  return { heroes: chosen, description: desc };
}

function selectFunHeroes(roles) {
  const chosen = [];
  const usedHeroes = new Set();
  const descriptions = [];

  for (let i = 0; i < roles.length; i++) {
    if (chosen[i]) continue;
    for (let j = i + 1; j < roles.length; j++) {
      if (chosen[j]) continue;

      const combos = FUN_COMBOS.filter(c => {
        const h0 = HEROES.find(h => h.name === c.heroes[0]);
        const h1 = HEROES.find(h => h.name === c.heroes[1]);
        if (!h0 || !h1) return false;
        if (usedHeroes.has(h0.name) || usedHeroes.has(h1.name)) return false;
        return (h0.roles.includes(roles[i]) && h1.roles.includes(roles[j])) ||
               (h1.roles.includes(roles[i]) && h0.roles.includes(roles[j]));
      });

      if (combos.length > 0) {
        const combo = combos[Math.floor(Math.random() * combos.length)];
        const h0 = HEROES.find(h => h.name === combo.heroes[0]);
        const h1 = HEROES.find(h => h.name === combo.heroes[1]);

        if (h0.roles.includes(roles[i])) {
          chosen[i] = h0; chosen[j] = h1;
        } else {
          chosen[i] = h1; chosen[j] = h0;
        }
        usedHeroes.add(h0.name); usedHeroes.add(h1.name);
        descriptions.push(combo.desc);
        break;
      }
    }
  }

  for (let i = 0; i < roles.length; i++) {
    if (!chosen[i]) {
      const candidates = getHeroesByRole(roles[i]).filter(h => !usedHeroes.has(h.name));
      const shuffled = [...candidates].sort(() => Math.random() - 0.5);
      const pick = shuffled[0] || HEROES.filter(h => !usedHeroes.has(h.name))[0];
      chosen[i] = pick;
      usedHeroes.add(pick.name);
    }
  }

  const desc = descriptions.length > 0
    ? `🎉 Фан-комбо: ${descriptions.join(' | ')}`
    : '🎉 Весёлые герои для развлечения в пати';

  return { heroes: chosen, description: desc };
}

function selectMetaHeroes(roles) {
  const chosen = [];
  const usedHeroes = new Set();
  const reasons = [];

  for (let i = 0; i < roles.length; i++) {
    const role = roles[i];
    const metaPool = META_PICKS[role] || META_PICKS.support;
    const available = metaPool.filter(m => !usedHeroes.has(m.name));

    if (available.length > 0) {
      const weighted = [];
      available.forEach(m => {
        const weight = m.tier === 'S' ? 3 : 1;
        for (let w = 0; w < weight; w++) weighted.push(m);
      });
      const pick = weighted[Math.floor(Math.random() * weighted.length)];
      const hero = HEROES.find(h => h.name === pick.name);
      chosen[i] = hero;
      usedHeroes.add(pick.name);
      reasons.push(`${hero.locName}: ${pick.reason}`);
    } else {
      const candidates = getHeroesByRole(role)
        .filter(h => !usedHeroes.has(h.name) && ['S', 'A'].includes(h.tier));
      const fallback = candidates.length > 0 ? candidates : getHeroesByRole(role).filter(h => !usedHeroes.has(h.name));
      const pick = fallback[Math.floor(Math.random() * fallback.length)] || HEROES.filter(h => !usedHeroes.has(h.name))[0];
      chosen[i] = pick;
      usedHeroes.add(pick.name);
    }
  }

  const desc = reasons.length > 0
    ? `🏆 Мета-пики: ${reasons.join(' | ')}`
    : '🏆 Сильнейшие герои текущего патча';

  return { heroes: chosen, description: desc };
}

// Smart reroll: pick a hero that synergizes with remaining team
export function smartRerollHero(indexToReroll, currentHeroes, roles, mode) {
  const usedNames = currentHeroes.filter((_, i) => i !== indexToReroll).map(h => h.name);
  const role = roles[indexToReroll];
  const teammates = currentHeroes.filter((_, i) => i !== indexToReroll);
  const teammateNames = teammates.map(h => h.name);

  // Try to find a combo partner with any teammate
  const allCombos = mode === 'fun' ? FUN_COMBOS : LANE_COMBOS;
  const matchingCombos = allCombos.filter(c => {
    return c.heroes.some(hName => teammateNames.includes(hName)) &&
           c.heroes.some(hName => {
             const hero = HEROES.find(h => h.name === hName);
             return hero && !usedNames.includes(hName) && hero.name !== currentHeroes[indexToReroll]?.name &&
                    hero.roles.includes(role);
           });
  });

  if (matchingCombos.length > 0) {
    const combo = matchingCombos[Math.floor(Math.random() * matchingCombos.length)];
    const newHeroName = combo.heroes.find(hName => {
      const hero = HEROES.find(h => h.name === hName);
      return hero && !usedNames.includes(hName) && hero.roles.includes(role) &&
             hero.name !== currentHeroes[indexToReroll]?.name;
    });
    if (newHeroName) {
      return { hero: HEROES.find(h => h.name === newHeroName), comboDesc: combo.desc || combo.reason };
    }
  }

  // For meta mode, pick from meta pool
  if (mode === 'meta') {
    const metaPool = (META_PICKS[role] || META_PICKS.support)
      .filter(m => !usedNames.includes(m.name) && m.name !== currentHeroes[indexToReroll]?.name);
    if (metaPool.length > 0) {
      const pick = metaPool[Math.floor(Math.random() * metaPool.length)];
      const hero = HEROES.find(h => h.name === pick.name);
      return { hero, comboDesc: pick.reason };
    }
  }

  // Fallback: random from role
  const candidates = getHeroesByRole(role).filter(h =>
    !usedNames.includes(h.name) && h.name !== currentHeroes[indexToReroll]?.name
  );
  if (candidates.length > 0) {
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    return { hero: pick, comboDesc: null };
  }

  return { hero: currentHeroes[indexToReroll], comboDesc: null };
}

export async function renderRoulette(container) {
  container.innerHTML = '';

  if (!setupState.players.length) {
    navigateTo('/setup');
    return;
  }

  const page = document.createElement('div');
  page.className = 'roulette-page';
  container.appendChild(page);

  const roles = assignRoles(setupState.players.slice(0, setupState.playerCount));
  const { heroes, description } = selectHeroes(roles, setupState.mode);

  rollResults.players = setupState.players.slice(0, setupState.playerCount).map(p => p.nickname);
  rollResults.roles = roles;
  rollResults.heroes = heroes;
  rollResults.mode = setupState.mode;
  rollResults.comboDescription = description;

  for (let i = 0; i < setupState.playerCount; i++) {
    await spinForPlayer(page, i, rollResults.players[i], roles[i], heroes[i]);
  }

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

    const duration = 3500 + index * 300;

    const spinner = new HeroSpinner(spinnerEl, {
      targetHero: hero,
      duration,
      onComplete: () => {
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

    setTimeout(() => spinner.spin(), 500);
  });
}
