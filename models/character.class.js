class Character extends MovableObject {
    y = 155;
    height = 280;
   
    constructor(){
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        super().loadImage([
            '',
            '',
            '',
            '',
            '',
            ''
        ])
    }

    jump(){}
}