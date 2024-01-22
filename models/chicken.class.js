/**
 * Represents a Chicken object that extends MovableObject.
 * @class
 */
class Chicken extends MovableObject {
    height = 80;
    width = 60;
    y = 350;
    x;

    /**
     * Array of image paths for the walking animation of the chicken.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * Array of image paths for dead chicken.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Represents a Chicken object.
     * @constructor
     * @param {number} x - The x-coordinate of the chicken.
     */
    constructor(x) {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = x;
        this.speed = 0.55 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * Animates the chicken by moving it to the left and applying animation.
     */
    animate() {
        this.chickenMoveLeft();
        this.chickenAnimation();
    }

    /**
     * Plays the chicken animation based on its state.
     * If the chicken is dead, it plays the dead animation.
     * If the chicken is alive, it plays the walking animation.
     */
    chickenAnimation() {
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

    /**
     * Moves the chicken to the left.
     */
    chickenMoveLeft() {
        this.startAnimation(() => {
            if(this.pause) return;
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }
}

