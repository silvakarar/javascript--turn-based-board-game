/* Function to restrict movement horizontally and vertically 
one to three boxes */
function loopDirections(
  loopStartValue,
  loopLessThanValue,
  incrementalValue,
  tempNum,
  isPositive
) {
  let multiplier = isPositive ? 1 : -1;
  
  for (let i = loopStartValue; i < loopLessThanValue; i += incrementalValue) {

    let direction = tempNum + i * multiplier;
    let directionTileId = 'cID' + direction;
    const directionTileEl = document.getElementById(directionTileId);
    if (directionTileEl) {
      if (false === directionTileEl.classList.contains('obstacleClass')) {
        directionTileEl.classList.add('highlightTile');
      } else {
        break;
      }
    }
  }
}
// Function to highlight boxes for players.
function highlightTileForPlayer() {
  const playerPos = document.getElementsByClassName(
    currentPlayer.playerImageClass
  )[0];
  const tileOriPosId = playerPos.id;
  // Using slice() to get number out of the ID
  let tempNum = tileOriPosId.slice(3);
  // Using parseInt() to turn the string into a number
  tempNum = parseInt(tempNum, 10);
  loopDirections(1, 4, 1, tempNum, true);
  loopDirections(1, 4, 1, tempNum, false);
  loopDirections(10, 31, 10, tempNum, false);
  loopDirections(10, 31, 10, tempNum, true);
}
highlightTileForPlayer();

//Event delegation for player movement
document.querySelector('BODY').addEventListener('click', (e) => {
  e.preventDefault();
  //Player one moves two clicks to a new tile
  if (e.target.matches('.tile')) {
    // Nested if statement
    if (e.target.matches('.highlightTile')) {
      //Player one gets removed from previous tile
      document
        .querySelector('.' + currentPlayer.playerImageClass)
        .classList.remove(currentPlayer.playerImageClass);
      e.target.classList.add(currentPlayer.playerImageClass);

      // Remove highlights after the current player moves
      let removeHighlights = document.querySelectorAll('.highlightTile');
      for (let i = 0; i < removeHighlights.length; i++) {
        removeHighlights[i].classList.remove('highlightTile');
      }

      // Loop through the weapons array
      if (e.target.classList.contains('weaponClass')) {
        for (let i = 0; i < weaponsOnTheBoardArray.length; i++) {
          if (e.target.id === weaponsOnTheBoardArray[i].currentTileId) {
            // Drop current weapon
            let weaponsOnTheBoardId = weaponsOnTheBoardArray[i].weaponId;
            // Pick up new weapon
            e.target.classList.remove(
              allWeaponsArray[weaponsOnTheBoardId].weaponImageClass
            );
            e.target.classList.add(currentPlayer.weapon.weaponImageClass);
            // Weapons array
            weaponsOnTheBoardArray[i] = currentPlayer.weapon;
            // All weapons array
            weaponsOnTheBoardArray[i].currentTileId = allWeaponsArray[weaponsOnTheBoardId].currentTileId;


            currentPlayer.weapon = allWeaponsArray[weaponsOnTheBoardId];
            // Update weapon image in the each of the players boxes.
            const playerOneWeaponUI = document.getElementById('playerOneWeaponUI');
            const playerTwoWeaponUI = document.getElementById('playerTwoWeaponUI');
            const weaponClass = document.getElementsByClassName('weaponClass');

            // Remove default weapon in the UI(fire)
            if (currentPlayer.playerImageClass === playerOne.playerImageClass) {
              playerOneWeaponUI.classList = '';
              playerOneWeaponUI.style.backgroundColor = '#212e3d';
              playerOneWeaponUI.classList.add('weaponClass');
              playerOneWeaponUI.classList.add(currentPlayer.weapon.weaponImageClass);
            } else {
              playerTwoWeaponUI.classList = '';
              playerTwoWeaponUI.style.backgroundColor = '#212e3d';
              playerTwoWeaponUI.classList.add('weaponClass');
              playerTwoWeaponUI.classList.add(currentPlayer.weapon.weaponImageClass);
            }
            break;
          }
        }
      }
      // Toggle between players
      if (currentPlayer.playerImageClass === playerOne.playerImageClass) {
        currentPlayer = playerTwo;
      } else {
        currentPlayer = playerOne;
      }
      // Start fight sequence
      const playerPos2 = document.getElementsByClassName(
        playerTwo.playerImageClass
      )[0];
      const playerPos1 = document.getElementsByClassName(
        playerOne.playerImageClass
      )[0];
      const tileOriPosId1 = playerPos1.id; //45
      const tileOriPosId2 = playerPos2.id; // 46

      // Using slice() to get number out of the ID(cId10)
      let tempNum1 = tileOriPosId1.slice(3);
      let tempNum2 = tileOriPosId2.slice(3);

      // Using parseInt() to turn the string into a number
      tempNum1 = parseInt(tempNum1, 10);
      tempNum2 = parseInt(tempNum2, 10);

      // Directions for tiles left,right, up, down of players position
      const right = tempNum1 + 1; // 46
      const left = tempNum1 - 1; // 44
      const up = tempNum1 - 10; //35
      const down = tempNum1 + 10; //55

      if (
        tempNum2 === right ||
        tempNum2 === left ||
        tempNum2 === up ||
        tempNum2 === down
      ) {
        // Open Modal pop-up
        openModal();
      } else {
        highlightTileForPlayer();
      }
    }
  }

});

