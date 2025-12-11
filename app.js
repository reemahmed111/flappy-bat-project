//game
let game;
let context;
let gameWidth = 900;
let gameHeight = 600;

//bat
let batWidth = 65;
let batHeight = 65;
let batX = gameWidth/12;
let batY = gameHeight/2.25;
let batImg;

//pipes
let pipeArray = [];
let pipeWidth = 40;
let pipeHeight = 500;
let pipeX = gameWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;


//game physics
let velocityX = -1.75;
let velocityY = 0;
let gravity = 0.5;


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
    
    //loading pipes images
    topPipeImg = new Image();
    topPipeImg.src = "./topPipe.png"

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottomPipe.png"


        requestAnimationFrame(update);
     setInterval(placePipes, 1800);

     document.addEventListener("keydown", moveBat);
}


 function update() {
    requestAnimationFrame(update);

    velocityY += gravity;    
    bat.y += velocityY;

     context.clearRect(0, 0, gameWidth, gameHeight);
    context.drawImage(batImg, bat.x, bat.y, bat.width, bat.height);

    //pipes loop
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height)
        
    }};

     


//pipes function
function placePipes() { 
    
    let gap = 190;  
      

    let minTopY = -pipeHeight + 30;
    let maxTopY = - 20; 

    let randomY = Math.random() * (maxTopY - minTopY) + minTopY;


    let topPipe = {
    img: topPipeImg,
    x: pipeX,
    y: randomY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false
    };


    let bottomPipe = {
        img: bottomPipeImg,
        x: gameWidth,
        y:  randomY + pipeHeight + gap,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    };

    //adding it to array
    pipeArray.push(topPipe);
    pipeArray.push(bottomPipe);


}
    

function moveBat(e) {
    if (e.code == "space" || e.code == "ArrowUp" || e.code == "KeyX") {
        velocityY = -6;
    }
}