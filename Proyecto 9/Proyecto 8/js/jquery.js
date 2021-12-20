class FormValidation {
    constructor() { // Setting the variables of the validation
        this.regex = {
            name: /^[A-Z]\w+$/,
            surname: /^[A-Z]\w+ [A-Za-z]\w+$/,
            dni: /^[0-9]{8}[A-Za-z]$/,
            date: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)\d{2})$/,
            cp: /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/,
            mail: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
            phone: /^[89][0-9]{8}$/,
            mobile: /^[67][0-9]{8}$/,
            card: /^4[0-9]{12}(?:[0-9]{3})?$/,
            iban: /^([a-zA-Z]{2})\s*\t*(\d{2})\s*\t*(\d{4})\s*\t*(\d{4})\s*\t*(\d{2})\s*\t*(\d{10})$/,
            password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/,
            repeatPassword: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/
        }

        this.inputs = $('input');
    }

    init = () => { // All corresponding events are added
        this.inputs.each((i, input) => {
            input = $(input);
            input.on('focusout', this._validate);
            input.on('keyup', this._validate);
        });
        $('#getStorage').on('click', this.getStorage)
        $('#setStorage').on('click', this.setStorage)
        $('#postHttp').on('click', this.postHttp)
        $('#getHttp').on('click', this.getHttp)
        $('#postDB').on('click', this.postDB)
        $('#getDB').on('click', this.getDB)
    }

    _dniChecker = (dni) => { // Validation of the DNI lyrics
        var dniLetter = dni.substring(8, 9).toUpperCase();
        var dniNumber = parseInt(dni.substring(0, 8));
        var letters = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
        var correctLetter = letters[dniNumber % 23];
        return dniLetter == correctLetter;
    }

    _validate = (e) => { // Validate the input with its corresponding Regex and custom validation
        let input = $(e.target);
        let name = input.attr('name');
        let result = this.regex[name].test(input.val());
        if (result) {
            switch (name) {
                case 'dni':
                    result = this._dniChecker(input.val());
                    break;
                case 'repeatPassword':
                    result = $('[name="password"]').val() == input.val();
                    break;
            }
        }
        if (result) {
            input.attr('class', 'is-valid form-control');
            input.animate({"bottom": "0.5rem"}, 100)
                .animate({"bottom": "0"}, 100);
        } else {
            input.attr('class', 'is-invalid form-control');
        }
        return result;
    }

    _checkAllInputs = () => { // Check if all fields are valid
        let validation = true;
        for (let i = 0; i < this.inputs.length; i++) {
            if (!this._validate({ target: this.inputs[i] })) {
                validation = false;
            }
        }
        return validation;
    }

    _clearInputs = () => { // Clean all fields
        this.inputs.each((i, input) => {
            input = $(input);
            input.val('');
            input.attr('class', 'form-control');
        });
    }

    _setInputs = (data) => { // Replace the value of the inputs with the data
        this.inputs.each((i, input) => {
            input = $(input);
            input.val(data[input.attr('name')]);
        });
        $('#repeatPassword').val(data.password);
    }

    _getObject = () => { // Get all the data of the inputs and return it
        let data = {};
        this.inputs.each((i, input) => {
            input = $(input);
            data[input.attr('name')] = input.val();
        });
        delete data['repeatPassword'];
        return data;
    }

    setStorage = () => { // Save the values from the inputs in the localStorage
        if (this._checkAllInputs()) {
            localStorage.setItem('person', JSON.stringify(this._getObject()));
            this._clearInputs();
        }
    }

    getStorage = () => { // Get the values from the localStorage and set in the inputs fields
        let data = JSON.parse(localStorage.getItem('person'));
        this._setInputs(data);
        this._checkAllInputs();
    }

    postHttp = () => { // Make a http post whit the inputs values (need to test whit the teacher)
        if (this._checkAllInputs()) {
            let data = this._getObject();
            $.ajax({
                url: "DEW/process.php",
                type: "POST",
                dataType: 'json',
                data: data,
                success: function (data) {
                    console.log(data)
                },
                error: function (data) {
                    console.log(data)
                }
            });
            this._clearInputs();
        }
    }

    getHttp = () => { // Make a http get (need to test whit the teacher)
        $.ajax({
            url: 'DEW/process.php',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                console.log(data)
                this._setInputs(data);
                this._checkAllInputs();
            },
            error: (e) => {
                console.log(e)
            }
        });
    }

    postDB = () => { // Make a http post to db whit the inputs values (need to test whit the teacher)
        if (this._checkAllInputs()) {
            let data = this._getObject();
            $.ajax({
                url: "DEW/processDB.php",
                type: "POST",
                dataType: 'json',
                data: data,
                success: function (data) {
                    console.log(data)
                },
                error: function (data) {
                    console.log(data)
                }
            });
            this._clearInputs();
        }
    }

    getDB = () => { // Make a http get to db (need to test whit the teacher)
        if (this._validate({ target: $('#dni') })) {
            let data = this._getObject()
            $.ajax({
                url: 'DEW/processDB.php?dni=' + data.dni,
                type: 'GET',
                dataType: 'json',
                success: (data) => {
                    console.log(data)
                    this._setInputs(data);
                    this._checkAllInputs();
                },
                error: (e) => {
                    console.log(e)
                }
            });
        }
    }

}

var form = new FormValidation();
form.init()