//Get modal element
let modal = document.querySelector('.modal');
//Get modal content element
let modalContent = document.querySelector('.modal-content');
//Get simple modal element
let simpleModal = document.getElementById('simpleModal');
// Get elements from the DOM
let modalDiv = document.querySelector('.modal-div');
let modalRight = document.querySelector('.modal-right');
let modalLeft = document.querySelector('.modal-left');

// Function to open modal
function openModal() {
  simpleModal.style.display = 'block';
  createNewModalDiv();
}

// Function to create new modal
function createNewModalDiv() {
  // Add new modal Div and content inside it.
  modalContent.classList.add('modal-div');
  modal.style.transform = 'scale(1.6)';
  $('.modal-content').css('padding', '0');
  // Empty previous elements to make space for new elements
  $('.modal-content').empty()

  setTimeout(() => {
    // Create Modal Div
    const createModalDiv = document.createElement('div');
    // Add CSS classes to div
    createModalDiv.classList.add('modal-div', 'row');
    // Append new div to modalContent
    modalContent.appendChild(createModalDiv);


    /* Everything for modal left. PlayerOne's modal. Left side.
     Creae divs for playerOne left modal.*/
    const modalLeft = document.createElement('div');
    const buttonDivLeft = document.createElement('div');
    // Create headings for Player one modal.
    const player1Heading = document.createElement('h4');
    const headingLeft = document.createElement('h5');
    // Create buttons for Player one modal
    const attackBtnLeft = document.createElement('button');
    const defendBtnLeft = document.createElement('button');
    // Modal left class name
    modalLeft.classList.add('modal-left');
    modalLeft.className = 'col col-md-6  modal-left'
    // Player One heading class modal left.
    player1Heading.className = 'playerOneHeading';
    headingLeft.className = 'headingLeft';
    // PlayerOne Heading's innerText
    headingLeft.innerText = 'Attack or Defend';
    player1Heading.innerText = 'Player One';
    // Buttons innerText
    attackBtnLeft.innerText = 'Attack';
    defendBtnLeft.innerText = 'Defend';
    // Button classes for modal left playerOne
    buttonDivLeft.className = 'buttonDivLeft';
    attackBtnLeft.className = 'attackBtnLeft';
    defendBtnLeft.className = 'defendBtnLeft';
    // Append everything to the left side PlayerOne's modal.
    createModalDiv.appendChild(modalLeft);
    modalLeft.appendChild(player1Heading);
    modalLeft.appendChild(headingLeft);
    modalLeft.appendChild(buttonDivLeft);
    buttonDivLeft.appendChild(attackBtnLeft);
    buttonDivLeft.appendChild(defendBtnLeft);
    // Background colors for playerOne modal and buttons for the start of the fight.
    modalLeft.style.backgroundColor = '#212e3d';
    attackBtnLeft.style.backgroundColor = '#222831';
    defendBtnLeft.style.backgroundColor = '#222831';


    /* Everything for playerTwo. PlayerTwo modal. Right side.
     Create divs and headings for playerTwo. */
    const modalRight = document.createElement('div');
    const buttonDivRight = document.createElement('div');
    const player2Heading = document.createElement('h4');
    const headingRight = document.createElement('h5');
    // Create buttons.
    const attackBtnRight = document.createElement('button');
    const defendBtnRight = document.createElement('button');
    // Inner text for playerTwo.
    headingRight.innerText = 'Attack or Defend';
    player2Heading.innerText = 'Player Two';
    attackBtnRight.innerText = 'Attack';
    defendBtnRight.innerText = 'Defend';
    // Add classes for playerTwo modal content.
    player2Heading.className = 'playerTwoHeading';
    modalRight.classList.add('modal-right');
    modalRight.className = 'col col-md-6 modal-right'
    defendBtnRight.className = 'defendBtnRight';
    attackBtnRight.className = 'attackBtnRight';
    // Button Div class for playerTwo
    buttonDivRight.className = 'buttonDivRight'
    // Heading class for playerTwo
    headingRight.className = 'headingRight';
    // Append everything to the right side PlayerTwo's modal.
    createModalDiv.appendChild(modalRight);
    modalRight.appendChild(player2Heading);
    modalRight.appendChild(headingRight);
    // Button Div to the right and left modal.
    modalRight.appendChild(buttonDivRight);
    // Attack and Defend button divs.
    buttonDivRight.appendChild(attackBtnRight);
    buttonDivRight.appendChild(defendBtnRight);
    // Modal right playerTwo BTN colors at the start of the fight.
    modalRight.style.backgroundColor = '#fff'
    // Button background colors before taking turns.
    attackBtnRight.style.backgroundColor = '#43658b';
    // Font color
    attackBtnRight.style.color = '#fff';
    defendBtnRight.style.backgroundColor = '#41584b';
    // Font color
    defendBtnRight.style.color = '#fff';



    // Disabling the opposite players buttons for the start of the game.
    if (currentPlayer.playerImageClass === playerOne.playerImageClass) {
      attackBtnRight.disabled = false; 
      defendBtnRight.disabled = false;
    } else {
      attackBtnLeft.disabled = true; 
      defendBtnLeft.disabled = true;
    }
    // Event listener on attack button right for playerTwo.
    attackBtnRight.addEventListener('click', () => {
      if (false === attackBtnRight.disabled) {
        playerTwo.defend = false;
        toggleDisabledToEnabled(attackBtnRight, defendBtnRight, attackBtnLeft, defendBtnLeft)
        // Reduce life points. 
        playerOne.reduceLifePoints(playerTwo.weapon.damage);
        const playerOneLifePoints = document.getElementById('points1');
        playerOneLifePoints.innerText = playerOne.lifePoints;
        if (playerOne.lifePoints <= 0 || playerTwo.lifePoints <= 0) {
          checkForGameOver()
        }
        attackAndDefendToggleBtn()
      }
    })
    // Defend and Attack
    defendBtnRight.addEventListener('click', () => {
        if (false === defendBtnRight.disabled) {
          playerTwo.defend = true; 
          toggleDisabledToEnabled(attackBtnRight, defendBtnRight, attackBtnLeft, defendBtnLeft)
          attackAndDefendToggleBtn()
        }
      }) /
      // Event listener on attack button left for playerOne
      attackBtnLeft.addEventListener('click', () => {
        if (false === attackBtnLeft.disabled) {
          playerOne.defend = false;
          toggleDisabledToEnabled(attackBtnLeft, defendBtnLeft, attackBtnRight, defendBtnRight)
          // Life points 
          playerTwo.reduceLifePoints(playerOne.weapon.damage);
          const playerTwoLifePoints = document.getElementById('points2');
          playerTwoLifePoints.innerText = playerTwo.lifePoints;
          if (playerOne.lifePoints <= 0 || playerTwo.lifePoints <= 0) {
            checkForGameOver()
          }
          attackAndDefendToggleBtn()
        }
      })

    defendBtnLeft.addEventListener('click', () => {
      console.log(defendBtnLeft.disabled)
      if (false === defendBtnLeft.disabled) {
        playerOne.defend = true;
        toggleDisabledToEnabled(attackBtnLeft, defendBtnLeft, attackBtnRight, defendBtnRight)
        attackAndDefendToggleBtn()
      }
    })
  }, 500);
}

