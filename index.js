<<<<<<< HEAD:app.js
=======

import phaser from 'phaser'
>>>>>>> parent of c9395747... test:index.js

    var width = 7;
    var heigth = 6;
    var offsetx = 90;
    var offsety = 100;
    var iconsize = 120;
    var markerPositionX = 0;
    var markerPositionY = 0;
    var fieldSelector = 0;

    var selectingPicture;

    // SWITCH FOR GAME LOGIC: 1 = user; 2 = AI
    var player = 1;
    var playerid = 1;
    var computerid = 2;


    var config = {
        type: Phaser.AUTO,
        width: 900,
        height: 800,
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };


    var gameField;

    var game = new Phaser.Game(config);




    function  preload ()
    {
        this.load.image('apple', 'assets/apple.png');
        this.load.image('fish', 'assets/fish.png');
        this.load.image('empty', 'assets/empty.png');
        this.load.image('select', 'assets/select.png');

    }


    function create ()
    {
        gameField = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];

        // draw empty gamefield
        for (var y = 0; y < heigth;  y += 1){
          for (var x = 0; x < width; x += 1) {
              if (gameField[y][x] == 0){
                  this.add.image((x*iconsize)+offsetx, (y*iconsize)+offsety, 'empty');
              }
              else if (gameField[y][x] == 1){
                  this.add.image((x*iconsize)+offsetx, (y*iconsize)+offsety, 'apple');

              }
              else if (gameField[y][x] == 2){
                  this.add.image((x*iconsize)+offsetx, (y*iconsize)+offsety, 'fish');

              }
              else if (gameField[y][x] == 3){
                  this.add.image((x*iconsize)+offsetx, (y*iconsize)+offsety, 'select');

              }
          }
        }

        this.fieldSelectorImage = this.add.image((markerPositionX*iconsize)+offsetx, (markerPositionY*iconsize)+offsety, 'select');


    }

// IS ROW FREE OR FULL
    /***
     *
     * @returns {boolean}
     *  true = free
     *  false = full
     */
<<<<<<< HEAD:app.js
    module.exports = {
        isRowFree: function(row) {

            // ROW IS FULL
            if (gameField[0][row] == 1 ||
                gameField[0][row] == 2){
                    console.log(gameField);
                    console.log("ROW (" + row + ") is full!");
                    return false;
            }
            // ROW IS FREE
            else {
                var hh = module.exports.getHeigthOfColumn(row);
                console.log ("Free Stones: " + hh);
                return true;
            }
        },
    
        getHeigthOfColumn: function(column) {
=======
    function isRowFree (row){

        // ROW IS FULL
        if (gameField[0][row] == 1 ||
            gameField[0][row] == 2){
                console.log(gameField);
                console.log("ROW (" + row + ") is full!");
                return false;
        }
        // ROW IS FREE
        else {
            var hh = getHeigthOfColumn(row);
            console.log ("Free Stones: " + hh);
            return true;
        }
}

function getHeigthOfColumn(column){
>>>>>>> parent of c9395747... test:index.js
        var stones = 5;
        for (stones; stones >= 0; stones = stones-1){
            // FREE FOR MIN. 1 STONE
            if (gameField[stones][column] == 0){
                break;
            }
            if (gameField[stones][column] == 1 || gameField[stones][column] == 2 ){
            }
        }

        console.log( "Free Stones in Column(" +  column+"): " + stones);

        return stones;

}}

function printXY (){
    console.log("X" + markerPositionX);
    console.log("Y" + markerPositionY);
}

function searchForHorizontalDanger (){
        for (var y = 0; y < heigth; y++){
            for (var x = 0; x < width; x++){

            }
        }
}

    /**
     * @TODO
     * @returns {Phaser.Geom.Point}
     */
    function letAIplay (){
        // SELECT COLUMN
        var tries = 0;

        var thisCol = Math.floor(Math.random() *8);
        console.log("<<< COLUMN: " + thisCol);


        do{
            if (module.exports.isRowFree(thisCol)){
                console.log("C::: " + thisCol);
                // GET ROW
                var heigthOfCol = module.exports.getHeigthOfColumn(thisCol);

                gameField[heigthOfCol][thisCol] = computerid;

                var newStone = new Phaser.Geom.Point(thisCol, heigthOfCol);
                console.log("_______//AI_______");
            }

            else {
                tries++;
            }
            
        }
        while (tries < width);

    return newStone;
}

function update (){

            // KEYBOARD RIGHT PRESSED
            if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT))
                && (markerPositionX < width-1)){
                // CHANGE SELECT POSITION IN GAMEFIELD ( -> )
                markerPositionX += 1;
                // CHANGE X-POSITION -> IN IMAGE
                this.fieldSelectorImage.x = (markerPositionX*iconsize)+offsetx;
                printXY();
            }
            // KEYBOARD LEFT PRESSED
            if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT))
                && (markerPositionX >= 1)){
                // CHANGE SELECT POSITION IN GAMEFIELD ( <- )
                markerPositionX -= 1;
                // CHANGE X-POSITION <- IN IMAGE
                this.fieldSelectorImage.x = (markerPositionX*iconsize)+offsetx;
                printXY();
            }

            // KEYBOARD SPACE PRESSED
            // ONE ROUND ++
            if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))){
                if(player == playerid){
                    if(module.exports.isRowFree(markerPositionX)){
                        console.log("Row is free!");
                        var h =module.exports.getHeigthOfColumn(markerPositionX);
                        console.log( "h: -> " + h);
                        gameField[h][markerPositionX] = playerid;
                        this.add.image((markerPositionX*iconsize)+offsetx, (h*iconsize)+offsety, 'apple');

                        printXY();
                    }
                    player = computerid;

                }
                // LET AI PLAy
                if (player == computerid){
                    console.log(">>>>AI<<<<<");
                    var p =letAIplay();
                    console.log("NEW POINT (AI) X:" + p.x + "Y: " + p.y);

                    this.add.image((p.x*iconsize)+offsetx, (p.y*iconsize)+offsety, 'fish');
                    player = playerid;
                }
            }










        // this.add.image((markerPositionX*(iconsize)+offsetx), (markerPositionY*(iconsize))+offsety, 'apple');




    }




    create();
