import React from 'react';
import { GameEvent } from '../types';
import { Clock, Hourglass, Bell } from 'lucide-react';

interface RuneTrackerProps {
    gameTime: number;
    events: GameEvent[];
}

const RuneTracker: React.FC<RuneTrackerProps> = ({ gameTime, events }) => {
    // Format time as MM:SS
    const formatTime = (seconds: number) => {
        const absSeconds = Math.abs(seconds);
        const m = Math.floor(absSeconds / 60);
        const s = absSeconds % 60;
        const sign = seconds < 0 ? '-' : '';
        return `${sign}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // Calculate time until next rune (Runes spawn every 2 minutes = 120s)
    // Avoid negative modulo issues if time < 0
    const nextRuneTime = gameTime < 0 ? 0 : 120 - (gameTime % 120);
    const progress = ((120 - nextRuneTime) / 120) * 100;
    const isRuneSpawningNow = nextRuneTime === 120 || nextRuneTime === 0;

    return (
        <div className="h-full flex flex-col bg-zinc-900/30 border border-zinc-800 rounded-lg p-4">
            <h3 className="text-amber-500 font-bold mb-4 flex items-center gap-2 pb-2 border-b border-zinc-800">
                <Clock size={18} />
                Game Timer
            </h3>

            {/* Main Clock */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 mb-4 text-center relative overflow-hidden">
                <div className="text-4xl font-mono font-bold text-white tracking-widest relative z-10">
                    {formatTime(gameTime)}
                </div>
                {/* Background Pulse for Rune Spawn */}
                {isRuneSpawningNow && (
                    <div className="absolute inset-0 bg-amber-500/20 animate-pulse"></div>
                )}
            </div>

            {/* Next Rune Countdown */}
            <div className="mb-6">
                <div className="flex justify-between text-xs text-zinc-400 mb-1 font-mono">
                    <span>Next Rune</span>
                    <span>{nextRuneTime}s</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-amber-600 to-yellow-400 transition-all duration-1000 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Event Log */}
            <div className="flex-1 overflow-hidden flex flex-col">
                <h4 className="text-xs font-bold text-zinc-500 uppercase mb-2 flex items-center gap-1">
                    <Bell size={12} />
                    Event Log
                </h4>
                <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                    {events.length === 0 ? (
                        <div className="text-zinc-600 text-xs text-center py-4 italic">No events yet...</div>
                    ) : (
                        events.slice().reverse().map((event) => (
                            <div 
                                key={event.id} 
                                className={`text-xs p-2 rounded border-l-2 flex gap-2 items-start animate-fade-in ${
                                    event.type === 'rune' 
                                        ? 'bg-amber-950/20 border-amber-500 text-amber-100' 
                                        : 'bg-zinc-800/50 border-zinc-600 text-zinc-300'
                                }`}
                            >
                                <span className="font-mono text-zinc-500 shrink-0">
                                    [{formatTime(event.timestamp)}]
                                </span>
                                <span>{event.message}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default RuneTracker;