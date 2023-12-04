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
        this.game_sound.volume = 0.2;
        this.game_sound.loop = true;
        this.chicken_dead_sound.volume = 0.5;

        this.draw();
        this.setWorld();
        this.run();
        this.game_sound.play();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
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

    startAnimation(fn, interval) {
        this.animationID.push(setInterval(fn, interval));
    }

    stopAnimation() {
      
        this.animationID.forEach(ID => {
            clearInterval(ID);
        });
        this.gameIsRunning = false;
    }

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

    checkCollisions(obstacles) {

        for (let i = 0; i < obstacles.length; i++) {
            const obstacle = obstacles[i];
            if (this.character.isColliding(obstacle)
                && !this.character.isHurt()
                && !obstacle.isDead()
                && !this.character.isDead()) {
                if (this.character.isAboveGround()) {
                    this.handleJumpingCollision(obstacle);
                }
                else if (obstacle instanceof Chicken || obstacle instanceof Smallchicken) {
                    console.log("Charackter is hitting");
                    let hitValue = 10;
                    this.characterHitting(hitValue);
                    this.gameLost();
                }

                else if (obstacle instanceof Endboss) {
                    console.log("Charackter is hitting");
                    let hitValue = 20;
                    this.characterHitting(hitValue);

                    this.gameLost();
                }
            }
        }
    }

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

    characterHitting(hitValue) {
        this.character.hit(hitValue);
        this.statusBarHealth.setPercentage(this.character.energy);
    }

    stopEndbossIntervals() {
        this.level.enemies.forEach(enemy => {
            if(enemy instanceof Endboss)
            enemy.stopAnimation();
    
        });
    }

    stopEndbossSound() {
        this.level.enemies.forEach(enemy => {
            if(enemy instanceof Endboss)
            enemy.endboss_attacking_sound.pause();
        });
    }

    gameLost() {
        if (this.character.energy == 0) {
            document.getElementById('game-over-screen').classList.remove('d-none');
            document.getElementById('restart-button-lost').classList.remove('d-none');
            this.stopEndbossIntervals();
            this.stopEndbossSound();
        }
    }

    gameOver() {
        document.getElementById('game-win-screen').classList.remove('d-none');
        document.getElementById('restart-button-win').classList.remove('d-none');
        this.stopEndbossSound();
    }

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

    checkCollectItems() {
        if (this.character.bottles < 5) {
            let i = 0;
            for (i = 0; i < this.level.bottles.length; i++) {
                const bottle = this.level.bottles[i];

                if (this.character.isColliding(bottle)) {
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

            if (this.character.isColliding(coin)) {
                this.character.collectCoin();
                this.coin_collect_sound.play();
                this.statusBarCoin.setPercentage(this.character.coins * 4);
                break;
            }
        }
        this.level.coins.splice(i, 1);
    }


    checkThrowObjects() {
        if (this.keyboard.D) {
            this.character.lastAction = new Date().getTime();

            if (this.character.wasteBottle()) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObject.push(bottle);
                this.statusBarBottle.setPercentage(this.character.bottles * 20);
            }
        }
    }

    draw() {
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
        requestAnimationFrame(function () {
            self.draw()
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    muteSound() {
        this.chicken_dead_sound.muted = true;
        this.bottle_throw_sound.muted = true;
        this.bottle_collect_sound.muted = true;
        this.coin_collect_sound.muted = true;
        this.endboss_hit_sound.muted = true;
        this.win_sound.muted = true;
        this.game_sound.muted = true;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.endboss_attacking_sound.muted = true;
                enemy.bottle_throw_sound.muted = true;
            }
        }
        );
    }

    unmuteSound() {
        this.chicken_dead_sound.muted = false;
        this.bottle_throw_sound.muted = false;
        this.bottle_collect_sound.muted = false;
        this.coin_collect_sound.muted = false;
        this.endboss_hit_sound.muted = false;
        this.win_sound.muted = false;
        this.game_sound.muted = false;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.bottle_throw_sound.muted = false;
                enemy.endboss_attacking_sound.muted = false;
            }
        }
        )
    }
}