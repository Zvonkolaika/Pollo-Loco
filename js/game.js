// Initialize global variables
let canvas;
let world;
let keyboard;
let gameIsRunning = false;
let soundIsMute = false;

// Function to start the game
function start() {
    initLevel();
    init();
    hideFirstScreen();
    hideFullInfo();
    gameIsRunning = true;
    //game_sound.play();
}

// Function to replay the game
function replay() {
    initLevel();
    hideFirstScreen();
    hideFullInfo();
    init();
    if (soundIsMute) {
        offSound();
    } else {
        onSound();
    }
}

// Function to replay after losing the game
function replayLost() {
    hideGameOverLost();
    replay();
}

// Function to replay after winning the game
function replayWin() {
    hideGameOverWin();
    replay();
}

// Initialize the game environment
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    hideGameButtons();
    hideMobileButtons();
    rotateMessage();
    initAudio();
}

// Hide the initial screen elements
function hideFirstScreen() {
    document.getElementById('first-screen').classList.add('d-none');
    document.getElementById('question-button').classList.add('d-none');
    document.getElementById('full-screen-button').classList.add('d-none');
}

// Hide additional game information
function hideFullInfo() {
    document.getElementById('full-info').classList.add('d-none');
}

// Show game buttons
function hideGameButtons() {
    document.getElementById('buttons-game-screen').classList.remove('d-none');
}

// Show mobile buttons
function hideMobileButtons() {
    document.getElementById('mobile-buttons').classList.remove('d-none');
}

// Toggle display of information about the game
function openCloseAboutGame() {
    var question = document.getElementById("about-game");
    question.classList.toggle("d-none");
    world.pause = !world.pause;
    pauseOnOff(world.pause);
}

function openCloseAboutGameMain() {
    var question = document.getElementById("about-game");
    question.classList.toggle("d-none");
}

function onOffPauseGame(){
    world.pause = !world.pause;
    pauseOnOff(world.pause);
    document.getElementById('on-pause').classList.toggle('d-none');
    document.getElementById('off-pause').classList.toggle('d-none');
}

// Turn off game sound
function offSound() {
    muteSound();
    world.character.muteSound();
    world.muteSoundEndboss();
    document.getElementById('on-sound').classList.add('d-none');
    document.getElementById('off-sound').classList.remove('d-none');
    soundIsMute = true;
}

// Turn on game sound
function onSound() {
    document.getElementById('on-sound').classList.remove('d-none');
    document.getElementById('off-sound').classList.add('d-none');
    unmuteSound();
    world.character.unmuteSound();
    world.unmuteSoundEndboss();
    soundIsMute = false;
}

// Hide the game win screen
function hideGameOverWin() {
    document.getElementById('game-win-screen').classList.add('d-none');
    document.getElementById('restart-button-win').classList.add('d-none');
    stopAllIntervals();
}

// Hide the game over screen after losing
function hideGameOverLost() {
    document.getElementById('game-over-screen').classList.add('d-none');
    document.getElementById('restart-button-lost').classList.add('d-none');
    stopAllIntervals();
}

// Stop all game-related intervals
function stopAllIntervals() {
    stopAllCloudsIntervals();
    stopAllCoinsIntervals();
    stopAllBottlesIntervals();
    stopCharacterAnimation();
    stopAllEnemiesIntervals();
    stopWorldIntervals();
}

// Stop intervals related to the game world
function stopWorldIntervals() {
    world.stopAnimation();
}

// Stop character animation interval
function stopCharacterAnimation() {
    world.character.stopAnimation();
}

// Stop intervals related to enemy characters
function stopAllEnemiesIntervals() {
    world.level.enemies.forEach(enemie => {
        enemie.stopAnimation();
    });
}

// Stop intervals related to cloud objects
function stopAllCloudsIntervals() {
    world.level.clouds.forEach((cloud) => {
        cloud.stopAnimation();
    });
}

// Stop intervals related to bottle objects
function stopAllBottlesIntervals() {
    world.level.bottles.forEach((bottle) => bottle.stopAnimation());
}

// Stop intervals related to coin objects
function stopAllCoinsIntervals() {
    world.level.coins.forEach((coin) => coin.stopAnimation());
}

function pauseOnOff(pause) {
    world.level.enemies.forEach(enemie => {
        enemie.pause = pause;
    });
    world.character.pause = pause;
}

