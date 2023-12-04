class ThrowableObject extends MovableObject {
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

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTLLE_SPLASH);
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.height = 60;
        this.width = 50;
        this.x = x;
        this.y = y;
        this.throw();
    }

    throw() {
        this.speedY = 40;
        this.applyGravity();
        this.startAnimation(() => {
            let isHurt = this.isHurt();

            if (isHurt) {
                this.playAnimation(this.IMAGES_BOTLLE_SPLASH);
                this.x += 35;
            }
            else {
                this.x += 10;
                this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
            }
        }, 50);
    }
}