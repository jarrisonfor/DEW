class SlidingPuzzle {
    constructor() { // Setting the variables of the puzzle
        this.rows = 3;
        this.columns = 3;
        this.game;
        this.gameResolved;
        this.playerMove = 0;
        this.playerTime = 0;
        this.playerWin = false;
        this.interval;
    }

    printGame = () => { // We create the puzzle in HTML already resolved
        let matrix = new Array(this.rows);
        for (let i = 0; i < matrix.length; i++) {
            matrix[i] = new Array(this.columns);
        }

        let game = $('<div></div>');
        game.attr('id', 'puzzle');
        game.css('display', 'grid');
        game.css('grid-template-rows', `repeat(${this.rows}, 1fr)`);
        game.css('grid-template-columns', `repeat(${this.columns}, 1fr)`);
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                let img = $('<img></img>');
                img.attr('src', `img/image_${i + 1}_${j + 1}.jpg`);
                img.data('row', i + 1);
                img.data('column', j + 1);
                img.css('grid-row-start', i + 1);
                img.css('grid-column-start', j + 1);
                game.append(img);
            }
        }
        game.children().last().attr('id', 'whiteSquare');
        this.gameResolved = game;

        this.resolve(true);
    }

    printMenu = () => { // Create the menu on the left
        let menu = $('<div></div>');
        menu.attr('id', 'menu');
        $('#app').append(menu);
    }

    printGameButtons = () => { // Create the New Game buttons and solve
        let buttons = $('<div></div>');
        buttons.attr('id', 'buttons');
        let newGame = $('<button></button>');
        newGame.on('click', () => {
            this.newGame()
        });
        newGame.text('New Game');

        let resolve = $('<button></button>');
        resolve.on('click', () => {
            this.resolve()
        });
        resolve.text('Resolve');

        buttons.append(newGame);
        buttons.append(resolve);

        $('#menu').append(buttons)
    }

    printPlayerStats = () => { // Create the current statistics of the player
        let playerStats = $('<div></div>');
        playerStats.attr('id', 'stats');
        let movesText = $('<span></span>');
        movesText.text('Moves: ');
        let moves = $('<span></span>');
        moves.attr('id', 'moves');
        moves.text(this.playerMove);
        let timeText = $('<span></span>');
        timeText.text('Time: ');
        let time = $('<span></span>');
        time.attr('id', 'time');
        time.text(this.playerTime);
        playerStats.append(movesText);
        playerStats.append(moves);
        playerStats.append(timeText);
        playerStats.append(time);
        $('#menu').append(playerStats)
    }

    printRanking = () => { // Create the ranking table
        let ranking = $('<div></div>');
        ranking.attr('id', 'ranking');
        let rankingTitle = $('<h1></h1>');
        rankingTitle.text('Ranking');
        ranking.append(rankingTitle);
        let rankingTable = $('<table></table>');
        let tableHeader = $('<thead></thead>');
        let tablebody = $('<tbody></tbody>');
        tablebody.attr('id', 'rankingBody');
        let tableRow = $('<tr></tr>');
        let positionHeader = $('<th></th>');
        positionHeader.text('Position');
        let moveHeader = $('<th></th>');
        moveHeader.text('Moves');
        let timesHeader = $('<th></th>');
        timesHeader.text('Time');
        tableHeader.append(positionHeader);
        tableHeader.append(moveHeader);
        tableHeader.append(timesHeader);
        rankingTable.append(tableHeader);
        rankingTable.append(tablebody);
        tableHeader.append(tableRow);
        $('#menu').append(ranking);
        $('#menu').append(rankingTable);
        this.setRanking();
    }

    setRanking = () => { // Insert data into the ranking table
        $('#rankingBody').html('');
        let rankingData = JSON.parse(localStorage.getItem('ranking'));
        if (rankingData) {
            let position = 1;
            rankingData.sort(function (a, b) {
                return a[1] - b[1];
            }).forEach(row => {
                let tr = $('<tr></tr>');
                let td = $('<td></td>');
                td.text(position);
                tr.append(td);
                for (let i = 0; i < row.length; i++) {
                    let td = $('<td></td>');
                    td.text(row[i]);
                    tr.append(td);
                }
                position++;
                $('#rankingBody').append(tr)
            });
        }
    }

    newGame = () => { // Reset the puzzle and hide the square on the right down
        this.resolve(true);
        this.interval = setInterval(() => {
            this.playerTime++;
            $('#time').text(this.playerTime);
        }, 1000)
        this.game.children().last().css('visibility', 'hidden');
        this.suffle();
    }

    resetStats() { // Reset the player's statistics
        this.playerMove = 0;
        this.playerTime = 0;
        this.playerWin = false;
        if (this.interval) {
            clearInterval(this.interval);
        }
        $('#time').text(0);
        $('#moves').text(0);
    }

    resolve = (init = false) => { // Solve the puzzle, if init is true does not check if the player has won
        let app = $('#app');
        if (this.game) {
            this.game.remove();
        }
        this.game = this.gameResolved;
        this.gameResolved = this.gameResolved.clone(true);
        app.append(this.game)
        $('#puzzle > img').each((i, element) => {
            element = $(element);
            $(element).on('click', () => {
                this.moveCell(element)
            });
        });
        if (!init) {
            this.checkWin();
        }
        this.resetStats();
    }

    suffle = () => { // Mix Puzzle Squares
        Array.prototype.slice.call(this.game.children())
            .sort(() => Math.random() - 0.5)
            .map((element, index, elements) => {
                var nextElement = elements[index + 1];
                if (nextElement) {
                    this.swapCells(element, nextElement);
                }
            });
    }

    moveCell = (element) => { // Move the cells depending on where the white square is and checks if the player has won in each movement
        let whiteSquare = $('#whiteSquare');
        element = $(element);
        if (element.css('visibility') != 'hidden' && !this.playerWin && whiteSquare.css('visibility') == 'hidden') {
            //Checking if white tile on the right
            if (element.css('grid-row-start') == whiteSquare.css('grid-row-start') &&
                parseInt(element.css('grid-column-start')) + 1 == whiteSquare.css('grid-column-start')) {
                element.animate({ 'left': '100%' }, 100, () => {
                    element.css('left', 'auto');
                    this.swapCells(element, whiteSquare);
                })
                this.playerMove++;
            }
            //Checking if white tile on the left
            else if (element.css('grid-row-start') == whiteSquare.css('grid-row-start') &&
                parseInt(element.css('grid-column-start')) - 1 == whiteSquare.css('grid-column-start')) {
                element.animate({ 'right': '100%' }, 100, () => {
                    element.css('right', 'auto');
                    this.swapCells(element, whiteSquare);
                })
                this.playerMove++;
            }
            //Checking if white tile is above
            else if (parseInt(element.css('grid-row-start')) + 1 == whiteSquare.css('grid-row-start') &&
                element.css('grid-column-start') == whiteSquare.css('grid-column-start')) {
                element.animate({ 'top': '100%' }, 100, () => {
                    element.css('top', 'auto');
                    this.swapCells(element, whiteSquare);
                })
                this.playerMove++;
            }
            //Checking if white tile is below
            else if (parseInt(element.css('grid-row-start')) - 1 == whiteSquare.css('grid-row-start') &&
                element.css('grid-column-start') == whiteSquare.css('grid-column-start')) {
                element.animate({ 'bottom': '100%' }, 100, () => {
                    element.css('bottom', 'auto');
                    this.swapCells(element, whiteSquare);
                })
                this.playerMove++;
            }
            $('#moves').text(this.playerMove);
            this.checkWin();
        }
    }

    swapCells = (element1, element2) => { // Exchanges the cells of place in the puzzle
        element1 = $(element1);
        element2 = $(element2);
        let element1ColumnStart = element1.css('grid-column-start');
        let element1RowStart = element1.css('grid-row-start');
        let element2ColumnStart = element2.css('grid-column-start');
        let element2RowStart = element2.css('grid-row-start');
        element1
            .css('grid-column-start', element2ColumnStart)
            .css('grid-row-start', element2RowStart);
        element2
            .css('grid-column-start', element1ColumnStart)
            .css('grid-row-start', element1RowStart);
    }

    checkWin = () => { // Check if the player win and if so, it set in the ranking his time and movements
        let playerWin = true;
        this.game.children().each((i, element) => {
            element = $(element);
            if (element.data('row') != element.css('grid-row-start') || element.data('column') != element.css('grid-column-start')) {
                playerWin = false;
            }
        });
        if (playerWin) {
            $('#whiteSquare').css('visibility', 'visible');
            let ranking = JSON.parse(localStorage.getItem('ranking'));
            if (!ranking) {
                ranking = [
                    [this.playerMove, this.playerTime]
                ]
            } else {
                ranking.push([this.playerMove, this.playerTime]);
            }
            localStorage.setItem('ranking', JSON.stringify(ranking));
            this.setRanking()
            Swal.fire({
                title: 'You won!',
                text: `You have made ${this.playerMove} movements at ${this.playerTime} seconds`,
                icon: 'info',
                confirmButtonText: 'Cool!'
            });
            this.resetStats();
        }
        this.playerWin = playerWin;
    }

}
var newGame = new SlidingPuzzle();
newGame.printMenu();
newGame.printGameButtons();
newGame.printPlayerStats();
newGame.printRanking();
newGame.printGame();