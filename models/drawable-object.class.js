class DrawableObject {
    x = 120;
    y = 230;
    img;
    height = 200;
    width = 130;
    imageCache = {};
    currentImage = 0;

    loadImage(path){
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image">
        this.img.src = path;
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx){

        if( this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Bottle ||this instanceof Coin || this instanceof ThrowableObject){
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
 
}