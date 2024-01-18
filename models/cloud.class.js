/**
 * Represents a cloud object that extends MovableObject.
 * @class
 */
class Cloud extends MovableObject {
    y = 0;
    height = 250;
    width = 600;

    /**
     * Represents a cloud object.
     * @constructor
     * @param {string} path - The path to the image file of the cloud.
     * @param {number} x - The x-coordinate of the cloud.
     */
    constructor(path, x) {
        super().loadImage(path);
        this.x = x + Math.random() * 300;
        this.animate();
    }

    /**
     * Animates the cloud.
     */
    animate() {
        this.cloudsMoveLeft();
    }

    /**
     * Moves the clouds to the left.
     */
    cloudsMoveLeft() {
        this.startAnimation(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}
