// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
	this.x =x;
	this.y = y;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	// this.speed = 150;
	
	 this.speed = Math.floor(Math.random() * 350 + 1);
    this.x += this.speed * dt; 
    if(this.x > 505) {
        this.x = Math.random() - 550;
    }
	
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
  
    this.x = 505/2  - 50;
    this.y = 380;
	 this.sprite = 'images/char-boy.png';
    
};


Player.prototype.update = function(dt) {
    this.x = this.x;
    this.y = this.y;
  this.collisionCheck();

//check to see if player has reached the water
    if(this.y < 0 ) {
        
   alert("You win!");


		this.resetGame();
    }

};

Player.prototype.collisionCheck = function() {
    for (var i = 0; i < enemyLength; i++) {
        if(Math.abs(this.x - allEnemies[i].x) < 40 && Math.abs(this.y - allEnemies[i].y) < 40) {
            
            alert("Try again!");
			this.resetGame();
        }
    }
};
//draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 //   console.log(this.sprite);
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(0, 60);
var enemy2 = new Enemy(100, 140);
var enemy3 = new Enemy(200, 220);
var enemy4 = new Enemy(300, 140);
var enemy5 = new Enemy(400, 60);
var enemy6 = new Enemy(650, 220);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
 var enemyLength = allEnemies.length;

var player = new Player();

Player.prototype.handleInput = function(keyInput) {
    if(keyInput === 'up') {
        if(this.y < 10) {
            return null;
        }
        else {
           this.y -= 83; 
        }
    }
    else if(keyInput === 'down') {
        if(this.y > 350) {
            return null;
        }
        else {
           this.y += 83; 
        }
    }
    else if(keyInput === 'left') {
        if(this.x < 100) {
            return null;
        }
        else {
           this.x -= 101; 
        }
    }
    else if(keyInput === 'right') {
        if(this.x > 400) {
            return null;
        }
        else {
           this.x += 101;
        }
    }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


Player.prototype.resetGame = function() {
    this.x = 505/50 - 10;
    this.y = 380;
};