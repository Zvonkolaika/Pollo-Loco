class Endboss extends MovableObject{
    height = 400;
    width = 280;
    y = 50;
    speed = 5;
    attacking = false;
    endboss_attacking_sound = new Audio('audio/battle-background.wav');

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png', 
        'img/4_enemie_boss_chicken/2_alert/G7.png', 
        'img/4_enemie_boss_chicken/2_alert/G8.png', 
        'img/4_enemie_boss_chicken/2_alert/G9.png', 
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',  
        'img/4_enemie_boss_chicken/2_alert/G12.png'  
    ];

    IMAGES_HURTING = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    IMAGES_ATTACKING = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png' 
    ]



    constructor(){
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACKING);
        this.x = 3800;
      
        this.animate();
    }

    

        animate() {
          
           setInterval(() => {
                let isHurt = this.isHurt();
                let isDead = this.isDead();
               
                if(isHurt) {
                    this.attacking = true;
                    this.playAnimation(this.IMAGES_HURTING);
        
                    /* setTimeout(() => {
                        // Stop hurting animation and start moving/attacking
                        this.stopAnimation();
                        this.moveAndAttack();
                    }, 1000);  */ // Adjust the timeout value as needed
                } else if (isDead) {
                    this.speed = 30;
                    this.playAnimation(this.IMAGES_DEAD);
                    this.moveOut();
                    this.stopSound(this.endboss_attacking_sound);
                
                }
                
                else if(this.attacking){
                    this.moveLeft();
                    
                    this.playAnimation(this.IMAGES_ATTACKING);
                 
                    this.endboss_attacking_sound.play();
                    
                }
                else {  
                    this.playAnimation(this.IMAGES_WALKING); 
                }
            }, 100)

        }



    
    }




    
    




    

