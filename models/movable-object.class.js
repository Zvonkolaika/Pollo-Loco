class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    

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
    }

    isAboveGround(){
        return this.y < 150;
    }

    //charecter.isColliding(chicken)

    isColliding(mo){
        return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x &&
        this.y < mo.y + mo.height;
    }

    hit(){
        this.energy -= 5;
        if(this.energy < 0){
            this.energy = 0;
        }
        else{
            this.lastHit = new Date().getTime();
        }
    }

    isDead(){
        return this.energy == 0;
    }

    isHurt(){
       let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
       timepassed = timepassed / 1000; // Difference in s
       return timepassed < 1;
    }

    moveLeft(){
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }

    playAnimation(images){
        let i = this.currentImage % images.length; // let i = 0 % 6; => 0 rest 0; 1 % 6; => 0, rest 1; 7 % 6 => 1 rest 1 => i = 1
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    // if(character.x + character.width > chicken.x &&
    //     character.y + character.height > chicken.y &&
    //     character.x < chicken.x &&
    //     character.y < chicken.y + chicken.height)

    

//     isColliding (obj) {
//         return  (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) && 
//                 (this.Y + this.offsetY + this.height) >= obj.Y &&
//                 (this.Y + this.offsetY) <= (obj.Y + obj.height) && 
//                 obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.

// }

} 