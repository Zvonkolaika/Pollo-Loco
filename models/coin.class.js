class Coin extends MovableObject {

    IMAGES_COIN_ANIMATION = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    constructor(x, y) {
        super().loadImage('./img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.loadImages(this.IMAGES_COIN_ANIMATION);
        this.animate();
    }

    animate() {
        this.coinAnimation();
    }

    coinAnimation() {
        this.startAnimation(() => {
            this.playAnimation(this.IMAGES_COIN_ANIMATION);

        }, 200);
    }
}
