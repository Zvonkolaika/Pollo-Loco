class Level{
    enemies;
    clouds;
    backgroundObjects;
    statusBar;
    level_end_x = 2200;
    constructor(enemies, clouds, backgroundObjects, statusBar){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.statusBar = statusBar;
    }
}