/**
 * Represents a status bar with a bottle image.
 * @extends StatusBar
 */
class StatusBarBottle extends StatusBar {
    IMAGES_BOTTLE = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    /**
     * Represents a status bar bottle.
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.y = 80;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage value of the status bar bottle.
     * @param {number} percentage - The percentage value to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
} 