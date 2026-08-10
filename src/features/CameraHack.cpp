#include "CameraHack.h"
#include "../memory/Memory.h"
#include "../offsets/Offsets.h"
#include <Windows.h>

namespace Features {
    namespace CameraHack {

        uintptr_t gameDll = 0;

        void Initialize() {
            gameDll = (uintptr_t)GetModuleHandleA("Game.dll");
        }

        void Update() {
            if (!gameDll) return;
            
            // Example: Hotkeys to change Zoom
            if (GetAsyncKeyState(VK_ADD) & 1) { // Numpad +
                SetZoom(2200.0f); // Default is usually 1650
            }
            if (GetAsyncKeyState(VK_SUBTRACT) & 1) { // Numpad -
                SetZoom(1650.0f); 
            }
        }

        void SetZoom(float targetZoom) {
            if (!gameDll) return;

            // Follow pointer chain: Game.dll + CameraManager -> Zoom Offset
            uintptr_t cameraManager = Memory::Read<uintptr_t>(gameDll + Offsets::CameraManager);
            if (cameraManager) {
                Memory::Write<float>(cameraManager + Offsets::Camera::Zoom, targetZoom);
            }
        }
    }
}
