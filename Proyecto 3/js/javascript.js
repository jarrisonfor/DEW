class SlidingPuzzle {
    constructor() {
        this.rows = 3;
        this.columns = 3;
        this.game;
        this.gameResolved;
        this.playerMove = 0;
        this.playerTime = 0;
        this.playerWin = false;
        this.interval;
    }

    printGame = () => {
        // this create a matrix for the puzzle, example:
        let matrix = new Array(this.rows);
        for (let i = 0; i < matrix.length; i++) {
            matrix[i] = new Array(this.columns);
        }

        // this create the html content for the puzzle and a initial state of the puzzle
        let game = document.createElement('div');
        game.id = 'puzzle';
        game.style.display = 'grid';
        game.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`;
        game.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                let img = document.createElement('img');
                img.src = `img/image_${i + 1}_${j + 1}.jpg`;
                img.dataset.row = i + 1;
                img.dataset.column = j + 1;
                img.style.gridRowStart = i + 1;
                img.style.gridColumnStart = j + 1;
                game.appendChild(img);
            }
        }
        game.lastChild.id = 'whiteSquare';
        this.gameResolved = game;

        // Print the html in the browser
        this.resolve(true);
    }

    printMenu = () => {
        // this create the html menu for the puzzle
        let menu = document.createElement('div');
        menu.id = 'menu';
        document.getElementById('app').appendChild(menu);
    }

    printGameButtons = () => {
        let buttons = document.createElement('div');
        buttons.id = 'buttons'
        let newGame = document.createElement('button');
        newGame.addEventListener('click', () => {
            this.newGame()
        });
        newGame.innerText = 'New Game';

        let resolve = document.createElement('button');
        resolve.addEventListener('click', () => {
            this.resolve()
        });
        resolve.innerText = 'Resolve';

        buttons.appendChild(newGame);
        buttons.appendChild(resolve);

        document.getElementById('menu').appendChild(buttons)
    }

    printPlayerStats = () => {
        let playerStats = document.createElement('div');
        playerStats.id = 'stats';
        let movesText = document.createElement('span');
        movesText.innerText = 'Moves: ';
        let moves = document.createElement('span');
        moves.id = 'moves';
        moves.innerText = this.playerMove;
        let timeText = document.createElement('span');
        timeText.innerText = 'Time: ';
        let time = document.createElement('span');
        time.id = 'time';
        time.innerText = this.playerTime;
        playerStats.appendChild(movesText);
        playerStats.appendChild(moves);
        playerStats.appendChild(timeText);
        playerStats.appendChild(time);
        document.getElementById('menu').appendChild(playerStats)
    }

    printRanking = () => {
        // Ranking header
        let ranking = document.createElement('div');
        ranking.id = 'ranking';
        let rankingTitle = document.createElement('h1');
        rankingTitle.innerText = 'Ranking';
        ranking.appendChild(rankingTitle);
        let rankingTable = document.createElement('table');
        let tableHeader = document.createElement('thead');
        let tablebody = document.createElement('tbody');
        tablebody.id = 'rankingBody';
        let tableRow = document.createElement('tr');
        let positionHeader = document.createElement('th');
        positionHeader.innerText = 'Position';
        let moveHeader = document.createElement('th');
        moveHeader.innerText = 'Moves';
        let timesHeader = document.createElement('th');
        timesHeader.innerText = 'Time';
        tableHeader.appendChild(positionHeader);
        tableHeader.appendChild(moveHeader);
        tableHeader.appendChild(timesHeader);
        rankingTable.appendChild(tableHeader);
        rankingTable.appendChild(tablebody);
        tableHeader.appendChild(tableRow);
        document.getElementById('menu').appendChild(ranking);
        document.getElementById('menu').appendChild(rankingTable);
        this.setRanking();
    }

    setRanking = () => {
        document.getElementById('rankingBody').innerHTML = null;
        let rankingData = JSON.parse(localStorage.getItem('ranking'));
        if (rankingData) {
            let position = 1;
            rankingData.sort(function (a, b) {
                return a[1] - b[1];
            }).forEach(row => {
                let tr = document.createElement('tr');
                let td = document.createElement('td');
                td.innerText = position;
                tr.appendChild(td);
                for (let i = 0; i < row.length; i++) {
                    let td = document.createElement('td');
                    td.innerText = row[i];
                    tr.appendChild(td);
                }
                position++;
                document.getElementById('rankingBody').appendChild(tr)
            });
        }
    }

    newGame = () => {
        this.resolve(true);
        this.interval = setInterval(() => {
            this.playerTime++;
            document.getElementById('time').innerText = this.playerTime;
        }, 1000)
        this.game.lastChild.style.visibility = 'hidden';
        this.suffle();
    }

    resetStats() {
        this.playerMove = 0;
        this.playerTime = 0;
        this.playerWin = false;
        if (this.interval) {
            clearInterval(this.interval);
        }
        document.getElementById('time').innerText = 0;
        document.getElementById('moves').innerText = 0;
    }

    resolve = (init = false) => {
        let app = document.getElementById('app');
        if (this.game) {
            app.removeChild(this.game);
        }
        this.game = this.gameResolved;
        this.gameResolved = this.gameResolved.cloneNode(true);
        app.appendChild(this.game)
        document.querySelectorAll('#puzzle > img').forEach(element => {
            element.addEventListener('click', () => {
                this.moveCell(element)
            }, false);
        });
        if (!init) {
            this.checkWin();
        }
        this.resetStats();
    }

    suffle = () => {
        Array.prototype.slice.call(this.game.childNodes)
            .sort(() => Math.random() - 0.5)
            .map((element, index, elements) => {
                var nextElement = elements[index + 1];
                if (nextElement) {
                    this.swapCells(element, nextElement);
                }
            });
    }

    moveCell = (element) => {
        let whiteSquare = document.getElementById('whiteSquare');
        if (element.style.visibility != 'hidden' && !this.playerWin && whiteSquare.style.visibility == 'hidden') {
            //Checking if white tile on the right
            if (element.style.gridRowStart == whiteSquare.style.gridRowStart &&
                parseInt(element.style.gridColumnStart) + 1 == whiteSquare.style.gridColumnStart) {
                this.swapCells(element, whiteSquare);
                this.playerMove++;
            }
            //Checking if white tile on the left
            else if (element.style.gridRowStart == whiteSquare.style.gridRowStart &&
                parseInt(element.style.gridColumnStart) - 1 == whiteSquare.style.gridColumnStart) {
                this.swapCells(element, whiteSquare);
                this.playerMove++;
            }
            //Checking if white tile is above
            else if (parseInt(element.style.gridRowStart) + 1 == whiteSquare.style.gridRowStart &&
                element.style.gridColumnStart == whiteSquare.style.gridColumnStart) {
                this.swapCells(element, whiteSquare);
                this.playerMove++;
            }
            //Checking if white tile is below
            else if (parseInt(element.style.gridRowStart) - 1 == whiteSquare.style.gridRowStart &&
                element.style.gridColumnStart == whiteSquare.style.gridColumnStart) {
                this.swapCells(element, whiteSquare);
                this.playerMove++;
            }
            document.getElementById('moves').innerText = this.playerMove;
            this.checkWin();
        }
    }

    swapCells = (element1, element2) => {
        [element1.style.gridColumnStart, element2.style.gridColumnStart] = [element2.style.gridColumnStart, element1.style.gridColumnStart];
        [element1.style.gridRowStart, element2.style.gridRowStart] = [element2.style.gridRowStart, element1.style.gridRowStart];
    }

    checkWin = () => {
        let playerWin = true;
        this.game.childNodes.forEach(element => {
            if (element.dataset.row != element.style.gridRowStart || element.dataset.column != element.style.gridColumnStart) {
                playerWin = false;
            }
        });
        if (playerWin) {
            document.getElementById('whiteSquare').style.visibility = 'visible';
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