function toggleDisabledToEnabled(attackBtnToDisable, defendBtnToDisable, attackBtnToEnable, defendBtnToEnable) {
  attackBtnToDisable.style.outline = 'none';
  attackBtnToDisable.style.border = 'none';
  defendBtnToDisable.style.outline = 'none';
  defendBtnToDisable.style.border = 'none';
  // darken colors for attack btn playerOne
  defendBtnToDisable.style.backgroundColor = '#222831';
  attackBtnToDisable.style.backgroundColor = '#222831';
  attackBtnToDisable.style.color = 'black';
  defendBtnToDisable.style.color = 'black';
  // btn colors with click event effecting player Two btn's
  defendBtnToEnable.style.backgroundColor = '#41584b';
  defendBtnToEnable.style.color = '#fff';
  attackBtnToEnable.style.backgroundColor = '#43658b';
  attackBtnToEnable.style.color = '#fff';

}
// Disabled buttons
function attackAndDefendToggleBtn() {
  const attackBtnLeft = document.getElementsByClassName('attackBtnLeft')[0];
  const attackBtnRight = document.getElementsByClassName('attackBtnRight')[0];
  const defendBtnRight = document.getElementsByClassName('defendBtnRight')[0];
  const defendBtnLeft = document.getElementsByClassName('defendBtnLeft')[0];
  if (attackBtnLeft) {
    attackBtnLeft.disabled = !(attackBtnLeft.disabled);
    attackBtnRight.disabled = !(attackBtnRight.disabled);
    defendBtnRight.disabled = !(defendBtnRight.disabled);
    defendBtnLeft.disabled = !(defendBtnLeft.disabled);
  }
}


