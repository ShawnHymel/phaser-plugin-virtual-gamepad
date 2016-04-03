/**
 * @author      Shawn Hymel <@ShawnHymel>
 * @copyright   2016 Shawn Hymel
 * @license     {@link http://choosealicense.com/licenses/no-license/|No License}
 * @description This example demonstrates the VirtualGamepad plugin.
 */
 
var game = new Phaser.Game(500, 500, Phaser.CANVAS);

var PhaserGame = function() {
    this.player = null;
}

PhaserGame.prototype = {
    
    preload: function () {
        this.load.image('ship', 'assets/ship.png');
        this.load.image('button', 'assets/button_up.png');
    },
    
    create: function () {
        
        // Add spaceship to the world
        this.player = this.add.sprite(200, 200, 'ship');
        //this.player.body.collideWorldBounds =  true;
        
        // Enable the gamepad plugin
        this.gamepad = this.game.plugins.add(Phaser.Plugin.VirtualGamepad);
    },
};

// Add the only state and start the game
game.state.add('Game', PhaserGame, true);