#pragma once
#include <Windows.h>
#include <vector>
#include <cstdint>

namespace Memory {
    // Basic RPM/WPM wrappers (even though it's internal, template wrappers are handy)
    template<typename T>
    T Read(uintptr_t address) {
        if (!address || IsBadReadPtr((const void*)address, sizeof(T))) return T{};
        return *(T*)address;
    }

    template<typename T>
    void Write(uintptr_t address, T value) {
        if (!address || IsBadWritePtr((void*)address, sizeof(T))) return;
        
        DWORD oldProtect;
        VirtualProtect((void*)address, sizeof(T), PAGE_EXECUTE_READWRITE, &oldProtect);
        *(T*)address = value;
        VirtualProtect((void*)address, sizeof(T), oldProtect, &oldProtect);
    }

    inline void ReadBytes(uintptr_t address, uint8_t* buffer, size_t size) {
        if (!address || IsBadReadPtr((const void*)address, size)) return;
        memcpy(buffer, (void*)address, size);
    }

    inline void WriteBytes(uintptr_t address, uint8_t* buffer, size_t size) {
        if (!address || IsBadWritePtr((void*)address, size)) return;
        DWORD oldProtect;
        VirtualProtect((void*)address, size, PAGE_EXECUTE_READWRITE, &oldProtect);
        memcpy((void*)address, buffer, size);
        VirtualProtect((void*)address, size, oldProtect, &oldProtect);
    }

    // Pattern Scanning
    uintptr_t FindPattern(uintptr_t moduleBase, size_t moduleSize, const char* pattern, const char* mask);
}
