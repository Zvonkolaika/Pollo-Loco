/**
 * Represents the game world.
 * @class
 */
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
    adjustingWidthRight = 150;
    adjustingWidthLeft = 55;
    animationID = [];
    pause = false;

    /**
     * Represents a World object.
     * @constructor
     * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
     * @param {Keyboard} keyboard - The keyboard object for input handling.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = new Keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }
    /**
     * Sets the world for the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Runs the game world.
     */
    run() {
        this.startAnimation(() => {
            if (this.pause) return;
            this.checkPlatformEdges(this.character);
            this.checkCollisions(this.level.platforms);
            this.checkCollisions(this.level.enemies);
            this.checkThrowObjects();
            this.checkCollectItems();
            this.checkCollectCoins();
        }, 1000 / 60);

        this.startAnimation(() => {
            if (this.pause) return;
            this.allignEndbossStatusbar();
        }, 100);

        this.startAnimation(() => {
            if (this.pause) return;
            this.checkThrowableCollisionsEndboss();
        }, 500);

        this.startAnimation(() => {
            if (this.pause) return;
            this.checkThrowableCollisions();
        }, 100);
    }

    // Start an animation interval
    /**
     * Starts the animation by repeatedly calling the provided function at the specified interval.
     * @param {Function} fn - The function to be called in each animation frame.
     * @param {number} interval - The time interval between each function call in milliseconds.
     */
    startAnimation(fn, interval) {
        this.animationID.push(setInterval(fn, interval));
    }

    /**
     * Stops the animation by clearing all animation intervals and setting the gameIsRunning flag to false.
     */
    stopAnimation() {
        this.animationID.forEach(ID => {
            clearInterval(ID);
        });
        this.gameIsRunning = false;
    }

    /**
     * Aligns the status bar of the end boss based on its position.
     */
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

    /**
     * Checks for collisions between the character and obstacles.
     * @param {Array} obstacles - An array of obstacles to check for collisions with.
     */
    checkCollisions(obstacles) {
        for (let i = 0; i < obstacles.length; i++) {
            const obstacle = obstacles[i];
            if (this.character.isColliding(obstacle)
                && !this.character.isHurt()
                && !obstacle.isDead()
                && !this.character.isDead()) {
                if (this.character.isAboveGround()) {
                    this.handleJumpingCollision(obstacle);
                } else if (obstacle instanceof Chicken || obstacle instanceof Smallchicken) {
                    let hitValue = 10;
                    this.characterHitting(hitValue);
                    gameLost();
                } else if (obstacle instanceof Endboss) {
                    let hitValue = 20;
                    this.characterHitting(hitValue);
                    this.character.x -= 100;
                    gameLost();
                }
            }
        }
    }

    // Check platform edges for character position
    /**
     * Checks if the character is at the edges of the platform and updates its position accordingly.
     * @param {Object} character - The character object.
     */
    checkPlatformEdges(character) {
        if (character.onPlatform) {
            let platform = character.onPlatform;
            if ((character.x >= platform.x
                + platform.width
                - platform.offset.right
                - character.offset.left
                || character.x <= platform.x + character.offset.left
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

    /**
     * Updates the character's health and updates the status bar accordingly.
     * @param {number} hitValue - The value representing the amount of damage inflicted on the character.
     */
    characterHitting(hitValue) {
        this.character.hit(hitValue);
        this.statusBarHealth.setPercentage(this.character.energy);
    }

    /**
     * Handles the collision when the character jumps and collides with an enemy.
     * If the enemy is a platform, checks if the character is above the platform and falling,
     * and if so, makes the character land on the platform and stops the character from falling.
     * If the enemy is a chicken or a small chicken, makes the character jump and marks the enemy as dead.
     * @param {Enemy} enemy - The enemy object that the character collided with.
     */
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
            this.enemiesIsDead(enemy);
        }
    }

    /**
     * Sets the energy of the enemy to 0 and removes it from the level's enemies array after a delay of 1 second.
     * @param {Object} enemy - The enemy object.
     */
    enemiesIsDead(enemy) {
        enemy.energy = 0;
        chicken_dead_sound.play();

        setTimeout(() => {
            const index = this.level.enemies.indexOf(enemy);
            if (index != -1) {
                this.level.enemies.splice(index, 1);
            }
        }, 1000);
    }

    /**
     * Checks for collisions between throwable objects and the endboss.
     */
    checkThrowableCollisionsEndboss() {
        const hitValue = 20;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                for (let i = 0; i < this.throwableObject.length; i++) {
                    let throwableObject = this.throwableObject[i];
                    if (throwableObject.isCollidingWith(enemy)) {
                        throwableObject.hit(hitValue);
                        enemy.hit(hitValue);
                        endboss_hit_sound.play();
                        this.statusBarEndboss.setPercentage(enemy.energy);
                        game_sound.pause();
                        game_sound.currentTime = 0;
                        if (enemy.energy == 0) {
                            win_sound.play();
                            setTimeout(() => {
                                gameOver();
                            }, 5000);
                        }
                    }
                }
            }
        });
    }

    /**
     * Checks for collisions between throwable objects and enemies.
     */
    checkThrowableCollisions() {
        const hitValue = 20;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Chicken || enemy instanceof Smallchicken) {
                for (let i = 0; i < this.throwableObject.length; i++) {
                    let throwableObject = this.throwableObject[i];
                    if (throwableObject.isCollidingWith(enemy)) {
                        this.enemiesIsDead(enemy);
                        console.log(enemy.energy);
                        throwableObject.hit(hitValue);
                    }
                }
            }
        });
    }

    /**
     * Checks and collects items (bottles) in the game world.
     */
    checkCollectItems() {
        if (this.character.bottles < 5) {
            let i = 0;
            for (i = 0; i < this.level.bottles.length; i++) {
                const bottle = this.level.bottles[i];
                if (this.character.isColliding(bottle)) {
                    this.character.collectBottle();
                    bottle_collect_sound.play();
                    this.statusBarBottle.setPercentage(this.character.bottles * 20);
                    break;
                }
            }
            this.level.bottles.splice(i, 1); // Remove collected bottle from the level
        }
    }

    /**
     * Checks if the character has collided with any coins in the level, collects the coin, plays a collect sound,
     * updates the status bar, and removes the collected coin from the level.
     */
    checkCollectCoins() {
        let i = 0;
        for (i = 0; i < this.level.coins.length; i++) {
            const coin = this.level.coins[i];
            if (this.character.isColliding(coin)) {
                this.character.collectCoin();
                coin_collect_sound.play();
                this.statusBarCoin.setPercentage(this.character.coins * 4);
                break;
            }
        }
        this.level.coins.splice(i, 1); // Remove collected coin from the level
    }

    /**
     * Checks if the 'D' key is pressed and throws objects accordingly.
     */
    checkThrowObjects() {
        if (this.keyboard.D) {
            if (this.character.wasteBottle()) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObject.push(bottle);
                this.statusBarBottle.setPercentage(this.character.bottles * 20);
            }
        }
    }

    /**
     * Draws the game world on the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.platforms);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.statusBarEndboss);
        this.addToMap(this.statusBarEndbossHeart);
        this.ctx.translate(-this.camera_x, 0);
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
        let self = this;
        requestAnimationFrame(function () { // Request the next animation frame
            self.draw();
        });
    }

    /**
     * Adds multiple objects to the map.
     * @param {Array} objects - The array of objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    // Helper function to add a single object to the map
    /**
     * Adds a map object to the world.
     * @param {MapObject} mo - The map object to be added.
     */
    addToMap(mo) {
        if (mo.otherDirection) {  // Flip the image if it's facing the other direction
            this.flipImage(mo);
        }
        mo.draw(this.ctx); // Draw the object
        //mo.drawFrame(this.ctx); // Draw the objects frame
        if (mo.otherDirection) { 
            this.flipImageBack(mo); // Flip the image back if it was flipped
        }
    }

    /**
     * Flips the image horizontally.
     * @param {Object} mo - The image object to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Flips the image back horizontally by changing the x-coordinate of the object and restoring the canvas context.
     * @param {Object} mo - The object to flip the image back for.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
