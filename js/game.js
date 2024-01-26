/**
 * @fileoverview This file contains the game logic and functions for the Pollo Loco game.
 * @description The game.js file initializes global variables, defines functions to start, replay, and initialize the game environment, and handles various game-related actions such as hiding screens, toggling sound, stopping intervals, and entering fullscreen mode.
 * @requires World
 */
let canvas;
let world;
let keyboard;
let gameIsRunning = false;
let soundIsMute = false;

/**
 * Starts the game by initializing the level, hiding the first screen, and setting the gameIsRunning flag to true.
 */
function start() {
    initLevel();
    init();
    hideFirstScreen();
    hideFullInfo();
    gameIsRunning = true;
}

/**
 * Resets the game and starts a new round.
 */
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

/**
 * Function to replay the game after losing.
 * It hides the "Game Over" message and calls the replay function.
 */
function replayLost() {
    hideGameOverLost();
    replay();
}

/**
 * Function to replay the game after winning.
 * It hides the game over window and calls the replay function.
 */
function replayWin() {
    hideGameOverWin();
    replay();
}

/**
 * Initializes the game.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    showGameButtons();
    rotateMessage();
    initAudio();
}

/**
 * Hides the first screen elements.
 */
function hideFirstScreen() {
    document.getElementById('first-screen').classList.add('d-none');
    document.getElementById('question-button').classList.add('d-none');
    document.getElementById('full-screen-button').classList.add('d-none');
}

/**
 * Hides the full information element.
 */
function hideFullInfo() {
    document.getElementById('full-info').classList.add('d-none');
}

/**
 * Shows the game buttons on the screen.
 */
function showGameButtons() {
    document.getElementById('buttons-game-screen').classList.remove('d-none');
}

/**
 * Toggles the visibility of the "about-game" element and pauses or resumes the game.
 */
function openCloseAboutGame() {
    var question = document.getElementById("about-game");
    question.classList.toggle("d-none");
    world.pause = !world.pause;
    pauseOnOff(world.pause);
}

/**
 * Toggles the visibility of the "about-game" element.
 */
function openCloseAboutGameMain() {
    var question = document.getElementById("about-game");
    question.classList.toggle("d-none");
}

/**
 * Toggles the pause state of the game and updates the UI accordingly.
 */
function onOffPauseGame(){
    world.pause = !world.pause;
    pauseOnOff(world.pause);
    document.getElementById('on-pause').classList.toggle('d-none');
    document.getElementById('off-pause').classList.toggle('d-none');
}

/**
 * Turns off the sound in the game.
 */
function offSound() {
    muteSound();
    world.character.muteSound();
    muteSoundEndboss();
    document.getElementById('on-sound').classList.add('d-none');
    document.getElementById('off-sound').classList.remove('d-none');
    soundIsMute = true;
}

/**
 * Toggles the sound on and updates the UI accordingly.
 * @returns {void}
 */
function onSound() {
    document.getElementById('on-sound').classList.remove('d-none');
    document.getElementById('off-sound').classList.add('d-none');
    unmuteSound();
    world.character.unmuteSound();
    unmuteSoundEndboss();
    soundIsMute = false;
}

/**
 * Function to check if the game is lost.
 * @function gameLost
 */
function gameLost() {
    if (world.character.energy == 0) {
        document.getElementById('game-over-screen').classList.remove('d-none');
        document.getElementById('restart-button-lost').classList.remove('d-none');
        stopEndbossIntervals();
        stopEndbossSound();
        stopAllEnemiesIntervals();
    }
}

/**
 * Ends the game and displays the game win screen.
 * @function gameOver
 * @memberof module:game
 * @returns {void}
 */
function gameOver() {
    document.getElementById('game-win-screen').classList.remove('d-none');
    document.getElementById('restart-button-win').classList.remove('d-none');
    stopEndbossSound();
    stopAllEnemiesIntervals();
    stopWorldIntervals();
}
 
/**
 * Hides the game over win screen and restart button.
 * Stops all intervals.
 */
