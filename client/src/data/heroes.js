// Full Dota 2 hero database with facets
// Images from Valve CDN: https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/{name}.png

const CDN = 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes';

function hero(id, name, locName, attr, attack, roles, tier = 'B', facets = []) {
  return {
    id, name, locName,
    img: `${CDN}/${name}.png`,
    attr, attack, roles, tier, facets
  };
}

// Roles: carry, mid, offlane, support, fullsupport
// Tiers: S, A, B, C (based on 7.38 meta)
// Facets: { name, desc, recommended? } — recommended = best in most situations
export const HEROES = [
  hero(1, 'antimage', 'Anti-Mage', 'agi', 'melee', ['carry'], 'B', [
    { name: 'Magebane', desc: 'Mana Break сжигает больше маны за удар', recommended: true },
    { name: 'Persecutor', desc: 'Mana Void дополнительно оглушает цели с низким запасом маны' }
  ]),
  hero(2, 'axe', 'Axe', 'str', 'melee', ['offlane'], 'A', [
    { name: 'One Man Army', desc: 'Больше силы от армора когда нет союзников рядом' },
    { name: 'Call Out', desc: 'Berserker\'s Call даёт бонусный армор и скорость атаки врагам', recommended: true }
  ]),
  hero(3, 'bane', 'Bane', 'int', 'ranged', ['support', 'fullsupport'], 'B', [
    { name: 'Dream Stalker', desc: 'Бонус скорости атаки при атаке целей под Nightmare', recommended: true },
    { name: 'Sleepwalk', desc: 'Nightmare становится vector-targeted, двигает цели' }
  ]),
  hero(4, 'bloodseeker', 'Bloodseeker', 'agi', 'melee', ['carry', 'mid', 'offlane'], 'B', [
    { name: 'Sanguivore', desc: 'Увеличенный хил от убийства юнитов', recommended: true },
    { name: 'Arterial Spray', desc: 'Bloodrage наносит урон вокруг при атаке' }
  ]),
  hero(5, 'crystal_maiden', 'Crystal Maiden', 'int', 'ranged', ['support', 'fullsupport'], 'A', [
    { name: 'Frozen Expanse', desc: 'Crystal Nova оставляет зону замедления', recommended: true },
    { name: 'Ice Burial', desc: 'Frostbite притягивает цель к Crystal Maiden' }
  ]),
  hero(6, 'drow_ranger', 'Drow Ranger', 'agi', 'ranged', ['carry'], 'B', [
    { name: 'Sidestep', desc: 'Шанс уклонения от атак в дальнем бою' },
    { name: 'Gale Force', desc: 'Multishot отталкивает врагов назад', recommended: true }
  ]),
  hero(7, 'earthshaker', 'Earthshaker', 'str', 'melee', ['support', 'offlane'], 'A', [
    { name: 'Tectonic Build-up', desc: 'Aftershock наносит больше урона с расстоянием', recommended: true },
    { name: 'Slugger', desc: 'Enchant Totem бьёт в AoE при дальней атаке' }
  ]),
  hero(8, 'juggernaut', 'Juggernaut', 'agi', 'melee', ['carry'], 'A', [
    { name: 'Bladestorm', desc: 'Blade Fury прокает Blade Dance криты', recommended: true },
    { name: 'Bladeform', desc: 'Бонус Agility и MS когда не получаешь урон' }
  ]),
  hero(9, 'mirana', 'Mirana', 'uni', 'ranged', ['mid', 'support', 'offlane'], 'A', [
    { name: 'Moonlight', desc: 'Starstorm пассивно бьёт ближайших врагов', recommended: true },
    { name: 'Shooting Star', desc: 'Sacred Arrow разделяется на несколько стрел' }
  ]),
  hero(10, 'morphling', 'Morphling', 'agi', 'ranged', ['carry', 'mid'], 'A', [
    { name: 'Ebb', desc: 'Attribute Shift даёт бонус к скорости атаки' },
    { name: 'Flow', desc: 'Adaptive Strike усилен в зависимости от основного атрибута', recommended: true }
  ]),
  hero(11, 'nevermore', 'Shadow Fiend', 'agi', 'ranged', ['mid', 'carry'], 'A', [
    { name: 'Lasting Presence', desc: 'Души не теряются при смерти (частично)', recommended: true },
    { name: 'Shadowmire', desc: 'Requiem создаёт зону замедления' }
  ]),
  hero(12, 'phantom_lancer', 'Phantom Lancer', 'agi', 'melee', ['carry'], 'B', [
    { name: 'Convergence', desc: 'Иллюзии двигаются к реальному PL', recommended: true },
    { name: 'Phantom Edge', desc: 'Критический удар после использования Doppelganger' }
  ]),
  hero(13, 'puck', 'Puck', 'int', 'ranged', ['mid', 'offlane'], 'S', [
    { name: 'Jostling Rift', desc: 'Illusory Orb отталкивает врагов', recommended: true },
    { name: 'Curveball', desc: 'Illusory Orb может менять направление' }
  ]),
  hero(14, 'pudge', 'Pudge', 'str', 'melee', ['support', 'offlane', 'mid'], 'B', [
    { name: 'Flayers Hook', desc: 'Hook наносит больше урона на расстоянии', recommended: true },
    { name: 'Dismember Unlocked', desc: 'Dismember доступен раньше, слабее на старте' }
  ]),
  hero(15, 'razor', 'Razor', 'agi', 'ranged', ['mid', 'carry', 'offlane'], 'B', [
    { name: 'Dynamo', desc: 'Eye of the Storm бьёт быстрее с каждым ударом', recommended: true },
    { name: 'Unstable Current', desc: 'Пассивный шок при получении урона' }
  ]),
  hero(16, 'sand_king', 'Sand King', 'str', 'melee', ['offlane', 'support'], 'A', [
    { name: 'Dust Devil', desc: 'Sand Storm двигается вместе с Sand King', recommended: true },
    { name: 'Sandshroud', desc: 'Caustic Finale взрывается при смерти юнита' }
  ]),
  hero(17, 'storm_spirit', 'Storm Spirit', 'int', 'ranged', ['mid'], 'B', [
    { name: 'Static Slide', desc: 'Ball Lightning замедляет врагов на пути', recommended: true },
    { name: 'Galvanized', desc: 'Overload даёт щит после каста' }
  ]),
  hero(18, 'sven', 'Sven', 'str', 'melee', ['carry', 'support'], 'A', [
    { name: 'Warcry', desc: 'Warcry даёт армор и скорость движения союзникам', recommended: true },
    { name: 'Heavy Plate', desc: 'Бонусный армор при высоком HP' }
  ]),
  hero(19, 'tiny', 'Tiny', 'str', 'melee', ['mid', 'carry', 'support'], 'B', [
    { name: 'Crash Landing', desc: 'Toss наносит AoE урон при приземлении', recommended: true },
    { name: 'Elemental Durability', desc: 'Grow даёт дополнительный армор и сопротивление' }
  ]),
  hero(20, 'vengefulspirit', 'Vengeful Spirit', 'agi', 'ranged', ['support', 'fullsupport', 'carry'], 'B', [
    { name: 'Soul Strike', desc: 'Magic Missile наносит бонусный урон от армора', recommended: true },
    { name: 'Retribution', desc: 'При смерти создаёт иллюзию с бонусным уроном' }
  ]),
  hero(21, 'windrunner', 'Windranger', 'int', 'ranged', ['mid', 'offlane', 'support', 'carry'], 'A', [
    { name: 'Focusfire Fiend', desc: 'Focus Fire даёт шанс стрелять по двум целям', recommended: true },
    { name: 'Whirlwind', desc: 'Windrun отталкивает ближайших врагов' }
  ]),
  hero(22, 'zuus', 'Zeus', 'int', 'ranged', ['mid', 'support'], 'B', [
    { name: 'Livewire', desc: 'Static Field прокается от атак', recommended: true },
    { name: 'Divine Reflex', desc: 'Nimbus касты быстрее при низком HP Зевса' }
  ]),
  hero(23, 'kunkka', 'Kunkka', 'str', 'melee', ['mid', 'carry', 'offlane'], 'B', [
    { name: 'High Tide', desc: 'Torrent расширяется с расстоянием', recommended: true },
    { name: 'Grog Blossom', desc: 'Rum усиливает союзников, давая MS и задержку урона' }
  ]),
  hero(25, 'lina', 'Lina', 'int', 'ranged', ['mid', 'support'], 'A', [
    { name: 'Supercharge', desc: 'Fiery Soul даёт бонус к маг. урону на максимальных стаках', recommended: true },
    { name: 'Slow Burn', desc: 'Заклинания накладывают горение (DoT)' }
  ]),
  hero(26, 'lion', 'Lion', 'int', 'ranged', ['support', 'fullsupport'], 'B', [
    { name: 'Fist of Death', desc: 'Finger of Death даёт бонусный урон за каждое убийство', recommended: true },
    { name: 'Inner Beast', desc: 'Mana Drain переключает в мили-режим с бонус. уроном' }
  ]),
  hero(27, 'shadow_shaman', 'Shadow Shaman', 'int', 'ranged', ['support', 'fullsupport'], 'B', [
    { name: 'Cluster Cluck', desc: 'Hex превращает в цыплят область', recommended: true },
    { name: 'Massive Serpent Ward', desc: 'Один мощный серпент-вард вместо множества' }
  ]),
  hero(28, 'slardar', 'Slardar', 'str', 'melee', ['offlane', 'carry'], 'B', [
    { name: 'Brineguard', desc: 'Corrosive Haze снижает больше армора', recommended: true },
    { name: 'Unwavering Tide', desc: 'Slithereen Crush даёт стакающийся армор' }
  ]),
  hero(29, 'tidehunter', 'Tidehunter', 'str', 'melee', ['offlane'], 'A', [
    { name: 'Blubber', desc: 'Kraken Shell поглощает больше урона', recommended: true },
    { name: 'Leviathan', desc: 'Ravage имеет больший радиус, но меньший стан' }
  ]),
  hero(30, 'witch_doctor', 'Witch Doctor', 'int', 'ranged', ['support', 'fullsupport'], 'B', [
    { name: 'Cleft Death', desc: 'Death Ward рикошетит к ближайшим целям', recommended: true },
    { name: 'Voodoo Festeration', desc: 'Maledict накладывает эффект на область' }
  ]),
  hero(31, 'lich', 'Lich', 'int', 'ranged', ['support', 'fullsupport'], 'A', [
    { name: 'Growing Cold', desc: 'Frost Shield даёт бонусный армор по мере действия', recommended: true },
    { name: 'Ice Spire', desc: 'Frost Blast создаёт ледяную зону замедления' }
  ]),
  hero(32, 'riki', 'Riki', 'agi', 'melee', ['carry', 'support'], 'B', [
    { name: 'Extravagant', desc: 'Tricks of the Trade атакует быстрее', recommended: true },
    { name: 'Cutpurse', desc: 'Smoke Screen крадёт золото с ударов' }
  ]),
  hero(33, 'enigma', 'Enigma', 'int', 'ranged', ['offlane', 'support'], 'S', [
    { name: 'Event Horizon', desc: 'Black Hole притягивает на большем радиусе', recommended: true },
    { name: 'Gravity Well', desc: 'Midnight Pulse наносит больше % урона' }
  ]),
  hero(34, 'tinker', 'Tinker', 'int', 'ranged', ['mid'], 'A', [
    { name: 'Repair Bots', desc: 'March of the Machines хилит дружественные постройки' },
    { name: 'Translocator', desc: 'Rearm также обновляет Boots of Travel CD', recommended: true }
  ]),
  hero(35, 'sniper', 'Sniper', 'agi', 'ranged', ['mid', 'carry'], 'B', [
    { name: 'Ghillie Suit', desc: 'Невидимость при стоянии на месте после задержки' },
    { name: 'Scattershot', desc: 'Shrapnel наносит больше урона в центре', recommended: true }
  ]),
  hero(36, 'necrolyte', 'Necrophos', 'int', 'ranged', ['mid', 'offlane', 'carry'], 'B', [
    { name: 'Rapid Decay', desc: 'Ghost Shroud усиливает хил и маг. урон', recommended: true },
    { name: 'Profane Potency', desc: 'Reaper\'s Scythe увеличивает время возрождения' }
  ]),
  hero(37, 'warlock', 'Warlock', 'int', 'ranged', ['support', 'fullsupport'], 'A', [
    { name: 'Champion of Gorroth', desc: 'Golem сильнее, но только один', recommended: true },
    { name: 'Black Grimoire', desc: 'Fatal Bonds распространяется на больше целей' }
  ]),
  hero(38, 'beastmaster', 'Beastmaster', 'str', 'melee', ['offlane', 'mid'], 'A', [
    { name: 'Wild Hunt', desc: 'Призванные звери получают бонус от ауры', recommended: true },
    { name: 'Rugged', desc: 'Увеличенный HP и армор от Inner Beast' }
  ]),
  hero(39, 'queenofpain', 'Queen of Pain', 'int', 'ranged', ['mid'], 'A', [
    { name: 'Succubus', desc: 'Shadow Strike замедляет сильнее, DoT усилен', recommended: true },
    { name: 'Hallucinosis', desc: 'Scream of Pain создаёт иллюзию QoP' }
  ]),
  hero(40, 'venomancer', 'Venomancer', 'agi', 'ranged', ['offlane', 'support'], 'B', [
    { name: 'Patient Zero', desc: 'Wards распространяют яд на ближайших врагов', recommended: true },
    { name: 'Plague Ward Rush', desc: 'Poison Nova ускоряет варды' }
  ]),
  hero(41, 'faceless_void', 'Faceless Void', 'agi', 'melee', ['carry', 'offlane'], 'A', [
    { name: 'Chronoboost', desc: 'Союзники в Chrono получают бонус скорости атаки', recommended: true },
    { name: 'Distortion Field', desc: 'Time Walk восстанавливает больше HP' }
  ]),
  hero(42, 'skeleton_king', 'Wraith King', 'str', 'melee', ['carry', 'offlane'], 'A', [
    { name: 'Bone Guard', desc: 'Скелеты призываются при добивании крипов', recommended: true },
    { name: 'Spectral Blade', desc: 'Критический удар накладывает проклятие (замедление + урон)' }
  ]),
  hero(43, 'death_prophet', 'Death Prophet', 'int', 'ranged', ['mid', 'offlane'], 'B', [
    { name: 'Mourning Ritual', desc: 'Пассивная задержка части полученного урона', recommended: true },
    { name: 'Spirit Collector', desc: 'Exorcism получает духов от убийств крипов' }
  ]),
  hero(44, 'phantom_assassin', 'Phantom Assassin', 'agi', 'melee', ['carry', 'mid'], 'S', [
    { name: 'Immaterial', desc: 'Blur даёт шанс полного уклонения от заклинаний' },
    { name: 'Methodical', desc: 'Coup de Grace гарантируется каждые N атак', recommended: true }
  ]),
  hero(45, 'pugna', 'Pugna', 'int', 'ranged', ['mid', 'support'], 'B', [
    { name: 'Rewards of Ruin', desc: 'Nether Ward возвращает ману Pugna при тригерах', recommended: true },
    { name: 'Siphon Mage', desc: 'Life Drain высасывает ману дополнительно' }
  ]),
  hero(46, 'templar_assassin', 'Templar Assassin', 'agi', 'ranged', ['mid', 'carry'], 'A', [
    { name: 'Refraction Counter', desc: 'Refraction отражает урон атакующим', recommended: true },
    { name: 'Psi Blades Mastery', desc: 'Psi Blades проходят через большее кол-во целей' }
  ]),
  hero(47, 'viper', 'Viper', 'agi', 'ranged', ['mid', 'offlane'], 'B', [
    { name: 'Poison Burst', desc: 'Poison Attack взрывается в AoE', recommended: true },
    { name: 'Predator', desc: 'Бонусные характеристики стоя в Nethertoxin' }
  ]),
  hero(48, 'luna', 'Luna', 'agi', 'ranged', ['carry'], 'B', [
    { name: 'Moonglow', desc: 'Lunar Blessing аура даёт бонус урона ночью', recommended: true },
    { name: 'Moon Shield', desc: 'Moon Glaives дают щит при возвращении' }
  ]),
  hero(49, 'dragon_knight', 'Dragon Knight', 'str', 'melee', ['mid', 'carry', 'offlane'], 'S', [
    { name: 'Wyrm\'s Wrath', desc: 'Dragon Form усиливает все характеристики', recommended: true },
    { name: 'Fire Dragon', desc: 'Dragon Tail наносит AoE урон огнём' },
    { name: 'Frost Dragon', desc: 'Атаки в Dragon Form сильнее замедляют' }
  ]),
  hero(50, 'dazzle', 'Dazzle', 'int', 'ranged', ['support', 'fullsupport'], 'A', [
    { name: 'Nothl Boon', desc: 'Shallow Grave даёт бонусный армор', recommended: true },
    { name: 'Poison Bloom', desc: 'Poison Touch взрывается при окончании' }
  ]),
  hero(51, 'rattletrap', 'Clockwerk', 'str', 'melee', ['offlane', 'support'], 'B', [
    { name: 'Expanded Armature', desc: 'Power Cogs имеют больший радиус', recommended: true },
    { name: 'Overclock', desc: 'Hookshot CD снижается с попаданиями Battery Assault' }
  ]),
  hero(52, 'leshrac', 'Leshrac', 'int', 'ranged', ['mid', 'support'], 'A', [
    { name: 'Chronoptic Nourishment', desc: 'Pulse Nova восстанавливает ману', recommended: true },
    { name: 'Misanthropy', desc: 'Diabolic Edict взрывается быстрее, не бьёт здания' }
  ]),
  hero(53, 'furion', 'Nature\'s Prophet', 'int', 'ranged', ['offlane', 'mid', 'carry'], 'B', [
    { name: 'Ironwood Treant', desc: 'Treants сильнее, но призывается меньше', recommended: true },
    { name: 'Photosynthesis', desc: 'Treants хилятся стоя на деревьях' }
  ]),
  hero(54, 'life_stealer', 'Lifestealer', 'str', 'melee', ['carry'], 'S', [
    { name: 'Unflinching', desc: 'Feast хилит больше при низком HP', recommended: true },
    { name: 'Corpse Eater', desc: 'Open Wounds взрывает трупы крипов для AoE хила' }
  ]),
  hero(55, 'dark_seer', 'Dark Seer', 'int', 'melee', ['offlane'], 'A', [
    { name: 'Quick Wit', desc: 'Ion Shell также даёт бонус скорости движения', recommended: true },
    { name: 'Ion Cannon', desc: 'Wall of Replica создаёт более сильные иллюзии' }
  ]),
  hero(56, 'clinkz', 'Clinkz', 'agi', 'ranged', ['carry', 'mid'], 'B', [
    { name: 'Burning Barrage', desc: 'Searing Arrows прокают при Strafe', recommended: true },
    { name: 'Engulfing Step', desc: 'Skeleton Walk оставляет огненный след' }
  ]),
  hero(57, 'omniknight', 'Omniknight', 'str', 'melee', ['support', 'offlane'], 'B', [
    { name: 'Healing Aura', desc: 'Purification хилит в области вокруг', recommended: true },
    { name: 'Stalwart', desc: 'Heavenly Grace даёт иммунитет к магии на короткое время' }
  ]),
  hero(58, 'enchantress', 'Enchantress', 'int', 'ranged', ['support', 'offlane'], 'B', [
    { name: 'Overprotective Wisps', desc: 'Nature\'s Attendants сильнее хилят одиночную цель', recommended: true },
    { name: 'Rabble Rouser', desc: 'Enchant усиливает подконтрольных крипов' }
  ]),
  hero(59, 'huskar', 'Huskar', 'str', 'ranged', ['mid', 'carry'], 'B', [
    { name: 'Bloodlust', desc: 'Berserker\'s Blood даёт бонус к урону при низком HP', recommended: true },
    { name: 'Nothl Fortitude', desc: 'Inner Fire хилит Huskar от поражённых врагов' }
  ]),
  hero(60, 'night_stalker', 'Night Stalker', 'str', 'melee', ['offlane', 'mid'], 'S', [
    { name: 'Heart of Darkness', desc: 'Бонусы ночи усилены, ночь наступает раньше', recommended: true },
    { name: 'Blinding Void', desc: 'Crippling Fear ослепляет врагов дополнительно' }
  ]),
  hero(61, 'broodmother', 'Broodmother', 'agi', 'melee', ['mid', 'offlane', 'carry'], 'B', [
    { name: 'Necrotic Webs', desc: 'Spin Web замедляет врагов внутри', recommended: true },
    { name: 'Spawn Spiderlings Rush', desc: 'Spiderlings быстрее атакуют и двигаются' }
  ]),
  hero(62, 'bounty_hunter', 'Bounty Hunter', 'agi', 'melee', ['support', 'offlane'], 'A', [
    { name: 'Cutpurse', desc: 'Jinada крадёт больше золота', recommended: true },
    { name: 'Mugging', desc: 'Shadow Walk даёт бонус урона при первой атаке' }
  ]),
  hero(63, 'weaver', 'Weaver', 'agi', 'ranged', ['carry', 'support'], 'A', [
    { name: 'Skitterstep', desc: 'Shukuchi даёт бонус скорости атаки после выхода', recommended: true },
    { name: 'Hivemind', desc: 'The Swarm жуки генерируют бонусный XP' }
  ]),
  hero(64, 'jakiro', 'Jakiro', 'int', 'ranged', ['support', 'fullsupport'], 'S', [
    { name: 'Liquid Frost', desc: 'Ice Path замедляет после окончания стана', recommended: true },
    { name: 'Liquid Fire Mastery', desc: 'Liquid Fire наносит больше урона постройкам' }
  ]),
  hero(65, 'batrider', 'Batrider', 'int', 'ranged', ['mid', 'offlane'], 'B', [
    { name: 'Arsonist', desc: 'Sticky Napalm даёт больше стаков за каст', recommended: true },
    { name: 'Riding Free', desc: 'Firefly даёт бонус скорости движения' }
  ]),
  hero(66, 'chen', 'Chen', 'int', 'ranged', ['support', 'fullsupport'], 'C', [
    { name: 'Divine Favor', desc: 'Holy Persuasion усиливает конвертированных крипов', recommended: true },
    { name: 'Centaur Convert', desc: 'Hand of God даёт бонусный армор' }
  ]),
  hero(67, 'spectre', 'Spectre', 'agi', 'melee', ['carry'], 'B', [
    { name: 'Forsaken', desc: 'Dispersion отражает больше урона', recommended: true },
    { name: 'Phantom Rush', desc: 'Haunt иллюзии живут дольше' }
  ]),
  hero(68, 'ancient_apparition', 'Ancient Apparition', 'int', 'ranged', ['support', 'fullsupport'], 'B', [
    { name: 'Exposure', desc: 'Cold Feet наносит больше урона при стане', recommended: true },
    { name: 'Frostbite Cannon', desc: 'Ice Blast имеет больший минимальный радиус' }
  ]),
  hero(69, 'doom_bringer', 'Doom', 'str', 'melee', ['offlane', 'mid'], 'B', [
    { name: 'Impending Doom', desc: 'Doom усиливается с течением времени', recommended: true },
    { name: 'Gluttony', desc: 'Devour даёт бонусное золото и HP' }
  ]),
  hero(70, 'ursa', 'Ursa', 'agi', 'melee', ['carry', 'offlane'], 'S', [
    { name: 'Grudge Bearer', desc: 'Enrage поглощает урон и конвертирует в бонус атаки', recommended: true },
    { name: 'Bear Down', desc: 'Fury Swipes дебафф длится дольше, включая предметы' }
  ]),
  hero(71, 'spirit_breaker', 'Spirit Breaker', 'str', 'melee', ['support', 'offlane'], 'A', [
    { name: 'Bulldoze', desc: 'Charge of Darkness даёт иммунитет к замедлению', recommended: true },
    { name: 'Haste Aura', desc: 'Empowering Haste аура сильнее для ближних союзников' }
  ]),
  hero(72, 'gyrocopter', 'Gyrocopter', 'agi', 'ranged', ['carry', 'mid'], 'B', [
    { name: 'Afterburner', desc: 'Rocket Barrage длится дольше при движении', recommended: true },
    { name: 'Chop Shop', desc: 'Flak Cannon стреляет снарядами в стороны' }
  ]),
  hero(73, 'alchemist', 'Alchemist', 'str', 'melee', ['carry', 'mid'], 'B', [
    { name: 'Seed Money', desc: 'Greevil\'s Greed даёт больше бонусного золота', recommended: true },
    { name: 'Mixologist', desc: 'Chemical Rage хилит союзников рядом' }
  ]),
  hero(74, 'invoker', 'Invoker', 'uni', 'ranged', ['mid'], 'A', [
    { name: 'Elitist', desc: 'Invoke имеет меньше CD, заклинания усилены', recommended: true },
    { name: 'Agnostic', desc: 'Все реагенты дают плоские бонусы к характеристикам' }
  ]),
  hero(75, 'silencer', 'Silencer', 'int', 'ranged', ['support', 'fullsupport', 'mid'], 'B', [
    { name: 'Irrepressible', desc: 'Last Word наносит больше урона при срабатывании', recommended: true },
    { name: 'Reverberating Silence', desc: 'Global Silence дополнительно снижает магрезист' }
  ]),
  hero(76, 'obsidian_destroyer', 'Outworld Destroyer', 'int', 'ranged', ['mid'], 'B', [
    { name: 'Ominous Discernment', desc: 'Astral Imprisonment крадёт интеллект', recommended: true },
    { name: 'Obsidian Decimator', desc: 'Sanity\'s Eclipse наносит больше урона за разницу маны' }
  ]),
  hero(77, 'lycan', 'Lycan', 'str', 'melee', ['offlane', 'carry'], 'A', [
    { name: 'Pack Leader', desc: 'Wolves сильнее и имеют ауру', recommended: true },
    { name: 'Predatory Instinct', desc: 'Shapeshift даёт бонус крита' }
  ]),
  hero(78, 'brewmaster', 'Brewmaster', 'str', 'melee', ['offlane', 'mid'], 'B', [
    { name: 'Roll Out the Barrel', desc: 'Cinder Brew расширяется при поджигании', recommended: true },
    { name: 'Drunken Brawler Stance', desc: 'Drunken Brawler имеет активную и пассивную стойки' }
  ]),
  hero(79, 'shadow_demon', 'Shadow Demon', 'int', 'ranged', ['support', 'fullsupport'], 'B', [
    { name: 'Promulgation', desc: 'Demonic Purge снимает больше баффов', recommended: true },
    { name: 'Menace', desc: 'Shadow Poison даёт бонусный урон на максимальных стаках' }
  ]),
  hero(80, 'lone_druid', 'Lone Druid', 'uni', 'ranged', ['carry', 'offlane', 'mid'], 'C', [
    { name: 'Unbearable', desc: 'Spirit Bear получает бонусные характеристики', recommended: true },
    { name: 'Bear With Me', desc: 'True Form может кастоваться на Spirit Bear' }
  ]),
  hero(81, 'chaos_knight', 'Chaos Knight', 'str', 'melee', ['carry', 'offlane'], 'B', [
    { name: 'Phantasmagoria', desc: 'Phantasm создаёт больше иллюзий', recommended: true },
    { name: 'Strong Illusions', desc: 'Иллюзии получают меньше урона' }
  ]),
  hero(82, 'meepo', 'Meepo', 'agi', 'melee', ['mid', 'carry'], 'A', [
    { name: 'More Meepo', desc: 'Ещё один клон, но слабее', recommended: true },
    { name: 'Pack Rat', desc: 'Meepo клоны делят часть предметов' }
  ]),
  hero(83, 'treant', 'Treant Protector', 'str', 'melee', ['support', 'fullsupport'], 'A', [
    { name: 'Primeval Power', desc: 'Living Armor даёт бонусный урон', recommended: true },
    { name: 'Sapling', desc: 'Nature\'s Guise создаёт саженцы, дающие обзор' }
  ]),
  hero(84, 'ogre_magi', 'Ogre Magi', 'int', 'melee', ['support', 'fullsupport'], 'A', [
    { name: 'Learning Disability', desc: 'Multicast имеет больший шанс с уровнем', recommended: true },
    { name: 'Fat Stacks', desc: 'Fireblast CD снижается при накоплении маны' }
  ]),
  hero(85, 'undying', 'Undying', 'str', 'melee', ['offlane', 'support'], 'B', [
    { name: 'Rotten Flesh', desc: 'Tombstone зомби замедляют сильнее', recommended: true },
    { name: 'Corpse Rage', desc: 'Flesh Golem усиливает урон по маx HP' }
  ]),
  hero(86, 'rubick', 'Rubick', 'int', 'ranged', ['support'], 'A', [
    { name: 'Frugal Filch', desc: 'Spell Steal снижает CD украденного заклинания', recommended: true },
    { name: 'Arcane Accumulator', desc: 'Получает бонус к маг. урону за каждый украденный спелл' }
  ]),
  hero(87, 'disruptor', 'Disruptor', 'int', 'ranged', ['support', 'fullsupport'], 'B', [
    { name: 'Kinetic Fence', desc: 'Kinetic Field не даёт врагам применять заклинания', recommended: true },
    { name: 'Thunderstrike Chain', desc: 'Thunder Strike прыгает на соседних врагов' }
  ]),
  hero(88, 'nyx_assassin', 'Nyx Assassin', 'agi', 'melee', ['support', 'offlane'], 'B', [
    { name: 'Scuttle', desc: 'Vendetta даёт бонус скорости и урона', recommended: true },
    { name: 'Mana Burn Expert', desc: 'Mana Burn наносит больше урона целям с высоким интеллектом' }
  ]),
  hero(89, 'naga_siren', 'Naga Siren', 'agi', 'melee', ['carry', 'mid', 'support'], 'A', [
    { name: 'Deluge', desc: 'Rip Tide наносит больше урона и снижает армор', recommended: true },
    { name: 'Wavefront', desc: 'Mirror Image даёт кратковременный бонус скорости' }
  ]),
  hero(90, 'keeper_of_the_light', 'Keeper of the Light', 'int', 'ranged', ['support', 'fullsupport'], 'B', [
    { name: 'Solar Bind', desc: 'Illuminate также замедляет поражённых врагов', recommended: true },
    { name: 'Recall', desc: 'Chakra Magic даёт бонусное восстановление маны союзнику' }
  ]),
  hero(91, 'wisp', 'IO', 'str', 'ranged', ['support', 'fullsupport'], 'B', [
    { name: 'Tethered Spirits', desc: 'Spirits усиливаются за время привязки', recommended: true },
    { name: 'Mediator', desc: 'Tether распределяет получаемый урон между IO и союзником' }
  ]),
  hero(92, 'visage', 'Visage', 'int', 'ranged', ['mid', 'support', 'offlane'], 'C', [
    { name: 'Death Toll', desc: 'Soul Assumption убийства дают золото + XP', recommended: true },
    { name: 'Lurker', desc: 'Пассивное снижение CD заклинаний вне боя' }
  ]),
  hero(93, 'slark', 'Slark', 'agi', 'melee', ['carry'], 'S', [
    { name: 'Dark Reef Renegade', desc: 'Shadow Dance хилит больше при низком HP', recommended: true },
    { name: 'Leeching Pounce', desc: 'Pounce крадёт характеристики при удержании' }
  ]),
  hero(94, 'medusa', 'Medusa', 'agi', 'ranged', ['carry', 'mid'], 'B', [
    { name: 'Engorged', desc: 'Бонус урона атаки от набранной маны', recommended: true },
    { name: 'Venomous Volley', desc: 'Каждая 5-я атака отравляет (замедление + урон)' }
  ]),
  hero(95, 'troll_warlord', 'Troll Warlord', 'agi', 'melee', ['carry'], 'B', [
    { name: 'Bad Influence', desc: 'Battle Trance также усиливает ближайших союзников', recommended: true },
    { name: 'Insensitive', desc: 'Berserker\'s Rage уменьшает получаемый урон' }
  ]),
  hero(96, 'centaur', 'Centaur Warrunner', 'str', 'melee', ['offlane'], 'B', [
    { name: 'Horsepower', desc: 'Stampede даёт иммунитет к замедлению', recommended: true },
    { name: 'Rawhide', desc: 'Return отражает больше урона от основного атрибута' }
  ]),
  hero(97, 'magnataur', 'Magnus', 'str', 'melee', ['offlane', 'mid'], 'A', [
    { name: 'Reverse Polarity Pull', desc: 'RP притягивает на бо́льшем радиусе', recommended: true },
    { name: 'Empower Aura', desc: 'Empower действует как постоянная аура' }
  ]),
  hero(98, 'shredder', 'Timbersaw', 'str', 'melee', ['offlane'], 'B', [
    { name: 'Twister Chakram', desc: 'Chakram летит по восьмёрке, замедляя от потерянного HP', recommended: true },
    { name: 'Shredder', desc: 'Timber Chain наносит больше урона деревьям и врагам' }
  ]),
  hero(99, 'bristleback', 'Bristleback', 'str', 'melee', ['offlane'], 'A', [
    { name: 'Seeing Red', desc: 'Warpath даёт бонус атаки и скорости движения', recommended: true },
    { name: 'Snot Rocket', desc: 'Nasal Goo бьёт в AoE при получении урона сзади' }
  ]),
  hero(100, 'tusk', 'Tusk', 'str', 'melee', ['support', 'offlane'], 'B', [
    { name: 'Drinking Buddies', desc: 'Tag Team аура сильнее для ближайших союзников', recommended: true },
    { name: 'Frozen Sigil', desc: 'Snowball создаёт ледяной тотем замедления' }
  ]),
  hero(101, 'skywrath_mage', 'Skywrath Mage', 'int', 'ranged', ['support', 'mid'], 'B', [
    { name: 'Staff of Righteousness', desc: 'Mystic Flare фокусирует урон на одной цели', recommended: true },
    { name: 'Shield of the Scion', desc: 'Arcane Bolt Shield — пассивный маг. щит' }
  ]),
  hero(102, 'abaddon', 'Abaddon', 'str', 'melee', ['support', 'offlane', 'carry'], 'A', [
    { name: 'The Quickening', desc: 'CD снижается при смерти юнитов рядом', recommended: true },
    { name: 'Mephitic Shroud', desc: 'Aphotic Shield наносит урон вокруг при получении урона' }
  ]),
  hero(103, 'elder_titan', 'Elder Titan', 'str', 'melee', ['support', 'offlane'], 'B', [
    { name: 'Tip the Scales', desc: 'Natural Order снижает больше армора/резиста', recommended: true },
    { name: 'Deconstruction', desc: 'Earth Splitter снимает баффы с поражённых' }
  ]),
  hero(104, 'legion_commander', 'Legion Commander', 'str', 'melee', ['offlane', 'carry'], 'A', [
    { name: 'Stonehall Plate', desc: 'Moment of Courage даёт бонусный армор', recommended: true },
    { name: 'Overwhelming Odds AoE', desc: 'Overwhelming Odds наносит больше урона за героя' }
  ]),
  hero(105, 'techies', 'Techies', 'int', 'ranged', ['support', 'mid'], 'C', [
    { name: 'Squee\'s Scope', desc: 'Sticky Bomb имеет больший радиус прилипания', recommended: true },
    { name: 'Spleen\'s Secret Sauce', desc: 'Blast Off! хилит Techies при попадании' }
  ]),
  hero(106, 'ember_spirit', 'Ember Spirit', 'agi', 'melee', ['mid', 'carry'], 'S', [
    { name: 'Double Impact', desc: 'Sleight of Fist удваивает урон по героям', recommended: true },
    { name: 'Chain Gang', desc: 'Searing Chains цепляют больше целей' }
  ]),
  hero(107, 'earth_spirit', 'Earth Spirit', 'str', 'melee', ['support', 'offlane'], 'B', [
    { name: 'Ready to Roll', desc: 'Rolling Boulder быстрее и дальше с камнем', recommended: true },
    { name: 'Stone Remnant Charge', desc: 'Камни восстанавливаются быстрее' }
  ]),
  hero(108, 'abyssal_underlord', 'Underlord', 'str', 'melee', ['offlane', 'support'], 'A', [
    { name: 'Abyssal Horde', desc: 'Firestorm вызывает демонов для атак', recommended: true },
    { name: 'Temporal Rift', desc: 'Dark Rift телепортирует быстрее' }
  ]),
  hero(109, 'terrorblade', 'Terrorblade', 'agi', 'melee', ['carry'], 'B', [
    { name: 'Soul Fragment', desc: 'Reflection крадёт часть урона иллюзий', recommended: true },
    { name: 'Condemned', desc: 'Sunder можно использовать на союзниках для хила' }
  ]),
  hero(110, 'phoenix', 'Phoenix', 'str', 'ranged', ['support', 'offlane'], 'A', [
    { name: 'Dying Light', desc: 'Supernova взрывается быстрее при низком HP', recommended: true },
    { name: 'Rebirth', desc: 'Sun Ray хилит больше при каждом тике' }
  ]),
  hero(111, 'oracle', 'Oracle', 'int', 'ranged', ['support', 'fullsupport'], 'B', [
    { name: 'Prognosticate', desc: 'False Promise даёт бонусный хил в конце', recommended: true },
    { name: 'Clairvoyance', desc: 'Purifying Flames наносит меньше урона союзникам' }
  ]),
  hero(112, 'winter_wyvern', 'Winter Wyvern', 'int', 'ranged', ['support', 'fullsupport', 'offlane'], 'S', [
    { name: 'Cold Comfort', desc: 'Cold Embrace даёт бонусный армор + хил усилен', recommended: true },
    { name: 'Icebreaker', desc: 'Winter\'s Curse цели получают больше урона' }
  ]),
  hero(113, 'arc_warden', 'Arc Warden', 'agi', 'ranged', ['mid', 'carry'], 'B', [
    { name: 'Disorder', desc: 'Magnetic Field расширяется со временем', recommended: true },
    { name: 'Impervious', desc: 'Tempest Double длится дольше' }
  ]),
  hero(114, 'monkey_king', 'Monkey King', 'agi', 'melee', ['carry', 'mid', 'offlane'], 'B', [
    { name: 'Simian Stride', desc: 'Tree Dance даёт обзор вокруг и бонус инициации', recommended: true },
    { name: 'Wukong\'s Faithful', desc: 'Wukong\'s Command солдаты сильнее' }
  ]),
  hero(119, 'dark_willow', 'Dark Willow', 'int', 'ranged', ['support'], 'A', [
    { name: 'Thorny Thicket', desc: 'Bramble Maze создаёт больше шипов', recommended: true },
    { name: 'Pixie Dust', desc: 'Shadow Realm даёт невидимость после выхода' }
  ]),
  hero(120, 'pangolier', 'Pangolier', 'agi', 'melee', ['offlane', 'mid'], 'A', [
    { name: 'Double Jump', desc: 'Swashbuckle может использоваться дважды', recommended: true },
    { name: 'Thunderbolt', desc: 'Rolling Thunder бьёт молнией при ударе о стену' }
  ]),
  hero(121, 'grimstroke', 'Grimstroke', 'int', 'ranged', ['support'], 'A', [
    { name: 'Ink Trail', desc: 'Stroke of Fate оставляет след замедления', recommended: true },
    { name: 'Dark Portrait', desc: 'Soulbind связывает на дольше' }
  ]),
  hero(123, 'hoodwink', 'Hoodwink', 'agi', 'ranged', ['support', 'offlane', 'mid'], 'B', [
    { name: 'Treebounce Toss', desc: 'Acorn Shot рикошетит между деревьями', recommended: true },
    { name: 'Sharpshooter Pro', desc: 'Sharpshooter заряжается быстрее' }
  ]),
  hero(126, 'void_spirit', 'Void Spirit', 'int', 'melee', ['mid', 'offlane'], 'A', [
    { name: 'Sanctuary', desc: 'Resonant Pulse щит поглощает все типы урона', recommended: true },
    { name: 'Symmetry', desc: 'Физический щит от маг. урона по героям' }
  ]),
  hero(128, 'snapfire', 'Snapfire', 'str', 'ranged', ['support', 'offlane'], 'A', [
    { name: 'Full Bore', desc: 'Lil\' Shredder пробивает армор при полной дистанции', recommended: true },
    { name: 'Ricochet', desc: 'Scatterblast рикошетит от стен' }
  ]),
  hero(129, 'mars', 'Mars', 'str', 'melee', ['offlane', 'mid'], 'A', [
    { name: 'Arena Champion', desc: 'Arena of Blood даёт бонусный армор внутри', recommended: true },
    { name: 'Phalanx', desc: 'Bulwark блокирует больше урона при активации' }
  ]),
  hero(131, 'ringmaster', 'Ringmaster', 'int', 'ranged', ['support', 'mid'], 'B', [
    { name: 'Center Stage', desc: 'Wheel даёт бонус урона в центре', recommended: true },
    { name: 'Showstopper', desc: 'Escape Act оглушает при приземлении' }
  ]),
  hero(135, 'dawnbreaker', 'Dawnbreaker', 'str', 'melee', ['offlane', 'support', 'carry'], 'B', [
    { name: 'Solar Guardian Heal', desc: 'Solar Guardian хилит больше в зоне', recommended: true },
    { name: 'Gleaming Hammer', desc: 'Celestial Hammer оставляет огненный след' }
  ]),
  hero(136, 'marci', 'Marci', 'str', 'melee', ['support', 'offlane', 'carry'], 'A', [
    { name: 'Bodyguard', desc: 'Sidekick даёт увеличенный лайфстил', recommended: true },
    { name: 'Unleashed Power', desc: 'Unleash бьёт быстрее с каждым ударом' }
  ]),
  hero(137, 'primal_beast', 'Primal Beast', 'str', 'melee', ['offlane', 'mid'], 'A', [
    { name: 'Ferocious', desc: 'Uproar стаки дают больше урона', recommended: true },
    { name: 'Roaming Menace', desc: 'Trample наносит урон по площади при движении' }
  ]),
  hero(138, 'muerta', 'Muerta', 'int', 'ranged', ['carry', 'mid'], 'B', [
    { name: 'Dance of the Dead', desc: 'Dead Shot рикошетит между целями', recommended: true },
    { name: 'Ofrenda', desc: 'The Calling усиливается от убитых юнитов внутри' }
  ]),
  hero(145, 'kez', 'Kez', 'agi', 'melee', ['carry', 'mid', 'offlane'], 'B', [
    { name: 'Whip Blade', desc: 'Falcon Rush наносит больше урона при макс. дальности', recommended: true },
    { name: 'Raptor Dance', desc: 'Gale Force даёт уклонение и скорость' }
  ]),
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
