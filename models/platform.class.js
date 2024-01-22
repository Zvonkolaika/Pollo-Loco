/**
 * Represents a platform in the game.
 * @class
 * @extends MovableObject
 */
class Platform extends MovableObject {
    height = 140;
    width = 340;
    offset = {
        top: 60,
        left: 120,
        right: 100,
        bottom: 80
    };

    /**
     * Creates a new Platform instance.
     * @param {string} path - The path to the image of the platform.
     * @param {number} x - The x-coordinate of the platform.
     * @param {number} y - The y-coordinate of the platform.
     */
    constructor(path, x, y) {
        super().loadImage(path);
        this.x = x;
        this.y = y;
    }
}