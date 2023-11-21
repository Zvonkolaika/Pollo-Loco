class Character extends MovableObject {
    y = 50;
    height = 280;
    speed = 10;
  
    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        '../img/2_character_pepe/3_jump/J-31.png',
        '../img/2_character_pepe/3_jump/J-32.png',
        '../img/2_character_pepe/3_jump/J-33.png',
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png',
        '../img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURTING = [
        '../img/2_character_pepe/4_hurt/H-41.png',
        '../img/2_character_pepe/4_hurt/H-42.png',
        '../img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        '../img/2_character_pepe/5_dead/D-51.png',
        '../img/2_character_pepe/5_dead/D-52.png',
        '../img/2_character_pepe/5_dead/D-53.png',
        '../img/2_character_pepe/5_dead/D-54.png',
        '../img/2_character_pepe/5_dead/D-55.png',
        '../img/2_character_pepe/5_dead/D-56.png',
        '../img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_STAYING = [
        '../img/2_character_pepe/1_idle/idle/I-1.png',
        '../img/2_character_pepe/1_idle/idle/I-2.png',
        '../img/2_character_pepe/1_idle/idle/I-3.png',
        '../img/2_character_pepe/1_idle/idle/I-4.png',
        '../img/2_character_pepe/1_idle/idle/I-5.png',
        '../img/2_character_pepe/1_idle/idle/I-6.png',
        '../img/2_character_pepe/1_idle/idle/I-7.png',
        '../img/2_character_pepe/1_idle/idle/I-8.png',
        '../img/2_character_pepe/1_idle/idle/I-9.png',
        '../img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_SLEEPING = [
        '../img/2_character_pepe/1_idle/long_idle/I-11.png',
        '../img/2_character_pepe/1_idle/long_idle/I-12.png',
        '../img/2_character_pepe/1_idle/long_idle/I-13.png',
        '../img/2_character_pepe/1_idle/long_idle/I-14.png',
        '../img/2_character_pepe/1_idle/long_idle/I-15.png',
        '../img/2_character_pepe/1_idle/long_idle/I-16.png',
        '../img/2_character_pepe/1_idle/long_idle/I-17.png',
        '../img/2_character_pepe/1_idle/long_idle/I-18.png',
        '../img/2_character_pepe/1_idle/long_idle/I-19.png',
        '../img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    world;

  
    walking_sound = new Audio('/audio/running.wav');
    jumping_sound = new Audio('audio/jump.wav');
    snoring_sound = new Audio('audio/snoring.wav');
    hurting_sound = new Audio('audio/hurt.mp3');
    game_lost_sound = new Audio('audio/game-lost.wav');


    constructor(){
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadImages(this.IMAGES_STAYING);
        this.applyGravity();
        this.animate();
        this.jumping_sound.volume = 0.3;
      
    
    }

    animate(){
       
        setInterval(() => {
          //this.walking_sound.pause();
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){
               this.moveRight();
               this.otherDirection = false;
               //this.walking_sound.play();
            }

            if(this.world.keyboard.LEFT && this.x > 0){
                this.moveLeft();
                this.otherDirection = true;
               
               // this.walking_sound.play();
            }
           
            if(this.world.keyboard.SPACE && !this.isAboveGround() || this.world.keyboard.UP && !this.isAboveGround()){
                this.jump();
              //  this.jumping_sound.play();
            }

            this.world.camera_x = -this.x + 100;

        }, 1000 / 60);

        setInterval(() => {
            if(this.isDead()){
                this.playAnimation(this.IMAGES_DEAD);
                this.world.game_sound.pause();
                this.world.game_sound.currentTime = 0;
                this.game_lost_sound.play();
            }
            else if(this.isHurt()){
        
                this.playAnimation(this.IMAGES_HURTING);
                this.hurting_sound.play();
            }
            else if(this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
                this.jumping_sound.play();
            }
            else if(this.characterIsMoving()) {
                this.playAnimation(this.IMAGES_WALKING);
                this.walking_sound.play();
            }
            else if(this.isAsleep()) {
                this.playAnimation(this.IMAGES_SLEEPING);
                this.snoring_sound.play();
            }
            else {
                this.playAnimation(this.IMAGES_STAYING);
                this.walking_sound.pause();
                this.walking_sound.currentTime = 0;
                } 
            }, 70);    
    }

    stopSounds(){
        this.walking_sound.pause();
        this.walking_sound.currentTime = 0;
        this.jumping_sound.pause();
        this.jumping_sound.currentTime = 0;
        this.snoring_sound.pause();
        this.snoring_sound.currentTime = 0;
        this.hurting_sound.pause();
        this.hurting_sound.currentTime = 0;
        this.game_lost_sound.pause();
        this.game_lost_sound.currentTime = 0;
    }

    characterIsMoving(){
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    muteSound() {
        this.BACKGROUD_MUSIC.muted = true;
        this.WALKING_SOUND.muted = true;
        this.JUMP_SOUND.muted = true;
        this.SNORING_SOUND.muted = true;
        this.HURT_SOUND.muted = true;
        this.GAME_LOST_SOUND.muted = true;
    }

    unmuteSound() {
        this.BACKGROUD_MUSIC.muted = false;
        this.WALKING_SOUND.muted = false;
        this.JUMP_SOUND.muted = false;
        this.SNORING_SOUND.muted = false;
        this.HURT_SOUND.muted = false;
        this.GAME_LOST_SOUND.muted = false;
    }
}