let canvas;
let world;
let keyboard = new Keyboard();
let gameIsRunning = false;
let soundIsMute = false;

function start() {
    initLevel();
    init();
    hideFirstScreen();
    hideFullInfo();
    gameIsRunning = true;
}

function replay() {
    initLevel();
    hideFirstScreen();
    hideFullInfo();
    init();
    if (soundIsMute) {
        offSound();
    }
    else {
        onSound();
    }
}

function replayLost() {
    hideGameOverLost();
    replay();
}

function replayWin() {
    hideGameOverWin();
    replay();
}

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    hideGameButtons();
    hideMobileButtons();
    mobileButtonTouchEvents();
    rotateMessage();
}

function hideFirstScreen() {
    document.getElementById('first-screen').classList.add('d-none');
    document.getElementById('question-button').classList.add('d-none');
    document.getElementById('full-screen-button').classList.add('d-none');
}

function hideFullInfo() {
    document.getElementById('full-info').classList.add('d-none');
}

function hideGameButtons() {
    document.getElementById('buttons-game-screen').classList.remove('d-none');
}

function hideMobileButtons() {
    document.getElementById('mobile-buttons').classList.remove('d-none');
}

function openCloseAboutGame() {
    var question = document.getElementById("about-game");
    question.classList.toggle("d-none");
}

function offSound() {
    world.muteSound();
    world.character.muteSound();
    document.getElementById('on-sound').classList.add('d-none');
    document.getElementById('off-sound').classList.remove('d-none');
    soundIsMute = true;
}

function onSound() {
    document.getElementById('on-sound').classList.remove('d-none');
    document.getElementById('off-sound').classList.add('d-none');
    world.unmuteSound();
    world.character.unmuteSound();
    soundIsMute = false;
}

function hideGameOverWin() {
    document.getElementById('game-win-screen').classList.add('d-none');
    document.getElementById('restart-button-win').classList.add('d-none');
    stopAllIntervals();
}

function hideGameOverLost() {
    document.getElementById('game-over-screen').classList.add('d-none');
    document.getElementById('restart-button-lost').classList.add('d-none');
    stopAllIntervals();
}

function stopAllIntervals() {
    stopAllCloudsIntervals();
    stopAllCoinsIntervals();
    stopAllBottlesIntervals();
    stopCharacterAnimation();
    stopAllEnemiesIntervals();
    stopWorldIntervals();
}

function stopWorldIntervals() {
    world.stopAnimation();
}

/**
 * Stops the character animation interval.
 */
function stopCharacterAnimation() {
    world.character.stopAnimation();
}

function stopAllEnemiesIntervals() {
    world.level.enemies.forEach(enemie => {
        enemie.stopAnimation();
    });
}

 /* Stops all intervals related to cloud objects.
 */
function stopAllCloudsIntervals() {
    world.level.clouds.forEach((cloud) => {
        cloud.stopAnimation();
    });
}

 /* Stops all intervals related to coin objects.
 */
function stopAllBottlesIntervals() {
    world.level.bottles.forEach((bottle) => bottle.stopAnimation());
}

function stopAllCoinsIntervals() {
    world.level.coins.forEach((coin) => coin.stopAnimation());
}

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

function rotateMessage() {
    window.addEventListener("orientationchange", function () {
        if (window.matchMedia("(orientation: portrait)").matches) {
            document.getElementById("rotateMessageContainer").style.display = "block";
        } else {
            document.getElementById("rotateMessageContainer").style.display = "none";
        }
    });
}

window.addEventListener('keydown', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (event.keyCode == 38) {
        keyboard.UP = true;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (event.keyCode == 68) {
        keyboard.D = true;
    }

    if (event.keyCode == 27) {
        keyboard.ESC = true;
    }
})

window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 38) {
        keyboard.UP = false;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (event.keyCode == 68) {
        keyboard.D = false;
    }

    if (event.keyCode == 27) {
        keyboard.ESC = false;
    }
})

/* Adds touch events for mobile buttons.
*/

function mobileButtonTouchEvents() {
    document.getElementById('mobile-button-left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('mobile-button-right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('mobile-button-jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });

    document.getElementById('mobile-button-bottle').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('mobile-button-left').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('mobile-button-right').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('mobile-button-jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });

    document.getElementById('mobile-button-bottle').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}










