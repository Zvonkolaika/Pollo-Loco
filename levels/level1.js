const level1 = new Level(
[
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Endboss()
],
[
    new Cloud()
],
[
    new BackgroundObject('img/5_background/layers/air.png', -719), 
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719), // y = 480 - 480
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
    new BackgroundObject('img/5_background/layers/air.png', 0), // y = 480 - 480
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0), // y = 480 - 480
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0), // y = 480 - 480
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0), // y = 480 - 480
    new BackgroundObject('img/5_background/layers/air.png', 719), 
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719), // y = 480 - 480
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
    new BackgroundObject('img/5_background/layers/air.png', 719*2), 
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2), // y = 480 - 480
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),
    new BackgroundObject('img/5_background/layers/air.png', 719*3), 
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3), // y = 480 - 480
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3),
    new BackgroundObject('img/5_background/layers/air.png', 719*4), 
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*4),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*4), // y = 480 - 480
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*4),
],

[
    new Bottle(500),
    new Bottle(700),
    new Bottle(800),
    new Bottle(1500),
    new Bottle(1600),
    new Bottle(1750),
    new Bottle(1850),
    new Bottle(2050)
],

[
    new Coin(600, 380),
    new Coin(650, 340),
    new Coin(700, 300),
    new Coin(750, 260),
    new Coin(800, 300),
    new Coin(850, 340),
    new Coin(900, 380),
    new Coin(1100, 380),
    new Coin(1150, 380),
    new Coin(1200, 380),
    new Coin(1400, 380),
    new Coin(1450, 340),
    new Coin(1500, 300),
    new Coin(1550, 260),
    new Coin(1600, 300),
    new Coin(1650, 340),
    new Coin(1700, 380)
]

)