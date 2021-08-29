class Theatre {
    constructor(filmName, imageName, rows = 6, columns = 6, ticketPrice = 6) { // Setting the variables of the movie
        this.filmName = filmName;
        this.numberSeatRows = rows;
        this.numberSeatColumns = columns;
        this.ticketPrice = ticketPrice;
        this.totalPrice = 0;
        this.imageName = imageName;
        this.reservations = [];
        for (var i = 0; i < this.numberSeatRows; i++) {
            this.reservations.push(new Array(this.numberSeatColumns).fill(0));
        }

        this.userSelectedSeats = [];
        this.invalidForm = true;
        this.checkOption = /^[1-2]$/;
        this.checkSeatFormat = /^[0-9]+-[0-9]+$/;
    }

    createHtml = () => { // HTML Creation
        let html = `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
        <link rel="stylesheet" href="css/style.css" />

        <div class="container">
            <div id="info">
                <img src="img/${this.imageName}.jpg">
                <h1>${this.filmName}</h1>
                <h3>${this.ticketPrice}€ each seat.</h3>
            </div>

            <div id="seats" style="grid-template-columns: repeat(${parseInt(this.numberSeatColumns) + 1}, 1fr); font-size: 3em">
                <div></div>
            `;

        for (let i = 1; i <= this.numberSeatColumns; i++) {
            html += `<div>${i}</div>`;
        }

        for (let i = 0; i < this.reservations.length; i++) {
            html += `<div>${i + 1}</div>`;
            for (let j = 0; j < this.reservations[i].length; j++) {
                html += `<img class="${this.reservations[i][j] ? 'booked' : ''}" src="img/butaca.png">`
            }
        }

        html += `
            </div>
        </div>`
        return new Promise((resolve, reject) => {
            document.write(html);
            document.close();
            setTimeout(function () {
                resolve(true)
            }, 250);
        });
    }

    _checkSeat = (row, column) => { // We check that the seat exists and that is not reserved
        if (typeof this.reservations[row] == 'undefined' || typeof this.reservations[row][column] == 'undefined' || this.reservations[row][column]) {
            return false;
        }
        return true;
    }

    _bookSeat = (row, column) => { // Mark that seat as reserved
        this.reservations[row][column] = 1;
        this.totalPrice += this.ticketPrice;
        return film.createHtml();
    }

    _releaseSeat = (row, column) => { // Mark that seat as not reserved
        this.reservations[row][column] = 0;
        this.totalPrice -= this.ticketPrice;
    }

    askForCoordinates = async () => { // we ask about the coordinates of a seat
        let seat = prompt(`Give me the seat coordinates you want to book in format: <row>-<column>`);
        if (!this.checkSeatFormat.test(seat)) {
            alert('Incorrect format, try again.')
            return this.askForCoordinates();
        }
        let [row, column] = seat.split('-');
        if (!this._checkSeat(row - 1, column - 1)) {
            alert('Sorry, that seat dont exist or is already booked, Select another seat.')
            return this.askForCoordinates();
        }
        this.userSelectedSeats.push(seat);
        await this._bookSeat(row - 1, column - 1);
        return this._askForMoreCoordinates();
    }

    _askForMoreCoordinates = () => { // We ask if the user want to reserve another seat
        let question = prompt('Do you want to book another seat? give me a number: \n 1. yes \n 2. no');
        if (!this.checkOption.test(question)) {
            alert('Incorrect option number, try again.')
            return this._askForMoreCoordinates();
        }
        if (question == 1) {
            return this.askForCoordinates();
        }
        return this._askForConfirmation();
    }

    _askForConfirmation = async () => { // We ask if the user want confirm the selection, if not, we release all seats that the user choose
        let question = prompt(`These are the seats you have chosen: \n ${this.userSelectedSeats.join(', ')}. \n Do you want to confirm your choice? give me a number: \n 1. yes \n 2. no`);
        if (!this.checkOption.test(question)) {
            alert('Incorrect option number, try again.');
            return this._askForConfirmation();
        }
        if (question == 2) {
            this.userSelectedSeats.forEach(async (seat) => {
                let [row, column] = seat.split('-');
                this._releaseSeat(row - 1, column - 1);
            });
            this.userSelectedSeats = [];
            await this.createHtml();
            return this.askForCoordinates();
        }
        return this._finishForm();
    }

    _finishForm = () => { // Give to the user the total price of his selection
        alert(`The total to be paid is: ${this.totalPrice}€`);
    }

}

// Asking the user who movie wants to see
const checkFilmNumber = /^[1-3]$/;
let invalid = true;

let film;
invalid = true;
while (invalid) {
    film = prompt(`What movie do you want to go see? give me a number \n 1. A silence voice \n 2. Your Name \n 3. Spirited Away`);
    invalid = !checkFilmNumber.test(film);
    if (invalid) {
        alert('Incorrect movie number, try again.')
    }
}

// Building the object
switch (parseInt(film)) {
    case 1:
        film = new Theatre('A silence voice', 1, 5, 10, 10);
        break;
    case 2:
        film = new Theatre('Your Name', 2, 6, 5, 20);
        break;
    case 3:
        film = new Theatre('Spirited Away', 3, 10, 15, 5);
        break;
}

// Creating the HTML and then asking the questions to reserve
film.createHtml().then(() => {
    film.askForCoordinates();
});
