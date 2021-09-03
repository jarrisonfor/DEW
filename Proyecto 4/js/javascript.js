class Keyboard {
    constructor() { // Setting the initial variables of the keyboard
        this.textarea = document.querySelector("textarea");
        this.capsLock = false;
        this.shift = false;
        this.control = false;
        this.alt = false;
    }

    init = () => { // initiate the event listeners
        document.onkeyup = this.keyup;
        document.onkeydown = this.keydown;
        document.querySelectorAll('li > .key').forEach(element => element.addEventListener('click', this.mouse))
    }

    mouse = (e) => { // Operation when using the mouse
        e.preventDefault();
        let keyElement = e.currentTarget;
        if (keyElement.classList.contains('c8')) { // delete
            if (this.textarea.value != '') {
                this.textarea.value = this.textarea.value.slice(0, this.textarea.value.length - 1);
            }
            if (keyElement) {
                keyElement.classList.toggle('keydown');
            }
        } else if (keyElement.classList.contains('c9')) { // tab
            this.textarea.value += '\t';
            if (keyElement) {
                keyElement.classList.toggle('keydown');
            }
        } else if (keyElement.classList.contains('c13')) { // enter
            this.textarea.value += '\n';
            if (keyElement) {
                keyElement.classList.toggle('keydown');
            }
        } else if (keyElement.classList.contains('c16')) { // shift
            this.shift = !this.shift;
        } else if (keyElement.classList.contains('c17')) { // control
            this.control = !this.control;
        } else if (keyElement.classList.contains('c18')) { // alt
            this.alt = !this.alt;
        } else if (keyElement.classList.contains('c20')) { // caps lock
            this.capsLock = !this.capsLock;
            if (this.capsLock) {
                document.querySelector('#caps > b').style.backgroundColor = 'lightgreen'
            } else {
                document.querySelector('#caps > b').style.backgroundColor = '#999'
            }
            if (keyElement) {
                keyElement.classList.toggle('keydown');
            }
        } else if (keyElement.classList.contains('c32')) { // space
            this.textarea.value += ' ';
            if (keyElement) {
                keyElement.classList.toggle('keydown');
            }
        } else { // other keys
            if (keyElement.querySelector('.tertiary') && this.control && this.alt) {
                this.textarea.value += keyElement.querySelector('.tertiary').textContent
            } else if (keyElement.querySelector('.secondary') && this.shift) {
                this.textarea.value += keyElement.querySelector('.secondary').textContent
            } else if (keyElement.querySelector('.primary') && ((this.capsLock) !== (this.shift))) {
                this.textarea.value += keyElement.querySelector('.primary').textContent.toUpperCase();
            } else if (keyElement.querySelector('.primary')) {
                this.textarea.value += keyElement.querySelector('.primary').textContent.toLowerCase();
            }
            if (keyElement) {
                keyElement.classList.toggle('keydown');
            }
        }

        if (keyElement) {
            keyElement.classList.toggle('keydown');
        }
    }

    keydown = (e) => { // Operation when a key is pulsed.
        e.preventDefault();
        let key = (e.keyCode) ? e.keyCode : e.which;
        let keyElement = document.querySelector('.key.c' + key);
        switch (key) {
            case 8: // delete
                if (this.textarea.value != '') {
                    this.textarea.value = this.textarea.value.slice(0, this.textarea.value.length - 1);
                }
                break;
            case 9: // tab
                this.textarea.value += '\t';
                break;
            case 13: // enter
                this.textarea.value += '\n';
                break;
            case 16: // shift
                this.shift = true;
                break;
            case 17: // control
                this.control = true;
                break;
            case 18: // alt
                this.alt = true;
                break;
            case 20: // caps Lock
                this.capsLock = !(e.getModifierState && e.getModifierState('CapsLock'));
                if (this.capsLock) {
                    document.querySelector('#caps > b').style.backgroundColor = 'lightgreen'
                } else {
                    document.querySelector('#caps > b').style.backgroundColor = '#999'
                }
                break;
            case 32: // space bar
                this.textarea.value += ' ';
                break;
            case 225: // alt gr
                this.alt = true;
                this.control = true;
                break;
            default: // other keys
                if (keyElement.querySelector('.tertiary') && this.control && this.alt) {
                    this.textarea.value += keyElement.querySelector('.tertiary').textContent
                } else if (keyElement.querySelector('.secondary') && this.shift) {
                    this.textarea.value += keyElement.querySelector('.secondary').textContent
                } else if (keyElement.querySelector('.primary') && ((this.capsLock) !== (this.shift))) {
                    this.textarea.value += keyElement.querySelector('.primary').textContent.toUpperCase();
                } else if (keyElement.querySelector('.primary')) {
                    this.textarea.value += keyElement.querySelector('.primary').textContent.toLowerCase();
                }
        }
        if (keyElement) {
            keyElement.classList.add('keydown');
        }
    };

    keyup = (e) => {  // Operation when a key is released
        e.preventDefault();
        let key = (e.keyCode) ? e.keyCode : e.which;
        let keyElement = document.querySelector('.key.c' + key);
        switch (key) {
            case 16: // shift
                this.shift = false;
                break;
            case 17: // control
                this.control = false;
                break;
            case 18: // alt
                this.alt = false;
                break;
            case 225: // alt gr
                this.alt = false;
                this.control = false;
                break;
        }
        if (keyElement) {
            keyElement.classList.remove('keydown');
        }
    }

}

let keyboard = new Keyboard();
keyboard.init();