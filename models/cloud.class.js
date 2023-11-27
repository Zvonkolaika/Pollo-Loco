class Cloud extends MovableObject {

    y = 0;
    height = 250;
    width = 600;
 
    constructor(path, x){
        super().loadImage(path);
        this.x = x + Math.random() * 300;
        this.animate();

    }

    animate(){
        setInterval(() => {
            
            this.moveLeft();
        }, 1000 / 60);
    }
}