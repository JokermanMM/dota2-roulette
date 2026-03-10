// Full Dota 2 hero database
// Images from Valve CDN: https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/{name}.png

const CDN = 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes';

function hero(id, name, locName, attr, attack, roles, tier = 'B') {
  return {
    id, name, locName,
    img: `${CDN}/${name}.png`,
    attr, attack, roles, tier
  };
}

// Roles: carry, mid, offlane, support, fullsupport
// Tiers: S, A, B, C (based on 7.38 meta)
export const HEROES = [
  hero(1, 'antimage', 'Anti-Mage', 'agi', 'melee', ['carry'], 'B'),
  hero(2, 'axe', 'Axe', 'str', 'melee', ['offlane'], 'A'),
  hero(3, 'bane', 'Bane', 'int', 'ranged', ['support', 'fullsupport'], 'B'),
  hero(4, 'bloodseeker', 'Bloodseeker', 'agi', 'melee', ['carry', 'mid', 'offlane'], 'B'),
  hero(5, 'crystal_maiden', 'Crystal Maiden', 'int', 'ranged', ['support', 'fullsupport'], 'A'),
  hero(6, 'drow_ranger', 'Drow Ranger', 'agi', 'ranged', ['carry'], 'B'),
  hero(7, 'earthshaker', 'Earthshaker', 'str', 'melee', ['support', 'offlane'], 'A'),
  hero(8, 'juggernaut', 'Juggernaut', 'agi', 'melee', ['carry'], 'A'),
  hero(9, 'mirana', 'Mirana', 'uni', 'ranged', ['mid', 'support', 'offlane'], 'A'),
  hero(10, 'morphling', 'Morphling', 'agi', 'ranged', ['carry', 'mid'], 'A'),
  hero(11, 'nevermore', 'Shadow Fiend', 'agi', 'ranged', ['mid', 'carry'], 'A'),
  hero(12, 'phantom_lancer', 'Phantom Lancer', 'agi', 'melee', ['carry'], 'B'),
  hero(13, 'puck', 'Puck', 'int', 'ranged', ['mid', 'offlane'], 'S'),
  hero(14, 'pudge', 'Pudge', 'str', 'melee', ['support', 'offlane', 'mid'], 'B'),
  hero(15, 'razor', 'Razor', 'agi', 'ranged', ['mid', 'carry', 'offlane'], 'B'),
  hero(16, 'sand_king', 'Sand King', 'str', 'melee', ['offlane', 'support'], 'A'),
  hero(17, 'storm_spirit', 'Storm Spirit', 'int', 'ranged', ['mid'], 'B'),
  hero(18, 'sven', 'Sven', 'str', 'melee', ['carry', 'support'], 'A'),
  hero(19, 'tiny', 'Tiny', 'str', 'melee', ['mid', 'carry', 'support'], 'B'),
  hero(20, 'vengefulspirit', 'Vengeful Spirit', 'agi', 'ranged', ['support', 'fullsupport', 'carry'], 'B'),
  hero(21, 'windrunner', 'Windranger', 'int', 'ranged', ['mid', 'offlane', 'support', 'carry'], 'A'),
  hero(22, 'zuus', 'Zeus', 'int', 'ranged', ['mid', 'support'], 'B'),
  hero(23, 'kunkka', 'Kunkka', 'str', 'melee', ['mid', 'carry', 'offlane'], 'B'),
  hero(25, 'lina', 'Lina', 'int', 'ranged', ['mid', 'support'], 'A'),
  hero(26, 'lion', 'Lion', 'int', 'ranged', ['support', 'fullsupport'], 'B'),
  hero(27, 'shadow_shaman', 'Shadow Shaman', 'int', 'ranged', ['support', 'fullsupport'], 'B'),
  hero(28, 'slardar', 'Slardar', 'str', 'melee', ['offlane', 'carry'], 'B'),
  hero(29, 'tidehunter', 'Tidehunter', 'str', 'melee', ['offlane'], 'A'),
  hero(30, 'witch_doctor', 'Witch Doctor', 'int', 'ranged', ['support', 'fullsupport'], 'B'),
  hero(31, 'lich', 'Lich', 'int', 'ranged', ['support', 'fullsupport'], 'A'),
  hero(32, 'riki', 'Riki', 'agi', 'melee', ['carry', 'support'], 'B'),
  hero(33, 'enigma', 'Enigma', 'int', 'ranged', ['offlane', 'support'], 'S'),
  hero(34, 'tinker', 'Tinker', 'int', 'ranged', ['mid'], 'A'),
  hero(35, 'sniper', 'Sniper', 'agi', 'ranged', ['mid', 'carry'], 'B'),
  hero(36, 'necrolyte', 'Necrophos', 'int', 'ranged', ['mid', 'offlane', 'carry'], 'B'),
  hero(37, 'warlock', 'Warlock', 'int', 'ranged', ['support', 'fullsupport'], 'A'),
  hero(38, 'beastmaster', 'Beastmaster', 'str', 'melee', ['offlane', 'mid'], 'A'),
  hero(39, 'queenofpain', 'Queen of Pain', 'int', 'ranged', ['mid'], 'A'),
  hero(40, 'venomancer', 'Venomancer', 'agi', 'ranged', ['offlane', 'support'], 'B'),
  hero(41, 'faceless_void', 'Faceless Void', 'agi', 'melee', ['carry', 'offlane'], 'A'),
  hero(42, 'skeleton_king', 'Wraith King', 'str', 'melee', ['carry', 'offlane'], 'A'),
  hero(43, 'death_prophet', 'Death Prophet', 'int', 'ranged', ['mid', 'offlane'], 'B'),
  hero(44, 'phantom_assassin', 'Phantom Assassin', 'agi', 'melee', ['carry', 'mid'], 'S'),
  hero(45, 'pugna', 'Pugna', 'int', 'ranged', ['mid', 'support'], 'B'),
  hero(46, 'templar_assassin', 'Templar Assassin', 'agi', 'ranged', ['mid', 'carry'], 'A'),
  hero(47, 'viper', 'Viper', 'agi', 'ranged', ['mid', 'offlane'], 'B'),
  hero(48, 'luna', 'Luna', 'agi', 'ranged', ['carry'], 'B'),
  hero(49, 'dragon_knight', 'Dragon Knight', 'str', 'melee', ['mid', 'carry', 'offlane'], 'S'),
  hero(50, 'dazzle', 'Dazzle', 'int', 'ranged', ['support', 'fullsupport'], 'A'),
  hero(51, 'rattletrap', 'Clockwerk', 'str', 'melee', ['offlane', 'support'], 'B'),
  hero(52, 'leshrac', 'Leshrac', 'int', 'ranged', ['mid', 'support'], 'A'),
  hero(53, 'furion', 'Nature\'s Prophet', 'int', 'ranged', ['offlane', 'mid', 'carry'], 'B'),
  hero(54, 'life_stealer', 'Lifestealer', 'str', 'melee', ['carry'], 'S'),
  hero(55, 'dark_seer', 'Dark Seer', 'int', 'melee', ['offlane'], 'A'),
  hero(56, 'clinkz', 'Clinkz', 'agi', 'ranged', ['carry', 'mid'], 'B'),
  hero(57, 'omniknight', 'Omniknight', 'str', 'melee', ['support', 'offlane'], 'B'),
  hero(58, 'enchantress', 'Enchantress', 'int', 'ranged', ['support', 'offlane'], 'B'),
  hero(59, 'huskar', 'Huskar', 'str', 'ranged', ['mid', 'carry'], 'B'),
  hero(60, 'night_stalker', 'Night Stalker', 'str', 'melee', ['offlane', 'mid'], 'S'),
  hero(61, 'broodmother', 'Broodmother', 'agi', 'melee', ['mid', 'offlane', 'carry'], 'B'),
  hero(62, 'bounty_hunter', 'Bounty Hunter', 'agi', 'melee', ['support', 'offlane'], 'A'),
  hero(63, 'weaver', 'Weaver', 'agi', 'ranged', ['carry', 'support'], 'A'),
  hero(64, 'jakiro', 'Jakiro', 'int', 'ranged', ['support', 'fullsupport'], 'S'),
  hero(65, 'batrider', 'Batrider', 'int', 'ranged', ['mid', 'offlane'], 'B'),
  hero(66, 'chen', 'Chen', 'int', 'ranged', ['support', 'fullsupport'], 'C'),
  hero(67, 'spectre', 'Spectre', 'agi', 'melee', ['carry'], 'B'),
  hero(68, 'ancient_apparition', 'Ancient Apparition', 'int', 'ranged', ['support', 'fullsupport'], 'B'),
  hero(69, 'doom_bringer', 'Doom', 'str', 'melee', ['offlane', 'mid'], 'B'),
  hero(70, 'ursa', 'Ursa', 'agi', 'melee', ['carry', 'offlane'], 'S'),
  hero(71, 'spirit_breaker', 'Spirit Breaker', 'str', 'melee', ['support', 'offlane'], 'A'),
  hero(72, 'gyrocopter', 'Gyrocopter', 'agi', 'ranged', ['carry', 'mid'], 'B'),
  hero(73, 'alchemist', 'Alchemist', 'str', 'melee', ['carry', 'mid'], 'B'),
  hero(74, 'invoker', 'Invoker', 'uni', 'ranged', ['mid'], 'A'),
  hero(75, 'silencer', 'Silencer', 'int', 'ranged', ['support', 'fullsupport', 'mid'], 'B'),
  hero(76, 'obsidian_destroyer', 'Outworld Destroyer', 'int', 'ranged', ['mid'], 'B'),
  hero(77, 'lycan', 'Lycan', 'str', 'melee', ['offlane', 'carry'], 'A'),
  hero(78, 'brewmaster', 'Brewmaster', 'str', 'melee', ['offlane', 'mid'], 'B'),
  hero(79, 'shadow_demon', 'Shadow Demon', 'int', 'ranged', ['support', 'fullsupport'], 'B'),
  hero(80, 'lone_druid', 'Lone Druid', 'uni', 'ranged', ['carry', 'offlane', 'mid'], 'C'),
  hero(81, 'chaos_knight', 'Chaos Knight', 'str', 'melee', ['carry', 'offlane'], 'B'),
  hero(82, 'meepo', 'Meepo', 'agi', 'melee', ['mid', 'carry'], 'A'),
  hero(83, 'treant', 'Treant Protector', 'str', 'melee', ['support', 'fullsupport'], 'A'),
  hero(84, 'ogre_magi', 'Ogre Magi', 'int', 'melee', ['support', 'fullsupport'], 'A'),
  hero(85, 'undying', 'Undying', 'str', 'melee', ['offlane', 'support'], 'B'),
  hero(86, 'rubick', 'Rubick', 'int', 'ranged', ['support'], 'A'),
  hero(87, 'disruptor', 'Disruptor', 'int', 'ranged', ['support', 'fullsupport'], 'B'),
  hero(88, 'nyx_assassin', 'Nyx Assassin', 'agi', 'melee', ['support', 'offlane'], 'B'),
  hero(89, 'naga_siren', 'Naga Siren', 'agi', 'melee', ['carry', 'mid', 'support'], 'A'),
  hero(90, 'keeper_of_the_light', 'Keeper of the Light', 'int', 'ranged', ['support', 'fullsupport'], 'B'),
  hero(91, 'wisp', 'IO', 'str', 'ranged', ['support', 'fullsupport'], 'B'),
  hero(92, 'visage', 'Visage', 'int', 'ranged', ['mid', 'support', 'offlane'], 'C'),
  hero(93, 'slark', 'Slark', 'agi', 'melee', ['carry'], 'S'),
  hero(94, 'medusa', 'Medusa', 'agi', 'ranged', ['carry', 'mid'], 'B'),
  hero(95, 'troll_warlord', 'Troll Warlord', 'agi', 'melee', ['carry'], 'B'),
  hero(96, 'centaur', 'Centaur Warrunner', 'str', 'melee', ['offlane'], 'B'),
  hero(97, 'magnataur', 'Magnus', 'str', 'melee', ['offlane', 'mid'], 'A'),
  hero(98, 'shredder', 'Timbersaw', 'str', 'melee', ['offlane'], 'B'),
  hero(99, 'bristleback', 'Bristleback', 'str', 'melee', ['offlane'], 'A'),
  hero(100, 'tusk', 'Tusk', 'str', 'melee', ['support', 'offlane'], 'B'),
  hero(101, 'skywrath_mage', 'Skywrath Mage', 'int', 'ranged', ['support', 'mid'], 'B'),
  hero(102, 'abaddon', 'Abaddon', 'str', 'melee', ['support', 'offlane', 'carry'], 'A'),
  hero(103, 'elder_titan', 'Elder Titan', 'str', 'melee', ['support', 'offlane'], 'B'),
  hero(104, 'legion_commander', 'Legion Commander', 'str', 'melee', ['offlane', 'carry'], 'A'),
  hero(105, 'techies', 'Techies', 'int', 'ranged', ['support', 'mid'], 'C'),
  hero(106, 'ember_spirit', 'Ember Spirit', 'agi', 'melee', ['mid', 'carry'], 'S'),
  hero(107, 'earth_spirit', 'Earth Spirit', 'str', 'melee', ['support', 'offlane'], 'B'),
  hero(108, 'abyssal_underlord', 'Underlord', 'str', 'melee', ['offlane', 'support'], 'A'),
  hero(109, 'terrorblade', 'Terrorblade', 'agi', 'melee', ['carry'], 'B'),
  hero(110, 'phoenix', 'Phoenix', 'str', 'ranged', ['support', 'offlane'], 'A'),
  hero(111, 'oracle', 'Oracle', 'int', 'ranged', ['support', 'fullsupport'], 'B'),
  hero(112, 'winter_wyvern', 'Winter Wyvern', 'int', 'ranged', ['support', 'fullsupport', 'offlane'], 'S'),
  hero(113, 'arc_warden', 'Arc Warden', 'agi', 'ranged', ['mid', 'carry'], 'B'),
  hero(114, 'monkey_king', 'Monkey King', 'agi', 'melee', ['carry', 'mid', 'offlane'], 'B'),
  hero(119, 'dark_willow', 'Dark Willow', 'int', 'ranged', ['support'], 'A'),
  hero(120, 'pangolier', 'Pangolier', 'agi', 'melee', ['offlane', 'mid'], 'A'),
  hero(121, 'grimstroke', 'Grimstroke', 'int', 'ranged', ['support'], 'A'),
  hero(123, 'hoodwink', 'Hoodwink', 'agi', 'ranged', ['support', 'offlane', 'mid'], 'B'),
  hero(126, 'void_spirit', 'Void Spirit', 'int', 'melee', ['mid', 'offlane'], 'A'),
  hero(128, 'snapfire', 'Snapfire', 'str', 'ranged', ['support', 'offlane'], 'A'),
  hero(129, 'mars', 'Mars', 'str', 'melee', ['offlane', 'mid'], 'A'),
  hero(131, 'ringmaster', 'Ringmaster', 'int', 'ranged', ['support', 'mid'], 'B'),
  hero(135, 'dawnbreaker', 'Dawnbreaker', 'str', 'melee', ['offlane', 'support', 'carry'], 'B'),
  hero(136, 'marci', 'Marci', 'str', 'melee', ['support', 'offlane', 'carry'], 'A'),
  hero(137, 'primal_beast', 'Primal Beast', 'str', 'melee', ['offlane', 'mid'], 'A'),
  hero(138, 'muerta', 'Muerta', 'int', 'ranged', ['carry', 'mid'], 'B'),
  hero(145, 'kez', 'Kez', 'agi', 'melee', ['carry', 'mid', 'offlane'], 'B'),
];

export function getHeroesByRole(role) {
  return HEROES.filter(h => h.roles.includes(role));
}

export function getHeroesByTier(tiers = ['S', 'A']) {
  return HEROES.filter(h => tiers.includes(h.tier));
}

export function getHeroByName(name) {
  return HEROES.find(h => h.name === name || h.locName === name);
}

export function getRandomHeroes(count, exclude = []) {
  const available = HEROES.filter(h => !exclude.includes(h.name));
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
