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

    applyGravity() {
        this.startAnimation(() => {
            if ((this.isAboveGround() || this.speedY > 0)) {
                this.y -= this.speedY; // this.y = this.y - this.speedY
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    jump() {
        this.speedY = 30;
        this.lastAction = new Date().getTime();
        this.onPlatform = 0;
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable objects should always fall 
            return true;
        }

        else {
            if (this.onPlatform) {
                return false;
            }
            return this.y < 150;
        }
    }

    isJumping() {
        return this.isAboveGround() && this.speedY > 0;
    }

    //character.isColliding(chicken)

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    isCollidingWith(otherObject) {
        return this.isColliding(otherObject);
    }

    hit(hitValue) {

        this.energy -= hitValue;

        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    collectBottle() {
        if (this.bottles < this.maxBottles) {
            this.bottles++;
        }
    }

    collectCoin() {
        this.coins++;
    }

    wasteBottle() {
        if (this.bottles > 0) {
            this.bottles--;
            return true;
        }
        else {
            false;
        }
    }

    isDead() {
        return this.energy === 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
    }

    moveLeft() {
        this.x -= this.speed;
        this.lastAction = new Date().getTime();
    }

    moveRight() {
        this.x += this.speed;
        this.lastAction = new Date().getTime();
    }

    moveOut() {
        this.x -= this.speed;
        this.y += this.speed;
    }

    getPosition() {
        return this.x;
    }

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

    isAsleep() {
        let timePassed = new Date().getTime() - this.lastAction;
        //the time passed since the last action.
        timePassed = timePassed / 1000;
        // checks if the time passed since the last action is greater than 5 seconds.
        return timePassed > 5;
    }

    stopSound(sound) {
        sound.pause();
        sound.currentTime = 0;
    }

    startAnimation(fn, interval) {
        this.animationID.push(setInterval(fn, interval));
    }

    stopAnimation() {
        
        this.animationID.forEach(ID => {

            clearInterval(ID);
        });
    }
}


