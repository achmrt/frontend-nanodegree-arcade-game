// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // make enemies loop to left side of canvas after reaching canvas.width
    if (this.x >= 505) {
        this.x = -150;
    }

    // Check for collision
    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
}

// Draw the player on the screen, required method for game
// Display score
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    showScoreLevel(score, gameLevel);

};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.x -= player.speed;
    }
    if (keyPress == 'up') {
        player.y -= player.speed - 20;
    }
    if (keyPress == 'right') {
        player.x += player.speed;
    }
    if (keyPress == 'down') {
        player.y += player.speed - 20;
    }
    console.log('keyPress is: ' + keyPress);
};

// Function to display player's score
var showScoreLevel = function(score, level) {
    var canvas = document.getElementsByTagName('canvas');
    var canvasTag = canvas[0];

    scoreDiv.innerHTML = 'Score: ' + score
        + '   ' + 'Level: ' + level;
    document.body.insertBefore(scoreDiv, canvasTag[0]);
};

// check for collision between enemy and player
var checkCollision = function(enemy) {
    if (player.y + 130 >= enemy.y + 92 && player.x + 26 <= enemy.x + 86 && player.y + 75 <= enemy.y + 135 && player.x + 75 >= enemy.x + 10) {
        player.x = 202;
        player.y = 385;
    }

    // check for player reaching water winning the game
    // if player wins, add 1 to the level and increase the score based on level
    // pass gameLevel as an argument to the increaseDifficulty function
    if (player.y + 63 <= 60) {
        player.x = 202;
        player.y = 385;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171)
        score += gameLevel;
        gameLevel += 1;
        increaseDifficulty(gameLevel);
    }

    // check if player runs into the canvas walls
    if (player.y > 385 ) {
        player.y = 385;
    }
    if (player.x > 402.5) {
        player.x = 402.5;
    }
    if (player.x < 2.5) {
        player.x = 2.5;
    }
};

// Increase number of enemies on screen based on levels
var increaseDifficulty = function(numEnemies) {
    allEnemies.length = 0;

    // load the enemies
    for (var i = 0; i < numEnemies; i++) {
        var enemy = new Enemy(Math.random()*400, Math.random() * 184 + 50, Math.random() * 100 + 50);
        allEnemies.push(enemy);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Enemy randomly placed within section of canvas
// Declare new score and gameLevel variables to store score and level
var allEnemies = [];
var player = new Player(202, 385, 100);
var gameLevel = 1;
var score = 0;
var scoreDiv = document.createElement('div');
var enemy = new Enemy(Math.random()*400, Math.random() * 184 + 50, Math.random() * 256);

allEnemies.push(enemy);

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
