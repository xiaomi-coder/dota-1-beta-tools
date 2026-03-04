import React from 'react';
import { Vector3 } from '../types';

interface VectorInputProps {
    label: string;
    value: Vector3;
    onChange: (val: Vector3) => void;
    color: string;
}

const VectorInput: React.FC<VectorInputProps> = ({ label, value, onChange, color }) => {
    const handleChange = (axis: keyof Vector3, num: string) => {
        const parsed = parseFloat(num);
        onChange({
            ...value,
            [axis]: isNaN(parsed) ? 0 : parsed
        });
    };

    return (
        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
            <h3 className={`text-sm font-bold uppercase tracking-wider mb-3 ${color}`}>{label}</h3>
            <div className="grid grid-cols-3 gap-2">
                {(['x', 'y', 'z'] as const).map((axis) => (
                    <div key={axis} className="relative">
                        <label className="absolute left-2 top-1.5 text-xs font-mono text-zinc-500 uppercase">{axis}</label>
                        <input
                            type="number"
                            value={value[axis]}
                            onChange={(e) => handleChange(axis, e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-700 text-zinc-100 pl-6 pr-2 py-1 rounded text-sm focus:outline-none focus:border-red-500 font-mono"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VectorInput;