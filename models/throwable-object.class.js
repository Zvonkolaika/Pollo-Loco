class ThrowableObject extends MovableObject{
   

    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]
   
    constructor(x, y){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png'); 
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
            this.x += 10;
        }, 25);
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
}