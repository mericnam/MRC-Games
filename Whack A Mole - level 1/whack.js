const gameContainer = document.getElementById("gameContainer")
let difficulty = document.getElementById("difficulty");
let score = document.getElementById("score")
let time = document.getElementById("time")
let body = document.body

let scoreNumber,boardSize,difficultyLevel,preTime,moleTime,afterTime,newMoleTime,grassImage,beforeImage,moleImage,afterImage,randomChild,lasthit;



function startWhack(){

  startParameters();
  createBoard();
  startGame();

  gameContainer.addEventListener("mouseenter", () => {
    gameContainer.style.cursor = "url('./img/stick.png'), auto";
  });
  gameContainer.addEventListener("mouseleave", () => {
    gameContainer.style.cursor = "pointer";
  });
  gameContainer.addEventListener("mousedown", () => {
    gameContainer.style.cursor = "url('./img/stickMove.png'), auto";
  });
  gameContainer.addEventListener("mouseup", () => {
    gameContainer.style.cursor = "url('./img/stick.png'), auto";
  });

}

// setting parameters for starting 
function startParameters(){
  gameContainer.innerHTML=""
  scoreNumber=0;
  score.innerHTML= scoreNumber;
  timeNumber=60;
  time.innerHTML= timeNumber;
  difficultyLevel = difficulty.options[difficulty.selectedIndex].text;

  if(difficultyLevel == "easy"){
    boardSize =3
    preTime= 0.5;
    moleTime=1.5;
    afterTime=0.5;
    newMoleTime=1;
  }else if(difficultyLevel == "normal"){
    boardSize =6
    preTime= 0.15;
    moleTime=0.5;
    afterTime=0.2;
    newMoleTime=1;
  }else if(difficultyLevel == "hard"){
    boardSize =9
    preTime= 0.15;
    moleTime=0.3;
    afterTime=0.15;
    newMoleTime=1;
  }

  grassImage="./img/grass.png";
  beforeImage="./img/before.png";
  moleImage="./img/mole.png";
  afterImage="./img/after.png";

}
// setting parameters for starting end

// creating board 
function createBoard(){
  for(let i=0;i<boardSize;i++){
    for(let y=0;y<boardSize;y++){
        let square = document.createElement("div")
        square.style.backgroundImage= `url('${grassImage}')`;
        widthSquare= 100/boardSize;
        square.style.width= `${widthSquare}%`;
        square.style.height= `${widthSquare}%`;

        square.classList.add("item"); 
        square.addEventListener("click", moleCheck); 
        gameContainer.appendChild(square)
    }
  }

}
// creating board end

// start Game 
async function startGame(){
  
  gameContainer.classList.remove("disabledGame");  

  while(true){

    if(!hasMoleOrAfterMole()){
      createMole();
    }
    
    await waitXmSecond(1000);
    time.innerHTML--;
    // await waitXmSecond(1000 * (preTime+moleTime+afterTime));

    if(time.innerHTML==0){
      finishGame()
      console.log("return")
      return
    }
    console.log("oyun devam ediyor")
  }
}
// start Game end

// has mole or after mole control
function hasMoleOrAfterMole() {
  for (let i = 0; i < gameContainer.children.length; i++) {
    let child = gameContainer.children[i];
    if (child.classList.contains("mole") || child.classList.contains("afterMole")) {
      return true;
    }
  }
  return false;
}
// has mole or after mole control end

// finish Game 
function finishGame(){
    gameContainer.classList.add("disabledGame");  
}
// finish Game end

// create Mole 
async function createMole(){
  let randomPickedOne, randomPickedTwo;

  randomPicker();
  randomPickedOne=randomChild;
  gameContainer.children[randomPickedOne].classList.add("beforeMole");

  randomPicker();
  randomPickedTwo=randomChild;
  gameContainer.children[randomPickedTwo].classList.add("beforeMole");

  await waitXmSecond(1000*preTime);
  gameContainer.children[randomPickedOne].classList.remove("beforeMole");
  gameContainer.children[randomPickedTwo].classList.remove("beforeMole");

  
  gameContainer.children[randomPickedOne].classList.add("mole");
  await waitXmSecond(1000*moleTime);
  gameContainer.children[randomPickedOne].classList.remove("mole");
  

  if(!lasthit){
    gameContainer.children[randomPickedOne].classList.add("afterMole");
    await waitXmSecond(1000*afterTime);
    gameContainer.children[randomPickedOne].classList.remove("afterMole");
  }
  

}
// create Mole end

// waiting function 
async function waitXmSecond(second) {
  return new Promise(resolve => {
    setTimeout(resolve, second);
  });
}
// waiting function end 

// random generator
function randomPicker(randomSize){
  randomChild = Math.floor(Math.random() * (boardSize * boardSize));
  console.log(randomChild)
}
// random generator end 

// clicked mole Check
function moleCheck(){

  
  if(((this.classList.contains("mole"))) || ((this.classList.contains("afterMole"))) ){
    console.log("başardın")
    goodHit()
    this.classList.remove("mole")
    this.classList.remove("afterMole")

  }else{
    console.log("Hatalı!")
    this.classList.remove("beforeMole")
    badHit()
  }
}
// good and bad hits 
function goodHit(){
  scoreNumber +=10;
  score.innerHTML= scoreNumber;
  lasthit=true;

}
function badHit(){
  scoreNumber -=5;
  score.innerHTML= scoreNumber;
  lasthit=false;
}
// good and bad hits end

