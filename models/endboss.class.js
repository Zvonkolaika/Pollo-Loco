/**
 * Represents an Endboss object.
 * @class
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    height = 400;
    width = 280;
    y = 50;
    speed = 10;
    attacking = false;
   
    /**
     * Array of image paths representing the walking animation frames for the end boss.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    /**
     * Array of image paths representing the images of the boss chicken when it is hurting.
     * @type {string[]}
     */
    IMAGES_HURTING = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /**
     * Array of image paths representing the dead state of the end boss.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Array of image paths representing the attacking animation frames for the end boss.
     * @type {string[]}
     */
    IMAGES_ATTACKING = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ]

    /**
     * Represents the constructor of the EndBoss class.
     * @constructor
     */
    constructor() {
        super().loadImage('./img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACKING);
        this.x = 3765;
        this.animate();
    }

    /**
     * Animates the end boss.
     */
    animate() {
        this.endbossAnimation();
    }

    /**
     * Performs the animation for the end boss.
     */
    endbossAnimation() {
        this.startAnimation(() => {
            if(this.pause) return;
            let isHurt = this.isHurt();
            let isDead = this.isDead();

            if (isHurt) {
                this.hurtAnimation();
                
            } else if (isDead) {
                this.deadAnimation();
            }

            else if (this.attacking) {
                this.attackingAnimation();
            }

            else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100)
    }

    /**
     * Plays the hurt animation and triggers the bottle throw sound.
     */
    hurtAnimation(){
        this.attacking = true;
        this.playAnimation(this.IMAGES_HURTING);
        bottle_throw_sound.play();
    }

    /**
     * Plays the dead animation for the end boss.
     * Sets the speed to 30, plays the dead animation images,
     * moves the end boss out of the screen, and stops the attacking sound.
     */
    deadAnimation(){
        this.speed = 30;
        this.playAnimation(this.IMAGES_DEAD);
        this.moveOut();
        this.stopSound(endboss_attacking_sound);
    }

    /**
     * Executes the attacking animation for the end boss.
     * Moves the end boss to the left, plays the attacking animation, and plays the attacking sound.
     */
    attackingAnimation(){
        this.moveLeft();
        this.playAnimation(this.IMAGES_ATTACKING);
        endboss_attacking_sound.play();
    }
}















