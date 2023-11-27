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
    statusBarEndbossHeart = new statusBarEndbossHeart();
    throwableObject = [];
    bottles = [];
    coins = [];

    
    game_sound = new Audio('/audio/funny-country-loop-ver.wav');
    
    chicken_dead_sound = new Audio('/audio/chicken-growl.wav');
    bottle_throw_sound = new Audio('audio/throw-bottle.wav');
    bottle_collect_sound = new Audio('audio/bottles-clinking.wav');
    coin_collect_sound = new Audio('audio/coins.wav');
    endboss_hit_sound = new Audio('audio/endboss-hit.wav');
    win_sound = new Audio('audio/win.wav');
    
    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.game_sound.volume = 0.2;
        this.game_sound.loop = true;
        this.chicken_dead_sound.volume = 0.5;
      
        this.draw();
        this.setWorld();
        this.run();
        this.game_sound.play();

      
    }


    setWorld(){
        this.character.world = this;
    }

    run(){
        setInterval(() => {
            this.checkPlatformEdges(this.character);
            this.checkCollisions(this.level.enemies);
            this.checkCollisions(this.level.platforms);
            this.checkThrowObjects();
            this.checkThrowableCollisions();
            this.checkCollectItems();
            this.checkCollectCoins();
          
        }, 100);

        setInterval(() => {
            this.allignEndbossStatusbar();
        }, 100);
    }

    allignEndbossStatusbar(){
        
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                if(enemy.attacking && enemy.x > 400 && enemy.y == 50){
                    this.statusBarEndboss.moveTo(enemy.getPosition());
                    this.statusBarEndbossHeart.moveTo(enemy.getPosition() - 6);  
                }
              /* else if(this.character.x < 2000){
                this.statusBarEndboss.x = 2500;
              } */
            }
        }); 
    }

    checkCollisions(obstacles){
    
        for (let i = 0; i < obstacles.length; i++) {
            const obstacle = obstacles[i];
            if(this.character.isColliding(obstacle) && !this.character.isHurt() && !obstacle.isDead()){
                if(this.character.isAboveGround()){
                    this.handleJumpingCollision(obstacle);
                }
                if( obstacle instanceof Chicken || obstacle instanceof Smallchicken || obstacle instanceof Endboss) { 
                    this.characterHitting();
                    this.gameLost();
                }
            }   
        }
    }

    checkPlatformEdges(character){
        if(character.onPlatform){
            if(!(character.x >= character.onPlatform.x 
                && character.x <= character.onPlatform.x + character.onPlatform.width)){
                    character.onPlatform = 0;
                    character.y = 50; //ground level
                }

        }
    }
     

    characterHitting(){
        const hitValue = 5; 
        this.character.hit(hitValue);
        this.statusBarHealth.setPercentage(this.character.energy);
    }

    gameLost(){
        if (this.character.energy == 0) {
            document.getElementById('game-over-screen').classList.remove('d-none');
            document.getElementById('restart-button').classList.remove('d-none');   
        }

    }

    gameOver(){

        document.getElementById('game-win-screen').classList.remove('d-none');
        document.getElementById('restart-button').classList.remove('d-none');   

    } 
     

    handleJumpingCollision(enemy) {
       
        if (enemy instanceof Platform) {
            const platformTop = enemy.y - enemy.visibleHeight;
            console.log("Charachter y : " + this.character.y + "platform new y : " + platformTop + "onPlatform: " + this.character.onPlatform);
            // Check if the character is above the platform and falling
            if (
                this.character.y - this.character.height <= platformTop &&
                this.character.speedY > 0 &&
                !this.character.onPlatform
            ) {
                console.log("Jumping onto platform!");
                this.character.onPlatform = enemy;
                this.character.y = platformTop - this.character.height + 1; // Adjust the position
                this.character.speedY = 0; // Stop falling
           /*  } else if (this.character.onPlatform === enemy) {
                // If the character was on the platform but is no longer above it, reset onPlatform
                this.character.onPlatform = null; */
            }
        }

  
      /*  if (enemy instanceof Platform){
            const new_y = enemy.height + enemy.visibleHeight;
            console.log("Charachter y : " + this.character.y + "platform new y : " + new_y);
            if(this.character.y == new_y){
                this.character.onPlatform = enemy;
                this.character.y = new_y; 
                console.log("###Charachter y : " + this.character.y + "platform new y : " + new_y);
            }

        }  */
        if (enemy instanceof Chicken || enemy instanceof Smallchicken){
            this.character.jump();
            enemy.energy = 0;
            this.chicken_dead_sound.play();
        
            setTimeout(() => {
                const index = this.level.enemies.indexOf(enemy);
                if(index != -1) {
                    console.log("Remove dead enemy ");
                    this.level.enemies.splice(index, 1);
                }
            }, 1000);
        }
     
    }
    

    checkThrowableCollisions() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {

            
         // Iterate over throwable objects
                for (let i = 0; i < this.throwableObject.length; i++) {
                    let throwableObject = this.throwableObject[i];
            
                    // Check collisions with the endboss
                    if (throwableObject.isCollidingWith(enemy)) {
                        console.log("Endboss is hurt ");
                      
                        const hitValue = 20;
                        throwableObject.hit(hitValue);
                        console.log("throwableobject is hitting " + throwableObject.hit(hitValue));
                        enemy.hit(hitValue);
                        this.endboss_hit_sound.play();
                       
                        this.statusBarEndboss.setPercentage(enemy.energy);

                        this.game_sound.pause();
                        this.game_sound.currentTime = 0;
                        if(enemy.energy == 0){
                         //   this.game_sound.pause();
                         //   this.game_sound = 0;
                         this.win_sound.play();
                         setTimeout(() => {
                            
                             this.gameOver();
                           
                             
                         }, 3000);
                            console.log("Endboss is dead ");
                          
                            }
                        }
                        // Update status bar for endboss, if needed
                    }
                }
            }
    );
    }
    
    

    checkCollectItems() {
        if (this.character.bottles < 5) {
        let i = 0;
        for (i = 0; i < this.level.bottles.length; i++) {
           const bottle = this.level.bottles[i];
            
           if(this.character.isColliding(bottle)){
               this.character.collectBottle();
               this.bottle_collect_sound.play();
               this.statusBarBottle.setPercentage(this.character.bottles * 20);
               break;
            }
        }
            this.level.bottles.splice(i, 1);
        }
      
    }  

    checkCollectCoins() {
        let i = 0;
        for (i = 0; i < this.level.coins.length; i++) {
           const coin = this.level.coins[i];
            
           if(this.character.isColliding(coin)){
               this.character.collectCoin();
               this.coin_collect_sound.play();
               this.statusBarCoin.setPercentage(this.character.coins * 5);
               break;
            }
        }
            this.level.coins.splice(i, 1);
        }
      

    checkThrowObjects(){

        if(this.keyboard.D){
            this.character.lastAction = new Date().getTime();
          
            if(this.character.wasteBottle()) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObject.push(bottle);
                this.statusBarBottle.setPercentage(this.character.bottles * 20); 
            }
            
        }
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.platforms);
        this.addObjectsToMap(this.level.clouds);
       
        this.addToMap(this.statusBarEndboss);
        this.addToMap(this.statusBarEndbossHeart);

        this.ctx.translate(-this.camera_x, 0); // 
        // ------------ Space for fixed objects ---------
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        
       
        this.ctx.translate(this.camera_x, 0); 

        this.addObjectsToMap(this.throwableObject);

        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
      
        
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