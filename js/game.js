let canvas;
let world;
let keyboard = new Keyboard();

function start() {
    hideFirstScreen();
    hideFullInfo();
    init();
    hideGameOver();
}

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    hideGameButtons();
    hideMobileButtons();
    hideGameOver();
    mobileButtonTouchEvents();
  
   
    console.log('My character is ', world.character); // world['character']
    //console.log('My enemies are ', world.level.enemies);
}




function hideFirstScreen() {
    document.getElementById('first-screen').classList.add('d-none');
    document.getElementById('question-button').classList.add('d-none');
    document.getElementById('full-screen-button').classList.add('d-none'); 
}

function hideFullInfo(){
    document.getElementById('full-info').classList.add('d-none');
}

function hideGameButtons(){
    document.getElementById('buttons-game-screen').classList.remove('d-none');
}

function hideMobileButtons(){
    document.getElementById('mobile-buttons').classList.remove('d-none');
}

function openCloseAboutGame(){
    var question = document.getElementById("about-game");
    question.classList.toggle("d-none");
}

function offSound(){
    document.getElementById('on-sound').classList.add('d-none');
    document.getElementById('off-sound').classList.remove('d-none');
}

function onSound(){
    document.getElementById('on-sound').classList.remove('d-none');
    document.getElementById('off-sound').classList.add('d-none');
}

function hideGameOver(){
    document.getElementById('game-over-screen').classList.add('d-none');
    document.getElementById('game-win-screen').classList.add('d-none');
    document.getElementById('restart-button').classList.add('d-none');   
}

window.addEventListener('keydown', (event) => {
    if(event.keyCode == 39){
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
})

window.addEventListener('keyup', (event) => {
    if(event.keyCode == 39){
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

