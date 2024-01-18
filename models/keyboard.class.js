/**
 * Represents a keyboard input handler.
 * @class
 */
class Keyboard {
        LEFT = false;
        RIGHT = false;
        SPACE = false;
        UP = false;
        DOWN = false;
        D = false;
        ESC = false;

        /**
         * Represents a Keyboard object.
         * @constructor
         */
        constructor() {
                this.keyboardEvents();
                this.mobileButtonTouchEvents();
        }

        /**
         * Handles keyboard events.
         */
        keyboardEvents() {
                this.checkKeydown();
                this.checkKeyup();
        }

        /**
         * Listens for keydown events and updates the keyboard state based on the pressed keys.
         */
        checkKeydown() {
                window.addEventListener('keydown', (event) => {
                        if (event.keyCode == 39) {
                                this.RIGHT = true;
                        }

                        if (event.keyCode == 37) {
                                this.LEFT = true;
                        }

                        if (event.keyCode == 32) {
                                this.SPACE = true;
                        }

                        if (event.keyCode == 38) {
                                this.UP = true;
                        }

                        if (event.keyCode == 40) {
                                this.DOWN = true;
                        }

                        if (event.keyCode == 68) {
                                this.D = true;
                        }

                        if (event.keyCode == 27) {
                                this.ESC = true;
                        }
                })
        }

        /**
         * Listens for keyup events and updates the keyboard state based on the pressed keys.
         */
        checkKeyup() {
                window.addEventListener('keyup', (event) => {
                        if (event.keyCode == 39) {
                                this.RIGHT = false;
                        }

                        if (event.keyCode == 37) {
                                this.LEFT = false;
                        }

                        if (event.keyCode == 32) {
                                this.SPACE = false;
                        }

                        if (event.keyCode == 38) {
                                this.UP = false;
                        }

                        if (event.keyCode == 40) {
                                this.DOWN = false;
                        }

                        if (event.keyCode == 68) {
                                this.D = false;
                        }

                        if (event.keyCode == 27) {
                                this.ESC = false;
                        }
                })
        }

        /**
         * Adds touch events for mobile buttons.
         */
        mobileButtonTouchEvents() {
                document.getElementById('mobile-button-left').addEventListener('touchstart', (e) => {
                        e.preventDefault();
                        this.LEFT = true;
                });

                document.getElementById('mobile-button-right').addEventListener('touchstart', (e) => {
                        e.preventDefault();
                        this.RIGHT = true;
                });

                document.getElementById('mobile-button-jump').addEventListener('touchstart', (e) => {
                        e.preventDefault();
                        this.UP = true;
                });

                document.getElementById('mobile-button-bottle').addEventListener('touchstart', (e) => {
                        e.preventDefault();
                        this.D = true;
                });

                document.getElementById('mobile-button-left').addEventListener('touchend', (e) => {
                        e.preventDefault();
                        this.LEFT = false;
                });

                document.getElementById('mobile-button-right').addEventListener('touchend', (e) => {
                        e.preventDefault();
                        this.RIGHT = false;
                });

                document.getElementById('mobile-button-jump').addEventListener('touchend', (e) => {
                        e.preventDefault();
                        this.UP = false;
                });

                document.getElementById('mobile-button-bottle').addEventListener('touchend', (e) => {
                        e.preventDefault();
                        this.D = false;
                });
        }

}





