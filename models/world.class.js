class World {
    // Initialize class properties
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
    adjustingWidthRight = 150;
    adjustingWidthLeft = 55;
    animationID = [];
    // Initialize audio elements
    game_sound = new Audio('/audio/funny-country-loop-ver.wav');
    chicken_dead_sound = new Audio('/audio/chicken-growl.wav');
    bottle_throw_sound = new Audio('audio/throw-bottle.wav');
    bottle_collect_sound = new Audio('audio/bottles-clinking.wav');
    coin_collect_sound = new Audio('audio/coins.wav');
    endboss_hit_sound = new Audio('audio/endboss-hit.wav');
    win_sound = new Audio('audio/win.wav');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

         // Set volume and loop properties for audio elements
        this.game_sound.volume = 0.2;
        this.game_sound.loop = true;
        this.chicken_dead_sound.volume = 0.5;

         // Initial setup
        this.draw();
        this.setWorld();
        this.run();
        this.game_sound.play();
    }
    // Set the character's world reference
    setWorld() {
        this.character.world = this;
    }
    // Run the main game loop
    run() {
        // Set up various animations at different intervals
        this.startAnimation(() => {
        this.checkPlatformEdges(this.character);
        this.checkCollisions(this.level.enemies);
        this.checkCollisions(this.level.platforms);
        this.checkThrowObjects();
        this.checkCollectItems();
        this.checkCollectCoins();

        }, 100);

        this.startAnimation(() => {
            this.allignEndbossStatusbar();
        }, 100);

        this.startAnimation(() => {
            this.checkThrowableCollisions();
        }, 500);
    }
    // Start an animation interval
    startAnimation(fn, interval) {
        this.animationID.push(setInterval(fn, interval));
    }

    stopAnimation() {
      
        this.animationID.forEach(ID => {
            clearInterval(ID);
        });
        this.gameIsRunning = false;
    }
    // Align the status bar of the end boss
    allignEndbossStatusbar() {

        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                if (enemy.attacking && enemy.x > 400 && enemy.y == 50) {
                    this.statusBarEndboss.moveTo(enemy.getPosition());
                    this.statusBarEndbossHeart.moveTo(enemy.getPosition() - 6);
                }
            }
        });
    }

// Check collisions with obstacles
checkCollisions(obstacles) {
    // Iterate through obstacles and check for collisions
    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        // Check collision conditions and handle accordingly
        if (this.character.isColliding(obstacle)
            && !this.character.isHurt()
            && !obstacle.isDead()
            && !this.character.isDead()) {
            // Handle collisions based on obstacle type
            if (this.character.isAboveGround()) {
                this.handleJumpingCollision(obstacle);
            } else if (obstacle instanceof Chicken || obstacle instanceof Smallchicken) {
                // Handle collision with chickens
                let hitValue = 10;
                this.characterHitting(hitValue);
                this.gameLost();
            } else if (obstacle instanceof Endboss) {
                // Handle collision with end boss
                let hitValue = 20;
                this.characterHitting(hitValue);
                this.gameLost();
            }
        }
    }
}

