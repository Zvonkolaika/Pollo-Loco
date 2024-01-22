/**
 * Represents a status bar for coins.
 * @extends StatusBar
 */
class StatusBarCoin extends StatusBar {
    IMAGES_COIN = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    /**
     * Represents a status bar coin.
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.y = 120;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage value for the status bar coin.
     * @param {number} percentage - The percentage value to set (between 0 and 5).
     */
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let path = this.IMAGES_COIN[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    }

}