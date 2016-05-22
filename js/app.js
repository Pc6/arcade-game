// Enemies our player must avoid
var Enemy = function() {
    this.x = 0;
    this.y = (Math.floor(Math.random() * 3) + 1) * 83 - 30; // Enmemy should show up in random columns.
    this.speed = (Math.floor(Math.random() * 200)) + 50;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += dt * this.speed;
    this.dealWithCollision();
    if (this.x >= 505) {
        this.x = 0; // reset the enemy
        this.y = (Math.floor(Math.random() * 3) + 1) * 83 - 30;
    }
};

Enemy.prototype.dealWithCollision = function() {
    // if the four condition below is true, 
    // the player does not have collision with the enemies
    if (this.x + 83 <= player.x || this.y + 53 <= player.y
        || this.x >= player.x + 33 || this.y >= player.y + 53) {
        return;
    } else {
         player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 202;
    this.y = 385;

    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    if (this.y <= 0){
        alert('You win!');
        this.reset(); // reset the player
    }

};

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 385;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    switch(direction) {
    case 'left': 
        if (this.x >= 101) {
            this.x -= 101;
        }
        break;
    case 'up':
        if (this.y >= 53) {
            this.y -= 83;
        }        
        break;
    case 'right':
        if (this.x <= 303) {
            this.x += 101;
        }        
        break;
    case 'down':
        if (this.y < 385) {
            this.y += 83;
        }
        break;
    default: break;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()],
    player = new Player();


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
