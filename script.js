const character = document.getElementById('character');
const game = document.getElementById('game');
let interval;
let both = 0;
let counter = 0;
let currentBlocks = [];

function moveLeft() {
  let left = parseInt(
    window.getComputedStyle(character).getPropertyValue('left')
  );
  if (left > 0) {
    character.style.left = left - 2 + 'px';
  }
}

function moveRight() {
  let left = parseInt(
    window.getComputedStyle(character).getPropertyValue('left')
  );
  if (left < 380) {
    character.style.left = left + 2 + 'px';
  }
}

document.addEventListener('keydown', (e) => {
  if (both == 0) {
    both++;
    if (e.key === 'ArrowLeft') {
      interval = setInterval(moveLeft, 1);
    }
    if (e.key === 'ArrowRight') {
      interval = setInterval(moveRight, 1);
    }
  }
});

document.addEventListener('keyup', (e) => {
  clearInterval(interval);
  both = 0;
});

let blocks = setInterval(function () {
  let blockLast = document.getElementById('block' + (counter - 1));
  let holeLast = document.getElementById('hole' + (counter - 1));
  let characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue('top')
  );
  let characterLeft = parseInt(
    window.getComputedStyle(character).getPropertyValue('left')
  );
  let drop = 0;
  let blockSpeed = 0.5;

  if (counter > 0) {
    var blockLastTop = parseInt(
      window.getComputedStyle(blockLast).getPropertyValue('top')
    );
    var holeLastTop = parseInt(
      window.getComputedStyle(holeLast).getPropertyValue('top')
    );
  }

  if (counter >= 0) {
    blockSpeed = 0.5;
  }
  if (counter >= 20) {
    blockSpeed = 0.75;
  }
  if (counter >= 35) {
    blockSpeed = 0.85;
  }
  if (counter >= 50) {
    blockSpeed = 0.9;
  }
  if (counter >= 100) {
    blockSpeed = 1;
  }

  console.log(blockSpeed);

  // Add more blocks
  if (blockLastTop < 400 || counter == 0) {
    const block = document.createElement('div');
    const hole = document.createElement('div');
    block.className = 'block';
    block.id = 'block' + counter;
    hole.className = 'hole';
    hole.id = 'hole' + counter;
    block.style.top = blockLastTop + 100 + 'px';
    hole.style.top = holeLastTop + 100 + 'px';
    let random = Math.floor(Math.random() * 360);
    hole.style.left = random + 'px';
    game.appendChild(block);
    game.appendChild(hole);
    currentBlocks.push(counter);
    counter++;
  }

  if (characterTop <= 0) {
    alert('Game over. Score: ' + (counter - 9));
    clearInterval(blocks);
    window.location = '/';
  }

  for (let i = 0; i < currentBlocks.length; i++) {
    let current = currentBlocks[i];
    let iblock = document.getElementById('block' + current);
    let ihole = document.getElementById('hole' + current);
    let iblockTop = parseFloat(
      window.getComputedStyle(iblock).getPropertyValue('top')
    );
    let iholeLeft = parseFloat(
      window.getComputedStyle(ihole).getPropertyValue('left')
    );
    iblock.style.top = iblockTop - blockSpeed + 'px';
    ihole.style.top = iblockTop - blockSpeed + 'px';

    // Remove blocks when they leave the game window
    if (iblockTop < -20) {
      currentBlocks.shift();
      iblock.remove();
      ihole.remove();
    }
    if (iblockTop - 20 < characterTop && iblockTop > characterTop) {
      drop++;
      if (iholeLeft <= characterLeft && iholeLeft + 20 > characterLeft) {
        drop = 0;
      }
    }
  }

  // Block collision
  if (drop == 0) {
    if (characterTop < 480) {
      character.style.top = characterTop + 2 + 'px';
    }
  } else {
    character.style.top = characterTop - 0.5 + 'px';
  }
}, 1);
