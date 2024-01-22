/**
 * Represents a status bar object.
 * @class
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {

    /**
     * Represents a status bar.
     * @constructor
     */
    constructor() {
        super();
        this.x = 30;
        this.width = 180;
        this.height = 50;
    }

    /**
     * Resolves the image index based on the percentage value.
     * @returns {number} The image index.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        }
        else if (this.percentage >= 80) {
            return 4;
        }
        else if (this.percentage >= 60) {
            return 3;
        }
        else if (this.percentage >= 40) {
            return 2;
        }
        else if (this.percentage >= 20) {
            return 1;
        }
        else {
            return 0;
        }
    }

    /**
     * Moves the status bar to the specified x-coordinate.
     * @param {number} x - The x-coordinate to move the status bar to.
     */
    moveTo(x) {
        this.x = x;
    }
}

