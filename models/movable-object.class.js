/**
 * Represents a movable object in the game.
 * @class
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    energy = 100;
    lastHit = 0;
    maxBottles = 5;
    bottles = 0;
    coins = 0;
    lastAction = new Date().getTime();
    visibleHeight = this.height;
    onPlatform = 0;
    animationID = [];
    pause = false;
    ground = 160;
    canThrow = true;

    /**
     * Represents the offset of a movable object.
     * @typedef {Object} Offset
     * @property {number} top - The top offset.
     * @property {number} left - The left offset.
     * @property {number} right - The right offset.
     * @property {number} bottom - The bottom offset.
     */

    /**
     * The offset of the movable object.
     * @type {Offset}
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Applies gravity to the movable object.
     */
    applyGravity() {
        this.startAnimation(() => {
        
            if ((this.isAboveGround() || this.speedY > 0)) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

            if (!this.isAboveGround() && !this.onPlatform) {
                this.setOnGround();
            }
        }, 1000 / 25);
    }

    /**
     * Sets the object on the ground.
     */
    setOnGround() {
        this.y = this.ground;
        this.speedY = 0;
    }

    /**
     * Makes the object jump by setting its vertical speed and updating the last action time.
     * @returns {void}
     */
    jump() {
        this.speedY = 30;
        this.lastAction = new Date().getTime();
        this.onPlatform = 0;
    }
    
    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true; // Throwable objects should always fall 
        } else {
            if (this.onPlatform) {
                return false;
            }
            return this.y < this.ground;
        }
    }

    /**
     * Checks if the object is currently jumping.
     * @returns {boolean} True if the object is jumping, false otherwise.
     */
    isJumping() {
        return this.isAboveGround() && this.speedY > 0;
    }

//   isColliding(mo) {
//      return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
//           this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
//           this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
//            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
//   }

    /**
     * Checks if this movable object is colliding with another movable object.
     * @param {MovableObject} mo - The other movable object to check collision with.
     * @returns {boolean} - True if there is a collision, false otherwise.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right >= mo.x + mo.offset.left &&
        this.x + this.offset.left <= mo.x + mo.width - mo.offset.right &&    
        this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom &&
        this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top;
    }

    /**
     * Checks if the current object is colliding with another object.
     * @param {Object} otherObject - The other object to check collision with.
     * @returns {boolean} - True if collision occurs, false otherwise.
     */
    isCollidingWith(otherObject) {
        return this.isColliding(otherObject);
    }

    /**
     * Decreases the energy of the movable object by the specified hit value.
     * If the energy becomes negative, it is set to 0.
     * Otherwise, it updates the last hit timestamp.
     * @param {number} hitValue - The value to decrease the energy by.
     */
    hit(hitValue) {
        this.energy -= hitValue;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Collects a bottle if the maximum number of bottles has not been reached.
     */
    collectBottle() {
        if (this.bottles < this.maxBottles) {
            this.bottles++;
        }
    }

    /**
     * Increases the number of coins collected by the movable object.
     */
    collectCoin() {
        this.coins++;
    }
    
    /**
     * Decreases the number of bottles and sets a cooldown period before the next bottle can be thrown.
     * @returns {boolean} Returns true if a bottle was wasted, false otherwise.
     */
    wasteBottle() {
        if (this.bottles > 0 && this.canThrow) {
        this.bottles--;
        this.canThrow = false;
            setTimeout(() => {
                this.canThrow = true;
            }, 2000);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} True if the object's energy is 0, false otherwise.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Checks if the object is currently in a hurt state.
     * @returns {boolean} True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Moves the object to the left by decreasing its x-coordinate.
     * Updates the last action timestamp.
     */
    moveLeft() {
        this.x -= this.speed;
        this.lastAction = new Date().getTime();
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
        this.lastAction = new Date().getTime();
    }

    /**
     * Moves the object outwards by decreasing the x-coordinate and increasing the y-coordinate.
     */
    moveOut() {
        this.x -= this.speed;
        this.y += this.speed;
    }

    /**
     * Get the position of the movable object.
     * @returns {number} The x-coordinate of the object's position.
     */
    getPosition() {
        return this.x;
    }

    /**
     * Plays the animation for the movable object.
     * 
     * @param {string[]} images - An array of image paths for the animation.
     * @returns {string|null} - The current image path or null if the images array is empty or undefined.
     */
    playAnimation(images) {
        if (images && images.length > 0) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            return path; // Return the current image path
        }
        return null; // Return null or any default value if the images array is empty or undefined
    }

    /**
     * Checks if the object is asleep based on the time passed since the last action.
     * @returns {boolean} True if the object is asleep, false otherwise.
     */
    isAsleep() {
        let timePassed = new Date().getTime() - this.lastAction;
        timePassed = timePassed / 1000;
        return timePassed > 5;
    }

    /**
     * Stops the specified sound by pausing it and resetting its current time to 0.
     * @param {HTMLAudioElement} sound - The sound to be stopped.
     */
    stopSound(sound) {
        sound.pause();
        sound.currentTime = 0;
    }

    /**
     * Starts the animation for the movable object.
     * @param {Function} fn - The function to be executed in each animation frame.
     * @param {number} interval - The interval between each animation frame in milliseconds.
     */
    startAnimation(fn, interval) {
        this.animationID.push(setInterval(fn, interval));
    }

    /**
     * Stops the animation of the movable object.
     */
    stopAnimation() {
        this.animationID.forEach(ID => {
            clearInterval(ID);
        });
    }
}
