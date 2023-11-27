class Platform extends MovableObject{
    y = 300;
    height = 140;
    width = 340;
    


    constructor() {
       
        // Add any additional properties or methods specific to platforms
        super().loadImage('img/icons_game/plarform3.png');
        this.x = 1000;
        this.visibleHeight = 10;
      
    }


}