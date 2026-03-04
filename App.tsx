import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Terminal, Calculator, BrainCircuit, Copy, Check, Code2, ArrowRightLeft, Activity, HelpCircle, Eye, EyeOff, Power, Download, Info, ChevronRight, Laptop, RefreshCw, Users } from 'lucide-react';
import { Vector3, CodeStyle, HeroState, GameEvent } from './types';
import { calculateAngles, generateCSharpCode } from './services/mathUtils';
import { explainMath } from './services/geminiService';
import VectorInput from './components/VectorInput';
import Visualizer from './components/Visualizer';
import RuneTracker from './components/RuneTracker';
import HelpModal from './components/HelpModal';
import TeamPanel from './components/TeamPanel';
import { generateRandomMatch, getHeroCount } from './data/heroesData';

// Hero count for display
const heroCount = getHeroCount();

export default function App() {
    // Math State
    const [src, setSrc] = useState<Vector3>({ x: 0, y: 0, z: 0 });
    const [dst, setDst] = useState<Vector3>({ x: 100, y: 100, z: 50 });

    // Code Gen Config
    const [codeStyle, setCodeStyle] = useState<CodeStyle>(CodeStyle.SYSTEM_NUMERICS);
    const [useDouble, setUseDouble] = useState(false);
    const [normalize, setNormalize] = useState(true);

    // AI State
    const [aiQuery, setAiQuery] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [hasKey, setHasKey] = useState(false);

    // Game State Simulation
    const [heroes, setHeroes] = useState<HeroState[]>(generateRandomMatch());
    const [gameTime, setGameTime] = useState(-10); // Start at -00:10 (pre-game)
    const [gameEvents, setGameEvents] = useState<GameEvent[]>([]);

    // UI State
    const [showHelp, setShowHelp] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isOverlayEnabled, setIsOverlayEnabled] = useState(true);
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'info' } | null>(null);

    // Derived State
    const results = useMemo(() => calculateAngles(src, dst), [src, dst]);
    const generatedCode = useMemo(() =>
        generateCSharpCode({ style: codeStyle, normalize, useDouble }),
        [codeStyle, normalize, useDouble]
    );

    // Effect to check for API Key
    useEffect(() => {
        if (process.env.API_KEY) {
            setHasKey(true);
        }
    }, []);

    // Simulation Loop for Game State & Timer
    useEffect(() => {
        const interval = setInterval(() => {
            setGameTime(prevTime => {
                const newTime = prevTime + 1;

                // Rune Logic: Every 2 minutes (120 seconds) starting from 0
                if (newTime >= 0 && newTime % 120 === 0) {
                    const newEvent: GameEvent = {
                        id: Date.now(),
                        timestamp: newTime,
                        message: "Rune Spawned! Check Top & Bottom River.",
                        type: 'rune'
                    };
                    setGameEvents(prev => [...prev, newEvent]);
                } else if (newTime === 0) {
                    setGameEvents(prev => [...prev, {
                        id: Date.now(),
                        timestamp: 0,
                        message: "Game Started! Creeps spawned.",
                        type: 'system'
                    }]);
                }

                return newTime;
            });

            if (isOverlayEnabled) {
                setHeroes(prevHeroes => prevHeroes.map(hero => {
                    if (!hero.isAlive) return hero;

                    // Simulate Cooldowns
                    const newSkills = hero.skills.map(s => ({
                        ...s,
                        cooldown: s.cooldown > 0 ? Math.max(0, s.cooldown - 1) : 0
                    }));

                    // Simulate Regen
                    const newHp = Math.min(hero.maxHp, hero.hp + 2);
                    const newMana = Math.min(hero.maxMana, hero.mana + 1.5);

                    return { ...hero, skills: newSkills, hp: newHp, mana: newMana };
                }));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [isOverlayEnabled]);

    const showToastMessage = (msg: string, type: 'success' | 'info' = 'success') => {
        setToast({ message: msg, type });
        setTimeout(() => setToast(null), 5000);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCode);
        setCopied(true);
        showToastMessage("Code copied to clipboard!", 'info');
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([generatedCode], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "Warcraft3CamHelper.cs";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

        showToastMessage("✅ 1. Fayl yuklab olindi! Endi 2-qadamga o'ting.", 'success');
        setShowHelp(true); // Auto-open help to show next steps
    };

    const handleAskAi = async () => {
        if (!aiQuery.trim()) return;
        setIsThinking(true);
        try {
            const response = await explainMath(generatedCode, aiQuery);
            setAiResponse(response || 'No response generated.');
        } catch (e) {
            setAiResponse('Error connecting to AI service.');
        }
        setIsThinking(false);
    };

    const sentinelHeroesFiltered = heroes.filter(h => h.team === 'Sentinel');
    const scourgeHeroesFiltered = heroes.filter(h => h.team === 'Scourge');

    const handleNewMatch = () => {
        setHeroes(generateRandomMatch());
        setGameTime(-10);
        setGameEvents([]);
        showToastMessage('🎮 Yangi match boshlandi!', 'info');
    };

    return (
        <div className="min-h-screen bg-black text-gray-300 font-sans p-6 md:p-12 relative">
            <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />

            {/* Toast Notification */}
            {toast && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
                    <div className={`px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border ${toast.type === 'success'
                            ? 'bg-emerald-900/90 border-emerald-500 text-emerald-100'
                            : 'bg-zinc-800/90 border-zinc-500 text-zinc-100'
                        }`}>
                        {toast.type === 'success' ? <Check size={20} className="text-emerald-400" /> : <Info size={20} className="text-blue-400" />}
                        <span className="font-medium">{toast.message}</span>
                    </div>
                </div>
            )}

            <header className="max-w-7xl mx-auto mb-10 flex items-center justify-between border-b border-red-900/30 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Terminal className="text-red-600" size={32} />
                        DotA 1 <span className="text-red-600">DevTools</span>
                    </h1>
                    <p className="text-zinc-500 mt-1">Legacy Engine Math Helper & C# Generator</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setShowHelp(true)}
                        className="flex items-center gap-2 text-sm bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 px-4 py-2 rounded-full transition-colors animate-pulse"
                    >
                        <HelpCircle size={16} />
                        Aniq Yo'riqnoma (Guide)
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEFT COLUMN: Calculator & inputs */}
                <div className="lg:col-span-5 space-y-6">

                    {/* Input Section */}
                    <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 shadow-xl backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-6 text-white">
                            <Calculator size={20} className="text-red-500" />
                            <h2 className="font-semibold">Vector Input</h2>
                        </div>

                        <div className="space-y-4">
                            <VectorInput
                                label="Source Origin (My Hero)"
                                value={src}
                                onChange={setSrc}
                                color="text-blue-500"
                            />

                            <div className="flex justify-center">
                                <ArrowRightLeft className="text-zinc-600 rotate-90" size={20} />
                            </div>

                            <VectorInput
                                label="Destination (Target)"
                                value={dst}
                                onChange={setDst}
                                color="text-red-500"
                            />
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-4 text-white">
                            <Code2 size={20} className="text-emerald-500" />
                            <h2 className="font-semibold">Calculated Values</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-zinc-950 p-4 rounded border border-zinc-800">
                                <div className="text-zinc-500 text-xs uppercase mb-1">Pitch (X)</div>
                                <div className="text-2xl font-mono text-emerald-400">{results.pitch.toFixed(4)}°</div>
                            </div>
                            <div className="bg-zinc-950 p-4 rounded border border-zinc-800">
                                <div className="text-zinc-500 text-xs uppercase mb-1">Yaw (Y)</div>
                                <div className="text-2xl font-mono text-emerald-400">{results.yaw.toFixed(4)}°</div>
                            </div>
                            <div className="col-span-2 bg-zinc-950 p-4 rounded border border-zinc-800 flex justify-between items-center">
                                <div className="text-zinc-500 text-xs uppercase">Distance 3D</div>
                                <div className="font-mono text-zinc-300">{results.distance.toFixed(4)} units</div>
                            </div>
                        </div>

                        <div className="mt-6 h-48">
                            <Visualizer src={src} dst={dst} />
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Code Generation & AI */}
                <div className="lg:col-span-7 space-y-6">

                    {/* WORKFLOW VISUALIZATION */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 flex items-center justify-between gap-2 overflow-x-auto">
                        <div className="flex items-center gap-2 opacity-100 min-w-max">
                            <div className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                            <span className="text-xs font-medium text-blue-200">Download .cs</span>
                        </div>
                        <ChevronRight size={16} className="text-zinc-600" />
                        <div className="flex items-center gap-2 opacity-50 min-w-max">
                            <div className="bg-zinc-700 text-zinc-400 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                            <span className="text-xs font-medium text-zinc-400">Open Visual Studio</span>
                        </div>
                        <ChevronRight size={16} className="text-zinc-600" />
                        <div className="flex items-center gap-2 opacity-50 min-w-max">
                            <div className="bg-zinc-700 text-zinc-400 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                            <span className="text-xs font-medium text-zinc-400">Build DLL</span>
                        </div>
                    </div>

                    {/* C# Code Generator */}
                    <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-full max-h-[600px]">
                        <div className="bg-zinc-900/80 p-4 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4">
                            <h2 className="font-semibold text-white flex items-center gap-2">
                                <Terminal size={18} className="text-purple-500" />
                                Generated C#
                            </h2>

                            <div className="flex items-center gap-2">
                                <select
                                    className="bg-zinc-950 text-xs text-zinc-300 border border-zinc-700 rounded px-2 py-1 focus:outline-none focus:border-red-500"
                                    value={codeStyle}
                                    onChange={(e) => setCodeStyle(e.target.value as CodeStyle)}
                                >
                                    <option value={CodeStyle.SYSTEM_NUMERICS}>System.Numerics</option>
                                    <option value={CodeStyle.UNITY_STYLE}>Unity/Custom Class</option>
                                    <option value={CodeStyle.UNSAFE_POINTER}>Unsafe (float*)</option>
                                </select>
                                <label className="text-xs text-zinc-400 flex items-center gap-1 cursor-pointer select-none">
                                    <input type="checkbox" checked={useDouble} onChange={e => setUseDouble(e.target.checked)} />
                                    Double Precision
                                </label>
                            </div>
                        </div>

                        <div className="relative flex-1 bg-[#1e1e1e] group overflow-hidden">
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all z-10">
                                <button
                                    onClick={handleDownload}
                                    className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded border border-blue-400 flex items-center gap-2 shadow-lg shadow-blue-900/50"
                                    title="Download .cs file (Step 1)"
                                >
                                    <Download size={16} />
                                    <span className="text-xs font-bold">Download .cs</span>
                                </button>
                                <button
                                    onClick={handleCopy}
                                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 p-2 rounded border border-zinc-600"
                                    title="Copy to Clipboard"
                                >
                                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                </button>
                            </div>
                            <div className="p-6 font-mono text-sm overflow-auto h-full text-blue-100 leading-relaxed whitespace-pre">
                                {generatedCode}
                            </div>
                        </div>
                    </div>

                    {/* AI Assistant */}
                    <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-4 text-white">
                            <BrainCircuit size={20} className="text-amber-500" />
                            <h2 className="font-semibold">AI Assistant</h2>
                        </div>

                        {!hasKey ? (
                            <div className="p-4 bg-red-900/20 border border-red-900/50 rounded text-red-200 text-sm">
                                API Key missing. Please provide a Google Gemini API Key in the environment to use AI features.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={aiQuery}
                                        onChange={(e) => setAiQuery(e.target.value)}
                                        placeholder="Ask about Atan2, vector math, or request C++ conversion..."
                                        className="flex-1 bg-zinc-950 border border-zinc-700 rounded px-4 py-2 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                                        onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
                                    />
                                    <button
                                        onClick={handleAskAi}
                                        disabled={isThinking || !aiQuery}
                                        className="bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white px-4 py-2 rounded text-sm font-medium transition-colors border border-zinc-700"
                                    >
                                        {isThinking ? 'Thinking...' : 'Ask'}
                                    </button>
                                </div>

                                {aiResponse && (
                                    <div className="bg-zinc-950 p-4 rounded border border-zinc-800 text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap animate-fade-in">
                                        {aiResponse}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* BOTTOM ROW: Game State Visualizer */}
                <div className="col-span-1 lg:col-span-12 mt-4">
                    <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 relative overflow-hidden">
                        <div className="flex flex-wrap items-center justify-between mb-6 gap-3 relative z-10">
                            <div className="flex items-center gap-3 text-white">
                                <Activity size={20} className="text-orange-500" />
                                <h2 className="font-semibold">Game State Memory Visualizer</h2>
                                <span className="text-xs text-zinc-500 font-mono bg-zinc-800 px-2 py-0.5 rounded">
                                    <Users size={10} className="inline mr-1" />
                                    {heroCount.total} heroes
                                </span>
                            </div>

                            <div className="flex items-center gap-3 flex-wrap">
                                {isOverlayEnabled && (
                                    <>
                                        <div className="hidden md:flex items-center gap-2 text-xs text-purple-400 bg-purple-900/20 px-3 py-1.5 rounded border border-purple-500/30">
                                            <Eye size={12} />
                                            Fog of War: <strong>BYPASSED</strong>
                                        </div>
                                        <button
                                            onClick={handleNewMatch}
                                            className="flex items-center gap-2 px-3 py-1.5 rounded font-bold text-xs bg-amber-600/20 border border-amber-600 text-amber-400 hover:bg-amber-600/30 transition-all"
                                        >
                                            <RefreshCw size={12} />
                                            NEW MATCH
                                        </button>
                                    </>
                                )}

                                <button
                                    onClick={() => setIsOverlayEnabled(!isOverlayEnabled)}
                                    className={`flex items-center gap-2 px-4 py-1.5 rounded font-bold text-xs transition-all border ${isOverlayEnabled
                                            ? 'bg-green-600/20 border-green-600 text-green-400 hover:bg-green-600/30'
                                            : 'bg-zinc-800 border-zinc-600 text-zinc-500 hover:bg-zinc-700'
                                        }`}
                                >
                                    <Power size={14} />
                                    {isOverlayEnabled ? 'OVERLAY ON' : 'OVERLAY OFF'}
                                </button>
                            </div>
                        </div>

                        {isOverlayEnabled ? (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
                                {/* Game Clock & Runes */}
                                <div className="lg:col-span-3">
                                    <RuneTracker gameTime={gameTime} events={gameEvents} />
                                </div>

                                {/* Sentinel Team */}
                                <div className="lg:col-span-4">
                                    <TeamPanel team="Sentinel" heroes={sentinelHeroesFiltered} totalHeroCount={heroCount.sentinel} />
                                </div>

                                {/* Scourge Team */}
                                <div className="lg:col-span-5">
                                    <TeamPanel team="Scourge" heroes={scourgeHeroesFiltered} totalHeroCount={heroCount.scourge} />
                                </div>
                            </div>
                        ) : (
                            <div className="h-64 flex flex-col items-center justify-center text-zinc-600 border border-zinc-800 border-dashed rounded bg-zinc-950/30">
                                <EyeOff size={48} className="mb-4 opacity-50" />
                                <p className="text-lg font-semibold">Overlay Disabled</p>
                                <p className="text-sm">Enable to visualize memory structures</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}