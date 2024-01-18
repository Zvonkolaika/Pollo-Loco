    // Initialize audio elements
    const game_sound = new Audio('./audio/funny-country-loop-ver.wav');
    const chicken_dead_sound = new Audio('./audio/chicken-growl.wav');
    const bottle_throw_sound = new Audio('./audio/throw-bottle.wav');
    const bottle_collect_sound = new Audio('./audio/bottles-clinking.wav');
    const coin_collect_sound = new Audio('./audio/coins.wav');
    const endboss_hit_sound = new Audio('./audio/endboss-hit.wav');
    const win_sound = new Audio('./audio/win.wav');
    const walking_sound = new Audio('./audio/running.wav');
    const jumping_sound = new Audio('./audio/jump.wav');
    const snoring_sound = new Audio('./audio/snoring.wav');
    const hurting_sound = new Audio('./audio/hurt.mp3');
    const game_lost_sound = new Audio('./audio/game-lost.wav');
    const endboss_attacking_sound = new Audio('./audio/battle-background.wav');

    function initAudio() {
        game_sound.volume = 0.2;
        game_sound.loop = true;
        chicken_dead_sound.volume = 0.5;
        game_sound.play();
    }

    // Mute all sound effects
    function muteSound() {
        chicken_dead_sound.muted = true;
        bottle_throw_sound.muted = true;
        bottle_collect_sound.muted = true;
        coin_collect_sound.muted = true;
        endboss_hit_sound.muted = true;
        win_sound.muted = true;
        game_sound.muted = true;
    }

    // Unmute all sound effects
    function unmuteSound() {
        chicken_dead_sound.muted = false;
        bottle_throw_sound.muted = false;
        bottle_collect_sound.muted = false;
        coin_collect_sound.muted = false;
        endboss_hit_sound.muted = false;
        win_sound.muted = false;
        game_sound.muted = false;
    }
