class Bottle extends MovableObject {
    IMAGES_BOTTLE_ANIMATION = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(x){
        super();
        this.x = x;
        this.y = 370;
        this.width = 80; 
        this.height = 60;
        this.loadImages(this.IMAGES_BOTTLE_ANIMATION);
        this.animate();
    }

    animate(){
     
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_ANIMATION);
            
        }, 200);
    
    }
}