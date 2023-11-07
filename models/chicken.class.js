class Chicken extends MovableObject {
    height = 80;
    width = 60;
    y = 350;
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    chicken_sound = new Audio('/audio/chicken.wav');

    constructor(){
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 500;
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

          /*   let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 3; => 0 rest 0; 1 % 3; => 0, rest 1; 4 % 3 => 1 rest 1 => i = 1
            // i = 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2...
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++; */

           // this.chicken_sound.play(); 
            
        }, 200);
    
    }
    }
   
