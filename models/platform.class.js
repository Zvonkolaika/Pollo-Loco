class Platform extends MovableObject {
    height = 140;
    width = 340;

    offset = {
        top: 50,
        left: 110,
        right: 90,
        bottom: 80
    };

    constructor(path, x, y) {
        super().loadImage(path);
        this.x = x;
        this.y = y;
    }
}