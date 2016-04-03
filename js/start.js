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
        
        // Load the gamepad spritesheet
        this.load.spritesheet('gamepad', 
            'assets/gamepad/gamepad_spritesheet.png', 100, 100);
        
        this.load.image('ship', 'assets/ship.png');
    },
    
    create: function () {
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
        
        this.player = this.add.sprite(250, 250, 'ship');
        //this.player.body.collideWorldBounds =  true;
        
        this.gamepad = this.game.plugins.add(Phaser.Plugin.VirtualGamepad);
    },
};

game.state.add('Game', PhaserGame, true);