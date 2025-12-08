//game
let game;
let context;
let gameWidth = 900;
let gameHeight = 600;

//bat
let batWidth = 65;
let batHeight = 65;
let batX = gameWidth/9;
let batY = gameHeight/2.25;
let batImg;

//pipes
let pipeArray = [];
let pipeWidth = 60;
let pipeHeight = 500;
let pipeX = gameWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;



let bat = {
    x: batX,
    y: batY,
    width: batWidth,
    height: batHeight
}


window.onload = function() {
    game = this.document.getElementById("game");
    context = game.getContext("2d");

    //context.fillStyle = "green";
    //console.log("canvas loaded?, game, context")
    //context.fillRect(bat.x, bat.y, bat.width, bat.height);

    //loading bat image
    batImg = new Image();
    batImg.src = "./bat.png"
    //drawing the bat
    batImg.onload = function(){
    context.drawImage(batImg, bat.x, bat.y, bat.width, bat.height);
    };

    //requestAnimationFrame(update);
}

 /*function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, game.width, game.height)

    context.drawImg(batImg, bat.x, bat.y, bat.width, bat.height);

}
    */


