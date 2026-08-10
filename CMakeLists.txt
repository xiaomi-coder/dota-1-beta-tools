cmake_minimum_required(VERSION 3.10)
project(DotA1Cheat VERSION 1.0)

# Build as a dynamic library (DLL)
add_library(DotA1Cheat SHARED
    src/dllmain.cpp
    src/memory/Memory.cpp
    src/math/W2S.cpp
    src/features/Maphack.cpp
    src/features/CameraHack.cpp
)

# Standard C++17
set_target_properties(DotA1Cheat PROPERTIES
    CXX_STANDARD 17
    CXX_STANDARD_REQUIRED YES
)

# Target Windows specifically (Warcraft 3 is x86 32-bit usually for 1.26a)
if (MSVC)
    # Target 32-bit since Warcraft III is a 32-bit application
    set_target_properties(DotA1Cheat PROPERTIES
        TARGET_ARCH x86
    )
endif()

# Linking with basic Windows libraries
target_link_libraries(DotA1Cheat user32)