// Enter fullscreen mode
function fullScreen() {
    let fullScreen = document.getElementById('fullscreen');
    enterFullscreen(fullScreen);
    if (gameIsRunning) {
        document.getElementById('full-screen-game-button').classList.add('d-none');
    }
    else {
        document.getElementById('full-screen-button').classList.add('d-none');
        document.getElementById('full-screen-game-button').classList.add('d-none');
    }
}
// Show fullscreen button based on game state
function showFullScreenButton() {
    if (gameIsRunning) {
        document.getElementById('full-screen-game-button').classList.remove('d-none');
    }
    else {
        console.log("fullscreen mode");
        document.getElementById('full-screen-button').classList.remove('d-none');
    }
}

function enterFullscreen(fullScreen) {
    if (fullScreen.requestFullscreen) {
        fullScreen.requestFullscreen();
    } else if (fullScreen.webkitRequestFullscreen) { /* Safari */
        fullScreen.webkitRequestFullscreen();
    } else if (fullScreen.msRequestFullscreen) { /* IE11 */
        fullScreen.msRequestFullscreen();
    }
}

document.addEventListener("fullscreenchange", function () {
    if (document.fullscreenElement === null) {
        showFullScreenButton();
    }
});

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

// Display message to rotate device for better experience
function rotateMessage() {
    window.addEventListener("orientationchange", function () {
        if (window.matchMedia("(orientation: portrait)").matches) {
            document.getElementById("rotateMessageContainer").style.display = "block";
        } else {
            document.getElementById("rotateMessageContainer").style.display = "none";
        }
    });
}

// // Event listeners for keyboard keydown events
// window.addEventListener('keydown', (event) => {
//     // Update keyboard state based on key codes
//     if (event.keyCode == 39) {
//         keyboard.RIGHT = true;
//     }

//     if (event.keyCode == 37) {
//         keyboard.LEFT = true;
//     }

//     if (event.keyCode == 32) {
//         keyboard.SPACE = true;
//     }

//     if (event.keyCode == 38) {
//         keyboard.UP = true;
//     }

//     if (event.keyCode == 40) {
//         keyboard.DOWN = true;
//     }

//     if (event.keyCode == 68) {
//         keyboard.D = true;
//     }

//     if (event.keyCode == 27) {
//         keyboard.ESC = true;
//     }
// })

// // Event listeners for keyboard keyup events
// window.addEventListener('keyup', (event) => {
//     // Update keyboard state based on key codes
//     if (event.keyCode == 39) {
//         keyboard.RIGHT = false;
//     }

//     if (event.keyCode == 37) {
//         keyboard.LEFT = false;
//     }

//     if (event.keyCode == 32) {
//         keyboard.SPACE = false;
//     }

//     if (event.keyCode == 38) {
//         keyboard.UP = false;
//     }

//     if (event.keyCode == 40) {
//         keyboard.DOWN = false;
//     }

//     if (event.keyCode == 68) {
//         keyboard.D = false;
//     }

//     if (event.keyCode == 27) {
//         keyboard.ESC = false;
//     }
// })

// // Touch events for mobile buttons

// function mobileButtonTouchEvents() {
//     document.getElementById('mobile-button-left').addEventListener('touchstart', (e) => {
//         e.preventDefault();
//         keyboard.LEFT = true;
//     });

//     document.getElementById('mobile-button-right').addEventListener('touchstart', (e) => {
//         e.preventDefault();
//         keyboard.RIGHT = true;
//     });

//     document.getElementById('mobile-button-jump').addEventListener('touchstart', (e) => {
//         e.preventDefault();
//         keyboard.UP = true;
//     });

//     document.getElementById('mobile-button-bottle').addEventListener('touchstart', (e) => {
//         e.preventDefault();
//         keyboard.D = true;
//     });

//     document.getElementById('mobile-button-left').addEventListener('touchend', (e) => {
//         e.preventDefault();
//         keyboard.LEFT = false;
//     });

//     document.getElementById('mobile-button-right').addEventListener('touchend', (e) => {
//         e.preventDefault();
//         keyboard.RIGHT = false;
//     });

//     document.getElementById('mobile-button-jump').addEventListener('touchend', (e) => {
//         e.preventDefault();
//         keyboard.UP = false;
//     });

//     document.getElementById('mobile-button-bottle').addEventListener('touchend', (e) => {
//         e.preventDefault();
//         keyboard.D = false;
//     });
// }










