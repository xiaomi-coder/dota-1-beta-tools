import { HeroState, Skill } from '../types';

// ============================================================
// DotA 1 (Warcraft III) — Barcha Qahramonlar Ro'yxati
// ============================================================

interface HeroTemplate {
    name: string;
    attribute: 'STR' | 'AGI' | 'INT';
    team: 'Sentinel' | 'Scourge';
    icon: string;
    skills: { name: string; icon: string; maxCooldown: number }[];
}

// --- SENTINEL HEROES ---
const sentinelHeroes: HeroTemplate[] = [
    // STR
    { name: 'Earthshaker', attribute: 'STR', team: 'Sentinel', icon: '🗿', skills: [{ name: 'Fissure', icon: '🗿', maxCooldown: 15 }, { name: 'Enchant Totem', icon: '🔨', maxCooldown: 5 }, { name: 'Echo Slam', icon: '⚡', maxCooldown: 150 }] },
    { name: 'Sven', attribute: 'STR', team: 'Sentinel', icon: '⚔️', skills: [{ name: 'Storm Hammer', icon: '🔨', maxCooldown: 13 }, { name: 'Warcry', icon: '🛡️', maxCooldown: 32 }, { name: "God's Strength", icon: '💪', maxCooldown: 80 }] },
    { name: 'Tiny', attribute: 'STR', team: 'Sentinel', icon: '🪨', skills: [{ name: 'Avalanche', icon: '🪨', maxCooldown: 17 }, { name: 'Toss', icon: '🤾', maxCooldown: 9 }, { name: 'Grow', icon: '📈', maxCooldown: 0 }] },
    { name: 'Kunkka', attribute: 'STR', team: 'Sentinel', icon: '⚓', skills: [{ name: 'Torrent', icon: '🌊', maxCooldown: 12 }, { name: 'Tidebringer', icon: '⚓', maxCooldown: 4 }, { name: 'Ghostship', icon: '🚢', maxCooldown: 60 }] },
    { name: 'Dragon Knight', attribute: 'STR', team: 'Sentinel', icon: '🐉', skills: [{ name: 'Breathe Fire', icon: '🔥', maxCooldown: 11 }, { name: 'Dragon Tail', icon: '🐉', maxCooldown: 9 }, { name: 'Elder Dragon Form', icon: '🐲', maxCooldown: 115 }] },
    { name: 'Clockwerk', attribute: 'STR', team: 'Sentinel', icon: '⚙️', skills: [{ name: 'Battery Assault', icon: '🔋', maxCooldown: 32 }, { name: 'Power Cogs', icon: '⚙️', maxCooldown: 15 }, { name: 'Hookshot', icon: '🪝', maxCooldown: 60 }] },
    { name: 'Omniknight', attribute: 'STR', team: 'Sentinel', icon: '✝️', skills: [{ name: 'Purification', icon: '✨', maxCooldown: 10 }, { name: 'Repel', icon: '🛡️', maxCooldown: 14 }, { name: 'Guardian Angel', icon: '👼', maxCooldown: 150 }] },
    { name: 'Huskar', attribute: 'STR', team: 'Sentinel', icon: '🔥', skills: [{ name: 'Inner Vitality', icon: '❤️', maxCooldown: 25 }, { name: 'Burning Spear', icon: '🔥', maxCooldown: 0 }, { name: 'Life Break', icon: '💀', maxCooldown: 45 }] },
    { name: 'Alchemist', attribute: 'STR', team: 'Sentinel', icon: '⚗️', skills: [{ name: 'Acid Spray', icon: '🧪', maxCooldown: 22 }, { name: 'Unstable Concoction', icon: '💣', maxCooldown: 16 }, { name: 'Chemical Rage', icon: '⚗️', maxCooldown: 55 }] },
    { name: 'Brewmaster', attribute: 'STR', team: 'Sentinel', icon: '🍺', skills: [{ name: 'Thunder Clap', icon: '👏', maxCooldown: 12 }, { name: 'Drunken Haze', icon: '🍺', maxCooldown: 8 }, { name: 'Primal Split', icon: '🐻', maxCooldown: 140 }] },
    { name: 'Treant Protector', attribute: 'STR', team: 'Sentinel', icon: '🌳', skills: [{ name: 'Leech Seed', icon: '🌱', maxCooldown: 16 }, { name: 'Living Armor', icon: '🌳', maxCooldown: 32 }, { name: 'Overgrowth', icon: '🌿', maxCooldown: 70 }] },
    { name: 'Wisp', attribute: 'STR', team: 'Sentinel', icon: '💫', skills: [{ name: 'Tether', icon: '🔗', maxCooldown: 12 }, { name: 'Spirits', icon: '💫', maxCooldown: 20 }, { name: 'Relocate', icon: '🌀', maxCooldown: 130 }] },
    { name: 'Centaur Warrunner', attribute: 'STR', team: 'Sentinel', icon: '🐴', skills: [{ name: 'Hoof Stomp', icon: '🦶', maxCooldown: 13 }, { name: 'Double Edge', icon: '⚔️', maxCooldown: 8 }, { name: 'Stampede', icon: '🐴', maxCooldown: 120 }] },
    { name: 'Tusk', attribute: 'STR', team: 'Sentinel', icon: '🥊', skills: [{ name: 'Ice Shards', icon: '❄️', maxCooldown: 18 }, { name: 'Snowball', icon: '☃️', maxCooldown: 21 }, { name: 'Walrus Punch', icon: '🥊', maxCooldown: 36 }] },
    { name: 'Elder Titan', attribute: 'STR', team: 'Sentinel', icon: '🌍', skills: [{ name: 'Echo Stomp', icon: '🦶', maxCooldown: 15 }, { name: 'Astral Spirit', icon: '👻', maxCooldown: 16 }, { name: 'Earth Splitter', icon: '🌍', maxCooldown: 100 }] },
    { name: 'Legion Commander', attribute: 'STR', team: 'Sentinel', icon: '🗡️', skills: [{ name: 'Overwhelming Odds', icon: '⚔️', maxCooldown: 18 }, { name: 'Press the Attack', icon: '💪', maxCooldown: 16 }, { name: 'Duel', icon: '🗡️', maxCooldown: 50 }] },
    { name: 'Phoenix', attribute: 'STR', team: 'Sentinel', icon: '🔆', skills: [{ name: 'Icarus Dive', icon: '🕊️', maxCooldown: 36 }, { name: 'Fire Spirits', icon: '🔥', maxCooldown: 45 }, { name: 'Supernova', icon: '🔆', maxCooldown: 110 }] },
    { name: 'Beastmaster', attribute: 'STR', team: 'Sentinel', icon: '🦅', skills: [{ name: 'Wild Axes', icon: '🪓', maxCooldown: 13 }, { name: 'Call of the Wild', icon: '🦅', maxCooldown: 42 }, { name: 'Primal Roar', icon: '🦁', maxCooldown: 80 }] },

    // AGI
    { name: 'Anti-Mage', attribute: 'AGI', team: 'Sentinel', icon: '🔮', skills: [{ name: 'Mana Break', icon: '🔮', maxCooldown: 0 }, { name: 'Blink', icon: '⚡', maxCooldown: 12 }, { name: 'Mana Void', icon: '💫', maxCooldown: 70 }] },
    { name: 'Drow Ranger', attribute: 'AGI', team: 'Sentinel', icon: '🏹', skills: [{ name: 'Frost Arrows', icon: '❄️', maxCooldown: 0 }, { name: 'Silence', icon: '🤫', maxCooldown: 15 }, { name: 'Marksmanship', icon: '🎯', maxCooldown: 0 }] },
    { name: 'Juggernaut', attribute: 'AGI', team: 'Sentinel', icon: '⚔️', skills: [{ name: 'Blade Fury', icon: '🌀', maxCooldown: 42 }, { name: 'Healing Ward', icon: '💚', maxCooldown: 60 }, { name: 'Omnislash', icon: '⚔️', maxCooldown: 130 }] },
    { name: 'Mirana', attribute: 'AGI', team: 'Sentinel', icon: '🌙', skills: [{ name: 'Starstorm', icon: '⭐', maxCooldown: 12 }, { name: 'Sacred Arrow', icon: '🏹', maxCooldown: 17 }, { name: 'Moonlight Shadow', icon: '🌙', maxCooldown: 140 }] },
    { name: 'Morphling', attribute: 'AGI', team: 'Sentinel', icon: '🌊', skills: [{ name: 'Waveform', icon: '🌊', maxCooldown: 11 }, { name: 'Adaptive Strike', icon: '💧', maxCooldown: 10 }, { name: 'Replicate', icon: '🔄', maxCooldown: 80 }] },
    { name: 'Phantom Lancer', attribute: 'AGI', team: 'Sentinel', icon: '🔱', skills: [{ name: 'Spirit Lance', icon: '🔱', maxCooldown: 7 }, { name: 'Doppelwalk', icon: '👤', maxCooldown: 25 }, { name: 'Juxtapose', icon: '👥', maxCooldown: 0 }] },
    { name: 'Vengeful Spirit', attribute: 'AGI', team: 'Sentinel', icon: '👼', skills: [{ name: 'Magic Missile', icon: '✨', maxCooldown: 10 }, { name: 'Wave of Terror', icon: '😱', maxCooldown: 15 }, { name: 'Nether Swap', icon: '🔄', maxCooldown: 45 }] },
    { name: 'Riki', attribute: 'AGI', team: 'Sentinel', icon: '🗡️', skills: [{ name: 'Smoke Screen', icon: '💨', maxCooldown: 11 }, { name: 'Blink Strike', icon: '⚡', maxCooldown: 20 }, { name: 'Permanent Invisibility', icon: '👻', maxCooldown: 0 }] },
    { name: 'Sniper', attribute: 'AGI', team: 'Sentinel', icon: '🔫', skills: [{ name: 'Shrapnel', icon: '💥', maxCooldown: 15 }, { name: 'Headshot', icon: '🎯', maxCooldown: 0 }, { name: 'Assassinate', icon: '🔫', maxCooldown: 20 }] },
    { name: 'Templar Assassin', attribute: 'AGI', team: 'Sentinel', icon: '🔪', skills: [{ name: 'Refraction', icon: '✨', maxCooldown: 17 }, { name: 'Meld', icon: '👤', maxCooldown: 6 }, { name: 'Psionic Trap', icon: '🪤', maxCooldown: 11 }] },
    { name: 'Luna', attribute: 'AGI', team: 'Sentinel', icon: '🌙', skills: [{ name: 'Lucent Beam', icon: '🌟', maxCooldown: 6 }, { name: 'Moon Glaive', icon: '🌙', maxCooldown: 0 }, { name: 'Eclipse', icon: '🌑', maxCooldown: 140 }] },
    { name: 'Bounty Hunter', attribute: 'AGI', team: 'Sentinel', icon: '💰', skills: [{ name: 'Shuriken Toss', icon: '🌟', maxCooldown: 10 }, { name: 'Wind Walk', icon: '💨', maxCooldown: 15 }, { name: 'Track', icon: '👁️', maxCooldown: 10 }] },
    { name: 'Ursa', attribute: 'AGI', team: 'Sentinel', icon: '🐻', skills: [{ name: 'Earthshock', icon: '🌍', maxCooldown: 6 }, { name: 'Overpower', icon: '💪', maxCooldown: 10 }, { name: 'Enrage', icon: '🐻', maxCooldown: 50 }] },
    { name: 'Gyrocopter', attribute: 'AGI', team: 'Sentinel', icon: '🚁', skills: [{ name: 'Rocket Barrage', icon: '🚀', maxCooldown: 7 }, { name: 'Homing Missile', icon: '🎯', maxCooldown: 20 }, { name: 'Call Down', icon: '💣', maxCooldown: 55 }] },
    { name: 'Lone Druid', attribute: 'AGI', team: 'Sentinel', icon: '🐻', skills: [{ name: 'Summon Bear', icon: '🐻', maxCooldown: 120 }, { name: 'Rabid', icon: '😡', maxCooldown: 30 }, { name: 'True Form', icon: '🐻', maxCooldown: 0 }] },
    { name: 'Naga Siren', attribute: 'AGI', team: 'Sentinel', icon: '🧜', skills: [{ name: 'Mirror Image', icon: '👥', maxCooldown: 40 }, { name: 'Ensnare', icon: '🕸️', maxCooldown: 12 }, { name: 'Song of the Siren', icon: '🎵', maxCooldown: 180 }] },
    { name: 'Troll Warlord', attribute: 'AGI', team: 'Sentinel', icon: '🧌', skills: [{ name: 'Whirling Axes', icon: '🪓', maxCooldown: 12 }, { name: "Berserker's Rage", icon: '😡', maxCooldown: 0 }, { name: 'Battle Trance', icon: '🧌', maxCooldown: 35 }] },
    { name: 'Ember Spirit', attribute: 'AGI', team: 'Sentinel', icon: '🔥', skills: [{ name: 'Searing Chains', icon: '⛓️', maxCooldown: 14 }, { name: 'Sleight of Fist', icon: '✊', maxCooldown: 6 }, { name: 'Fire Remnant', icon: '🔥', maxCooldown: 0 }] },

    // INT
    { name: 'Crystal Maiden', attribute: 'INT', team: 'Sentinel', icon: '❄️', skills: [{ name: 'Crystal Nova', icon: '❄️', maxCooldown: 12 }, { name: 'Frostbite', icon: '🥶', maxCooldown: 10 }, { name: 'Freezing Field', icon: '🌨️', maxCooldown: 90 }] },
    { name: 'Puck', attribute: 'INT', team: 'Sentinel', icon: '🧚', skills: [{ name: 'Illusory Orb', icon: '🔮', maxCooldown: 11 }, { name: 'Waning Rift', icon: '💨', maxCooldown: 16 }, { name: 'Dream Coil', icon: '🌀', maxCooldown: 85 }] },
    { name: 'Storm Spirit', attribute: 'INT', team: 'Sentinel', icon: '⛈️', skills: [{ name: 'Static Remnant', icon: '⚡', maxCooldown: 4 }, { name: 'Electric Vortex', icon: '🌀', maxCooldown: 21 }, { name: 'Ball Lightning', icon: '⛈️', maxCooldown: 0 }] },
    { name: 'Windrunner', attribute: 'INT', team: 'Sentinel', icon: '🌬️', skills: [{ name: 'Shackleshot', icon: '⛓️', maxCooldown: 12 }, { name: 'Powershot', icon: '🏹', maxCooldown: 9 }, { name: 'Focus Fire', icon: '🎯', maxCooldown: 60 }] },
    { name: 'Zeus', attribute: 'INT', team: 'Sentinel', icon: '⚡', skills: [{ name: 'Arc Lightning', icon: '⚡', maxCooldown: 2 }, { name: 'Lightning Bolt', icon: '🔥', maxCooldown: 6 }, { name: "Thundergod's Wrath", icon: '⛈️', maxCooldown: 90 }] },
    { name: 'Lina', attribute: 'INT', team: 'Sentinel', icon: '🔥', skills: [{ name: 'Dragon Slave', icon: '🐉', maxCooldown: 8 }, { name: 'Light Strike Array', icon: '💥', maxCooldown: 7 }, { name: 'Laguna Blade', icon: '⚡', maxCooldown: 70 }] },
    { name: 'Shadow Shaman', attribute: 'INT', team: 'Sentinel', icon: '🐸', skills: [{ name: 'Ether Shock', icon: '⚡', maxCooldown: 14 }, { name: 'Hex', icon: '🐸', maxCooldown: 13 }, { name: 'Mass Serpent Ward', icon: '🐍', maxCooldown: 110 }] },
    { name: 'Tinker', attribute: 'INT', team: 'Sentinel', icon: '🔧', skills: [{ name: 'Laser', icon: '🔴', maxCooldown: 14 }, { name: 'Heat-Seeking Missile', icon: '🚀', maxCooldown: 25 }, { name: 'Rearm', icon: '🔧', maxCooldown: 3 }] },
    { name: "Nature's Prophet", attribute: 'INT', team: 'Sentinel', icon: '🌲', skills: [{ name: 'Sprout', icon: '🌱', maxCooldown: 11 }, { name: 'Teleportation', icon: '🌀', maxCooldown: 50 }, { name: 'Wrath of Nature', icon: '🌲', maxCooldown: 90 }] },
    { name: 'Enchantress', attribute: 'INT', team: 'Sentinel', icon: '🦌', skills: [{ name: 'Enchant', icon: '✨', maxCooldown: 30 }, { name: "Nature's Attendants", icon: '🌸', maxCooldown: 45 }, { name: 'Impetus', icon: '🦌', maxCooldown: 0 }] },
    { name: 'Jakiro', attribute: 'INT', team: 'Sentinel', icon: '🐲', skills: [{ name: 'Dual Breath', icon: '🔥', maxCooldown: 10 }, { name: 'Ice Path', icon: '❄️', maxCooldown: 12 }, { name: 'Macropyre', icon: '🐲', maxCooldown: 60 }] },
    { name: 'Chen', attribute: 'INT', team: 'Sentinel', icon: '⛪', skills: [{ name: 'Penitence', icon: '✝️', maxCooldown: 14 }, { name: 'Holy Persuasion', icon: '⛪', maxCooldown: 30 }, { name: 'Hand of God', icon: '🖐️', maxCooldown: 160 }] },
    { name: 'Silencer', attribute: 'INT', team: 'Sentinel', icon: '🤫', skills: [{ name: 'Curse of the Silent', icon: '🤫', maxCooldown: 20 }, { name: 'Last Word', icon: '📖', maxCooldown: 36 }, { name: 'Global Silence', icon: '🔇', maxCooldown: 130 }] },
    { name: 'Ogre Magi', attribute: 'INT', team: 'Sentinel', icon: '👹', skills: [{ name: 'Fireblast', icon: '🔥', maxCooldown: 12 }, { name: 'Ignite', icon: '💥', maxCooldown: 15 }, { name: 'Multicast', icon: '👹', maxCooldown: 0 }] },
    { name: 'Rubick', attribute: 'INT', team: 'Sentinel', icon: '🧙', skills: [{ name: 'Telekinesis', icon: '🌀', maxCooldown: 22 }, { name: 'Fade Bolt', icon: '💜', maxCooldown: 16 }, { name: 'Spell Steal', icon: '🧙', maxCooldown: 20 }] },
    { name: 'Disruptor', attribute: 'INT', team: 'Sentinel', icon: '🌩️', skills: [{ name: 'Thunder Strike', icon: '⛈️', maxCooldown: 12 }, { name: 'Glimpse', icon: '👁️', maxCooldown: 65 }, { name: 'Static Storm', icon: '🌩️', maxCooldown: 90 }] },
    { name: 'Keeper of the Light', attribute: 'INT', team: 'Sentinel', icon: '🌟', skills: [{ name: 'Illuminate', icon: '💡', maxCooldown: 11 }, { name: 'Mana Leak', icon: '💧', maxCooldown: 16 }, { name: 'Spirit Form', icon: '🌟', maxCooldown: 80 }] },
    { name: 'Skywrath Mage', attribute: 'INT', team: 'Sentinel', icon: '🦅', skills: [{ name: 'Arcane Bolt', icon: '🔮', maxCooldown: 5 }, { name: 'Concussive Shot', icon: '💫', maxCooldown: 18 }, { name: 'Mystic Flare', icon: '🦅', maxCooldown: 60 }] },
];

