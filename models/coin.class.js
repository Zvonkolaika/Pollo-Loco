/**
 * Represents a Coin object.
 * @extends MovableObject
 */
class Coin extends MovableObject {

    /**
     * Array of image paths for coin animation.
     * @type {string[]}
     */
    IMAGES_COIN_ANIMATION = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    /**
     * Represents a Coin object.
     * @constructor
     * @param {number} x - The x-coordinate of the coin.
     * @param {number} y - The y-coordinate of the coin.
     */
    constructor(x, y) {
        super().loadImage('./img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.loadImages(this.IMAGES_COIN_ANIMATION);
        this.animate();
    }

    /**
     * Animates the coin.
     */
    animate() {
        this.coinAnimation();
    }

    /**
     * Performs the coin animation.
     */
    coinAnimation() {
        this.startAnimation(() => {
            this.playAnimation(this.IMAGES_COIN_ANIMATION);
        }, 200);
    }
}
