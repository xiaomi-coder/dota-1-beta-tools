import React from 'react';
import { HeroState } from '../types';
import { Skull, Eye } from 'lucide-react';

interface HeroStatusProps {
    hero: HeroState;
}

const attrBorderColor: Record<string, string> = {
    STR: 'border-l-red-500',
    AGI: 'border-l-green-500',
    INT: 'border-l-blue-500',
};
const attrBadgeColor: Record<string, string> = {
    STR: 'bg-red-900/50 text-red-300',
    AGI: 'bg-green-900/50 text-green-300',
    INT: 'bg-blue-900/50 text-blue-300',
};

const HeroStatus: React.FC<HeroStatusProps> = ({ hero }) => {
    const hpPercent = Math.max(0, Math.min(100, (hero.hp / hero.maxHp) * 100));
    const manaPercent = Math.max(0, Math.min(100, (hero.mana / hero.maxMana) * 100));

    return (
        <div className={`relative p-3 rounded-lg border-l-[3px] border border-zinc-700/50 transition-all duration-300 ${attrBorderColor[hero.attribute] || 'border-l-zinc-500'
            } ${hero.isAlive
                ? 'bg-zinc-900 hover:bg-zinc-800/80'
                : 'bg-zinc-950/50 grayscale opacity-60'
            }`}>
            {/* FOG overlay indicator */}
            {hero.inFog && hero.isAlive && (
                <div className="absolute top-1 right-1 flex items-center gap-1 px-1.5 py-0.5 rounded bg-purple-900/60 border border-purple-500/30 z-10">
                    <Eye size={8} className="text-purple-400" />
                    <span className="text-[8px] font-bold text-purple-300 uppercase">FOG</span>
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm select-none">{hero.icon}</span>
                    {!hero.isAlive && <Skull size={12} className="text-red-500" />}
                    <span className={`font-bold text-xs ${hero.isAlive ? 'text-gray-100' : 'text-red-400 line-through'}`}>
                        {hero.name}
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className={`text-[9px] font-bold px-1 rounded ${attrBadgeColor[hero.attribute]}`}>
                        {hero.attribute}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">Lv{hero.level}</span>
                </div>
            </div>

            {/* HP Bar */}
            <div className="relative h-2.5 bg-zinc-950 rounded-sm mb-0.5 overflow-hidden border border-zinc-800">
                <div
                    className={`absolute top-0 left-0 h-full transition-all duration-500 ${hero.isAlive ? 'bg-gradient-to-r from-green-700 to-green-500' : 'bg-zinc-700'}`}
                    style={{ width: `${hpPercent}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-[8px] font-mono font-bold text-white drop-shadow-md z-10">
                    {Math.floor(hero.hp)} / {hero.maxHp}
                </div>
            </div>

            {/* Mana Bar */}
            <div className="relative h-2 bg-zinc-950 rounded-sm mb-2 overflow-hidden border border-zinc-800">
                <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-700 to-blue-500 transition-all duration-500"
                    style={{ width: `${manaPercent}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-[7px] font-mono font-bold text-white drop-shadow-md z-10">
                    {Math.floor(hero.mana)} / {hero.maxMana}
                </div>
            </div>

            {/* Skills */}
            <div className="flex gap-1.5">
                {hero.skills.map((skill) => (
                    <div key={skill.id} className="relative w-7 h-7 bg-zinc-800 border border-zinc-600 rounded flex items-center justify-center group cursor-help overflow-hidden">
                        <span className="text-xs select-none">{skill.icon}</span>

                        {/* Cooldown Overlay */}
                        {skill.cooldown > 0 && (
                            <div className="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-[1px]">
                                <span className="text-[9px] font-bold text-white font-mono">{skill.cooldown}</span>
                            </div>
                        )}

                        {/* Cooldown fill effect */}
                        {skill.cooldown > 0 && (
                            <div
                                className="absolute bottom-0 left-0 w-full bg-red-500/20 pointer-events-none"
                                style={{ height: `${(skill.cooldown / skill.maxCooldown) * 100}%` }}
                            />
                        )}

                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black/95 text-white text-[9px] p-1.5 rounded whitespace-nowrap z-20 border border-zinc-700 shadow-xl">
                            <div className="font-bold text-amber-500">{skill.name}</div>
                            <div className="text-zinc-400">{skill.cooldown > 0 ? `CD: ${skill.cooldown}s` : 'Ready'}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HeroStatus;