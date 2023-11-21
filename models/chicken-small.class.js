class Smallchicken extends MovableObject {
    height = 70;
    width = 80;
    y = 360;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x = 600 + Math.random() * 500;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
       
    }

    animate(){
       
        setInterval(() => {
            if(!this.isDead()){
            this.moveLeft();
            }
        }, 1000 / 60); 
     
        setInterval(() => {
            let isDead = this.isDead();
            if(isDead){
                this.playAnimation(this.IMAGES_DEAD);
            }
            else{
                this.playAnimation(this.IMAGES_WALKING);
            }
            }, 200);
    
    }
    }
   
