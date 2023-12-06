class Platform extends MovableObject {
    height = 140;
    width = 340;

    offset = {
        top: 60,
        left: 120,
        right: 100,
        bottom: 80
    };

    constructor(path, x, y) {
        super().loadImage(path);
        this.x = x;
        this.y = y;
    }
}