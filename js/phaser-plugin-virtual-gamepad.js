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
        
        this.button = null;
    };
    
	Phaser.Plugin.VirtualGamepad.prototype = 
        Object.create(Phaser.Plugin.prototype);
	Phaser.Plugin.VirtualGamepad.prototype.constructor = 
        Phaser.Plugin.VirtualGamepad;
    
    /**
     * Add a button to the screen (only one button allowed for now)
     *
     * @method Phaser.Plugin.VirtualGamepad#addButton
     * @param {number} x - Position (x-axis) of the button on the canvas
     * @param {number} y - Position (y-axis) of the button on the canvas
     * @param {number} scale - Size of the sprite. 1.0 is 100x100 pixels
     * @param {String} key - key for the gamepad's spritesheet
     * @param {Phaser.Button} The button object just created
     */
    Phaser.Plugin.VirtualGamepad.prototype.addButton = function(x, 
                                                                y, 
                                                                scale, 
                                                                key) {
                                                                
        // If we already have a button, return null
        if (this.button !== null) {
            return null;
        }
                                                                
        // Add the button to the game
        this.button = this.game.add.button(x, y, key, null, 
            this, 1, 0, 1, 0);
        this.button.anchor.set(0.5);
        this.button.fixedToCamera = true;
        this.button.scale.setTo(scale, scale);
        
        // Set up initial button state
        this.button.isDown = false;
        
        // Attach functions to button
        this.button.events.onInputDown.add(buttonDown, this);
        this.button.events.onInputOver.add(buttonDown, this);
        this.button.events.onInputUp.add(buttonUp, this);
        this.button.events.onInputOut.add(buttonUp, this);
        
        // Polling for the joystick and button pushes
        this.preUpdate = gamepadPoll.bind(this);
        
        return this.button;
    };
    
    var buttonDown = function() {
        this.button.isDown = true;
    };
    
    var buttonUp = function() {
        this.button.isDown = false;
    };
    
    var gamepadPoll = function() {
        
    };
    
} (Phaser));