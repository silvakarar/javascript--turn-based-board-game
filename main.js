// Class for Game
class Game {
    constructor(currentPlayerOne, currentPlayerTwo) {
        this.currentPlayerOne = currentPlayerOne;
        this.currentPlayerTwo = currentPlayerTwo;
    }
}
// Instances for Game Class
const firstPlayerTurn = new Game('')
const secondPlayerTurn = new Game('')

  
// Class for Players
class Player {
    constructor(name, lifePoints, weapon, playerImageClass ) {
        this.name = name;
        this.lifePoints = lifePoints;
        this.weapon = weapon;
        this.playerImageClass = playerImageClass;
        this.defend = false;  

    }
  
    /* If ether player defends they sustain 50% less damage. 
    If players choose to attack they will lose 20 lifepoints*/
    reduceLifePoints(lifePoints) {
        if (this.defend) {
            this.lifePoints -= lifePoints / 2; // Defending
            
        } else {
            this.lifePoints -= lifePoints; // Attacking
        }
        if(this.lifePoints <= 0) {
            this.lifePoints = 0;
        } else {
            return false;
        }
    }  
}

// Class for weapons
class Weapon {
    constructor(weaponImageClass, weaponId) {
        this.weaponImageClass = weaponImageClass;
        this.weaponId = weaponId;
        this.currentTileId = '';
        this.damage = 20;
        
    }
    // Setter for weapon location
    setWeaponLocation(currentTileId) {
        this.currentTileId = currentTileId;
        console.log(currentTileId)
   }
}
//  Weapon class instances
const weapon1 = new Weapon('fire', 0, 10);
const weapon2 = new Weapon('wave', 1, 20);
const weapon3 = new Weapon('lightning', 2, 30);
const weapon4 = new Weapon('cyclone', 3, 15);
const playerOneStartingWeapon = new Weapon('fire', 4, 10);
const playerTwoStartingWeapon = new Weapon('fire', 5, 10);

// Player Class instances
const playerOne = new Player('Space Ninja', '100', playerOneStartingWeapon, 'playerOne');
const playerTwo = new Player('Planet invader Ninja', '100', playerTwoStartingWeapon, 'playerTwo');
let currentPlayer = playerOne;


// Weapon instances in an array
const weaponsOnTheBoardArray = [weapon1, weapon2, weapon3, weapon4];
const allWeaponsArray = [weapon1, weapon2, weapon3, weapon4, playerOneStartingWeapon,playerTwoStartingWeapon];


// Class for obstacles
class Obstacle {
    constructor(obstacleImageClass) {
        this.obstacleImageClass = obstacleImageClass;
    }
}
// Obstacle class instances
const obstacle1 = new Obstacle('tree');
const obstacle2 = new Obstacle('tornado');
const obstacle3 = new Obstacle('treeTwo');

