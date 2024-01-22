/**
 * Represents a small chicken object that extends the MovableObject class.
 * @class
 */
class Smallchicken extends MovableObject {
    height = 70;
    width = 80;
    y = 360;

    /**
     * Array of image paths for the walking animation of a small chicken.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * Array of image paths for dead chicken small.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Represents a small chicken enemy.
     * @constructor
     * @param {number} x - The x-coordinate of the chicken's initial position.
     */
    constructor(x) {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x = x + Math.random() * 500;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * Animates the small chicken by moving it left and applying animation.
     */
    animate() {
        this.chickenSmallMoveLeft();
        this.chickenSmallAnimation();
    }

    /**
     * Moves the small chicken to the left.
     */
    chickenSmallMoveLeft() {
        this.startAnimation(() => {
            if(this.pause) return;
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }

    /**
     * Plays the animation for a small chicken.
     */
    chickenSmallAnimation() {
        this.startAnimation(() => {
            if(this.pause) return;
            let isDead = this.isDead();
            if (isDead) {
                this.playAnimation(this.IMAGES_DEAD);
            }
            else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}

