cmake_minimum_required(VERSION 3.10)
project(DotA1Cheat VERSION 1.0)

# C++17 standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED YES)

# NOTE: Warcraft III 1.26a is a 32-bit application.
# For production use, compile with a 32-bit toolchain (i686-w64-mingw32 or MSVC x86).
# This CMakeLists works with both 32-bit and 64-bit MinGW.

# 1. Build as a dynamic library (DLL)
add_library(DotA1Cheat SHARED
    src/dllmain.cpp
    src/memory/Memory.cpp
    src/math/W2S.cpp
    src/features/Maphack.cpp
    src/features/CameraHack.cpp
)

# Linking with basic Windows libraries for DLL
target_link_libraries(DotA1Cheat user32)

# 2. Build our custom Injector Executable (.exe)
add_executable(Injector src/injector.cpp)
target_link_libraries(Injector user32)
