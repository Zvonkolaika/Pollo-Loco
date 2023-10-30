class MovableObject {
    x = 120;
    y = 230;
    img;
    height = 200;
    width = 130;
    imageCache = {};

// loadImage('img/test.png')
    loadImage(path){
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image">
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            imageCache[path] = path;
        });
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft(){}

  
}