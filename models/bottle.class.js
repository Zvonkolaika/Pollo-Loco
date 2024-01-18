/**
 * Represents a Bottle object that extends MovableObject.
 * @class
 */
class Bottle extends MovableObject {
    /**
     * Array of image paths for the bottle animation.
     * @type {string[]}
     */
    IMAGES_BOTTLE_ANIMATION = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Represents a Bottle object.
     * @constructor
     * @param {number} x - The x-coordinate of the bottle.
     * @param {number} y - The y-coordinate of the bottle.
     */
    constructor(x, y) {
        super().loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 60;
        this.loadImages(this.IMAGES_BOTTLE_ANIMATION);
        this.animate();
    }

    /**
     * Animates the bottle.
     */
    animate() {
        this.bottleAnimation();
    }

    /**
     * Performs the bottle animation by playing a sequence of images.
     */
    bottleAnimation() {
        this.startAnimation(() => {
            this.playAnimation(this.IMAGES_BOTTLE_ANIMATION);
        }, 200);
    }
}