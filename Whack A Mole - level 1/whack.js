const gameContainer = document.getElementById("gameContainer")
let difficulty = document.getElementById("difficulty");
let score = document.getElementById("score")
let time = document.getElementById("time")

let scoreNumber,boardSize,difficultyLevel,preTime,moleTime,afterTime,newMoleTime,grassImage,beforeImage,moleImage,afterImage,randomChild;

function startWhack(){
  startParameters();
  createBoard();
  startGame();

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
    preTime= 0.15;
    moleTime=1;
    afterTime=0.2;
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
        widthSquare= (100/boardSize);
        square.style.width= `${widthSquare}%`;
        square.style.height= `${widthSquare}%`;

        square.classList.addClas= `item`;
        gameContainer.appendChild(square)
    }
  }

}
// creating board end

// start Game 
async function startGame(){
  await waitXmSecond(1000);
  createMole();

}
// start Game end

// create Mole 
async function createMole(){
  randomPicker();
  gameContainer.children[randomChild].classList.add("mole");

  await waitXmSecond(2000);

  gameContainer.children[randomChild].classList.remove("mole");



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
