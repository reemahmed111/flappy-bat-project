//game
let game;
let context;
let gameWidth = 900;
let gameHeight = 600;


//game started
let gameStarted = false;

//bat
let batWidth = 60;
let batHeight = 60;
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
let gravity = 0.3;

//game over
let gameOver = false;


let bat = {
    x: batX,
    y: batY,
    width: batWidth,
    height: batHeight
};



window.onload = function(){

    document.getElementById("startBtn").addEventListener("click", startGame);
};



 function update() {
    requestAnimationFrame(update);

    
    if (gameOver) {
        return;
    }

    if (gameStarted) {
    velocityY += gravity;    
    bat.y = Math.max(bat.y + velocityY , 0);
    };


     context.clearRect(0, 0, gameWidth, gameHeight);
    context.drawImage(batImg, bat.x, bat.y, bat.width, bat.height);


    if (bat.y > game.height) {
        gameOver = true;
    }


    //pipes loop
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height)
        
        if (detectCollision(bat, pipe)) {
            gameOver = true;
        }
    }
    if(gameOver) {
        context.fillStyle = "red";
        context.font = "60px Silkscreen, sans-serif";
        context.textAlign = "center";
        context.fillText("GAME OVER", gameWidth / 2, gameHeight / 2);
        return;
    }};





function startGame() {

    document.getElementById("startBtn").style.display = "none";
    game = document.getElementById("game");
    game.style.display = "block";

    document.getElementById("score").style.display = "block";

    //blurring the background
    document.getElementById("gifBackground").style.filter = "blur(12px)";

    context = game.getContext("2d");

   
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
     setInterval(placePipes, 2200);

     document.addEventListener("keydown", moveBat);
};




 

//pipes function
function placePipes() { 
    
    if (gameOver) {
        return;
    }

    let gap = 180;  
      

    let minTopY = -pipeHeight + 80;
    let maxTopY = - 80; 

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
};
 


function moveBat(e) {
    if (e.code == "space" || e.code == "ArrowUp" || e.code == "KeyX") {
        if (!gameStarted){
            gameStarted = true;
        }
        velocityY = -6;
    }};



//bat and pipes collision
function detectCollision(a, b) {
return  a.x < b.x + b.width &&
a.x + a.width > b.x &&
a.y < b.y + b.height &&
a.y + a.height > b.y;
};