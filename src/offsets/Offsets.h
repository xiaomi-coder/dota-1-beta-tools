#pragma once
#include <cstdint>

namespace Offsets {
    // =============================================================
    // Verified offsets for Warcraft III 1.26a (Game.dll)
    // Sources: Xenon MH, HiveWorkshop community research
    // All offsets are relative to Game.dll base address
    // =============================================================

    // --- Game State ---
    constexpr uintptr_t ChatBoxOpen = 0xAD15F0;     // bool: is chat box open
    constexpr uintptr_t IsInGame    = 0xAB65F4;     // DWORD: non-zero when in game

    // --- Maphack: Reveal Units (Main Map) ---
    constexpr uintptr_t RevealUnitsMain1 = 0x3A14F0; // Patch: 0x87 0xDB (xchg ebx,ebx = NOP the jnz)
    constexpr uintptr_t RevealUnitsMain2 = 0x3A159B; // Patch: 0x90 0x90 (NOP)

    // --- Maphack: Remove Fog of War (Main Map) ---
    constexpr uintptr_t FogMainMap = 0x74CA1A;       // Patch: 0x15 0x50

    // --- Maphack: Reveal Units (Mini Map) ---
    constexpr uintptr_t RevealUnitsMini = 0x36143B;   // Patch: 0x33 0xC0 0x90 0x90 0x90 (xor eax,eax + NOP)

    // --- Maphack: Remove Fog of War (Mini Map) ---
    constexpr uintptr_t FogMiniMap = 0x356525;        // Patch: 0x87 0xDB

    // --- Maphack: Reveal Illusions ---
    constexpr uintptr_t RevealIllusions = 0x282A5C;   // Patch: 0x40 0xC3 (inc eax; ret)

    // --- Maphack: Reveal Invisibles ---
    constexpr uintptr_t RevealInvisibles = 0x399A98;  // Patch: 0xEB (jmp short, skip check)

    // --- Maphack: Bypass DotA -ah (anti-hack) ---
    constexpr uintptr_t BypassAH1 = 0x3C639C;        // Patch: 0xB8
    constexpr uintptr_t BypassAH2 = 0x3C63A1;        // Patch: 0xEB
    constexpr uintptr_t BypassAH3 = 0x3CB872;        // Patch: 0xEB

    // --- Maphack: Make Units Clickable ---
    constexpr uintptr_t UnitsClickable = 0x2851B2;   // Patch: 0xEB

    // --- Maphack: Trade / Resource View ---
    constexpr uintptr_t TradeView1 = 0x34DDA2;       // Patch: 0xB8 0xC8 0x00 0x00 0x00 0x90
    constexpr uintptr_t TradeView2 = 0x34DDAA;       // Patch: 0xB8 0x64 0x00 0x00 0x00 0x90
    constexpr uintptr_t TradeView3 = 0x35FA4A;       // Patch: 0x90 0x90

    // --- Camera Distance (direct float address) ---
    // Game.dll + 0x93645C -> float value for camera distance/zoom
    // Default: ~1650.0f, Min: ~250.0f, Max: ~3000.0f
    constexpr uintptr_t CameraDistance = 0x93645C;
}
