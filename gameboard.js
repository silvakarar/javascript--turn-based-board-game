// Function to stop window refreshing on scroll!
window.onunload = function () { window.scrollTo(0, 0); }

// Function to set start screen for Game.
function setStartingScreen() {
  $('#start').on('click', () => {
    $('#beginningScreen').hide();
    event.preventDefault();
  })
 
};
setStartingScreen();

const tileID = [];
// Generate a grid for the gameboard.
function createGrid(x, y) {
  let tileId = x * y;
  for (let i = 0; i < tileId; i++) {
    let xyLocation = 'cID' + i;
    const newGameBoard = document.getElementById('gameboard');
    const newDiv = document.createElement('div');
    newDiv.setAttribute('id', xyLocation);
    newDiv.setAttribute('class', 'tile');
    newDiv.classList.add('empty');
    newGameBoard.appendChild(newDiv);    
  }
  // JQUERY.
  $(".tile").addClass(" p-3 m-1 tile");  
};

createGrid(9, 10);

// Function to create default  weapon images to player boxes.
function defaultWeaponImg() {
  // Player One default weapon Image
  const playerOneWeaponUI = document.getElementById('playerOneWeaponUI');
  playerOneWeaponUI.classList.add('defaultWeapon'); 
   // Player Two default weapon Image
  const playerTwoWeaponUI = document.getElementById('playerTwoWeaponUI');
  playerTwoWeaponUI.classList.add('defaultWeapon');
}
defaultWeaponImg() 

// Function for player to not be next to each other at the start of the game.
function isPositionAdjacentToPlayerOne(randomId) {
       // Using slice() to get number out of the ID(cId10).
       let tempNum1 = randomIdPlayerOne.slice(3);
       let tempNum2 = randomId.slice(3);
       // Using parseInt() to turn the string into a number.
       tempNum1 = parseInt(tempNum1, 10);
       tempNum2 = parseInt(tempNum2, 10);
       // Direction for tiles left, right, up, and down of players position
       const right = tempNum1 + 1;  // On tile 46
       const left = tempNum1 - 1;   // On tile 44
       const up = tempNum1 - 10;   // On tile 35
       const down = tempNum1 + 10; // On tile 55
       if (
         tempNum2 === right ||
         tempNum2 === left ||
         tempNum2 === up ||
         tempNum2 === down         
       ) {
         return true;         
       } else {
         return false;
       }
  
}


// Function to add players, obstacles, and weapons to random empty tiles
function addImageToRandomTile(imageClass, checkIfNextToPlayerOne) {
  // String manipulation
  let randomId = 'cID' + random(79);
  while (false === document.getElementById(randomId).classList.contains('empty')
    // Parenthesis to check the argument first and if they are next to each.
    || (checkIfNextToPlayerOne === true
    && isPositionAdjacentToPlayerOne(randomId) === true)) {
    randomId = 'cID' + random(79);    
  }
  document.getElementById(randomId).classList.add(imageClass);
  document.getElementById(randomId).classList.remove("empty"); 
  return document.getElementById(randomId);   
}
addImageToRandomTile(playerOne.playerImageClass, false); 
// Variable for playerOne random position
let randomIdPlayerOne = document.getElementsByClassName(playerOne.playerImageClass)[0].id;
addImageToRandomTile(playerTwo.playerImageClass, true);

/* Function to add and loop over multiple images for the Gameboard.
 Categories: 'weaponsClass' or 'obstacleClass' */
function addMultipleImages(imageClass, category, numOfImages) {
  let randTileEl = 0;
 for (let i = 0;  i < numOfImages; i++) {
   randTileEl = addImageToRandomTile(imageClass);
   randTileEl.classList.add(category);  
 }
 
};
function placeWeapon(weaponInstance) {
  let randTileEl = addImageToRandomTile(weaponInstance.weaponImageClass);
  randTileEl.classList.add('weaponClass');  
  weaponInstance.setWeaponLocation(randTileEl.id);   
};

// Placing obstacles on the gameboard
addMultipleImages(obstacle1.obstacleImageClass, 'obstacleClass', 4);
addMultipleImages(obstacle2.obstacleImageClass, 'obstacleClass', 4);
addMultipleImages(obstacle3.obstacleImageClass, 'obstacleClass', 4);
// Placing weapons on the gameboard
placeWeapon(weapon1);
placeWeapon(weapon2);
placeWeapon(weapon3);
placeWeapon(weapon4);


// Generate random tile using Math.random()
function random(number) {
  return Math.floor(Math.random() * number);
}

// Function to show weapon images with click event using JQUERY.
function changeTextToImage(weapons, weaponClass, weaponId) {
  setInterval(() => {
    $(weapons).on('click', () => {
      $(weaponClass).hide( "slow", "linear" );
      $(weaponId).show()
    }); 
  }, 500);
}
changeTextToImage('.cyclones','.weaponH1', '#firstWeapon')
changeTextToImage('.fires', '.weaponH2', '#secondWeapon' )
changeTextToImage('.waves', '.weaponH3', '#thirdWeapon' )
changeTextToImage('.lightnings', '.weaponH4', '#fourthWeapon')

// Function for text changing with hover effect using JQUERY.
function hoverText(weaponId, weaponClass) {
  let prevText = $(weaponId);
  $(weaponClass).hover(function () {
    prevText = $(this).text();
    $(this).text("Click me");
  }, function(){
      $(this).text(prevText);
  });
}
hoverText('#firstWeapon', '.weaponH1')
hoverText('#secondWeapon', '.weaponH2')
hoverText('#thirdWeapon','.weaponH3')
hoverText('#fourthWeapon', '.weaponH4')





