#pragma once
#include <cstdint>

namespace Offsets {
    // Known static offsets for Warcraft 3 (Game.dll version 1.26.0.6401 - "1.26a")
    
    // Game.dll Base address (usually dynamic, but the offset from Game.dll is static)
    // Gamebase offset example
    constexpr uintptr_t GameDllBaseOffset = 0x0; 

    // Global Object Manager / Game State
    // Used to find Local Player, Entity list, Game Time, etc.
    constexpr uintptr_t GlobalGameEngine = 0xAB4F80; // Example offset for 1.26a
    constexpr uintptr_t LocalPlayer = 0xBE40;        // Example offset from Engine

    // Camera structure offset (to read/write zoom, pitch, yaw, xyz)
    // Game.dll + 0xAE19C8 -> points to camera object
    constexpr uintptr_t CameraManager = 0xAE19C8;
    
    namespace Camera {
        constexpr uintptr_t ZOffset = 0x78;      // Height
        constexpr uintptr_t Zoom = 0x14C;        // Target distance (Zoom out map)
        constexpr uintptr_t Pitch = 0x118;       // Angle of attack (Angle to look down)
        constexpr uintptr_t Yaw = 0x128;         // Rotation 
    }
}
