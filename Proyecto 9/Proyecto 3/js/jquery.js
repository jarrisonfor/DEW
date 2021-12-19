class Theatre {
    constructor(filmName, imageName, rows = 6, columns = 6, ticketPrice = 6) { // Setting the variables of the movie
        this.filmName = filmName;
        this.numberSeatRows = rows;
        this.numberSeatColumns = columns;
        this.ticketPrice = ticketPrice;
        this.totalPrice = 0;
        this.imageName = imageName;
        this.reservations = [];
        let reservations = JSON.parse(localStorage.getItem(this.filmName));
        if (reservations) {
            this.reservations = reservations;
            this.reservations.forEach(row => row.forEach(column => {
                if (column) {
                    this.totalPrice += this.ticketPrice;
                }
            }));
        } else {
            for (var i = 0; i < this.numberSeatRows; i++) {
                this.reservations.push(new Array(this.numberSeatColumns).fill(0));
            }
        }

        this.userSelectedSeats = [];
        this.invalidForm = true;
        this.checkOption = /^[1-2]$/;
        this.checkSeatFormat = /^[0-9]+-[0-9]+$/;
    }

    createHtml = () => { // HTML Creation
        let info = $('#info');
        let html = `
            <img src="../img/${this.imageName}.jpg">
            <h1>${this.filmName}</h1>
            <h3>${this.ticketPrice}€ each seat.</h3>
            <h4>Your total: <span id="total">${this.totalPrice}</span>€.</h4>
        `;
        info.html(html);
        let seats = $('#seats');
        seats.css("grid-template-columns", `repeat(${parseInt(this.numberSeatColumns)}, 1fr)`);
        html = '';
        for (let i = 0; i < this.reservations.length; i++) {
            for (let j = 0; j < this.reservations[i].length; j++) {
                html += `<img onClick="film.toggleSeat($(this))" data-row="${i}" data-column="${j}" class="${this.reservations[i][j] ? 'booked' : ''}" src="../img/butaca.png">`;
            }
        }
        seats.append(html);

    }

    toggleSeat = (seat) => { // Reserve or release a seat, and show the final price
        let row = seat.data('row');
        let column = seat.data('column');
        this.reservations[row][column] ? this._releaseSeat(row, column) : this._bookSeat(row, column);
        seat.toggleClass("booked");
        localStorage.setItem(this.filmName, JSON.stringify(this.reservations));
        $('#total').text(this.totalPrice)
            .animate({"font-size": "2rem"}, 100)
            .animate({"font-size": "1.5rem"}, 100);
    }

    _bookSeat = (row, column) => { // Mark that seat as reserved
        this.reservations[row][column] = 1;
        this.totalPrice += this.ticketPrice;
    }

    _releaseSeat = (row, column) => { // Mark that seat as not reserved
        this.reservations[row][column] = 0;
        this.totalPrice -= this.ticketPrice;
    }

}