// --- SCOURGE HEROES ---
const scourgeHeroes: HeroTemplate[] = [
    // STR
    { name: 'Axe', attribute: 'STR', team: 'Scourge', icon: '🪓', skills: [{ name: 'Berserker\'s Call', icon: '📢', maxCooldown: 16 }, { name: 'Battle Hunger', icon: '🩸', maxCooldown: 20 }, { name: 'Culling Blade', icon: '🪓', maxCooldown: 75 }] },
    { name: 'Pudge', attribute: 'STR', team: 'Scourge', icon: '🪝', skills: [{ name: 'Meat Hook', icon: '🪝', maxCooldown: 11 }, { name: 'Rot', icon: '🤢', maxCooldown: 0 }, { name: 'Dismember', icon: '🔪', maxCooldown: 30 }] },
    { name: 'Sand King', attribute: 'STR', team: 'Scourge', icon: '🦂', skills: [{ name: 'Burrowstrike', icon: '🦂', maxCooldown: 11 }, { name: 'Sand Storm', icon: '🌪️', maxCooldown: 34 }, { name: 'Epicenter', icon: '🌍', maxCooldown: 120 }] },
    { name: 'Slardar', attribute: 'STR', team: 'Scourge', icon: '🐊', skills: [{ name: 'Slithereen Crush', icon: '👊', maxCooldown: 8 }, { name: 'Sprint', icon: '🏃', maxCooldown: 28 }, { name: 'Amplify Damage', icon: '🐊', maxCooldown: 25 }] },
    { name: 'Tidehunter', attribute: 'STR', team: 'Scourge', icon: '🐙', skills: [{ name: 'Gush', icon: '🌊', maxCooldown: 12 }, { name: 'Kraken Shell', icon: '🐚', maxCooldown: 0 }, { name: 'Ravage', icon: '🐙', maxCooldown: 150 }] },
    { name: 'Wraith King', attribute: 'STR', team: 'Scourge', icon: '👑', skills: [{ name: 'Wraithfire Blast', icon: '🔥', maxCooldown: 8 }, { name: 'Vampiric Aura', icon: '🧛', maxCooldown: 0 }, { name: 'Reincarnation', icon: '👑', maxCooldown: 200 }] },
    { name: 'Lifestealer', attribute: 'STR', team: 'Scourge', icon: '🧟', skills: [{ name: 'Rage', icon: '😡', maxCooldown: 18 }, { name: 'Feast', icon: '🍖', maxCooldown: 0 }, { name: 'Infest', icon: '🧟', maxCooldown: 100 }] },
    { name: 'Night Stalker', attribute: 'STR', team: 'Scourge', icon: '🦇', skills: [{ name: 'Void', icon: '🌑', maxCooldown: 11 }, { name: 'Crippling Fear', icon: '😨', maxCooldown: 12 }, { name: 'Darkness', icon: '🦇', maxCooldown: 160 }] },
    { name: 'Doom', attribute: 'STR', team: 'Scourge', icon: '😈', skills: [{ name: 'Devour', icon: '🍽️', maxCooldown: 70 }, { name: 'Scorched Earth', icon: '🔥', maxCooldown: 60 }, { name: 'Doom', icon: '😈', maxCooldown: 145 }] },
    { name: 'Spirit Breaker', attribute: 'STR', team: 'Scourge', icon: '🐂', skills: [{ name: 'Charge of Darkness', icon: '🐂', maxCooldown: 35 }, { name: 'Empowering Haste', icon: '💨', maxCooldown: 0 }, { name: 'Nether Strike', icon: '👊', maxCooldown: 80 }] },
    { name: 'Lycanthrope', attribute: 'STR', team: 'Scourge', icon: '🐺', skills: [{ name: 'Summon Wolves', icon: '🐺', maxCooldown: 30 }, { name: 'Howl', icon: '🌕', maxCooldown: 50 }, { name: 'Shapeshift', icon: '🐺', maxCooldown: 120 }] },
    { name: 'Chaos Knight', attribute: 'STR', team: 'Scourge', icon: '🏇', skills: [{ name: 'Chaos Bolt', icon: '💫', maxCooldown: 10 }, { name: 'Reality Rift', icon: '🌀', maxCooldown: 18 }, { name: 'Phantasm', icon: '🏇', maxCooldown: 130 }] },
    { name: 'Undying', attribute: 'STR', team: 'Scourge', icon: '🧟', skills: [{ name: 'Decay', icon: '💀', maxCooldown: 10 }, { name: 'Tombstone', icon: '🪦', maxCooldown: 60 }, { name: 'Flesh Golem', icon: '🧟', maxCooldown: 75 }] },
    { name: 'Magnus', attribute: 'STR', team: 'Scourge', icon: '🦏', skills: [{ name: 'Shockwave', icon: '🌊', maxCooldown: 10 }, { name: 'Empower', icon: '💪', maxCooldown: 12 }, { name: 'Reverse Polarity', icon: '🧲', maxCooldown: 120 }] },
    { name: 'Abaddon', attribute: 'STR', team: 'Scourge', icon: '🖤', skills: [{ name: 'Mist Coil', icon: '💨', maxCooldown: 5 }, { name: 'Aphotic Shield', icon: '🛡️', maxCooldown: 12 }, { name: 'Borrowed Time', icon: '🖤', maxCooldown: 60 }] },
    { name: 'Bristleback', attribute: 'STR', team: 'Scourge', icon: '🦔', skills: [{ name: 'Viscous Nasal Goo', icon: '🤧', maxCooldown: 1 }, { name: 'Quill Spray', icon: '🦔', maxCooldown: 3 }, { name: 'Warpath', icon: '🏃', maxCooldown: 0 }] },

    // AGI
    { name: 'Bloodseeker', attribute: 'AGI', team: 'Scourge', icon: '🩸', skills: [{ name: 'Bloodrage', icon: '🩸', maxCooldown: 12 }, { name: 'Blood Rite', icon: '🔴', maxCooldown: 12 }, { name: 'Rupture', icon: '💉', maxCooldown: 60 }] },
    { name: 'Shadow Fiend', attribute: 'AGI', team: 'Scourge', icon: '😈', skills: [{ name: 'Shadowraze', icon: '🔥', maxCooldown: 10 }, { name: 'Necromastery', icon: '💀', maxCooldown: 0 }, { name: 'Requiem of Souls', icon: '👻', maxCooldown: 120 }] },
    { name: 'Razor', attribute: 'AGI', team: 'Scourge', icon: '⚡', skills: [{ name: 'Plasma Field', icon: '⚡', maxCooldown: 14 }, { name: 'Static Link', icon: '🔗', maxCooldown: 32 }, { name: 'Eye of the Storm', icon: '🌩️', maxCooldown: 80 }] },
    { name: 'Venomancer', attribute: 'AGI', team: 'Scourge', icon: '🐍', skills: [{ name: 'Venomous Gale', icon: '💨', maxCooldown: 22 }, { name: 'Plague Ward', icon: '🐍', maxCooldown: 5 }, { name: 'Poison Nova', icon: '☠️', maxCooldown: 140 }] },
    { name: 'Faceless Void', attribute: 'AGI', team: 'Scourge', icon: '🕐', skills: [{ name: 'Time Walk', icon: '⏳', maxCooldown: 24 }, { name: 'Backtrack', icon: '🔙', maxCooldown: 0 }, { name: 'Chronosphere', icon: '🕐', maxCooldown: 120 }] },
    { name: 'Phantom Assassin', attribute: 'AGI', team: 'Scourge', icon: '🗡️', skills: [{ name: 'Stifling Dagger', icon: '🗡️', maxCooldown: 6 }, { name: 'Phantom Strike', icon: '⚡', maxCooldown: 14 }, { name: 'Coup de Grace', icon: '💀', maxCooldown: 0 }] },
    { name: 'Viper', attribute: 'AGI', team: 'Scourge', icon: '🐍', skills: [{ name: 'Poison Attack', icon: '☠️', maxCooldown: 0 }, { name: 'Corrosive Skin', icon: '🐍', maxCooldown: 0 }, { name: 'Viper Strike', icon: '🐍', maxCooldown: 12 }] },
    { name: 'Clinkz', attribute: 'AGI', team: 'Scourge', icon: '💀', skills: [{ name: 'Strafe', icon: '🏹', maxCooldown: 30 }, { name: 'Skeleton Walk', icon: '💀', maxCooldown: 20 }, { name: 'Death Pact', icon: '☠️', maxCooldown: 45 }] },
    { name: 'Broodmother', attribute: 'AGI', team: 'Scourge', icon: '🕷️', skills: [{ name: 'Spawn Spiderlings', icon: '🕷️', maxCooldown: 10 }, { name: 'Spin Web', icon: '🕸️', maxCooldown: 40 }, { name: 'Insatiable Hunger', icon: '🕷️', maxCooldown: 45 }] },
    { name: 'Weaver', attribute: 'AGI', team: 'Scourge', icon: '🪲', skills: [{ name: 'The Swarm', icon: '🐛', maxCooldown: 36 }, { name: 'Shukuchi', icon: '💨', maxCooldown: 12 }, { name: 'Time Lapse', icon: '⏪', maxCooldown: 65 }] },
    { name: 'Spectre', attribute: 'AGI', team: 'Scourge', icon: '👻', skills: [{ name: 'Spectral Dagger', icon: '🗡️', maxCooldown: 16 }, { name: 'Dispersion', icon: '🌀', maxCooldown: 0 }, { name: 'Haunt', icon: '👻', maxCooldown: 120 }] },
    { name: 'Nyx Assassin', attribute: 'AGI', team: 'Scourge', icon: '🪲', skills: [{ name: 'Impale', icon: '🦂', maxCooldown: 13 }, { name: 'Mana Burn', icon: '🔮', maxCooldown: 28 }, { name: 'Vendetta', icon: '🪲', maxCooldown: 66 }] },
    { name: 'Slark', attribute: 'AGI', team: 'Scourge', icon: '🐟', skills: [{ name: 'Pounce', icon: '🐟', maxCooldown: 20 }, { name: 'Essence Shift', icon: '💨', maxCooldown: 0 }, { name: 'Shadow Dance', icon: '🌑', maxCooldown: 60 }] },
    { name: 'Medusa', attribute: 'AGI', team: 'Scourge', icon: '🐍', skills: [{ name: 'Mystic Snake', icon: '🐍', maxCooldown: 11 }, { name: 'Mana Shield', icon: '🛡️', maxCooldown: 0 }, { name: 'Stone Gaze', icon: '👁️', maxCooldown: 90 }] },
    { name: 'Terrorblade', attribute: 'AGI', team: 'Scourge', icon: '😈', skills: [{ name: 'Reflection', icon: '🪞', maxCooldown: 22 }, { name: 'Metamorphosis', icon: '😈', maxCooldown: 155 }, { name: 'Sunder', icon: '💀', maxCooldown: 120 }] },

    // INT
    { name: 'Bane', attribute: 'INT', team: 'Scourge', icon: '😱', skills: [{ name: 'Nightmare', icon: '💤', maxCooldown: 15 }, { name: 'Brain Sap', icon: '🧠', maxCooldown: 14 }, { name: "Fiend's Grip", icon: '😱', maxCooldown: 100 }] },
    { name: 'Lich', attribute: 'INT', team: 'Scourge', icon: '🧊', skills: [{ name: 'Frost Blast', icon: '❄️', maxCooldown: 8 }, { name: 'Sacrifice', icon: '💀', maxCooldown: 35 }, { name: 'Chain Frost', icon: '🧊', maxCooldown: 60 }] },
    { name: 'Lion', attribute: 'INT', team: 'Scourge', icon: '🦁', skills: [{ name: 'Earth Spike', icon: '🌍', maxCooldown: 12 }, { name: 'Hex', icon: '🐸', maxCooldown: 15 }, { name: 'Finger of Death', icon: '☝️', maxCooldown: 160 }] },
    { name: 'Witch Doctor', attribute: 'INT', team: 'Scourge', icon: '💀', skills: [{ name: 'Paralyzing Cask', icon: '🧪', maxCooldown: 15 }, { name: 'Voodoo Restoration', icon: '❤️', maxCooldown: 0 }, { name: 'Death Ward', icon: '💀', maxCooldown: 80 }] },
    { name: 'Enigma', attribute: 'INT', team: 'Scourge', icon: '🌌', skills: [{ name: 'Malefice', icon: '🔮', maxCooldown: 15 }, { name: 'Demonic Conversion', icon: '👹', maxCooldown: 35 }, { name: 'Black Hole', icon: '🌌', maxCooldown: 200 }] },
    { name: 'Necrophos', attribute: 'INT', team: 'Scourge', icon: '☠️', skills: [{ name: 'Death Pulse', icon: '💀', maxCooldown: 8 }, { name: 'Heartstopper Aura', icon: '💔', maxCooldown: 0 }, { name: "Reaper's Scythe", icon: '☠️', maxCooldown: 100 }] },
    { name: 'Warlock', attribute: 'INT', team: 'Scourge', icon: '🔮', skills: [{ name: 'Fatal Bonds', icon: '⛓️', maxCooldown: 25 }, { name: 'Shadow Word', icon: '📜', maxCooldown: 16 }, { name: 'Rain of Chaos', icon: '🔮', maxCooldown: 165 }] },
    { name: 'Queen of Pain', attribute: 'INT', team: 'Scourge', icon: '👸', skills: [{ name: 'Shadow Strike', icon: '🗡️', maxCooldown: 15 }, { name: 'Blink', icon: '⚡', maxCooldown: 12 }, { name: 'Sonic Wave', icon: '🔊', maxCooldown: 135 }] },
    { name: 'Death Prophet', attribute: 'INT', team: 'Scourge', icon: '💀', skills: [{ name: 'Crypt Swarm', icon: '🦇', maxCooldown: 8 }, { name: 'Silence', icon: '🤫', maxCooldown: 15 }, { name: 'Exorcism', icon: '💀', maxCooldown: 145 }] },
    { name: 'Pugna', attribute: 'INT', team: 'Scourge', icon: '💚', skills: [{ name: 'Nether Blast', icon: '💥', maxCooldown: 5 }, { name: 'Decrepify', icon: '👻', maxCooldown: 12 }, { name: 'Life Drain', icon: '💚', maxCooldown: 22 }] },
    { name: 'Dazzle', attribute: 'INT', team: 'Scourge', icon: '🌈', skills: [{ name: 'Poison Touch', icon: '☠️', maxCooldown: 15 }, { name: 'Shallow Grave', icon: '🪦', maxCooldown: 60 }, { name: 'Weave', icon: '🌈', maxCooldown: 40 }] },
    { name: 'Leshrac', attribute: 'INT', team: 'Scourge', icon: '🦄', skills: [{ name: 'Split Earth', icon: '🌍', maxCooldown: 9 }, { name: 'Diabolic Edict', icon: '💥', maxCooldown: 22 }, { name: 'Pulse Nova', icon: '🦄', maxCooldown: 0 }] },
    { name: 'Dark Seer', attribute: 'INT', team: 'Scourge', icon: '🟣', skills: [{ name: 'Vacuum', icon: '🌀', maxCooldown: 28 }, { name: 'Ion Shell', icon: '🟣', maxCooldown: 9 }, { name: 'Wall of Replica', icon: '🪞', maxCooldown: 100 }] },
    { name: 'Batrider', attribute: 'INT', team: 'Scourge', icon: '🦇', skills: [{ name: 'Sticky Napalm', icon: '🛢️', maxCooldown: 3 }, { name: 'Flamebreak', icon: '💥', maxCooldown: 14 }, { name: 'Flaming Lasso', icon: '🦇', maxCooldown: 90 }] },
    { name: 'Ancient Apparition', attribute: 'INT', team: 'Scourge', icon: '🧊', skills: [{ name: 'Cold Feet', icon: '🥶', maxCooldown: 13 }, { name: 'Ice Vortex', icon: '❄️', maxCooldown: 4 }, { name: 'Ice Blast', icon: '🧊', maxCooldown: 40 }] },
    { name: 'Invoker', attribute: 'INT', team: 'Scourge', icon: '🌟', skills: [{ name: 'Quas', icon: '🔵', maxCooldown: 0 }, { name: 'Wex', icon: '🟣', maxCooldown: 0 }, { name: 'Invoke', icon: '🌟', maxCooldown: 22 }] },
    { name: 'Outworld Destroyer', attribute: 'INT', team: 'Scourge', icon: '🌀', skills: [{ name: 'Astral Imprisonment', icon: '🌀', maxCooldown: 18 }, { name: 'Essence Aura', icon: '✨', maxCooldown: 0 }, { name: "Sanity's Eclipse", icon: '🌑', maxCooldown: 160 }] },
    { name: 'Shadow Demon', attribute: 'INT', team: 'Scourge', icon: '😈', skills: [{ name: 'Disruption', icon: '🔮', maxCooldown: 27 }, { name: 'Soul Catcher', icon: '👤', maxCooldown: 13 }, { name: 'Demonic Purge', icon: '😈', maxCooldown: 40 }] },
    { name: 'Visage', attribute: 'INT', team: 'Scourge', icon: '🦅', skills: [{ name: 'Grave Chill', icon: '🥶', maxCooldown: 16 }, { name: 'Soul Assumption', icon: '💀', maxCooldown: 4 }, { name: 'Summon Familiars', icon: '🦅', maxCooldown: 180 }] },
];

