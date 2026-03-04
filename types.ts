export interface Vector3 {
    x: number;
    y: number;
    z: number;
}

export interface AngleResult {
    pitch: number;
    yaw: number;
    distance: number;
}

export enum CodeStyle {
    SYSTEM_NUMERICS = 'System.Numerics',
    UNITY_STYLE = 'Unity/Custom',
    UNSAFE_POINTER = 'Unsafe/Memory'
}

export interface GenerationConfig {
    style: CodeStyle;
    normalize: boolean;
    useDouble: boolean;
}

export interface Skill {
    id: string;
    name: string;
    cooldown: number;
    maxCooldown: number;
    icon: string;
}

export interface HeroState {
    id: number;
    name: string;
    level: number;
    hp: number;
    maxHp: number;
    mana: number;
    maxMana: number;
    skills: Skill[];
    isAlive: boolean;
    team: 'Sentinel' | 'Scourge';
    attribute: 'STR' | 'AGI' | 'INT';
    icon: string;
    inFog: boolean;
}

export interface GameEvent {
    id: number;
    timestamp: number;
    message: string;
    type: 'rune' | 'system';
}