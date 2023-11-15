class Smallchicken extends MovableObject {
    height = 70;
    width = 80;
    y = 360;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    chicken_sound = new Audio('/audio/chicken.wav');

    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x = 600 + Math.random() * 500;
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
       
    }

    animate(){
       
        setInterval(() => {
            this.moveLeft();

        }, 1000 / 60); 
     
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);

       
        }, 200);
    
    }
    }
   
