class Coin extends MovableObject {
    
    constructor(x, y){
        super().loadImage('img/7_statusbars/3_icons/icon_coin.png');
        this.x = x;
        this.y = y; 
        this.width = 50;  
        this.height = 50;
    }
}