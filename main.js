let sequence = [];
let humanSequence = [];
let level = 0;
let vis=[];
count=0;
temp = new Array(16).fill(0);
seqflag = new Array(16).fill(0);
const startButton = document.querySelector('.js-start');
const info = document.querySelector('.js-info');
const heading = document.querySelector('.js-heading');
const tileContainer = document.querySelector('.js-container');
function resetGame(text) {
  seqflag = new Array(16).fill(0);
   
  alert(text);
  sequence = [];
  humanSequence = [];
  level = 0;
  startButton.classList.remove('hidden');
 info.classList.add('hidden');
  tileContainer.classList.add('unclickable');
}

function humanTurn(level) {

temp = new Array(16).fill(0);
  console.log("ujjawal's turn");
  tileContainer.classList.remove('unclickable');
info.textContent = `Your turn: ${level} Tap${level > 1 ? 's' : ''}`;
}

function activateTile(color) {
  // computer's part
  console.log("Tiles activating");
  const tile = document.querySelector(`[data-tile='${color}']`);
  
  tile.classList.add('activated');

  setTimeout(() => {
    tile.classList.remove('activated');
  }, 200);
}

function playRound(nextSequence) {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, (index + 1) * 300);
  });
}
// k=16;
function nextStep() {
 ujjawal=true;
  console.log("Returning random\nLevel ",level,"Starting...");
  
  const tiles = ['row1', 'row2', 'row3', 'row4', 'row5', 'row6', 'row7', 'row8', 'row9', 'row10', 'row11', 'row12', 'row13', 'row14', 'row15', 'row16'];
  while(ujjawal){
  
  b1=Math.floor(Math.random() * tiles.length);
if(seqflag[b1]==0)
  {seqflag[b1]=1;break;
  }


}
    
  console.log(tiles[b1]);
  return tiles[b1];
}
function nextRound() {
  
  if(level==16){
  console.log("You Win!");
  temp = new Array(16).fill(0);}
 
 
  level += 1;

  tileContainer.classList.add('unclickable');
 info.textContent = "Bot's Turn";
  heading.textContent = `Level ${level} of 16`;


  const nextSequence = [...sequence];
  nextSequence.push(nextStep());
  playRound(nextSequence);

  sequence = [...nextSequence];
  setTimeout(() => {
    humanTurn(level);
  }, level * 600 + 500);
}
// in this function we have to fix random clicks
var flag=false;// flag=1 for false
const vis2 = ['row1', 'row2', 'row3', 'row4', 'row5', 'row6', 'row7', 'row8', 'row9', 'row10', 'row11', 'row12', 'row13', 'row14', 'row15', 'row16'];
function handleClick(tile) {
  flag=true;
  console.log("inside handleclick")
  
  const index = humanSequence.push(tile) - 1;
 
  a1=vis2.indexOf(tile);

  if(temp[a1]==1)
  flag=false;
  else
  temp[a1]=1;
  
 count++;

     if(seqflag[a1]!=temp[a1])
      flag=0;
    


  const remainingTaps = sequence.length - humanSequence.length;

  if (!flag) {
  count--;
    resetGame(`Oops! Game over, you pressed the wrong tile/repeated tile and  ::     NO. OF LEVEL U PASEED: ${level-1} & YOUR SCORE IS: ${(level-1)*100}`);
    heading.textContent=`PIANO TILES GAME`;
    console.log('Your Score is' ,count);
    console.log('ujjawal has pressed incorrect tile/ repeated tile henceGame over!');
    return;
  }

  if (humanSequence.length === sequence.length) {
    if (humanSequence.length == 16) {
      resetGame('Congrats! You completed all level sucessesfully');
      return;
    }

    humanSequence = [];
   info.textContent = 'Success! Keep going!';
    setTimeout(() => {
      nextRound();
    }, 500);
    return;
  }

  info.textContent = `Your turn: ${remainingTaps} Tap${
    remainingTaps > 1 ? 's' : ''
  }`;
  
  
  
  
}

function startGame() {
  console.log("Game started");
  startButton.classList.add('hidden');
 info.classList.remove('hidden');
 info.textContent = "Bot's Turn";
  nextRound();
}

startButton.addEventListener('click', startGame);
tileContainer.addEventListener('click', event => {
  const { tile } = event.target.dataset;

  if (tile) handleClick(tile);
});