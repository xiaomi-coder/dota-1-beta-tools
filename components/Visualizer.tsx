import React from 'react';
import { Vector3 } from '../types';

interface VisualizerProps {
    src: Vector3;
    dst: Vector3;
}

const Visualizer: React.FC<VisualizerProps> = ({ src, dst }) => {
    // Normalize coordinates to fit in the SVG box for display purposes
    // This is a simplified top-down view (X/Y plane)
    
    // Calculate relative delta for display
    const dx = dst.x - src.x;
    const dy = dst.y - src.y;
    
    const maxRange = Math.max(Math.abs(dx), Math.abs(dy), 100);
    const scale = 80 / maxRange; // Scale to fit 100px radius
    
    const cx = 100;
    const cy = 100;
    
    const endX = cx + dx * scale;
    const endY = cy - (dy * scale); // SVG Y is down, World Y is usually up or away

    return (
        <div className="flex flex-col items-center justify-center bg-zinc-900 border border-zinc-800 rounded-lg p-4 h-full">
            <div className="text-xs text-zinc-500 mb-2 font-mono uppercase">Top-Down View (2D)</div>
            <svg width="200" height="200" className="bg-zinc-950 rounded-full border border-zinc-800 shadow-inner">
                {/* Grid Lines */}
                <line x1="100" y1="0" x2="100" y2="200" stroke="#333" strokeDasharray="4" />
                <line x1="0" y1="100" x2="200" y2="100" stroke="#333" strokeDasharray="4" />
                
                {/* Source Point */}
                <circle cx={cx} cy={cy} r="4" fill="#3b82f6" />
                
                {/* Vector Line */}
                <line x1={cx} y1={cy} x2={endX} y2={endY} stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
                
                {/* Destination Point */}
                <circle cx={endX} cy={endY} r="3" fill="#ef4444" />
                
                {/* Definitions */}
                <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
                    </marker>
                </defs>
            </svg>
            <div className="mt-4 text-center text-xs text-zinc-400">
                <span className="text-blue-500">● Origin</span> <span className="mx-2">→</span> <span className="text-red-500">● Target</span>
            </div>
        </div>
    );
};

export default Visualizer;