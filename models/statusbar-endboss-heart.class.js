/**
 * Represents a status bar for the end boss heart.
 * @class
 * @extends StatusBar
 */
class statusBarEndbossHeart extends StatusBar {
    speed = 0.5;
    y = 0;
    width = 65;
    height = 65;

    /**
     * Represents the constructor function for the StatusBarEndbossHeart class.
     * @constructor
     */
    constructor() {
        super().loadImage('./img/7_statusbars/3_icons/icon_health_endboss.png');
        this.x = 3794;
    }
}
