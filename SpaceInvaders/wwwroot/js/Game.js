

//Globala variabler is the shit!
var playerOne;
var playerTwo;
var enemyMiniboss;



function InitGame() {

    //Skapa canvas och context
    myGameSky.start();

    //Bild för player1
    var imgPlayer1 = new Image();
    imgPlayer1.src = 'images/Sprites/Player.png';

    //skapa player1
    playerOne = new airplane(40, 40, imgPlayer1, 10, 120);

   //nme
    var imgEnemy = new Image();
    imgEnemy.src = 'images/Sprites/Enemy.png';
    enemyMiniboss = new airplane(30, 30, imgEnemy, 800, 320);
    enemyMiniboss.speedX = -3;
    enemyMiniboss.speedY = 1;


};



var myGameSky = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.canvas.style.border = "thick solid black";
        this.canvas.style.margin = "auto";
        this.canvas.tabIndex = "1";
        document.getElementById("gameSpace").appendChild(this.canvas).focus();
        this.context = this.canvas.getContext('2d');

        this.context.fillStyle = "lightblue";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.interval = setInterval(updateGameArea, 50);


        window.addEventListener('keydown', function (e) {
            myGameSky.keys = (myGameSky.keys || []);
            myGameSky.keys[e.keyCode] = true;

           
            console.log(myGameSky.keys[39])
    

        });

        window.addEventListener('keyup', function (e) {
            myGameSky.keys[e.keyCode] = false;
        });
        this.context = this.canvas.getContext('2d');
    },
    updateSky: function () {
        

        this.context.fillStyle = "lightblue";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}

function updateGameArea() {
    
    myGameSky.clear();
    myGameSky.updateSky();
    
    playerOne.newPos();
    playerOne.update();

    enemyMiniboss.newPos();
    enemyMiniboss.update();
}

function airplane(width, height, image, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    

    var ctx = myGameSky.context;

    image.onload = function () {
        ctx.drawImage(image, this.x, this.y);
    };
    this.update = function () {
        if (myGameSky.keys && myGameSky.keys[37]) { playerOne.speedX = -1; }
        if (myGameSky.keys && myGameSky.keys[39]) { playerOne.speedX = 1; }
        if (myGameSky.keys && myGameSky.keys[38]) { playerOne.speedY = -1; }
        if (myGameSky.keys && myGameSky.keys[40]) { playerOne.speedY = 1; }
        ctx.drawImage(image, this.x, this.y);
        
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }

}
