#include "Memory.h"
#include <Psapi.h>

namespace Memory {
    uintptr_t FindPattern(uintptr_t moduleBase, size_t moduleSize, const char* pattern, const char* mask) {
        auto scanBytes = reinterpret_cast<uint8_t*>(moduleBase);
        size_t patternLen = strlen(mask);

        for (size_t i = 0; i < moduleSize - patternLen; ++i) {
            bool found = true;
            for (size_t j = 0; j < patternLen; ++j) {
                if (mask[j] != '?' && scanBytes[i + j] != static_cast<uint8_t>(pattern[j])) {
                    found = false;
                    break;
                }
            }
            if (found) {
                return (uintptr_t)&scanBytes[i];
            }
        }
        return 0;
    }
}
