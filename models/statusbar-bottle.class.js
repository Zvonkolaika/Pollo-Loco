class StatusBarBottle extends StatusBar {
    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    constructor(){
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.y = 80;
        this.setPercentage(0);
    }

    /* setPercentage(percentage){
        console.log('Setting percentage:', percentage);
        this.percentage = percentage; // => 0 ... 5
        let path = this.IMAGES_BOTTLE[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    } */

    setPercentage(percentage) {
        //console.log('Setting percentage:', percentage);
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
       // console.log('Resolved path before setting image:', path);
        this.img = this.imageCache[path];
       // console.log('Resolved path after setting image:', this.img);
    }
} 