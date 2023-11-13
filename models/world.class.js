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
    statusBarEndboss = new statusBarEndboss();
    throwableObject = [];
   // endboss = new Endboss();
    bottles = [];


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
            this.checkThrowableCollisions();
          //  this.checkCollisionsBottleCharacter();
            
        }, 1000);
    }

    checkCollisions(){
        this.level.enemies.forEach(enemy => {
            if(this.character.isColliding(enemy)){
                const hitValue = 5; // You can adjust this based on your game logic
                this.character.hit(hitValue);
              
               this.statusBarHealth.setPercentage(this.character.energy);
            }
        });
    }

    checkThrowableCollisions() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {

            
         // Iterate over throwable objects
                for (let i = 0; i < this.throwableObject.length; i++) {
                    let throwableObject = this.throwableObject[i];
            
                    // Check collisions with the endboss
                    if (throwableObject.isCollidingWith(enemy)) {
                        const hitValue = 20
                        enemy.hit(hitValue);
                        this.statusBarEndboss.setPercentage(enemy.energy);
                        // Update status bar for endboss, if needed
                       
                    }
                }
            }
        });
    }

/*      checkCollisionsBottleCharacter() {
    // Iterate over throwable objects
    for (let i = 0; i < this.bottles.length; i++) {
        let bottle = this.bottles[i];
   
        // Check collisions with the character
        if (this.character.isColliding(bottle)) {
            const hitValue = 20;
            bottle.hit(hitValue);
            this.statusBarBottle.setPercentage(bottle.energy);
        }
    }
} */

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
      
       
        this.addToMap(this.statusBarEndboss);

        this.ctx.translate(-this.camera_x, 0); // 
        // ------------ Space for fixed objects ---------
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
       
        this.ctx.translate(this.camera_x, 0); 

        this.addObjectsToMap(this.throwableObject);
      
        
        this.addToMap(this.character);

      
        this.addObjectsToMap(this.level.enemies);

        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);

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