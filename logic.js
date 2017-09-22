function playAgain() {
	location.reload();
}

function setBoard() {
  var cells = document.getElementsByClassName("cell");

  for (var i=0; i < cells.length; i++) {
    cells[i].addEventListener('click', takeTurn, false);
  }
}

var humanTurn = true;

function takeTurn() {
	var selectedCell = this.id;
    if (this.innerHTML != "" || !humanTurn) {
    	console.log("bad");
        return;
    }
    //take turn 
    humanTurn = !humanTurn;
    var location = this.id;
    this.innerHTML = "X";
	this.classList.add("selected");
	this.classList.add("xmark");
    var row = parseInt(location / 3);
    var col = location % 3;
    gameBoard[row][col] = "X";
	openCells -= 1;
    
    //computer turn
	var humanWin = checkForWinner(gameBoard,'X');
	if (humanWin != null) {
		//alert("human win");
		document.getElementById('myBoard').innerHTML += victoryLines[humanWin];
		setTimeout(function() {
			document.getElementById("modalShadow").style.visibility = "visible";
			document.getElementById("modal").style.top = "80px";
			document.getElementById("victoryMessage").innerHTML += "Congratulations, the Human wins!";
		}, 1000);
		return;
	}
	else if (openCells == 0) {
		setTimeout(function() {
			document.getElementById("modalShadow").style.visibility = "visible";
			document.getElementById("modal").style.top = "80px";
			document.getElementById("victoryMessage").innerHTML += "It's a draw!";
		}, 1000);
		return;
	}
	else {
		var coordinates = opponentTurn(gameBoard);
		setTimeout(function(){
			var cells = document.getElementsByClassName("cell");
			gameBoard[coordinates[0]][coordinates[1]] = "O";
			openCells -= 1;
			cells[coordinates[0] * 3 + coordinates[1]].innerHTML = "O";
			cells[coordinates[0] * 3 + coordinates[1]].classList.add("selected");
			cells[coordinates[0] * 3 + coordinates[1]].classList.add("omark");
			humanTurn = !humanTurn;
		  
			var cpuWin = checkForWinner(gameBoard,'O');
			if (cpuWin != null) {
				//alert("cpu win");
				document.getElementById('myBoard').innerHTML += victoryLines[cpuWin];
				setTimeout(function() {
					document.getElementById("modalShadow").style.visibility = "visible";
					document.getElementById("modal").style.top = "80px";
					document.getElementById("victoryMessage").innerHTML += "Oh no, the computer wins :(";
				}, 1000);
				return;
			}
		}, 300);
    }
	if (openCells == 0) {
		setTimeout(function() {
			document.getElementById("modalShadow").style.visibility = "visible";
			document.getElementById("modal").style.top = "80px";
			document.getElementById("victoryMessage").innerHTML += "It's a draw!";
		}, 1000);
		return;
	}
}

var gameBoard = [
["?","?","?"],
["?","?","?"],
["?","?","?"]
]

var openCells = 9;

var victoryLines = {
	'horizontalTop' : '<div class="horizontal-mark horizontal-top"></div>',
	'horizontalMiddle' : '<div class="horizontal-mark horizontal-middle"></div>',
	'horizontalBottom' : '<div class="horizontal-mark horizontal-bottom"></div>',
	'verticalLeft' : '<div class="vertical-mark vertical-left"></div>',
	'verticalMiddle' : '<div class="vertical-mark vertical-middle"></div>',
	'verticalRight' : '<div class="vertical-mark vertical-right"></div>',
	'diagonalDown' : '<div class="diagonal-mark diagonal-down"></div>',
	'diagonalUp' : '<div class="diagonal-mark diagonal-up"></div>'
}



