class Keyboard {
    constructor() { // Setting the initial variables of the keyboard
        this.textarea = $("textarea");
        this.capsLock = false;
        this.shift = false;
        this.control = false;
        this.alt = false;
    }

    init = () => { // initiate the event listeners
        $(document).on('keyup', this.keyup);
        $(document).on('keydown', this.keydown);
        $('li > .key').each((i, element) => $(element).on('click', this.mouse));
    }

    mouse = (e) => { // Operation when using the mouse
        e.preventDefault();
        let keyElement = $(e.currentTarget);
        if (keyElement.hasClass('c8')) { // delete
            if (this.textarea.val() != '') {
                this.textarea.val(this.textarea.val().slice(0, this.textarea.val().length - 1));
            }
            if (keyElement.length !== 0) {
                keyElement.toggleClass('keydown');
            }
        } else if (keyElement.hasClass('c9')) { // tab
            this.textarea.val(this.textarea.val() + '\t');
            if (keyElement.length !== 0) {
                keyElement.toggleClass('keydown');
            }
        } else if (keyElement.hasClass('c13')) { // enter
            this.textarea.val(this.textarea.val() + '\n');
            if (keyElement.length !== 0) {
                keyElement.toggleClass('keydown');
            }
        } else if (keyElement.hasClass('c16')) { // shift
            this.shift = !this.shift;
        } else if (keyElement.hasClass('c17')) { // control
            this.control = !this.control;
        } else if (keyElement.hasClass('c18')) { // alt
            this.alt = !this.alt;
        } else if (keyElement.hasClass('c20')) { // caps lock
            this.capsLock = !this.capsLock;
            if (this.capsLock) {
                $('#caps > b').css('background-color', 'lightgreen');
            } else {
                $('#caps > b').css('background-color', '#999');
            }
            if (keyElement.length !== 0) {
                keyElement.toggleClass('keydown');
            }
        } else if (keyElement.hasClass('c32')) { // space
            this.textarea.val(this.textarea.val() + ' ');
            if (keyElement.length !== 0) {
                keyElement.toggleClass('keydown');
            }
        } else { // other keys
            if (keyElement.find('.tertiary').length !== 0 && this.control && this.alt) {
                this.textarea.val(this.textarea.val() + keyElement.find('.tertiary').text());
            } else if (keyElement.find('.secondary').length !== 0 && this.shift) {
                this.textarea.val(this.textarea.val() + keyElement.find('.secondary').text());
            } else if (keyElement.find('.primary').length !== 0 && ((this.capsLock) !== (this.shift))) {
                this.textarea.val(this.textarea.val() + keyElement.find('.primary').text().toUpperCase());
            } else if (keyElement.find('.primary').length !== 0) {
                this.textarea.val(this.textarea.val() + keyElement.find('.primary').text().toLowerCase());
            }
            if (keyElement.length !== 0) {
                keyElement.toggleClass('keydown');
            }
        }

        if (keyElement.length !== 0) {
            keyElement.toggleClass('keydown');
        }
    }

    keydown = (e) => { // Operation when a key is pulsed.
        e.preventDefault();
        let key = (e.keyCode) ? e.keyCode : e.which;
        let keyElement = $('.key.c' + key);
        switch (key) {
            case 8: // delete
                if (this.textarea.val() != '') {
                    this.textarea.val(this.textarea.val().slice(0, this.textarea.val().length - 1)) ;
                }
                break;
            case 9: // tab
                this.textarea.val(this.textarea.val() + '\t');
                break;
            case 13: // enter
                this.textarea.val(this.textarea.val() + '\n');
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
                    $('#caps > b').css('background-color', 'lightgreen');
                } else {
                    $('#caps > b').css('background-color', '#999');
                }
                break;
            case 32: // space bar
                this.textarea.val(this.textarea.val() + ' ');
                break;
            case 225: // alt gr
                this.alt = true;
                this.control = true;
                break;
            default: // other keys
                if (keyElement.find('.tertiary').length !== 0 && this.control && this.alt) {
                    this.textarea.val(this.textarea.val() + keyElement.find('.tertiary').text());
                } else if (keyElement.find('.secondary').length !== 0 && this.shift) {
                    this.textarea.val(this.textarea.val() + keyElement.find('.secondary').text());
                } else if (keyElement.find('.primary').length !== 0 && ((this.capsLock) !== (this.shift))) {
                    this.textarea.val(this.textarea.val() + keyElement.find('.primary').text().toUpperCase());
                } else if (keyElement.find('.primary')) {
                    this.textarea.val(this.textarea.val() + keyElement.find('.primary').text().toLowerCase());
                }
        }
        if (keyElement.length !== 0) {
            keyElement.addClass('keydown');
        }
    };

    keyup = (e) => {  // Operation when a key is released
        e.preventDefault();
        let key = (e.keyCode) ? e.keyCode : e.which;
        let keyElement = $('.key.c' + key);
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
        if (keyElement.length !== 0) {
            keyElement.removeClass('keydown');
        }
    }

}

let keyboard = new Keyboard();
keyboard.init();