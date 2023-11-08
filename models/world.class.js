class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    collectibleObject = new CollectibleObject();
    throwableObject = [];


    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld(){
        this.character.world = this;
    }

    run(){
        setInterval(() => {
            this.checkCollisions(); 
            this.checkThrowObjects();
            
        }, 1000);
    }

    checkCollisions(){
        this.level.enemies.forEach(enemy => {
            if(this.character.isColliding(enemy)){
               this.character.hit();
               this.statusBarHealth.setPercentage(this.character.energy);
            }
        });
    }

    checkCollisionsBottle(){
        this.level.bottle.forEach(throwableObject => {
            if(this.endboss.isColliding(throwableObject)){
               this.endboss.hit();
       //        this.statusBarEndboss.setPercentage(this.endboss.energy);
            }
        });
    }

    checkThrowObjects(){
        if(this.keyboard.D){
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
            this.throwableObject.push(bottle);
        }
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0); // 
        // ------------ Space for fixed objects ---------
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
       
        this.ctx.translate(this.camera_x, 0); 

        this.addObjectsToMap(this.throwableObject);
        this.addToMap(this.collectibleObject);
        
        this.addToMap(this.character);
      
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0); 

        // Draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function(){
            self.draw()
        });
    }

    addObjectsToMap(objects){
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(mo){
        if(mo.otherDirection){
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if(mo.otherDirection){
            this.flipImageBack(mo);
        }
    }

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo){
        mo.x = mo.x * -1; 
        this.ctx.restore();
    }

   
}