#include <Windows.h>
#include <thread>
#include <iostream>
#include <string>

#include "features/CameraHack.h"
#include "features/Maphack.h"

// Main hack thread
void HackThread(HMODULE hModule) {
    // 1. Allocate a console for debugging (helpful while developing)
    AllocConsole();
    FILE* f;
    freopen_s(&f, "CONOUT$", "w", stdout);

    std::cout << "[+] DotA 1 Cheat Injected Successfully!" << std::endl;
    std::cout << "[+] Waiting for Game.dll..." << std::endl;

    // 2. Wait for Game.dll to load
    uintptr_t gameModule = 0;
    while (!gameModule) {
        gameModule = (uintptr_t)GetModuleHandleA("Game.dll");
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }
    
    std::cout << "[+] Game.dll found at: 0x" << std::hex << gameModule << std::dec << std::endl;

    // Initialize Features
    Features::CameraHack::Initialize();
    Features::Maphack::Initialize();

    // 3. Main Loop
    while (true) {
        // Break key to unload cheat (END key)
        if (GetAsyncKeyState(VK_END) & 1) {
            break;
        }

        // Toggle Maphack (F5 key)
        if (GetAsyncKeyState(VK_F5) & 1) {
            if (Features::Maphack::isEnabled) {
                Features::Maphack::Disable();
                std::cout << "[+] Maphack Disabled" << std::endl;
            } else {
                Features::Maphack::Enable();
                std::cout << "[+] Maphack Enabled" << std::endl;
            }
            std::this_thread::sleep_for(std::chrono::milliseconds(300)); // Debounce
        }

        // Update Camera (checks Numpad +/-)
        Features::CameraHack::Update();

        // Sleep to save CPU
        std::this_thread::sleep_for(std::chrono::milliseconds(10));
    }

    // Disable maphack before unloading
    Features::Maphack::Disable();

    // 4. Cleanup and Eject
    std::cout << "[-] Unloading cheat..." << std::endl;
    if (f) fclose(f);
    FreeConsole();
    FreeLibraryAndExitThread(hModule, 0);
}

BOOL APIENTRY DllMain(HMODULE hModule, DWORD ul_reason_for_call, LPVOID lpReserved) {
    switch (ul_reason_for_call) {
    case DLL_PROCESS_ATTACH:
        DisableThreadLibraryCalls(hModule);
        // Create a separate thread so we don't freeze the game while it's loading
        CloseHandle(CreateThread(nullptr, 0, (LPTHREAD_START_ROUTINE)HackThread, hModule, 0, nullptr));
        break;
    case DLL_THREAD_ATTACH:
    case DLL_THREAD_DETACH:
    case DLL_PROCESS_DETACH:
        break;
    }
    return TRUE;
}
