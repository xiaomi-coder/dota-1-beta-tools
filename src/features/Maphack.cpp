#include "Maphack.h"
#include "../memory/Memory.h"
#include "../offsets/Offsets.h"
#include <Windows.h>
#include <vector>
#include <iostream>

namespace Features {
    namespace Maphack {
        
        bool isEnabled = false;
        uintptr_t gameDll = 0;

        // Original bytes (read at runtime to restore safely)
        uint8_t origRevealMain1[2];
        uint8_t origRevealMain2[2];
        uint8_t origFogMain[2];
        uint8_t origRevealMini[5];
        uint8_t origFogMini[2];
        uint8_t origRevealIllusions[2];
        uint8_t origRevealInvisibles[1];
        uint8_t origBypassAH1[1];
        uint8_t origBypassAH2[1];
        uint8_t origBypassAH3[1];
        uint8_t origUnitsClickable[1];

        // Patch bytes (verified for 1.26a)
        uint8_t patchRevealMain1[2]       = { 0x87, 0xDB };                   // xchg ebx,ebx (NOP equivalent)
        uint8_t patchRevealMain2[2]       = { 0x90, 0x90 };                   // NOP NOP
        uint8_t patchFogMain[2]           = { 0x15, 0x50 };                   // Remove fog
        uint8_t patchRevealMini[5]        = { 0x33, 0xC0, 0x90, 0x90, 0x90 }; // xor eax,eax + NOP
        uint8_t patchFogMini[2]           = { 0x87, 0xDB };                   // xchg ebx,ebx
        uint8_t patchRevealIllusions[2]   = { 0x40, 0xC3 };                   // inc eax; ret
        uint8_t patchRevealInvisibles[1]  = { 0xEB };                          // jmp (skip check)
        uint8_t patchBypassAH1[1]         = { 0xB8 };                          // mov eax
        uint8_t patchBypassAH2[1]         = { 0xEB };                          // jmp
        uint8_t patchBypassAH3[1]         = { 0xEB };                          // jmp
        uint8_t patchUnitsClickable[1]    = { 0xEB };                          // jmp

        void Initialize() {
            gameDll = (uintptr_t)GetModuleHandleA("Game.dll");
            if (gameDll) {
                // Save original bytes for safe restore
                Memory::ReadBytes(gameDll + Offsets::RevealUnitsMain1, origRevealMain1, 2);
                Memory::ReadBytes(gameDll + Offsets::RevealUnitsMain2, origRevealMain2, 2);
                Memory::ReadBytes(gameDll + Offsets::FogMainMap, origFogMain, 2);
                Memory::ReadBytes(gameDll + Offsets::RevealUnitsMini, origRevealMini, 5);
                Memory::ReadBytes(gameDll + Offsets::FogMiniMap, origFogMini, 2);
                Memory::ReadBytes(gameDll + Offsets::RevealIllusions, origRevealIllusions, 2);
                Memory::ReadBytes(gameDll + Offsets::RevealInvisibles, origRevealInvisibles, 1);
                Memory::ReadBytes(gameDll + Offsets::BypassAH1, origBypassAH1, 1);
                Memory::ReadBytes(gameDll + Offsets::BypassAH2, origBypassAH2, 1);
                Memory::ReadBytes(gameDll + Offsets::BypassAH3, origBypassAH3, 1);
                Memory::ReadBytes(gameDll + Offsets::UnitsClickable, origUnitsClickable, 1);

                std::cout << "[Maphack] Initialized. Game.dll at: 0x" << std::hex << gameDll << std::dec << std::endl;
            }
        }

        void Enable() {
            if (!gameDll || isEnabled) return;

            // 1. Bypass DotA -ah (anti-hack) — MUST be first!
            Memory::WriteBytes(gameDll + Offsets::BypassAH1, patchBypassAH1, 1);
            Memory::WriteBytes(gameDll + Offsets::BypassAH2, patchBypassAH2, 1);
            Memory::WriteBytes(gameDll + Offsets::BypassAH3, patchBypassAH3, 1);

            // 2. Reveal Units on Main Map
            Memory::WriteBytes(gameDll + Offsets::RevealUnitsMain1, patchRevealMain1, 2);
            Memory::WriteBytes(gameDll + Offsets::RevealUnitsMain2, patchRevealMain2, 2);

            // 3. Remove Fog on Main Map
            Memory::WriteBytes(gameDll + Offsets::FogMainMap, patchFogMain, 2);

            // 4. Reveal Units on Mini Map
            Memory::WriteBytes(gameDll + Offsets::RevealUnitsMini, patchRevealMini, 5);

            // 5. Remove Fog on Mini Map
            Memory::WriteBytes(gameDll + Offsets::FogMiniMap, patchFogMini, 2);

            // 6. Reveal Illusions
            Memory::WriteBytes(gameDll + Offsets::RevealIllusions, patchRevealIllusions, 2);

            // 7. Reveal Invisible Units
            Memory::WriteBytes(gameDll + Offsets::RevealInvisibles, patchRevealInvisibles, 1);

            // 8. Make Enemy Units Clickable
            Memory::WriteBytes(gameDll + Offsets::UnitsClickable, patchUnitsClickable, 1);

            isEnabled = true;
            std::cout << "[Maphack] ENABLED — All features active" << std::endl;
        }

        void Disable() {
            if (!gameDll || !isEnabled) return;

            // Restore all original bytes
            Memory::WriteBytes(gameDll + Offsets::BypassAH1, origBypassAH1, 1);
            Memory::WriteBytes(gameDll + Offsets::BypassAH2, origBypassAH2, 1);
            Memory::WriteBytes(gameDll + Offsets::BypassAH3, origBypassAH3, 1);
            Memory::WriteBytes(gameDll + Offsets::RevealUnitsMain1, origRevealMain1, 2);
            Memory::WriteBytes(gameDll + Offsets::RevealUnitsMain2, origRevealMain2, 2);
            Memory::WriteBytes(gameDll + Offsets::FogMainMap, origFogMain, 2);
            Memory::WriteBytes(gameDll + Offsets::RevealUnitsMini, origRevealMini, 5);
            Memory::WriteBytes(gameDll + Offsets::FogMiniMap, origFogMini, 2);
            Memory::WriteBytes(gameDll + Offsets::RevealIllusions, origRevealIllusions, 2);
            Memory::WriteBytes(gameDll + Offsets::RevealInvisibles, origRevealInvisibles, 1);
            Memory::WriteBytes(gameDll + Offsets::UnitsClickable, origUnitsClickable, 1);

            isEnabled = false;
            std::cout << "[Maphack] DISABLED — All features restored" << std::endl;
        }
    }
}
