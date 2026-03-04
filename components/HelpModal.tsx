import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
            <div className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-lg w-full shadow-2xl relative overflow-hidden">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="bg-zinc-950 p-6 border-b border-zinc-800">
                    <h2 className="text-xl font-bold text-white">Aniq Yo'riqnoma (Instructions)</h2>
                    <p className="text-zinc-500 text-sm mt-1">DLL fayl yaratish uchun 3 ta qadam:</p>
                </div>

                <div className="p-6 space-y-6">
                    {/* Step 1 */}
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                            1
                        </div>
                        <div>
                            <h3 className="text-white font-bold">Faylni yuklab oling</h3>
                            <p className="text-sm text-zinc-400 mt-1">
                                Pastdagi <span className="text-blue-400 font-mono bg-blue-900/20 px-1 rounded">Download .cs</span> tugmasini bosing.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-zinc-700 text-white flex items-center justify-center font-bold shrink-0">
                            2
                        </div>
                        <div>
                            <h3 className="text-white font-bold">Visual Studio ni oching</h3>
                            <p className="text-sm text-zinc-400 mt-1">
                                Kompyuteringizda <b>Visual Studio</b> ni oching va yangi 
                                <span className="text-amber-400 mx-1">Class Library (.NET Framework)</span> 
                                proyekt yarating.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                            3
                        </div>
                        <div>
                            <h3 className="text-white font-bold">Tashlang va Build qiling</h3>
                            <p className="text-sm text-zinc-400 mt-1">
                                Yuklab olingan faylni proyekt ichiga tashlang (drag & drop). 
                                Keyin yuqoridan <b>Build</b> menyusini bosib, <b>Build Solution</b> ni tanlang.
                            </p>
                            <div className="mt-3 flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-900/20 p-2 rounded border border-emerald-900/50">
                                <CheckCircle2 size={14} />
                                Natija: bin/Debug papkasida .DLL paydo bo'ladi.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium transition-colors text-sm"
                    >
                        Tushundim (Got it)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HelpModal;