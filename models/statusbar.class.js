class StatusBar extends DrawableObject {
    
    constructor(){
        super();
      
        this.x = 40;
        this.width = 180; 
        this.height = 50;
    }

    resolveImageIndex(){
        if(this.percentage == 100){
            return 5;
        }
        else if(this.percentage > 80){
            return 4;
        }
        else if(this.percentage > 60){
            return 3;
        }
        else if(this.percentage > 40){
            return 2;
        }
        else if(this.percentage > 20){
            return 1;
        }
        else {
            return 0;
        }
    }
}

