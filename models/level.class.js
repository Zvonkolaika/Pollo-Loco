/**
 * Represents a level in the game.
 * @class
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    platforms;
   
    level_end_x = 3690;

    /**
     * Represents a Level.
     * @constructor
     * @param {Array} enemies - The enemies in the level.
     * @param {Array} clouds - The clouds in the level.
     * @param {Array} backgroundObjects - The background objects in the level.
     * @param {Array} bottles - The bottles in the level.
     * @param {Array} coins - The coins in the level.
     * @param {Array} platforms - The platforms in the level.
     */
    constructor(enemies, clouds, backgroundObjects, bottles, coins, platforms) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
        this.platforms = platforms;
    }
}