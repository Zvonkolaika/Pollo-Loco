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

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    // Apply gravity to the object
    applyGravity() {
        this.startAnimation(() => {
            if ((this.isAboveGround() || this.speedY > 0)) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    // Make the object jump
    jump() {
        this.speedY = 30;
        this.lastAction = new Date().getTime();
        this.onPlatform = 0;
    }

    // Check if the object is above the ground
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true; // Throwable objects should always fall 
        } else {
            if (this.onPlatform) {
                return false;
            }
            return this.y < 150;
        }
    }

    // Check if the object is currently jumping
    isJumping() {
        return this.isAboveGround() && this.speedY > 0;
    }

    // Check if the object is colliding with another object
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    // Alias for isColliding
    isCollidingWith(otherObject) {
        return this.isColliding(otherObject);
    }

    // Handle when the object gets hit
    hit(hitValue) {
        this.energy -= hitValue;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    // Collect a bottle
    collectBottle() {
        if (this.bottles < this.maxBottles) {
            this.bottles++;
        }
    }

    // Collect a coin
    collectCoin() {
        this.coins++;
    }

    // Waste a bottle
    wasteBottle() {
        if (this.bottles > 0) {
            this.bottles--;
            return true;
        } else {
            return false;
        }
    }

    // Check if the object is dead
    isDead() {
        return this.energy === 0;
    }

    // Check if the object is hurt
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    // Move the object to the left
    moveLeft() {
        this.x -= this.speed;
        this.lastAction = new Date().getTime();
    }

    // Move the object to the right
    moveRight() {
        this.x += this.speed;
        this.lastAction = new Date().getTime();
    }

    // Move the object diagonally out
    moveOut() {
        this.x -= this.speed;
        this.y += this.speed;
    }

    // Get the current position of the object
    getPosition() {
        return this.x;
    }

    // Play an animation based on provided images
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

    // Check if the object is asleep
    isAsleep() {
        let timePassed = new Date().getTime() - this.lastAction;
        timePassed = timePassed / 1000;
        return timePassed > 5;
    }

    // Stop a sound
    stopSound(sound) {
        sound.pause();
        sound.currentTime = 0;
    }

    // Start an animation loop
    startAnimation(fn, interval) {
        this.animationID.push(setInterval(fn, interval));
    }

    // Stop all animation loops
    stopAnimation() {
        this.animationID.forEach(ID => {
            clearInterval(ID);
        });
    }
}
