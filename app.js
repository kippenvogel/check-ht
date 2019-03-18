//import phaser from 'phaser'

    var width = 7;
    var heigth = 6;
    var offsetx = 90;
    var offsety = 100;
    var iconsize = 120;
    var markerPositionX = 0;
    var markerPositionY = 0;
    var fieldSelector = 0;

    var gameOver = false;
    // 1 == playerid | 2 == computerid
    var whoHasWonTheGame = 0;

    var selectingPicture;

    // SWITCH FOR GAME LOGIC: 1 = user; 2 = AI
    var player = 1;
    var playerid = 1;
    var computerid = 2;
    var fieldSelectorImage;

    var updateFrames = 0;

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
        this.load.image('background', 'assets/background.png',138, 15);
        this.load.image('apple', 'assets/apple.png');
        this.load.image('fish', 'assets/fish.png');
        this.load.image('empty', 'assets/empty.png');
        this.load.image('select', 'assets/select.png');
        this.load.image('win', 'assets/win.png');
        this.load.image('lost', 'assets/lost.png');

    }


    function create ()
    {
        var logo = this.add.image(400, 300, 'apple');

        this.fieldSelectorImage = this.add.image(150,430,'background');

        gameField3 = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, computerid, computerid, computerid, 0, 0]
        ];
        gameField2  = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0,0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, playerid, playerid, playerid, 0, 0, 0]
        ];
        gameField4  = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 0, 0,0],
            [2, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2]
        ];
        gameField  = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0,0],
            [2, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2]
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


    function hasOneWonVertical (whoIsPlayer){

        for (var x = 0; x < width; x++){
            for (var y = 5; y >= 3; y--){
                if (
                   (gameField[y][x] == whoIsPlayer) &&
                   (gameField[y-1][x] == whoIsPlayer) &&
                   (gameField[y-2][x] == whoIsPlayer) &&
                   (gameField[y-3][x] == whoIsPlayer)
                   )
                {

                    if (whoIsPlayer == playerid){
                        whoHasWonTheGame = playerid;
                        gameOver = true;
                        alert("You won!  (vertical)");
                        return playerid;
                   }

                   if (whoIsPlayer == computerid){
                        whoHasWonTheGame = computerid;
                        gameOver = true;
                        alert("Computer won! (vertical)");
                        return computerid;
                   }
                }




            }
        }
    }

    function hasOneWonHorizontal (whoIsPlayer){

        /**
        TEST HORIZONTAL WIN SUCCESS
        **/
        for (var y = 0;  y < heigth; y++){
            for (var x =0; x < width; x++ ){
                if ((gameField[y][x] == whoIsPlayer) &&
                    (gameField[y][x+1] == whoIsPlayer) &&
                        (gameField[y][x+2] == whoIsPlayer) &&
                            (gameField[y][x+3] == whoIsPlayer)){

                                if (whoIsPlayer == 1){
                                    alert("You won!  (horizontal)");
                                    whoHasWonTheGame = 1;



                                }

                                if (whoIsPlayer == 2){
                                    alert("You lost. (horizontal)");
                                    //var awinText = this.add.text(200, 0, 'SRY, you lost!', { fontSize: '40px', fill: '#f00' });
                                    whoHasWonTheGame = 2;

                                }

                                var newStoneWon = new Phaser.Geom.Point(x,y);
                                gameOver = true;

                                return newStoneWon;
                             }

            }
        }


    }





