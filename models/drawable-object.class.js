/**
 * Represents a drawable object.
 * @class
 */
class DrawableObject {
    x = 120;
    y = 230;
    img;
    height = 200;
    width = 130;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads an image from the specified path.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image">
        this.img.src = path;
    }

    /**
     * Draws the drawable object on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws the frame of the drawable object on the canvas.
     * Only certain types of objects are drawn with specific colors.
     * 
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    drawFrame(ctx) {
        if (this instanceof Character
            || this instanceof Chicken
            || this instanceof Endboss
            || this instanceof ThrowableObject
            || this instanceof Smallchicken
            || this instanceof Platform) {
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

    /**
     * Loads images into the image cache.
     * @param {string[]} arr - An array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}