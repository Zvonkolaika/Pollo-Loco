class Chicken extends MovableObject {
    height = 80;
    width = 60;
    y = 350;
    x;
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        '../img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor(x) {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = x;
        this.speed = 0.55 + Math.random() * 0.5;
        this.animate();
    }

    animate() {
        this.chickenMoveLeft();
        this.chickenAnimation();
    }

    chickenAnimation() {
        this.startAnimation(() => {
            let isDead = this.isDead();

            if (isDead) {
                this.playAnimation(this.IMAGES_DEAD);
            }
            else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    chickenMoveLeft() {
        this.startAnimation(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }

    /*   let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 3; => 0 rest 0; 1 % 3; => 0, rest 1; 4 % 3 => 1 rest 1 => i = 1
      // i = 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2...
      let path = this.IMAGES_WALKING[i];
      this.img = this.imageCache[path];
      this.currentImage++; */
}

