class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    maxBottles = 5;
    bottles = 0;
    coins = 0;
    lastAction = new Date().getTime();
    

    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
        }, 1000 / 25); 
    }

    jump(){
        this.speedY = 30;
        this.lastAction = new Date().getTime();
        
    }

    isAboveGround(){
        if (this instanceof ThrowableObject){ // Throwable objects should always fall 
            return true;
        } else {
            return this.y < 150;
        }
    }

    //character.isColliding(chicken)

    isColliding(mo){
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
      //  return this.isCollidingWith(mo);
    }

    isCollidingWith(otherObject) {
        return this.isColliding(otherObject);
      /*   return (
            this.x + this.width > otherObject.x &&
            this.y + this.height > otherObject.y &&
            this.x < otherObject.x + otherObject.width &&
            this.y < otherObject.y + otherObject.height
        ); */
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
           // this.statusBarBottle.setPercentage(this.bottles);
           // console.log('Collected a bottle! Total bottles:', this.bottles);
        }
    }

    collectCoin() {
            this.coins++;
        }

    wasteBottle(){
        if(this.bottles > 0){
            this.bottles--;
            return true;
        }
        else{
            false;
        }
    }

    isDead(){
        return this.energy === 0;
    }

    isHurt(){
       let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
       timepassed = timepassed / 1000; // Difference in s
       return timepassed < 1;
    }

    moveLeft(){
        this.x -= this.speed;
        this.lastAction = new Date().getTime();
    }

    moveRight() {
        this.x += this.speed;
        this.lastAction = new Date().getTime();
    }

    moveOut(){
        this.x -= this.speed;
        this.y += this.speed;
    }

    getPosition(){
        return this.x;
    }

    playAnimation(images){
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

}  