/**
 * Represents a status bar for the end boss.
 * @class
 * @extends StatusBar
 */
class statusBarEndboss extends StatusBar {
    speed = 0.5;
    y = 0;

    /**
     * Array of image paths representing the health status of the end boss status bar.
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
     * Represents the constructor of the StatusBarEndBoss class.
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 3800;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage value for the status bar.
     * @param {number} percentage - The percentage value to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    }
}
