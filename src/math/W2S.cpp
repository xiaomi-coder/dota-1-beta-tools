#include "Vector.h"

namespace Math {

    // A simple 4x4 matrix struct
    struct ViewMatrix {
        float matrix[16];
    };

    // W2S (World to Screen) translates 3D game coordinates to 2D screen coordinates.
    // We multiply the 3D position by the game's View Projection Matrix.
    bool WorldToScreen(const Vector3& pos, Vector2& screen, float matrix[16], int windowWidth, int windowHeight) {
        // Clip coords
        float clipX = pos.x * matrix[0] + pos.y * matrix[4] + pos.z * matrix[8] + matrix[12];
        float clipY = pos.x * matrix[1] + pos.y * matrix[5] + pos.z * matrix[9] + matrix[13];
        float clipW = pos.x * matrix[3] + pos.y * matrix[7] + pos.z * matrix[11] + matrix[15];

        // If clipW is less than 0.1f, the object is behind the camera
        if (clipW < 0.1f) return false;

        // Perspective division, converting to NDC (Normalized Device Coordinates)
        float ndcX = clipX / clipW;
        float ndcY = clipY / clipW;

        // Transform to screen coordinates
        screen.x = (windowWidth / 2 * ndcX) + (ndcX + windowWidth / 2);
        screen.y = -(windowHeight / 2 * ndcY) + (ndcY + windowHeight / 2);

        return true;
    }
}
