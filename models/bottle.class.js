class Bottle extends MovableObject {
    IMAGES_BOTTLE_ANIMATION = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 60;
        this.loadImages(this.IMAGES_BOTTLE_ANIMATION);
        this.animate();
    }

    animate() {
        this.bottleAnimation();
    }

    bottleAnimation() {
        this.startAnimation(() => {
            this.playAnimation(this.IMAGES_BOTTLE_ANIMATION);
        }, 200);
    }
}