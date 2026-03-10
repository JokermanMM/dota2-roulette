// Hero synergy and combo data for DotaRoulette
// Three modes: lane (strong laning), fun (entertaining combos), meta (top-tier picks)

// Lane combos: pairs/groups that dominate lanes together
// Format: { heroes: [heroName, ...], lane: 'safe'|'off'|'mid', description }
export const LANE_COMBOS = [
  // Safe lane duos (carry + support)
  { heroes: ['juggernaut', 'crystal_maiden'], lane: 'safe', desc: 'CM замедляет, Jugger крутит — классика' },
  { heroes: ['juggernaut', 'grimstroke'], lane: 'safe', desc: 'Ink Swell + Blade Fury = неизбежная смерть' },
  { heroes: ['sven', 'grimstroke'], lane: 'safe', desc: 'Chain stun + cleave damage на всю линию' },
  { heroes: ['huskar', 'dazzle'], lane: 'safe', desc: 'Shallow Grave + Huskar aggression = unkillable' },
  { heroes: ['faceless_void', 'witch_doctor'], lane: 'safe', desc: 'Chrono + Death Ward — тимвайп обеспечен' },
  { heroes: ['ursa', 'crystal_maiden'], lane: 'safe', desc: 'CM фризит, Ursa рвёт на куски' },
  { heroes: ['life_stealer', 'jakiro'], lane: 'safe', desc: 'Jakiro контролит, LS спокойно фармит и бьёт' },
  { heroes: ['drow_ranger', 'vengefulspirit'], lane: 'safe', desc: 'Двойная аура + снижение армора = мгновенные убийства' },
  { heroes: ['skeleton_king', 'jakiro'], lane: 'safe', desc: 'WK бьёт, Jakiro жжёт — прочная линия' },
  { heroes: ['terrorblade', 'warlock'], lane: 'safe', desc: 'Warlock хилит, TB спокойно набирает силу' },
  { heroes: ['phantom_assassin', 'ogre_magi'], lane: 'safe', desc: 'Bloodlust + crits = чистая агрессия' },
  { heroes: ['slark', 'shadow_shaman'], lane: 'safe', desc: 'Shackles lock + Pounce = guaranteed kills' },
  { heroes: ['ursa', 'wisp'], lane: 'safe', desc: 'IO tether + Ursa burst = global ganks' },

  // Offlane duos
  { heroes: ['axe', 'shadow_shaman'], lane: 'off', desc: 'Call + Shackle = кэрри под башней' },
  { heroes: ['dark_seer', 'tusk'], lane: 'off', desc: 'Snowball + Ion Shell = агрессивный лейн' },
  { heroes: ['mars', 'hoodwink'], lane: 'off', desc: 'Arena + Bushwhack = зона смерти' },
  { heroes: ['tidehunter', 'snapfire'], lane: 'off', desc: 'Прочный лейн + burst damage' },
  { heroes: ['night_stalker', 'undying'], lane: 'off', desc: 'Ночной террор + Tombstone = кошмар' },
  { heroes: ['undying', 'batrider'], lane: 'off', desc: 'Dive combo — Tombstone + Napalm + Fire' },
  { heroes: ['magnataur', 'hoodwink'], lane: 'off', desc: 'Empower + burst = давление на кэрри' },
  { heroes: ['bristleback', 'dark_willow'], lane: 'off', desc: 'DW контролит, BB забирает' },
  { heroes: ['legion_commander', 'grimstroke'], lane: 'off', desc: 'Soulbind + Duel = двойной Duel' },
  { heroes: ['primal_beast', 'pugna'], lane: 'off', desc: 'Stomp + Decrepify + blast = одна кнопка' },

  // Mid combos (for dual-mid or roaming support + mid)
  { heroes: ['ember_spirit', 'earth_spirit'], lane: 'mid', desc: 'Братья-духи рулят мид совместными ганками' },
];

