/**
 * Represents a status bar for health.
 * @extends StatusBar
 */
class StatusBarHealth extends StatusBar {

    /**
     * Array of image paths representing different levels of health for the status bar.
     * @type {string[]}
     */
    IMAGES_HEALTH = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png' 
    ];

    /**
     * Represents the constructor of the StatusBarHealth class.
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.y = 40;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage value for the health status bar.
     * @param {number} percentage - The percentage value to set (between 0 and 5).
     */
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    }
}