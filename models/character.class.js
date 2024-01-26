/**
 * Represents a character in the game.
 * @class
 * @extends MovableObject
 */
class Character extends MovableObject {
    y = 160;
    height = 280;
    speed = 10;
    world;

    /**
     * The offset object represents the positioning offsets for a character.
     * @typedef {Object} Offset
     * @property {number} top - The top offset value.
     * @property {number} left - The left offset value.
     * @property {number} right - The right offset value.
     * @property {number} bottom - The bottom offset value.
     */

    /**
     * The offset for the character.
     * @type {Offset}
     */
    offset = {
        top: 170,
        left: 30,
        right: 30,
        bottom: 20
    };

    /**
     * Array of image paths representing the walking animation frames for a character.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    /**
     * Array of image paths for the jumping animation of the character.
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];

    /**
     * Array of image paths representing the character's hurting state.
     * @type {string[]}
     */
    IMAGES_HURTING = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];

    /**
     * Array of image paths representing the dead state of a character.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png',
    ];

    /**
     * Array of image paths representing the character's staying animation frames.
     * @type {string[]}
     */
    IMAGES_STAYING = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    /**
     * Array of image paths representing sleeping character animations.
     * @type {string[]}
     */
    IMAGES_SLEEPING = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    /**
     * Represents a character object.
     * @constructor
     */
    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadImages(this.IMAGES_STAYING);
        this.applyGravity();
        this.animate();
        jumping_sound.volume = 0.3;
        snoring_sound.volume = 1;
    }

    /**
     * Animates the character by invoking the characterKeyboardInterval and characterAnimationInterval methods.
     */
    animate() {
        this.characterKeyboardInterval();
        this.characterAnimationInterval();
    }

    /**
     * Executes the character's keyboard interval animation.
     * Moves the character left or right based on keyboard input,
     * performs a jump if possible, and updates the camera position.
     */
    characterKeyboardInterval() {

        this.startAnimation(() => {
            if (this.pause) return;

            if (this.canMoveRight()) {
                this.moveRight();
                this.otherDirection = false;
            }

            if (this.canMoveLeft()) {
                this.moveLeft();
                this.otherDirection = true;
            }

            if (this.canJump()) {
                this.jump();
            }

            this.world.camera_x = -this.x + 100;

        }, 1000 / 45);
    }

    /**
     * Checks if the character can move to the right.
     * @returns {boolean} True if the character can move to the right, false otherwise.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * Checks if the character can move to the left.
     * @returns {boolean} True if the character can move to the left, false otherwise.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * Checks if the character can jump.
     * @returns {boolean} True if the character can jump, false otherwise.
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround()
            || this.world.keyboard.UP && !this.isAboveGround();
    }

    /**
     * Executes the character's animation interval.
     * If the character is dead, it plays the dead animation for 5 seconds and then stops the animation.
     * If the character is hurt, it plays the hurting animation.
     * If the character is jumping, it plays the jumping animation.
     * If the character is moving, it plays the walking animation.
     * If the character is asleep, it plays the sleeping animation.
     * If none of the above conditions are met, it plays the staying animation and stops the walking sound.
     */
    characterAnimationInterval() {

        this.startAnimation(() => {
            if (this.pause) return;
            if (this.isDead()) {
                this.deadAnimation();
                setTimeout(() => {
                    this.stopAnimation();
                }, 5000);
            }
            else if (this.isHurt()) {
                this.hurtingAnimation();
            }
            else if 
           // (this.isJumping())
            (this.isAboveGround())
             {
                this.jumpingAnimation();
            }
            else if (this.characterIsMoving()) {
                this.walkingAnimation();
            }
            else if (this.isAsleep()) {
                this.sleepingAnimation();
            }
            else {
                this.playAnimation(this.IMAGES_STAYING);
                this.stopSound(walking_sound);
            }
        }, 70);
    }

    /**
     * Checks if the character is currently moving.
     * @returns {boolean} True if the character is moving, false otherwise.
     */
    characterIsMoving() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    /**
     * Plays the dead animation, stops the game sound, and plays the game lost sound.
     */
    deadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        this.stopSound(game_sound);
        game_lost_sound.play();
    }

    /**
     * Plays the hurting animation and triggers the hurting sound.
     */
    hurtingAnimation() {
        this.playAnimation(this.IMAGES_HURTING);
        hurting_sound.play();
    }

    /**
     * Plays the jumping animation and triggers the jumping sound.
     */
    jumpingAnimation() {
        this.playAnimation(this.IMAGES_JUMPING);
        jumping_sound.play();
    }

    /**
     * Plays the walking animation and stops the snoring sound while playing the walking sound.
     */
    walkingAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
        this.stopSound(snoring_sound);
        walking_sound.play();
    }

    /**
     * Plays the sleeping animation and triggers the snoring sound.
     */
    sleepingAnimation() {
        this.playAnimation(this.IMAGES_SLEEPING);
        snoring_sound.play();
    }

    /**
     * Mutes all sound effects related to the character.
     */
    muteSound() {
        walking_sound.muted = true;
        jumping_sound.muted = true;
        snoring_sound.muted = true;
        hurting_sound.muted = true;
        game_lost_sound.muted = true;
    }

    /**
     * Unmutes all the sound effects associated with the character.
     */
    unmuteSound() {
        walking_sound.muted = false;
        jumping_sound.muted = false;
        snoring_sound.muted = false;
        hurting_sound.muted = false;
        game_lost_sound.muted = false;
    }
}