// Fun combos: hilarious, entertaining, wombo-combo oriented
export const FUN_COMBOS = [
  { heroes: ['magnataur', 'tiny'], desc: 'Toss → Skewer: 1600 units полёт под башню!', type: 'wombo' },
  { heroes: ['enigma', 'lich'], desc: 'Black Hole + Chain Frost = бесконечные отскоки', type: 'wombo' },
  { heroes: ['faceless_void', 'witch_doctor'], desc: 'Chrono + Death Ward = УЛЬТРА КИЛЛ', type: 'wombo' },
  { heroes: ['naga_siren', 'dark_seer'], desc: 'Song → Vacuum → combo = тимвайп', type: 'wombo' },
  { heroes: ['bane', 'mirana'], desc: 'Nightmare → 5 секунд стрела = BOOM', type: 'combo' },
  { heroes: ['spirit_breaker', 'life_stealer'], desc: 'Infest + Charge = летающий бомж-экспресс', type: 'crazy' },
  { heroes: ['grimstroke', 'doom_bringer'], desc: 'Soulbind + Doom = двойной Doom УЖАС', type: 'combo' },
  { heroes: ['crystal_maiden', 'legion_commander'], desc: 'Frostbite + Duel = зафризил-задуэлил', type: 'combo' },
  { heroes: ['sven', 'magnataur'], desc: 'Empower + God Strength = CLEAVE MACHINE', type: 'wombo' },
  { heroes: ['wisp', 'gyrocopter'], desc: 'IO Tether + Gyro Flak = рейд-босс', type: 'crazy' },
  { heroes: ['shadow_shaman', 'juggernaut'], desc: 'Hex + Shackle + Omnislash = RIP', type: 'combo' },
  { heroes: ['disruptor', 'furion'], desc: 'Glimpse + TP = глобальная тюрьма', type: 'crazy' },
  { heroes: ['axe', 'dazzle'], desc: 'Call + Heal bomb = сюрприз с крипами', type: 'combo' },
  { heroes: ['pudge', 'vengefulspirit'], desc: 'Hook + Swap = шаттл-сервис в фонтан', type: 'crazy' },
  { heroes: ['invoker', 'dark_seer'], desc: 'Vacuum + Meteor + Blast = космос', type: 'wombo' },
  { heroes: ['tidehunter', 'enigma'], desc: 'Ravage + Black Hole = абсолютный контроль', type: 'wombo' },
  { heroes: ['earthshaker', 'phantom_lancer'], desc: 'Echo Slam среди иллюзий = РАМП-П-ПЭЙДЖ', type: 'crazy' },
  { heroes: ['pugna', 'primal_beast'], desc: 'Stomp + Decrepify = 1000 магического', type: 'combo' },
  { heroes: ['viper', 'venomancer'], desc: 'Ядовитое болото: ты медленный и мёртвый', type: 'crazy' },
  { heroes: ['tusk', 'dark_seer'], desc: 'Snowball + Ion Shell = едущий контейнер смерти', type: 'crazy' },
];

