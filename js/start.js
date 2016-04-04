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
    
    preload: function() {
        
        // Load the gamepad spritesheet. Note that the width must equal height
        // of the sprite.
        this.load.spritesheet('gamepad', 
            'assets/gamepad/gamepad_spritesheet.png', 100, 100);
        
        this.load.image('space', 'assets/space_bg.jpg');
        this.load.image('ship', 'assets/ship.png');
        this.load.image('laser', 'assets/laser.png');
    },
    
    create: function() {
    
        game.renderer.roundPixels = true;
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
        
        this.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.add.tileSprite(0, 0, game.width, game.height, 'space');
        
        this.lasers = game.add.group();
        this.lasers.enableBody = true;
        this.lasers.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.lasers.createMultiple(40, 'laser');
        this.lasers.setAll('scale.x', 0.5);
        this.lasers.setAll('scale.y', 0.5);
        this.lasers.setAll('anchor.x', 0.5);
        this.lasers.setAll('anchor.y', 0.5);
        
        this.laserTime = 0;
        
        this.player = this.add.sprite(250, 250, 'ship');
        this.player.scale.setTo(0.8, 0.8);
        this.player.anchor.set(0.5);
        
        game.physics.arcade.enable(this.player);
        this.player.body.drag.set(100);
        this.player.body.maxVelocity.set(300);
        this.player.lastAngle = -90;
        
        var style = {font: '14px Arial', 
                     fill: '#ffffff', 
                     align: 'left', 
                     stroke: '#000000'};
         
        this.directionText = this.add.text(20, 20, '', style);
        this.rectangularText = this.add.text(140, 20, '', style);
        this.polarText = this.add.text(260, 20, '', style);
        this.pushText = this.add.text(380, 20, '', style);
        
        // Add the VirtualGamepad plugin to the game
        this.gamepad = this.game.plugins.add(Phaser.Plugin.VirtualGamepad);
        
        // Add a joystick to the game (only one is allowed right now)
        this.joystick = this.gamepad.addJoystick(100, 420, 1.2, 'gamepad');
        
        // Add a button to the game (only one is allowed right now)
        this.button = this.gamepad.addButton(400, 420, 1.0, 'gamepad');
    },
    
    update: function() {
        this.updateDebugText();
        
        // Read joystick data to set ship's angle and acceleration
        if (this.joystick.properties.inUse) {
            this.player.angle = this.joystick.properties.angle;
            this.player.lastAngle = this.player.angle;
        } else {
            this.player.angle = this.player.lastAngle;
        }
        this.player.body.acceleration.x = 4 * this.joystick.properties.x;
        this.player.body.acceleration.y = 4 * this.joystick.properties.y;
        
        // Fire the lasers!
        if (this.button.isDown) {
            this.fireLaser();
        }
        
        this.screenWrap(this.player);
        this.lasers.forEachExists(this.screenWrap, this);
    },
    
    fireLaser: function() {
        if (game.time.now > this.laserTime) {
            this.laser = this.lasers.getFirstExists(false);
            if (this.laser) {
                this.laser.reset(this.player.body.x + 20, 
                    this.player.body.y + 12);
                this.laser.lifespan = 2000;
                this.laser.angle = this.player.angle;
                game.physics.arcade.velocityFromRotation(this.player.rotation,
                    400, this.laser.body.velocity);
                this.laserTime = game.time.now + 100;
            }
        }
    },
    
    screenWrap: function(sprite) {
        if (sprite.x < 0)
        {
            sprite.x = game.width;
        }
        else if (sprite.x > game.width)
        {
            sprite.x = 0;
        }

        if (sprite.y < 0)
        {
            sprite.y = game.height;
        }
        else if (sprite.y > game.height)
        {
            sprite.y = 0;
        }
    },
    
    updateDebugText: function() {
        this.directionText.setText("Direction:\n up: " + 
            this.joystick.properties.up + "\n down: " + 
            this.joystick.properties.down + "\n left: " + 
            this.joystick.properties.left + "\n right: " + 
            this.joystick.properties.right);
        this.rectangularText.setText("Rectangular:\n x: " + 
            this.joystick.properties.x + "\n y: " + this.joystick.properties.y);
        this.polarText.setText("Polar:\n distance: " + 
            this.joystick.properties.distance + "\n angle: " +
            (Math.round(this.joystick.properties.angle * 100) / 100) + 
            "\n rotation: " + 
            (Math.round(this.joystick.properties.rotation * 100) / 100));
        this.pushText.setText("Joystick: " + this.joystick.properties.inUse + 
            "\nButton: " + this.button.isDown);
    }
};

game.state.add('Game', PhaserGame, true);