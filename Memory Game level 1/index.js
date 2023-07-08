const gameContainer = document.getElementById("gameContainer")

function start(){
  gameContainer.innerHTML=""
  const sizeIndex = document.getElementById("size");
  const size = sizeIndex.options[sizeIndex.selectedIndex].text;
  
  // we create enough numbers for the size
  let numList= randomPicker(size/2)
  // to dublicate the array 
  numList = numList.concat(numList);
  // we need to shuffle our array 
  numList = shuffleArrayOne(numList);
  numList = shuffleArrayTwo(numList);
  // we create our new board based on our numlist 
  console.log(numList);
  createBoard(numList);

  let backSideDivs = document.getElementsByClassName("backSide");
  for (var i = 0; i < backSideDivs.length; i++) {
    backSideDivs[i].addEventListener("click", cardClicked);
  }
}

function cardClicked(){
  turn(this)
  let tryings = document.getElementsByClassName("trying");

  if(tryings.length==2){
    console.log("its two now")
    waitHalfSecond().then(() => {
      compare(tryings[0],tryings[1])
    });
  }else{
    console.log("not yet")
  }
}
function compare(first, second){
  console.log("trying now")

  if(first.id===second.id){
    first.classList.toggle("trying")
    second.classList.toggle("trying")
    first.classList.add("disabled")
    second.classList.add("disabled")

  }else{
    first.classList.toggle("trying")
    second.classList.toggle("trying")
    first.classList.toggle("backSide")
    second.classList.toggle("backSide")
  }
}
function turn(x){
  x.classList.toggle("backSide")
  x.classList.toggle("trying")

}

function waitHalfSecond() {
  return new Promise(resolve => {
    setTimeout(resolve, 500);
  });
}

function createBoard(numList) {
  for (let i = 0; i < (numList.length); i++) {
   
    let card = document.createElement('div') 
    let x= numList[i];
    let selectedCard = cardArray.find(function(card) {
      return card.id === x;
    });
    console.log(numList[x])
    card.style.backgroundImage = `url(${selectedCard.img})`;
    card.setAttribute('id', cardArray[x].id)

    card.classList.toggle("backSide")
    gameContainer.appendChild(card)
  }
}

// shuffle 
// shuffle 1 
function shuffleArrayOne(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
// shuffle 1 end
// shuffle 2 
function shuffleArrayTwo(array) {
  var shuffledArray = array.slice(); 
  for (var i = shuffledArray.length - 1; i > 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i));
    var temp = shuffledArray[i];
    shuffledArray[i] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = temp;
  }
  return shuffledArray;
}
// shuffle 2 end
// shuffle end

// random numbers 
function randomPicker(randomSize){
  var numbers = [];
  while (numbers.length < randomSize) {
    let randomNumber = Math.floor((Math.random() * 20)+1);

    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  return numbers;
}
// random numbers end 