// Check platform edges for character position
    checkPlatformEdges(character) {
        if (character.onPlatform) {
            let platform = character.onPlatform;
            if ((character.x > platform.x 
                                + platform.width 
                                - platform.offset.right 
                                - character.offset.left
                || character.x < platform.x + character.offset.left
                )) {
                character.onPlatform = 0;
            }
            else {
                character.y = platform.y
                    + platform.offset.top
                    + character.offset.bottom
                    - character.height;
            }
        }
    }
     // Handle character hitting an obstacle
    characterHitting(hitValue) {
        this.character.hit(hitValue);
        this.statusBarHealth.setPercentage(this.character.energy);
    }

     // Stop intervals related to end boss animations
    stopEndbossIntervals() {
        this.level.enemies.forEach(enemy => {
            if(enemy instanceof Endboss)
            enemy.stopAnimation();
    
        });
    }

    // Stop end boss sound
    stopEndbossSound() {
        this.level.enemies.forEach(enemy => {
            if(enemy instanceof Endboss)
            enemy.endboss_attacking_sound.pause();
        });
    }

    // Handle game loss
    gameLost() {
        if (this.character.energy == 0) {
            document.getElementById('game-over-screen').classList.remove('d-none');
            document.getElementById('restart-button-lost').classList.remove('d-none');
            this.stopEndbossIntervals();
            this.stopEndbossSound();
        }
    }
    // Handle game over (winning)
    gameOver() {
        document.getElementById('game-win-screen').classList.remove('d-none');
        document.getElementById('restart-button-win').classList.remove('d-none');
        this.stopEndbossSound();
    }

   // Handle jumping collisions
   handleJumpingCollision(enemy) {
    if (enemy instanceof Platform) {
        const platformTop = enemy.y - enemy.visibleHeight;
        // Check if the character is above the platform and falling
        if (
            this.character.y - this.character.height <= platformTop &&
            this.character.speedY < 0 &&
            !this.character.onPlatform
        ) {
            this.character.onPlatform = enemy;

            this.character.y = this.character.onPlatform.y
                + this.character.onPlatform.offset.top
                + this.character.offset.bottom
                - this.character.height

            this.character.speedY = 0; // Stop falling
        }
    }

    if (enemy instanceof Chicken || enemy instanceof Smallchicken) {
        this.character.jump();
        enemy.energy = 0;
        this.chicken_dead_sound.play();

        setTimeout(() => {
            const index = this.level.enemies.indexOf(enemy);
            if (index != -1) {
                this.level.enemies.splice(index, 1);
            }
        }, 1000);
    }
}

    // Check collisions with throwable objects
    checkThrowableCollisions() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                // Iterate over throwable objects
                for (let i = 0; i < this.throwableObject.length; i++) {
                    let throwableObject = this.throwableObject[i];
                    // Check collisions with the endboss
                    if (throwableObject.isCollidingWith(enemy)) {

                        const hitValue = 20;
                        throwableObject.hit(hitValue);
                        enemy.hit(hitValue);
                        this.endboss_hit_sound.play();
                        this.statusBarEndboss.setPercentage(enemy.energy);
                        this.game_sound.pause();
                        this.game_sound.currentTime = 0;
                        if (enemy.energy == 0) {
                            this.win_sound.play();
                            setTimeout(() => {
                                this.gameOver();
                            }, 5000);
                        }
                    }
                }
            }
        }
        );
    }

       // Check if character can collect bottles
       checkCollectItems() {
        if (this.character.bottles < 5) {
            let i = 0;
            for (i = 0; i < this.level.bottles.length; i++) {
                const bottle = this.level.bottles[i];

                if (this.character.isColliding(bottle)) {
                    // Collect bottle and play collect sound
                    this.character.collectBottle();
                    this.bottle_collect_sound.play();
                    this.statusBarBottle.setPercentage(this.character.bottles * 20);
                    break;
                }
            }
            // Remove collected bottle from the level
            this.level.bottles.splice(i, 1);
        }
    }

    // Check if character can collect coins
    checkCollectCoins() {
        let i = 0;
        for (i = 0; i < this.level.coins.length; i++) {
            const coin = this.level.coins[i];

            if (this.character.isColliding(coin)) {
                // Collect coin and play collect sound
                this.character.collectCoin();
                this.coin_collect_sound.play();
                this.statusBarCoin.setPercentage(this.character.coins * 4);
                break;
            }
        }
        // Remove collected coin from the level
        this.level.coins.splice(i, 1);
    }

    // Check if character can throw objects
    checkThrowObjects() {
        if (this.keyboard.D) {
            this.character.lastAction = new Date().getTime();

            if (this.character.wasteBottle()) {
                // Create a new throwable object (bottle) and add it to the list
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObject.push(bottle);
                this.statusBarBottle.setPercentage(this.character.bottles * 20);
            }
        }
    }

    // Main draw function for rendering the game elements
    draw() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        // Draw background objects, platforms, and clouds
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.platforms);
        this.addObjectsToMap(this.level.clouds);

        // Draw end boss status bars
        this.addToMap(this.statusBarEndboss);
        this.addToMap(this.statusBarEndbossHeart);

        this.ctx.translate(-this.camera_x, 0); // 

        // ------------ Space for fixed objects ---------
        // Draw health, coin, and bottle status bars
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);

        this.ctx.translate(this.camera_x, 0);

        // Draw throwable objects, bottles, and coins
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);

        // Draw the character
        this.addToMap(this.character);

        // Draw enemies
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);

        // Request the next animation frame
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    // Helper function to add multiple objects to the map
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    // Helper function to add a single object to the map
    addToMap(mo) {
        // Flip the image if it's facing the other direction
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        // Draw the object and its frame
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        // Flip the image back if it was flipped
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    // Helper function to flip an image horizontally
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    // Helper function to flip an image back to its original state
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    // Mute all sound effects
    muteSound() {
        this.chicken_dead_sound.muted = true;
        this.bottle_throw_sound.muted = true;
        this.bottle_collect_sound.muted = true;
        this.coin_collect_sound.muted = true;
        this.endboss_hit_sound.muted = true;
        this.win_sound.muted = true;
        this.game_sound.muted = true;
        // Mute sounds for endboss
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.endboss_attacking_sound.muted = true;
                enemy.bottle_throw_sound.muted = true;
            }
        });
    }

    // Unmute all sound effects
    unmuteSound() {
        this.chicken_dead_sound.muted = false;
        this.bottle_throw_sound.muted = false;
        this.bottle_collect_sound.muted = false;
        this.coin_collect_sound.muted = false;
        this.endboss_hit_sound.muted = false;
        this.win_sound.muted = false;
        this.game_sound.muted = false;
        // Unmute sounds for endboss
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.bottle_throw_sound.muted = false;
                enemy.endboss_attacking_sound.muted = false;
            }
        });
    }
}
