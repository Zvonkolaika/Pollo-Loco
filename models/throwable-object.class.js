class ThrowableObject extends MovableObject{
   energy = 20;

    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTLLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'  
    ];

    bottle_throw_sound = new Audio('audio/throw-bottle.wav');
   
    constructor(x, y){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png'); 
        this.loadImages(this.IMAGES_BOTLLE_SPLASH);
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.height = 60;
        this.width = 50;
        this.x = x;
        this.y = y;
        this.throw();
}

    throw(){ 
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            let isHurt = this.isHurt();

        if(isHurt){
                this.playAnimation(this.IMAGES_BOTLLE_SPLASH);
                this.x += 25;
                this.bottle_throw_sound.play();
            } 
           else{
                
                this.x += 10;
                this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
            }
        }
       , 50);
        
    }
}

/*     speed = 10;
    speedX = 30;
    speedY = 20;
    x = 420;
    y = 320;
    height = 100;
    width = 90; */

    //    IMAGES_BOTTLE = [
    //  'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
     //   'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
   // ]

   // constructor(){
    //    super().loadImage(this.IMAGES_BOTTLE[0]);
    //    this.loadImages(this.IMAGES_BOTTLE);
   // }
