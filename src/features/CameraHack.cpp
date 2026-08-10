#include "CameraHack.h"
#include "../memory/Memory.h"
#include "../offsets/Offsets.h"
#include <Windows.h>
#include <iostream>

namespace Features {
    namespace CameraHack {

        uintptr_t gameDll = 0;
        float currentZoom = 1650.0f; // Default WC3 zoom

        void Initialize() {
            gameDll = (uintptr_t)GetModuleHandleA("Game.dll");
            
            if (gameDll) {
                // Read the current camera distance value
                float readZoom = Memory::Read<float>(gameDll + Offsets::CameraDistance);
                if (readZoom > 0.0f) {
                    currentZoom = readZoom;
                }
                std::cout << "[CameraHack] Initialized. Camera Distance at: Game.dll + 0x" 
                          << std::hex << Offsets::CameraDistance << std::dec 
                          << " = " << currentZoom << std::endl;
            } else {
                std::cout << "[CameraHack] Error: Game.dll not found!" << std::endl;
            }
        }

        void Update() {
            if (!gameDll) return;
            
            static bool bAddPressed = false;
            static bool bSubPressed = false;

            if (GetAsyncKeyState(VK_ADD) & 0x8000) { // Numpad +
                if (!bAddPressed) {
                    bAddPressed = true;
                    currentZoom += 100.0f;
                    if (currentZoom > 3000.0f) currentZoom = 3000.0f;
                    std::cout << "[CameraHack] Zoom Out: " << currentZoom << std::endl;
                    SetZoom(currentZoom);
                }
            } else {
                bAddPressed = false;
            }

            if (GetAsyncKeyState(VK_SUBTRACT) & 0x8000) { // Numpad -
                if (!bSubPressed) {
                    bSubPressed = true;
                    currentZoom -= 100.0f;
                    if (currentZoom < 250.0f) currentZoom = 250.0f;
                    std::cout << "[CameraHack] Zoom In: " << currentZoom << std::endl;
                    SetZoom(currentZoom); 
                }
            } else {
                bSubPressed = false;
            }
        }

        void SetZoom(float targetZoom) {
            if (!gameDll) return;

            // Direct float write to Game.dll + 0x93645C
            // No pointer chain needed — this is a direct static address
            Memory::Write<float>(gameDll + Offsets::CameraDistance, targetZoom);
        }
    }
}
