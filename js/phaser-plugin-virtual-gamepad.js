/**
 * Phaser Plugin - Virtual Gamepad
 * @author      Shawn Hymel <@ShawnHymel>
 * @copyright   2016 Shawn Hymel
 * @license     {@link http://opensource.org/licenses/MIT}
 * @version     0.1.0
 */

(function (Phaser) {
    'use strict';
    
    // Static variables
    var UP_LOWER_BOUND = -7 * (Math.PI / 8);
    var UP_UPPER_BOUND = -1 * (Math.PI / 8);
    var DOWN_LOWER_BOUND = Math.PI / 8;
    var DOWN_UPPER_BOUND = 7 * (Math.PI / 8);
    var RIGHT_LOWER_BOUND = -3 * (Math.PI / 8);
    var RIGHT_UPPER_BOUND = 3 * (Math.PI / 8);
    var LEFT_LOWER_BOUND = 5 * (Math.PI / 8);
    var LEFT_UPPER_BOUND = -5 * (Math.PI / 8);
    
    /**
     * The Virtual Gamepad adds a thumbstick and button(s) to mobile devices.
     *
     * @class Phaser.Plugin.VirtualGamepad
     * @constructor
     * @param {Object} game - The main Game object
     * @param {Any} parent - Object that owns this plugin (e.g. Phaser.PluginManager)
     */
    Phaser.Plugin.VirtualGamepad = function (game, parent) {
        Phaser.Plugin.call(this, game, parent);
        
        this.input = this.game.input;
        
        this.joystick = this.game.add.sprite(100, 400, 'gamepad');
        this.joystick.frame = 2;
        this.joystick.anchor.set(0.5);
        this.joystick.fixedToCamera = true;
        
        this.joystickPad = this.game.add.sprite(100, 400, 'gamepad');
        this.joystickPad.frame = 3;
        this.joystickPad.anchor.set(0.5);
        this.joystickPad.fixedToCamera = true;
        
        /*this.game.load.spritesheet('button', 
            'assets/button_spritesheet.png', 100, 100);*/
        this.button = this.game.add.button(400, 400, 'gamepad', null, 
            this, 1, 0, 1, 0);
        this.button.anchor.set(0.5);
        this.button.fixedToCamera = true;
        this.button.scale.setTo(1, 1);
    };
    
    /**
     * Add a button to the screen
     */
    
    //Extends the Phaser.Plugin template, setting up values we need
	Phaser.Plugin.VirtualGamepad.prototype = 
        Object.create(Phaser.Plugin.prototype);
	Phaser.Plugin.VirtualGamepad.prototype.constructor = 
        Phaser.Plugin.VirtualGamepad;
    
} (Phaser));