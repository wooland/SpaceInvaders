﻿

//Globala variabler is the shit!
var playerOne;
var playerTwo;
var enemyMiniboss;
var enemyPlanes = [];
var bullets = [];
var explosions = [];
var clouds = [];
var bulletFired = false;

var p1Score;
var bonus = 0;

var imgEnemy = new Image();
imgEnemy.src = 'images/Sprites/Enemy.png';

var imgBullet = new Image();
imgBullet.src = 'images/Sprites/Bullet.png';

var imgExplosion = new Image();
imgExplosion.src = 'images/Sprites/Explosion.png';

var imgCloud = new Image();
imgCloud.src = 'images/Sprites/Cloud.png';



function InitGame() {

    //Skapa canvas och context
    myGameSky.start();

    //Bild för player1
    var imgPlayer1 = new Image();
    imgPlayer1.src = 'images/Sprites/Player.png';

    //skapa player1
    playerOne = new airplane(30, 30, imgPlayer1, 10, 120);

}



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

        this.interval = setInterval(updateGameArea, 10);
        this.frameNo = 0;
        p1Score = new textComponent("30px", "Consolas", "black", 280, 40, "text");
        window.addEventListener('keydown', function (e) {
            myGameSky.keys = (myGameSky.keys || []);
            myGameSky.keys[e.keyCode] = true;

        });

        window.addEventListener('keyup', function (e) {
            if (myGameSky.keys !== null) {
                myGameSky.keys[e.keyCode] = false;
            }

        });
        this.context = this.canvas.getContext('2d');
    },
    updateSky: function () {


        this.context.fillStyle = "lightblue";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillText("Hello World", 10, 50);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
        alert("Game Over Dude");
    }

};

function updateGameArea() {

    //Kolla kollision med enemy array
    for (i = 0; i < enemyPlanes.length; i += 1) {
        if (playerOne.crashWith(enemyPlanes[i])) {
            myGameSky.stop();
            return;
        }
    }
    //Kolla kollision med skott / enemies
    for (i = 0; i < enemyPlanes.length; i += 1) {
        for (var j = 0; j < bullets.length; j++) {
            if (enemyPlanes[i].crashWith(bullets[j])) {
                explosion(enemyPlanes[i].x, enemyPlanes[i].y);
                enemyPlanes.splice(i, 1);
                bullets.splice(j, 1);
                bonus += 100;
            }
        }
    }

    myGameSky.clear();

    myGameSky.frameNo += 1;
    if (everyinterval(100)) {
        explosions.length = 0;
    }
    if (everyinterval(350)) {
        cloud();
    }
    if (myGameSky.frameNo === 1 || everyinterval(250)) {
        enemy1();
    }
    if (everyinterval(25)) {
        if (bulletFired) {
            fire();
        }
    }
    myGameSky.updateSky();

    playerOne.newPos();
    playerOne.update();
    p1Score.text = "SCORE: " + (myGameSky.frameNo + bonus);
    p1Score.update();
    //Uppdatera enemy array
    for (i = 0; i < enemyPlanes.length; i += 1) {
        if (enemyPlanes[i].x < -64) {
            enemyPlanes[i].x = 800;
        }
        //enemyPlanes[i].y = enemyPlanes[i].y + (Math.random() * (2 - -1)) + -1;
        enemyPlanes[i].newPos();
        enemyPlanes[i].update();
    }
    for (i = 0; i < bullets.length; i += 1) {
        bullets[i].newPos();
        bullets[i].update();
    }
    for (i = 0; i < explosions.length; i += 1) {
        explosions[i].newPos();
        explosions[i].update();
    }
    for (i = 0; i < clouds.length; i += 1) {
        clouds[i].newPos();
        clouds[i].update();
    }
    playerOne.checkPlayerBounds();
}

function enemy1() {
    var randomH = Math.floor(Math.random() * (569 - 32)) + 32;
    var e = new airplane(30, 30, imgEnemy, 800, randomH);
    e.speedX = Math.random() * (-1 - -3) + -3;
    enemyPlanes.push(e);
}
function cloud() {
    var randomH = Math.floor(Math.random() * (569 - 32)) + 32;
    var e = new airplane(30, 30, imgCloud, 800, randomH);
    e.speedX = -0.5;
    clouds.push(e);
}
function fire() {
    bonus -= 10;
    var shot = new airplane(5, 5, imgBullet, playerOne.x + 25, playerOne.y);
    shot.speedX = 4;
    bullets.push(shot);
    bulletFired = false;
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

        if (myGameSky.keys && !myGameSky.keys[37] && !myGameSky.keys[39]) {
            playerOne.speedX = 0;
        }
        if (myGameSky.keys && !myGameSky.keys[38] && !myGameSky.keys[40]) {
            playerOne.speedY = 0;
        }
        if (myGameSky.keys && myGameSky.keys[32]) { bulletFired = true; }


        ctx.drawImage(image, this.x, this.y);

    };
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    };
    this.checkPlayerBounds = function () {
        if (playerOne.x < 0) {
            playerOne.x = 0;
        }
        else if (playerOne.x > 768) {
            playerOne.x = 768;
        }

        if (playerOne.y < 0) {
            playerOne.y = 0;
        }
        else if (playerOne.y > 568) {
            playerOne.y = 568;
        }
    };
}

function everyinterval(n) {
    if ((myGameSky.frameNo / n) % 1 === 0) { return true; }
    return false;
}
explosions.length = 0;
function textComponent(width, height, color, x, y, type) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    var ctx = myGameSky.context;

    this.update = function () {
        ctx.font = this.width + " " + this.height;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y);
    };
}

function explosion(x, y) {
    var explode = new airplane(30, 30, imgExplosion, x, y);
    explosions.push(explode);
}