// IS ROW FREE OR FULL
    /***
     *
     * @returns {boolean}
     *  true = free
     *  false = full
     */
    function isRowFree(row) {

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
        var stones = 5;
        for (stones; stones >= 0; stones = stones-1){
            // FREE FOR MIN. 1 STONE
            if (gameField[stones][column] == 0){
                break;
            }
            // NOT FREE
            if (gameField[stones][column] == 1 || gameField[stones][column] == 2 ){
                if (stones == 5){
                }
            }
        }

        console.log( "Free Stones in Column(" +  column+"): " + stones);

        return stones;

    }
    function printXY (){
        console.log("X" + markerPositionX);
        console.log("Y" + markerPositionY);
        console.log(gameField);

    }

    function searchForHorizontalDanger (){
            for (var y = 0; y < heigth; y++){
                for (var x = 0; x < width; x++){

                }
            }
    }

    /**
    **/
    function hasWonDiagonal (whoIsPlayer){

        for (var x =0; x < 4; x++){
            if (
            (
                gameField[5][x] == whoIsPlayer
            )
            &&
            (
                gameField[4][x+1] == whoIsPlayer
            )
             &&
            (
                gameField[3][x+2] == whoIsPlayer
            )
            &&
            (
                gameField[2][x+3] == whoIsPlayer
            )
        ){
            alert("DIAGONAL WON" + whoIsPlayer);
            whoHasWonTheGame = whoIsPlayer;
            gameOver = true;
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

        var thisCol = Math.floor(Math.random() *7);
        console.log("<<< COLUMN: " + thisCol);


        do{
            if (isRowFree(thisCol)){
                console.log("C::: " + thisCol);
                // GET ROW
                var heigthOfCol = getHeigthOfColumn(thisCol);
                //gameField[heigthOfCol][thisCol] = computerid;

                var newStone = new Phaser.Geom.Point(thisCol, heigthOfCol);
                console.log("_______//AI_______");

                tries = 1;
            }
            else {
                thisCol = Math.floor(Math.random() *7);
            }

        }
        while (tries != 1);

    return newStone;
}

function update (){

  if (whoHasWonTheGame == 1){
    this.add.text(200, 0, '||| You have won this game!', { fontSize: '40px', fill: '#0f0' });
  }
  else if (whoHasWonTheGame == 2 ){
    this.add.text(200, 0, '||| Sorry, you lost!', { fontSize: '40px', fill: '#f00' });
  }
  else  {

  }

    if (!gameOver){
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
                && (markerPositionX >= 0)){
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
                    if(isRowFree(markerPositionX)){
                        console.log("Row is free!");
                        var h =getHeigthOfColumn(markerPositionX);
                        console.log( "h: -> " + h);
                        gameField[h][markerPositionX] = playerid;




                        this.add.image((markerPositionX*iconsize)+offsetx, (h*iconsize)+offsety, 'apple');

                        printXY();
                        if (hasOneWonVertical(player) == playerid ||
                            hasOneWonHorizontal(player) == playerid ||
                            hasWonDiagonal(player, 0,markerPositionX) == playerid
                        ){
                          console.log("WIN");
                          //winText = this.add.text(200, 0, 'You have won this game!', { fontSize: '40px', fill: '#0f0' });

                        }
                        if (hasOneWonVertical(player) == computerid ||
                            hasOneWonHorizontal(player) == computerid ||
                            hasWonDiagonal(player, 0,markerPositionX) == computerid
                        )
                        {
                          //winText = this.add.text(200, 0, 'Sorry, you lost!', { fontSize: '40px', fill: '#f00' });
                          console.log("LOST");

                        }






                    }
                    player = computerid;
                    console.log(":::::::::::::::::::::player: " + player);

                }
                // LET AI PLAy
                if (player == computerid){
                    console.log(">>>>AI<<<<<");
                    var p =letAIplay();
                    console.log("NEW POINT (AI) X:" + p.x + "Y: " + p.y);

                    gameField[p.y][p.x] = computerid;

                    this.add.image((p.x*iconsize)+offsetx, (p.y*iconsize)+offsety, 'fish');
                    hasOneWonHorizontal(player);
                    hasOneWonVertical(player);
                    hasWonDiagonal(player, 0 ,p.x);



                    player = playerid;
                    console.log(":::::::::::::::::::::player: " + player);

                }
            }




            // Zeichnet die Steine ein, die gewonnen haben bei GameOver.
            if (gameOver == true){
                for (var y = 0; y < heigth;  y += 1){
                    for (var x = 0; x < width; x += 1) {
                            if (gameField[y][x] == playerid){
                              this.add.image((x*iconsize)+offsetx, (y*iconsize)+offsety, 'win');

                              //winText = this.add.text(200, 0, 'You have won this game!', { fontSize: '40px', fill: '#0f0' });

                            }
                            if (gameField[y][x] == computerid){
                                this.add.image((x*iconsize)+offsetx, (y*iconsize)+offsety, 'lost');

                                //winText = this.add.text(200, 0, 'Sorry, you lost!', { fontSize: '40px', fill: '#f00' });
                            }
                    }
                }
              }
        }










        // this.add.image((markerPositionX*(iconsize)+offsetx), (markerPositionY*(iconsize))+offsety, 'apple');




    }

    create();