// ============================================================
// All heroes combined
// ============================================================
export const ALL_HEROES: HeroTemplate[] = [...sentinelHeroes, ...scourgeHeroes];

// ============================================================
// Random Match Generator
// ============================================================
function shuffleArray<T>(arr: T[]): T[] {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function templateToHeroState(template: HeroTemplate, id: number): HeroState {
    const level = randomInt(1, 25);

    // Base stats scaled by attribute and level
    const baseHp = template.attribute === 'STR' ? 700 : template.attribute === 'AGI' ? 500 : 450;
    const baseMana = template.attribute === 'INT' ? 500 : template.attribute === 'STR' ? 250 : 300;

    const maxHp = baseHp + level * randomInt(40, 80);
    const maxMana = baseMana + level * randomInt(20, 50);

    const isAlive = Math.random() > 0.15; // 15% chance dead
    const inFog = Math.random() > 0.5; // 50% chance in fog

    const hp = isAlive ? randomInt(Math.floor(maxHp * 0.2), maxHp) : 0;
    const mana = isAlive ? randomInt(Math.floor(maxMana * 0.1), maxMana) : 0;

    const skills: Skill[] = template.skills.map((s, i) => ({
        id: String(i + 1),
        name: s.name,
        icon: s.icon,
        maxCooldown: s.maxCooldown,
        cooldown: s.maxCooldown > 0 ? randomInt(0, s.maxCooldown) : 0,
    }));

    return {
        id,
        name: template.name,
        level,
        hp,
        maxHp,
        mana,
        maxMana,
        skills,
        isAlive,
        team: template.team,
        attribute: template.attribute,
        icon: template.icon,
        inFog,
    };
}

/**
 * Generates a random 5v5 match by picking 5 heroes from each team.
 */
export function generateRandomMatch(): HeroState[] {
    const sentinelPicks = shuffleArray(sentinelHeroes).slice(0, 5);
    const scourgePicks = shuffleArray(scourgeHeroes).slice(0, 5);

    const allPicks = [...sentinelPicks, ...scourgePicks];
    return allPicks.map((template, i) => templateToHeroState(template, i + 1));
}

/**
 * Returns total hero count.
 */
export function getHeroCount(): { sentinel: number; scourge: number; total: number } {
    return {
        sentinel: sentinelHeroes.length,
        scourge: scourgeHeroes.length,
        total: ALL_HEROES.length,
    };
}