function numInstancesOf(symbol, gameBoard) {
	var count = 0;
	for(var i=0; i < gameBoard.length; i++) {
		if (gameBoard[i] == symbol) {
			count++;
		}
	}
	return count;
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function checkForWinner(gameBoard,symbol) {
	var verticalLeft = [gameBoard[0][0],gameBoard[1][0],gameBoard[2][0]];
	var verticalMiddle = [gameBoard[0][1],gameBoard[1][1],gameBoard[2][1]];
	var verticalRight = [gameBoard[0][2],gameBoard[1][2],gameBoard[2][2]];
	
	var diagonalDown = [gameBoard[0][0],gameBoard[1][1],gameBoard[2][2]];
	var diagonalUp = [gameBoard[2][0],gameBoard[1][1],gameBoard[0][2]];
	
	if(numInstancesOf(symbol, gameBoard[0]) > 2) {
		return 'horizontalTop';
	}
	else if(numInstancesOf(symbol, gameBoard[1]) > 2) {
		return 'horizontalMiddle';
	}
	else if(numInstancesOf(symbol, gameBoard[2]) > 2) {
		return 'horizontalBottom';
	}
	
	else if(numInstancesOf(symbol, verticalLeft) > 2) {
		return 'verticalLeft';
	}
	else if(numInstancesOf(symbol, verticalMiddle) > 2) {
		return 'verticalMiddle';
	}
	else if(numInstancesOf(symbol, verticalRight) > 2) {
		return 'verticalRight';
	}
	
	else if(numInstancesOf(symbol, diagonalDown) > 2) {
		return 'diagonalDown';
	}
	else if(numInstancesOf(symbol, diagonalUp) > 2) {
		return 'diagonalUp';
	}
	
	return null;
}

function opponentTurn(gameBoard) {
	var unmarked = [];
    var X_marked = [];
    var O_marked = [];

    for (var i = 0; i < 3; i++)
    {
        for (var j = 0; j < 3; j++)
        {
            if (gameBoard[i][j] == "?")
            {
                var coordinates = [i,j];
                unmarked.push(coordinates);
            }
            else if (gameBoard[i][j] == "X")
            {
                var coordinates = [i,j];
                X_marked.push(coordinates);
            }
            else
            {
                var coordinates = [i,j];
                O_marked.push(coordinates);
            }
        }
    }
	var compLocation1 = findComputerSpot(gameBoard,'O')
	if(compLocation1 != null) {
		return compLocation1;
	}
	
	var compLocation2 = findComputerSpot(gameBoard,'X')
	if(compLocation2 != null) {
		return compLocation2;
	}
	else {
		return unmarked[getRandomInt(0,unmarked.length)];
	}
}


function findComputerSpot(gameBoard, symbol) {
	
	var verticalLeft = [gameBoard[0][0],gameBoard[1][0],gameBoard[2][0]];
	var verticalMiddle = [gameBoard[0][1],gameBoard[1][1],gameBoard[2][1]];
	var verticalRight = [gameBoard[0][2],gameBoard[1][2],gameBoard[2][2]];
	
	var diagonalDown = [gameBoard[0][0],gameBoard[1][1],gameBoard[2][2]];
	var diagonalUp = [gameBoard[2][0],gameBoard[1][1],gameBoard[0][2]];
	
	if(numInstancesOf(symbol, gameBoard[0]) > 1 && gameBoard[0].indexOf('?') != -1) {
		return [0,gameBoard[0].indexOf('?')];
	}
	else if(numInstancesOf(symbol, gameBoard[1]) > 1 && gameBoard[1].indexOf('?') != -1) {
		return [1,gameBoard[1].indexOf('?')];
	}
	else if(numInstancesOf(symbol, gameBoard[2]) > 1 && gameBoard[2].indexOf('?') != -1) {
		return [2,gameBoard[2].indexOf('?')];
	}
	
	else if(numInstancesOf(symbol, verticalLeft) > 1 && verticalLeft.indexOf('?') != -1) {
		return [verticalLeft.indexOf('?'),0];
	}
	else if(numInstancesOf(symbol, verticalMiddle) > 1 && verticalMiddle.indexOf('?') != -1) {
		return [verticalMiddle.indexOf('?'),1];
	}
	else if(numInstancesOf(symbol, verticalRight) > 1 && verticalRight.indexOf('?') != -1) {
		return [verticalRight.indexOf('?'),2];
	}
	
	else if(numInstancesOf(symbol, diagonalDown) > 1 && diagonalDown.indexOf('?') != -1) {
		return [diagonalDown.indexOf('?'),diagonalDown.indexOf('?')];
	}
	else if(numInstancesOf(symbol, diagonalUp) > 1 && diagonalUp.indexOf('?') != -1) {
		return [2-diagonalUp.indexOf('?'),diagonalUp.indexOf('?')];
	}
	
	return null;
}