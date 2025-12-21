//game
let game;
let context;
let gameWidth = 900;
let gameHeight = 600;


//game started
let gameStarted = false;

//bat
let batWidth = 70;
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
let gravity = 0.3;

//game over
let gameOver = false;

//score
let score = 0;

//skins
let chosenSkinPath = "./bat.png";

//audios
let bgMusic;
let musicOn = true;
let crashSound;
let crashPlayed = false;
let fallSound;
let fallPlayed = false;

let bat = {
    x: batX,
    y: batY,
    width: batWidth,
    height: batHeight
};



window.onload = function(){
    document.getElementById("startBtn").addEventListener("click", startGame);
    document.getElementById("musicBtn").addEventListener("click", toggleMusic);

   let startBtn = document.getElementById("startBtn");
    let skinBtn = document.getElementById("skinMenuBtn");
    let modal = document.getElementById("skinModal");
    let closeBtn = document.getElementById("closeModal");

    startBtn.addEventListener("click" , startGame)

    skinBtn.onclick = function(){
    modal.style.display = "flex";
    menuContainer.style.display = "none";
}

    closeBtn.onclick = function() {
        modal.style.display = "none";
        menuContainer.style.display = "flex";
    }};

function selectSkin(path, element){
    chosenSkinPath = path;

    let cards = document.querySelectorAll(".skin-card")
    cards.forEach(card => card.classList.remove('active'));

    element.classList.add('active')};



function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
}
   

if (gameStarted) {
    velocityY += gravity;    
    bat.y = Math.max(bat.y + velocityY , 0);
}

context.clearRect(0, 0, gameWidth, gameHeight);
context.drawImage(batImg, bat.x, bat.y, bat.width, bat.height);


if (bat.y > game.height) {

     if (!fallPlayed) {
        fallSound.currentTime = 0;
        fallSound.play();
        fallPlayed = true;
    }
        gameOver = true;
}


    //pipes loop
//for (let i = 0; i < pipeArray.length; i++) {
   // let pipe = pipeArray[i];
   // pipe.x += velocityX;
    //context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height)
       
    
for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];

    pipe.x += velocityX;

    if (pipe.cursed) {
        context.save();

        context.fillStyle = "rgba(4, 41, 34, 0.5)";
        context.fillRect(pipe.x - 2, pipe.y - 2, pipe.width + 4, pipe.height + 4);

        context.shadowColor = "#226634ff";
        context.shadowBlur = 70;
    }

    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    if (pipe.cursed) context.restore();





    if (!pipe.passed && pipe.img == topPipeImg && pipe.x << pipe.width < bat.x){
        pipe.passed = true;
        score++;
        document.getElementById("score").innerText = "score: " + score;
        };


    if (detectCollision(bat, pipe)) {

        if(!crashPlayed && !fallPlayed){
        crashSound.currentTime = 0;
        crashSound.play();
        crashPlayed = true;
        };

    gameOver = true;
    let gameBoard = document.getElementById("game");
    gameBoard.classList.add("crash-shake");
    setTimeout(() => {
    gameBoard.classList.remove("crash-shake");
    }, 340);

    for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];

    pipe.x += velocityX;

    if (pipe.cursed) {
        context.shadowColor = "#ff0000";
        context.shadowBlur = 20;
    }

    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    context.shadowBlur = 0;
}

}};


if(gameOver) {

    if(bgMusic) {
        bgMusic.pause();bgMusic.currentTime = 0;
        };

    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    context.fillRect(0, 0, gameWidth, gameHeight);
    context.fillStyle = "#c72323ff";        
    context.font = "bold 70px Silkscreen";     
    context.textAlign = "center";
    context.textBaseline = "middle";
     context.shadowColor = "#fdf6f6ff";      
    context.shadowBlur = 20;
    context.fillText("GAME OVER", gameWidth / 2, gameHeight / 2);
    context.strokeStyle = "#26040bff";      
    context.strokeText("GAME OVER", gameWidth / 2, gameHeight / 2);
        return;

    }};



function startGame() {
gameOver = false;
crashPlayed = false;
fallPlayed = false;
score = 0;
pipeArray = [];


    document.getElementById("game-title").style.display = "none";

    document.getElementById("menuContainer").style.display = "none";
    game = document.getElementById("game");
    game.style.display = "block";

    document.getElementById("score").style.display = "block";

    document.getElementById("gifBackground").style.filter = "blur(12px)";

    context = game.getContext("2d");

if(!bgMusic){
    bgMusic = new Audio("./background-music.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.4;
    bgMusic.play();

    if(musicOn){
        bgMusic.play();
}

    crashSound = new Audio("./pipehit.mp3");
    crashSound.volume = 0.6;

    fallSound = new Audio("./batfall.mp3");
    fallSound.volume = 0.6;

   
    //loading bat image
    batImg = new Image();
    batImg.src = chosenSkinPath;


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
}};




 

//pipes function
function placePipes() { 
    
    if (gameOver) {
        return;
    }

    let gap = 150;  
      

    let minTopY = -pipeHeight + 80;
    let maxTopY = - 80; 

    let randomY = Math.random() * (maxTopY - minTopY) + minTopY;


    let isCursed = Math.random() < 0.15
    if (isCursed) {
    gap = 123;
    };

    let topPipe = {
    img: topPipeImg,
    x: pipeX,
    y: randomY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
    cursed: isCursed
    };


    let bottomPipe = {
        img: bottomPipeImg,
        x: gameWidth,
        y:  randomY + pipeHeight + gap,
        width: pipeWidth,
        height: pipeHeight,
        passed: false,
        cursed: isCursed
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

    let p = 8;

    return  a.x + p < b.x + b.width - p &&
    a.x + a.width - p > b.x + p &&
    a.y + p < b.y + b.height - p &&
    a.y + a.height - p > b.y + p;
};


function toggleMusic() {
    if (!bgMusic) return;

    if (musicOn){
        bgMusic.pause();
        document.getElementById("musicBtn").innerText = "🔇 MUSIC";
    }

    else{
         bgMusic.play();
        document.getElementById("musicBtn").innerText = "🔊 MUSIC";
    }

      musicOn = !musicOn;
}