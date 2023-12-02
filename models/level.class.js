class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    platforms;
   
    level_end_x = 3690;
    constructor(enemies, clouds, backgroundObjects, bottles, coins, platforms) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
        this.platforms = platforms;
         
    }
}