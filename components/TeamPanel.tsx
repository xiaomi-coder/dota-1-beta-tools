import React, { useState } from 'react';
import { HeroState } from '../types';
import HeroStatus from './HeroStatus';

interface TeamPanelProps {
    team: 'Sentinel' | 'Scourge';
    heroes: HeroState[];
    totalHeroCount: number;
}

const TeamPanel: React.FC<TeamPanelProps> = ({ team, heroes, totalHeroCount }) => {
    const [filter, setFilter] = useState<'ALL' | 'STR' | 'AGI' | 'INT'>('ALL');

    const isSentinel = team === 'Sentinel';
    const teamColor = isSentinel ? 'emerald' : 'red';
    const dotShadow = isSentinel
        ? 'shadow-[0_0_10px_rgba(16,185,129,0.5)]'
        : 'shadow-[0_0_10px_rgba(239,68,68,0.5)]';
    const memBase = isSentinel ? '0x6F3A..B0' : '0x8A2C..D4';

    const filtered = filter === 'ALL' ? heroes : heroes.filter(h => h.attribute === filter);

    const aliveCount = heroes.filter(h => h.isAlive).length;
    const deadCount = heroes.filter(h => !h.isAlive).length;
    const avgLevel = heroes.length > 0
        ? (heroes.reduce((sum, h) => sum + h.level, 0) / heroes.length).toFixed(1)
        : '0';

    const attrColors: Record<string, string> = {
        ALL: 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600',
        STR: 'bg-red-900/40 text-red-300 hover:bg-red-900/60 border-red-700/50',
        AGI: 'bg-green-900/40 text-green-300 hover:bg-green-900/60 border-green-700/50',
        INT: 'bg-blue-900/40 text-blue-300 hover:bg-blue-900/60 border-blue-700/50',
    };
    const attrActiveColors: Record<string, string> = {
        ALL: 'bg-zinc-600 text-white ring-1 ring-zinc-400',
        STR: 'bg-red-700 text-white ring-1 ring-red-400',
        AGI: 'bg-green-700 text-white ring-1 ring-green-400',
        INT: 'bg-blue-700 text-white ring-1 ring-blue-400',
    };

    return (
        <div className="bg-zinc-950/30 rounded-lg p-4 border border-zinc-800/50 flex flex-col">
            {/* Header */}
            <h3 className={`text-${teamColor}-500 font-bold mb-3 flex items-center gap-2 pb-2 border-b border-zinc-800`}>
                <div className={`w-3 h-3 rounded-full bg-${teamColor}-500 ${dotShadow}`}></div>
                {team}
                <span className="ml-auto text-xs font-normal text-zinc-600">Base: {memBase}</span>
            </h3>

            {/* Stats Row */}
            <div className="flex items-center gap-3 mb-3 text-[10px] font-mono">
                <span className="text-emerald-400">✓ {aliveCount} tirik</span>
                <span className="text-red-400">✗ {deadCount} o'lik</span>
                <span className="text-zinc-500">~Lvl {avgLevel}</span>
                <span className="text-zinc-600 ml-auto">{totalHeroCount} hero pool</span>
            </div>

            {/* Attribute Filters */}
            <div className="flex gap-1 mb-3">
                {(['ALL', 'STR', 'AGI', 'INT'] as const).map(attr => (
                    <button
                        key={attr}
                        onClick={() => setFilter(attr)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all border border-transparent ${filter === attr ? attrActiveColors[attr] : attrColors[attr]
                            }`}
                    >
                        {attr}
                    </button>
                ))}
            </div>

            {/* Hero List */}
            <div className="grid gap-2 overflow-y-auto max-h-[500px] pr-1 custom-scrollbar flex-1">
                {filtered.length > 0 ? (
                    filtered.map((h) => <HeroStatus key={h.id} hero={h} />)
                ) : (
                    <div className="text-zinc-600 text-xs text-center py-4 italic">
                        Bu attributda qahramon yo'q
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamPanel;
