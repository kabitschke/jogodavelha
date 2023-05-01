//Initial Data
let square = {
  a1: '',
  a2: '',
  a3: '',
  b1: '',
  b2: '',
  b3: '',
  c1: '',
  c2: '',
  c3: '',
};
const winW = document.querySelector('.winW');
const winH = document.querySelector('.winH');
const winI = document.querySelector('.winI');
const playerX = document.querySelector('.playerX');
const playerO = document.querySelector('.playerO');
const countWinX = document.querySelector('.countWinX');
const countWinO = document.querySelector('.countWinO');

winH.style.display = 'none';
winW.style.display = 'none';
winI.style.display = 'none';
countWinO.style.display = 'none';
countWinX.style.display = 'none';
let player = '';
let warning = '';
let playing = false;
let countX = 0;
let countO = 0;

//EVENTS

document.querySelectorAll('.item').forEach((item) => {
  item.addEventListener('click', itemClick);
}); //percorre todos que tem a class item

playerO.addEventListener('click', changePlayerO);
playerX.addEventListener('click', changePlayerX);
//Functions

function itemClick({ target }) {
  //Pega onde foi clicado

  let item = target.getAttribute('data-item');
  if (playing && square[item] === '') {
    square[item] = player;
    renderSquare();
    togglePlayer();
  }
}

function changePlayerX() {
  player = playerX.getAttribute('value');
  reset();
}

function changePlayerO() {
  player = playerO.getAttribute('value');
  reset();
}

function reset() {
  warning = '';
  winH.style.display = 'none';
  winW.style.display = 'none';
  winI.style.display = 'none';
 

  // let random = Math.floor(Math.random() * 2);
  // player = random === 0 ? 'x' : 'o';

  for (let i in square) {
    square[i] = '';
  }
  playing = true;

  renderSquare();
  renderInfo();
}

function renderSquare() {
  for (let i in square) {
    let item = document.querySelector(`div[data-item=${i}]`);
    item.innerHTML = square[i];
  }
  checkGame();
}

function renderInfo() {
  if (playing === true) {
  document.querySelector('.vez').innerHTML = player;
  }else{
    document.querySelector('.vez').innerHTML = 'Fim';
    
  }
  document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() {
  //player = player === 'x' ? 'o' : 'x';
  if (playing === true) {
    if (player === 'x') {
      player = 'o';
      playerO.classList.add('active');
      playerX.classList.remove('active');
    } else {
      player = 'x';
      playerX.classList.add('active');
      playerO.classList.remove('active');
    }
  } else {
    playerO.classList.remove('active');
    playerX.classList.remove('active');
  }

  renderInfo();
}

function checkGame() {
  if (checkWinnerFor('x')) {
    countX++;
    countWinX.style.display ='block';
    countWinX.innerHTML = countX;
    warning = 'O "x" venceu';

    playing = false;
  } else if (checkWinnerFor('o')) {
    countO++;
    countWinO.style.display ='block';
    countWinO.innerHTML = countO;
    warning = 'O "o" venceu';

    playing = false;
  } else if (isFull()) {
    warning = 'Deu empate';

    playing = false;
  }
}

function checkWinnerFor(player) {
  let pos = [
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',

    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',

    'a1,b2,c3',
    'c1,b2,a3',
  ];

  for (let w in pos) {
    let pArray = pos[w].split(',');

    let hasWon = pArray.every((option) => {
      if (square[option] === player) {
      
        return true;
      } else {
        return false;
      }
    });

    if (hasWon) {
      switch (+w) {
        case 0:
          winW.style.display = 'flex';
          winW.style.marginTop = '50px';
          break;
        case 1:
          winW.style.display = 'flex';
          winW.style.marginTop = '150px';
          break;
        case 2:
          winW.style.display = 'flex';
          winW.style.marginTop = '250px';
          break;
        case 3:
          winH.style.display = 'flex';
          winH.style.marginLeft = '50px';
          break;
        case 4:
          winH.style.display = 'flex';
          winH.style.marginLeft = '150px';
          break;
        case 5:
          winH.style.display = 'flex';
          winH.style.marginLeft = '250px';
          break;
        case 6:
          winI.style.display = 'flex';
          winI.style.transform = 'rotate(45deg)';
          break;
        case 7:
          winI.style.display = 'flex';
          winI.style.transform = 'rotate(-45deg)';
      }

      return true;
    }
  }

  return false;
}

function isFull() {
  for (let i in square) {
    if (square[i] === '') {
      return false;
    }
  }

  return true;
}
