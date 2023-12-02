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

        if( this instanceof Character 
                || this instanceof Chicken 
                || this instanceof Endboss 
                || this instanceof ThrowableObject 
                || this instanceof Smallchicken
                || this instanceof Platform){
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
          //  ctx.rect(this.x, this.y, this.width, this.height);
          ctx.rect(this.x + this.offset.left, 
                    this.y + this.offset.top, 
                    this.width - this.offset.left - this.offset.right, 
                    this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, 10, 10);
    
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