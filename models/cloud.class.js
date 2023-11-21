class Cloud extends MovableObject {

    y = 0;
    height = 250;
    width = 600;

     IMAGES_CLOUDS = [
    '/img/5_background/layers/4_clouds/1.png',
    '/img/5_background/layers/4_clouds/2.png'
    ]; 
 
    constructor(){
        super().loadImage('/img/5_background/layers/4_clouds/1.png');
        this.loadImages(this.IMAGES_CLOUDS);
        this.x = Math.random() * 3000;
        this.animate();

    }

    animate(){
        setInterval(() => {
            
            this.moveLeft();
        }, 1000 / 60);
    }
}