function hideGameOverWin() {
    document.getElementById('game-win-screen').classList.add('d-none');
    document.getElementById('restart-button-win').classList.add('d-none');
    stopAllIntervals();
}

/**
 * Hides the game over screen and restart button when the player loses the game.
 */
function hideGameOverLost() {
    document.getElementById('game-over-screen').classList.add('d-none');
    document.getElementById('restart-button-lost').classList.add('d-none');
    stopAllIntervals();
}

/**
 * Stops all intervals in the game.
 */
function stopAllIntervals() {
    stopAllCloudsIntervals();
    stopAllCoinsIntervals();
    stopAllBottlesIntervals();
    stopCharacterAnimation();
    stopAllEnemiesIntervals();
    stopWorldIntervals();
}

/**
 * Stops the intervals in the world animation.
 */
function stopWorldIntervals() {
    world.stopAnimation();
}

/**
 * Stops the animation of the character.
 */
function stopCharacterAnimation() {
    world.character.stopAnimation();
}

/**
 * Stops the animation for all enemies in the level.
 */
function stopAllEnemiesIntervals() {
    world.level.enemies.forEach(enemie => {
        enemie.stopAnimation();
    });
}

/**
 * Stops the animation of all clouds in the level.
 */
function stopAllCloudsIntervals() {
    world.level.clouds.forEach((cloud) => {
        cloud.stopAnimation();
    });
}

/**
 * Stops the animation for all bottles in the level.
 */
function stopAllBottlesIntervals() {
    world.level.bottles.forEach((bottle) => bottle.stopAnimation());
}

/**
 * Stops the animation for all coins in the level.
 */
function stopAllCoinsIntervals() {
    world.level.coins.forEach((coin) => coin.stopAnimation());
}

/**
* Stops the animation intervals for the endboss enemies.
*/
function stopEndbossIntervals() {
    world.level.enemies.forEach(enemy => {
        if (enemy instanceof Endboss)
            enemy.stopAnimation();
    });
    }

/**
 * Toggles the pause state of the game.
 * @param {boolean} pause - Indicates whether the game should be paused or resumed.
 */
function pauseOnOff(pause) {
    world.level.enemies.forEach(enemie => {
        enemie.pause = pause;
    });
    world.character.pause = pause;
}

/**
 * Enters full screen mode and hides certain elements based on the game state.
 */
function fullScreen() {
    let fullScreen = document.getElementById('fullscreen');
    enterFullscreen(fullScreen);
    if (gameIsRunning) {
        document.getElementById('full-screen-game-button').classList.add('d-none');
        document.getElementById('mobile-buttons').classList.add('d-none');
    }
    else {
        document.getElementById('full-screen-button').classList.add('d-none');
        document.getElementById('full-screen-game-button').classList.add('d-none');
        document.getElementById('question-button').classList.add('full-screen-question-button');
        document.getElementById('mobile-buttons').classList.add('d-none');
    }
}

/**
 * Shows the full screen button and mobile buttons if the game is running,
 * otherwise shows the full screen button, full screen game button, and mobile buttons.
 */
function showFullScreenButton() {
    if (gameIsRunning) {
        document.getElementById('full-screen-game-button').classList.remove('d-none');
        document.getElementById('mobile-buttons').classList.remove('d-none');
    }
    else {
        console.log("fullscreen mode");
        document.getElementById('full-screen-button').classList.remove('d-none');
        document.getElementById('full-screen-game-button').classList.remove('d-none');
        document.getElementById('question-button').classList.remove('full-screen-question-button');
        document.getElementById('mobile-buttons').classList.remove('d-none');
    }
}

/**
 * Enters fullscreen mode for the specified element.
 * @param {Element} fullScreen - The element to enter fullscreen mode.
 */
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

/**
 * Closes the fullscreen mode of the document.
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

/**
 * Rotates the message container based on the device orientation.
 */
function rotateMessage() {
    window.addEventListener("orientationchange", function () {
        if (window.matchMedia("(orientation: portrait)").matches) {
            document.getElementById("rotateMessageContainer").style.display = "block";
        } else {
            document.getElementById("rotateMessageContainer").style.display = "none";
        }
    });
}

