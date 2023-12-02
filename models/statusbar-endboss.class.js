class statusBarEndboss extends StatusBar {
    speed = 0.5;
    y = 0;

   // ICON_IMAGE = 'img/7_statusbars/3_icons/icon_health_endboss.png.png';

    IMAGES_HEALTH = [
       
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png' // 5
        
    ];

  //  COVER_IMAGE = 'img/7_statusbars/3_icons/icon_health_endboss.png';

   

    constructor(){

        super();
        
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 3800;
       
        this.setPercentage(100);


    
    }
   
    setPercentage(percentage){
        this.percentage = percentage;
         // => 0 ... 5
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()]
        this.img = this.imageCache[path];
   
    }



    }
