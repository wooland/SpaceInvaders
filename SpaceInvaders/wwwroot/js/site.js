// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.

var canvas = document.getElementById('gameCanvas');

canvas.width = 800;
canvas.height = 600;
var ctx = canvas.getContext('2d');
ctx.fillStyle = "lightblue";
ctx.fillRect(0, 0, canvas.width, canvas.height);


var img1 = new Image();
//drawing of the test image - img1
img1.onload = function () {
    ctx.drawImage(img1, 500, 150);
};

img1.src = 'images/Sprites/Enemy.png';

var img2 = new Image();

img2.onload = function () {
    //draw background image
    ctx.drawImage(img2, 100, 100);
};

img2.src = 'images/Sprites/Player.png';