// Meta heroes by role (S and A tier) for "play to win" mode
export const META_PICKS = {
  carry: [
    { name: 'slark', tier: 'S', reason: 'Лучший кэрри патча, dominates fights' },
    { name: 'ursa', tier: 'S', reason: 'Ранний Roshan, мощные файты' },
    { name: 'life_stealer', tier: 'S', reason: 'Новый фасет, доминирует в мете' },
    { name: 'phantom_assassin', tier: 'S', reason: 'Криты решают, snowball потенциал' },
    { name: 'faceless_void', tier: 'A', reason: 'Chrono = teamfight winner' },
    { name: 'sven', tier: 'A', reason: 'Cleave + stun = farm machine' },
    { name: 'juggernaut', tier: 'A', reason: 'Универсальный, всегда в мете' },
    { name: 'skeleton_king', tier: 'A', reason: 'Два жизни, надёжный кэрри' },
    { name: 'morphling', tier: 'A', reason: 'High skill ceiling, burst damage' },
    { name: 'terrorblade', tier: 'A', reason: 'Split push + illusions = pressure' },
  ],
  mid: [
    { name: 'ember_spirit', tier: 'S', reason: 'Ганки + фарм + мобильность' },
    { name: 'puck', tier: 'S', reason: 'Неуловимый контроль + damage' },
    { name: 'leshrac', tier: 'A', reason: 'Late game monster, push power' },
    { name: 'queenofpain', tier: 'A', reason: 'Dagon build = instant delete' },
    { name: 'lina', tier: 'A', reason: 'Burst + versatile damage' },
    { name: 'invoker', tier: 'A', reason: 'Arsenal of 10+ spells' },
    { name: 'nevermore', tier: 'A', reason: 'Lane dominator, damage scaling' },
    { name: 'void_spirit', tier: 'A', reason: 'Mobile burst assassin' },
    { name: 'dragon_knight', tier: 'S', reason: 'Tanky mid, push + teamfight' },
    { name: 'tinker', tier: 'A', reason: 'Global presence, map control' },
  ],
  offlane: [
    { name: 'enigma', tier: 'S', reason: 'Black Hole = game-winning ultimate' },
    { name: 'night_stalker', tier: 'S', reason: 'Night dominance, broken stats' },
    { name: 'bristleback', tier: 'A', reason: 'Tanky frontliner, hard to kill' },
    { name: 'tidehunter', tier: 'A', reason: 'Ravage initiator, safe pick' },
    { name: 'sand_king', tier: 'A', reason: 'Stun + ult = team fight presence' },
    { name: 'mars', tier: 'A', reason: 'Arena of Blood controls fights' },
    { name: 'legion_commander', tier: 'A', reason: 'Duel = snowball pressure' },
    { name: 'dark_seer', tier: 'A', reason: 'Vacuum combo, utility king' },
    { name: 'beastmaster', tier: 'A', reason: 'Aura + hawk vision + Roar' },
    { name: 'abyssal_underlord', tier: 'A', reason: 'Aura build, team mobility' },
    { name: 'pangolier', tier: 'A', reason: 'Rolling thunder = chaos' },
  ],
  support: [
    { name: 'bounty_hunter', tier: 'A', reason: 'Track gold = team economy boost' },
    { name: 'weaver', tier: 'A', reason: 'Aghs save, Swarm XP broken' },
    { name: 'spirit_breaker', tier: 'A', reason: 'Charge + bash = constant pressure' },
    { name: 'rubick', tier: 'A', reason: 'Steal ults, high skill high reward' },
    { name: 'earthshaker', tier: 'A', reason: 'Echo Slam, Fissure stun' },
    { name: 'dark_willow', tier: 'A', reason: 'Control + damage combo' },
    { name: 'snapfire', tier: 'A', reason: 'Lane bully, Cookie + Ult' },
    { name: 'grimstroke', tier: 'A', reason: 'Soulbind doubles everything' },
    { name: 'phoenix', tier: 'A', reason: 'Sunray heal + Supernova' },
    { name: 'marci', tier: 'A', reason: 'Sidekick + Dispose = aggro support' },
  ],
  fullsupport: [
    { name: 'jakiro', tier: 'S', reason: 'Ice Path + Macropyre = zone control' },
    { name: 'winter_wyvern', tier: 'S', reason: 'Cold Embrace save, Curse teamfight' },
    { name: 'crystal_maiden', tier: 'A', reason: 'Mana aura + root + ult' },
    { name: 'warlock', tier: 'A', reason: 'Fatal Bonds + Golem = teamfight god' },
    { name: 'treant', tier: 'A', reason: 'Global heal, eyes vision' },
    { name: 'ogre_magi', tier: 'A', reason: 'Tanky support, Bloodlust buff' },
    { name: 'lich', tier: 'A', reason: 'Lane harass + Frost Shield' },
    { name: 'dazzle', tier: 'A', reason: 'Shallow Grave = clutch saves' },
    { name: 'shadow_shaman', tier: 'B', reason: 'Push power + disable chain' },
    { name: 'oracle', tier: 'B', reason: 'False Promise = immortal carry' },
  ]
};

// Role mapping
export const ROLES = [
  { id: 'carry', name: 'Carry', nameRu: 'Керри', position: 1, icon: '⚔️' },
  { id: 'mid', name: 'Mid', nameRu: 'Мидер', position: 2, icon: '🎯' },
  { id: 'offlane', name: 'Offlane', nameRu: 'Хардлайнер', position: 3, icon: '🛡️' },
  { id: 'support', name: 'Support', nameRu: 'Саппорт', position: 4, icon: '✨' },
  { id: 'fullsupport', name: 'Full Support', nameRu: 'Фулл Саппорт', position: 5, icon: '💚' },
];

export function getRoleById(id) {
  return ROLES.find(r => r.id === id);
}