// Function to check if game is over
function checkForGameOver() {
  // Clear modal
  $('.modal-content').empty()
  // Scale modal bigger
  modal.style.transform = 'scale(1.1)';
  setTimeout(() => {
    // Player One elments
    const playerOneLifePoints = document.getElementById('points1');
    playerOneLifePoints.innerText = playerOne.lifePoints;
    // player two elements
    const playerTwoLifePoints = document.getElementById('points2');
    playerTwoLifePoints.innerText = playerTwo.lifePoints;
    // Create message elements
    const gameOverMessageDiv = document.createElement('div');
    const gameOverMessageText = document.createElement('h3');
    // Set inner text of message
    gameOverMessageText.innerText = 'Game over!';
    // Add classlist
    gameOverMessageDiv.classList.add('gameOverMessageDiv');
    gameOverMessageText.classList.add('gameOverMessageText');
    // Append message
    modalContent.appendChild(gameOverMessageDiv);
    gameOverMessageDiv.appendChild(gameOverMessageText);
  }, 500);
  setTimeout(() => {
    wantToPlayAgain()
  }, 3000);
}



function wantToPlayAgain() {
  // Clear the modal
  $('.modal-content').empty()
  // Scale modal bigger
  modal.style.transform = 'scale(1.1)';
  // Create play again div, message and button. 
  const playAgainDiv = document.createElement('div');
  const playAgainDivMessage = document.createElement('h3');
  const playAgainDivBtn = document.createElement('button');
  // Add classes
  playAgainDiv.classList.add('playAgainDiv');
  playAgainDivMessage.classList.add('playAgainDivMessage');
  playAgainDivBtn.classList.add('playAgainDivBtn');
  // Add content to message and btn
  playAgainDivMessage.innerText = 'Want to play again?';
  playAgainDivBtn.innerText = `Let's play!`;
  // Append message and button to Div
  modalContent.appendChild(playAgainDiv)
  playAgainDiv.appendChild(playAgainDivMessage);
  playAgainDiv.appendChild(playAgainDivBtn);
  // Add event listener to button
  playAgainDivBtn.addEventListener('click', () => {
    location.reload();
  });

};