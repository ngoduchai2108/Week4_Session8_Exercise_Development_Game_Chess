const VALUE_EMPTY = 1;
const VALUE_O = 2;
const VALUE_X = 3;
const DEFAULT_CELL_SIZE = 40;
const DEFAULT_TOP = 100;

let Cell = function (x,y) {
  this.x = x;
  this.y = y;
  this.top = DEFAULT_TOP;
  this.left =LEFT;
  this.value = VALUE_EMPTY;
  this.getHtml = function () {
      this.top += this.x * DEFAULT_CELL_SIZE;
      this.left += this.y * DEFAULT_CELL_SIZE;
      let cellHtml = '<div id="cell-'+this.x+'-'+this.y+'" onclick=" play('+this.x+','+this.y+')" class ="cell" style=" border: 1px solid #d3d3d3;text-align: center ;position:absolute; width:'+
          DEFAULT_CELL_SIZE+'px; height: '+DEFAULT_CELL_SIZE+'px ; left: '+this.left+'px;top: '+this.top+'px;line-height: '+DEFAULT_CELL_SIZE+'px;"></div>';
      return cellHtml;
  };

  this.draw = function () {
      let cellDiv = document.getElementById("cell-"+this.x+"-"+this.y);
      switch (this.value) {
          case VALUE_X:
              cellDiv.innerHTML = "X";
              break;
          case VALUE_O:
              cellDiv.innerHTML = "O";
              break;
          default:
              cellDiv.innerHTML = "";
              break;
       }
  }
};

let GameBroad = function (rows,cols,elementId) {
    this.rows = rows;
    this.cols = cols;
    this.elementId = elementId;
    this.turn = VALUE_O;
    this.cells = [];
    this.isOver = false;
    this.draw = function () {
        let gameBroadDiv = document.getElementById(this.elementId);
        gameBroadDiv.innerHTML = "";
        for (let i=0; i<this.rows;i++){
            let row = [];
            this.cells.push(row);
            for (let j=0;j<this.cols;j++){
                let cell = new Cell(i,j);
                row.push(cell);
                gameBroadDiv.innerHTML += cell.getHtml();
            }
        }
    };
    this.play = function (x,y) {
        if (this.isOver ){
            return;
        }
        let cell = this.cells[x][y];
        if (cell.value === VALUE_EMPTY){
            cell.value = this.turn;
            cell.draw();
            this.check(x,y);
            if (this.turn === VALUE_O){
                this.turn = VALUE_X;
            }
            else {
                this.turn = VALUE_O;
            }
        }else {
            alert('cell has value!!! ')
        }
    };
    this.check = function (x,y) {
        let cell = this.cells[x][y];
        var value = cell.value;
        var count = 1;
        var i = 1;
        while (x+i < this.cols && this.cells[x+i][y].value === cell.value){
            i++;
            count++;
        }
        var i = 1;
        while (x-i >0 && this.cells[x-i][y].value === cell.value){
            i++;
            count++;
        }
        this.endGame(count);

        var count = 1;
        var i = 1;
        while (y+i < this.rows && this.cells[x][y+i].value === cell.value){
            i++;
            count++;
        }
        var i = 1;
        while (y-i >0 && this.cells[x][y-i].value === cell.value){
            i++;
            count++;
        }
        this.endGame(count);

        var count = 1;
        var i = 1;
        while (x+i < this.cols && y+i < this.rows && this.cells[x+i][y+i].value === cell.value){
            i++;
            count++;
        }
        var i = 1;
        while (x-i >0 && y-i >0 && this.cells[x-i][y-i].value === cell.value){
            i++;
            count++;
        }
        this.endGame(count);


        var count = 1;
        var i = 1;
        while (x+i < this.cols && y-i > 0 && this.cells[x+i][y-i].value === cell.value){
            i++;
            count++;
        }
        var i = 1;
        while (x-i >0 && y+i < this.rows && this.cells[x-i][y+i].value === cell.value){
            i++;
            count++;
        }
        this.endGame(count);
    };
    this.endGame = function (count,value) {
        if (count ===5){
            this.isOver = true;
            if (value === VALUE_O){
                alert('O win!!!')
            }else {
                alert('X win!!!')
            }

        }
    };
};
function play(x,y) {
    gameBoard.play(x,y);
}
function start() {
    let rows = parseInt(prompt('Enter rows?'));
    let cols = parseInt(prompt('Enter cols?'));
    LEFT = (window.innerWidth - cols*DEFAULT_CELL_SIZE)/2;
    gameBoard = new GameBroad(rows,cols,"game");
    gameBoard.draw();
}
let gameBoard;
let LEFT;
// start();
