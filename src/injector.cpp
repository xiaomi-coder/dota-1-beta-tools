#include <iostream>
#include <windows.h>
#include <tlhelp32.h>
#include <string>

// Function to find process ID by its name
DWORD GetProcId(const char* procName) {
    DWORD procId = 0;
    HANDLE hSnap = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
    if (hSnap != INVALID_HANDLE_VALUE) {
        PROCESSENTRY32 procEntry;
        procEntry.dwSize = sizeof(procEntry);

        if (Process32First(hSnap, &procEntry)) {
            do {
                if (!_stricmp(procEntry.szExeFile, procName)) {
                    procId = procEntry.th32ProcessID;
                    break;
                }
            } while (Process32Next(hSnap, &procEntry));
        }
    }
    CloseHandle(hSnap);
    return procId;
}

int main() {
    const char* processName = "war3.exe";
    const char* dllName = "DotA1Cheat.dll";

    // 1. Get the current directory to find the full path to the DLL
    char currentDir[MAX_PATH];
    GetCurrentDirectoryA(MAX_PATH, currentDir);
    std::string dllPath = std::string(currentDir) + "\\" + dllName;

    std::cout << "[+] Looking for Warcraft 3 (war3.exe)..." << std::endl;

    // 2. Find the Process ID of the game
    DWORD procId = 0;
    while (!procId) {
        procId = GetProcId(processName);
        if (!procId) {
            Sleep(1000); // Wait 1 second before checking again
        }
    }
    std::cout << "[+] Found Warcraft 3! Process ID: " << procId << std::endl;

    // 3. Open the process with all access rights
    HANDLE hProc = OpenProcess(PROCESS_ALL_ACCESS, 0, procId);
    if (hProc && hProc != INVALID_HANDLE_VALUE) {
        // 4. Allocate memory inside the game's process for our DLL path
        void* loc = VirtualAllocEx(hProc, 0, MAX_PATH, MEM_COMMIT | MEM_RESERVE, PAGE_READWRITE);
        if (loc) {
            // 5. Write the DLL path into that allocated memory
            WriteProcessMemory(hProc, loc, dllPath.c_str(), dllPath.length() + 1, 0);

            // 6. Tell the game to run LoadLibraryA with our DLL path (this injects the DLL)
            HANDLE hThread = CreateRemoteThread(hProc, 0, 0, (LPTHREAD_START_ROUTINE)LoadLibraryA, loc, 0, 0);

            if (hThread) {
                std::cout << "[+] Injection Successful!" << std::endl;
                CloseHandle(hThread);
            } else {
                std::cout << "[-] Failed to create remote thread." << std::endl;
            }
        } else {
            std::cout << "[-] Failed to allocate memory in target process." << std::endl;
        }
        CloseHandle(hProc);
    } else {
        std::cout << "[-] Failed to open process. Try running as Administrator." << std::endl;
    }

    std::cout << "\nPress ENTER to exit..." << std::endl;
    std::cin.get();
    return 0;
}
