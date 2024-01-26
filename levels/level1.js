/**
 * Represents level 1 of the game.
 * @type {Object}
 */
let level1;

/**
 * Initializes the level with chickens, clouds, background objects, bottles, coins, and platforms.
 */
function initLevel() {

    level1 = new Level(
        [
            new Chicken(400),
            new Chicken(900),
            new Chicken(1300),
            new Chicken(1700),
            new Chicken(2100),
            new Chicken(2500),
            new Chicken(2900),
            new Chicken(3300),
            new Smallchicken(600),
            new Smallchicken(1000),
            new Smallchicken(1400),
            new Smallchicken(1800),
            new Smallchicken(2200),
            new Smallchicken(2600),
            new Smallchicken(3000),
            new Smallchicken(3200),
            new Endboss()
        ],
        
        [
            new Cloud('./img/5_background/layers/4_clouds/1.png', -1500),
            new Cloud('./img/5_background/layers/4_clouds/2.png', -700),
            new Cloud('./img/5_background/layers/4_clouds/1.png', 100),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 800),
            new Cloud('./img/5_background/layers/4_clouds/1.png', 1300),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 1900),
            new Cloud('./img/5_background/layers/4_clouds/1.png', 2400),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 2900),
            new Cloud('./img/5_background/layers/4_clouds/1.png', 3500)
        ],

        [
            new BackgroundObject('./img/5_background/layers/air.png', -719),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -719), // y = 480 - 480
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -719),
            new BackgroundObject('./img/5_background/layers/air.png', 0), // y = 480 - 480
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0), // y = 480 - 480
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0), // y = 480 - 480
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0), // y = 480 - 480
            new BackgroundObject('./img/5_background/layers/air.png', 719),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719), 
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719),
            new BackgroundObject('./img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 2), 
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('./img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 3), 
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 3),
            new BackgroundObject('./img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 4), 
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 4),
            new BackgroundObject('./img/5_background/layers/air.png', 719 * 5),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 5),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 5), 
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 5),
        ],

        [
            new Bottle(700, 370),
            new Bottle(1400, 70),
            new Bottle(1450, 70),
            new Bottle(1750, 120),
            new Bottle(1850, 370),
            new Bottle(2400, 370),
            new Bottle(2800, 370),
        ],

        [
            new Coin(700, 280),
            new Coin(750, 240),
            new Coin(800, 200),
            new Coin(850, 240),
            new Coin(900, 280),
            new Coin(950, 320),
            new Coin(1250, 100),
            new Coin(1350, 320),
            new Coin(1450, 360),
            new Coin(1500, 360),
            new Coin(1550, 240),
            new Coin(1600, 240),
            new Coin(1800, 100),
            new Coin(1850, 100),
            new Coin(2400, 320),
            new Coin(2800, 320),
            new Coin(2850, 280),
            new Coin(2900, 240),
            new Coin(2950, 200),
            new Coin(3000, 240),
            new Coin(3050, 280),
            new Coin(3100, 320),
            new Coin(3300, 200),
            new Coin(3350, 200),
            new Coin(3450, 280),
        ],

        [
            new Platform('./img/icons_game/plarform3.png', 1000, 250),
            new Platform('./img/icons_game/plarform3.png', 1250, 100),
            new Platform('./img/icons_game/plarform3.png', 1500, 270)
        ]
    )
}