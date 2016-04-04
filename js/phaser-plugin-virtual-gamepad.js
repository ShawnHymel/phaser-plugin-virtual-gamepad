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
        
        // Call parent
        Phaser.Plugin.call(this, game, parent);
        
        // Class members
        this.input = this.game.input;
        this.joystick = null;
        this.joystickPad = null;
        this.joystickPoint = null;
        this.joystickRadius = null;
        this.button = null;
        this.buttonPoint = null;
        this.buttonRadius = null;
        
        // Polling for the joystick and button pushes
        this.preUpdate = gamepadPoll.bind(this);
    };
    
	Phaser.Plugin.VirtualGamepad.prototype = 
        Object.create(Phaser.Plugin.prototype);
	Phaser.Plugin.VirtualGamepad.prototype.constructor = 
        Phaser.Plugin.VirtualGamepad;
        
    /**
     * Add a joystick to the screen (only one joystick allowed for now)
     *
     * @method Phaser.Plugin.VirtualGamepad#addJoystick
     * @param {number} x - Position (x-axis) of the joystick on the canvas
     * @param {number} y - Position (y-axis) of the joystick on the canvas
     * @param {number} scale - Size of the sprite. 1.0 is 100x100 pixels
     * @param {String} key - key for the gamepad's spritesheet
     * @param {Phaser.Sprite} The joystick object just created
     */
    Phaser.Plugin.VirtualGamepad.prototype.addJoystick = function(x, 
                                                                  y, 
                                                                  scale, 
                                                                  key) {
    
        // If we already have a joystick, return null
        if (this.joystick !== null) {
            return null;
        }
        
        // Add thejoystick to the game
        this.joystick = this.game.add.sprite(x, y, 'gamepad');
        this.joystick.frame = 2;
        this.joystick.anchor.set(0.5);
        this.joystick.fixedToCamera = true;
        this.joystick.scale.setTo(scale, scale);
        this.joystickPad = this.game.add.sprite(x, y, 'gamepad');
        this.joystickPad.frame = 3;
        this.joystickPad.anchor.set(0.5);
        this.joystickPad.fixedToCamera = true;
        this.joystickPad.scale.setTo(scale, scale);
        
        // Remember the coordinates of the joystick
        this.joystickPoint = new Phaser.Point(x, y);
        
        // Set up initial joystick states
        this.joystick.isUp = false;
        this.joystick.isDown = false;
        this.joystick.isLeft = false;
        this.joystick.isRight = false;
        this.joystick.positionX = 0;
        this.joystick.positionY = 0;
        this.joystick.radius = 0;
        this.joystick.angle = 0;
        
        // Set the touch area as defined by the button's radius
        this.joystickRadius = scale * (this.joystick.width / 2);
        
        return this.joystick;    
    };
    
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
        this.button = this.game.add.button(x, y, key, null, this);
        this.button.anchor.set(0.5);
        this.button.fixedToCamera = true;
        this.button.scale.setTo(scale, scale);
        
        // Remember the coordinates of the button
        this.buttonPoint = new Phaser.Point(x, y);
        
        // Set up initial button state
        this.button.isDown = false;
        
        // Set the touch area as defined by the button's radius
        this.buttonRadius = scale * (this.button.width / 2);
        
        return this.button;
    };
    
    var buttonDown = function() {
        this.button.isDown = true;
    };
    
    var buttonUp = function() {
        this.button.isDown = false;
    };
    
    var gamepadPoll = function() {
        
        var resetJoystick = true;
        
        // See if any pointers are in range of the joystick or buttons
        this.button.isDown = false;
        this.button.frame = 0;
        this.game.input.pointers.forEach(function(p) {
            
            // See if the pointer is over the joystick
            var d = this.joystickPoint.distance(p.position);
            if ((p.isDown) && (d < this.joystickRadius)) {
                resetJoystick = false;
                moveJoystick(p.position, this);
            }
            
            // See if the pointer is over the button
            d = this.buttonPoint.distance(p.position);
            if ((p.isDown) && (d < this.buttonRadius)) {
                this.button.isDown = true;
                this.button.frame = 1;
            }
        }, this);
        
        // If there are no pointers on the joystick, reset italics
        if (resetJoystick) {
            moveJoystick(this.joystickPoint, this);
        }
        
    };
    
    var moveJoystick = function(point, that) {
        
        // Calculate x/y of pointer from joystick center
        var deltaX = point.x - that.joystickPoint.x;
		var deltaY = point.y - that.joystickPoint.y;
        
        // Normalize x/y
        that.joystick.positionX = parseInt((deltaX / 
            that.joystickRadius) * 100, 10);
		that.joystick.positionY = parseInt((deltaY  /
            that.joystickRadius) * 100, 10);

        // Get the angle of the pointer on the joystick
        var angle = that.joystickPoint.angle(point);
        
        // Set polar coordinates
        that.joystick.angle = angle;
        that.joystick.radius = parseInt((that.joystickPoint.distance(point) / 
            that.joystickRadius) * 100, 10);
            
        // Set d-pad directions
        that.joystick.isUp = ((angle > UP_LOWER_BOUND) && 
            (angle <= UP_UPPER_BOUND));
        that.joystick.isDown = ((angle > DOWN_LOWER_BOUND) && 
            (angle <= DOWN_UPPER_BOUND));
        that.joystick.isRight = ((angle > RIGHT_LOWER_BOUND) && 
            (angle <= RIGHT_UPPER_BOUND));
        that.joystick.isLeft = ((angle > LEFT_LOWER_BOUND) || 
            (angle <= LEFT_UPPER_BOUND));
            
        // Fix situation where left/right is true if X/Y is centered
        if ((that.joystick.positionX === 0) && 
            (that.joystick.positionY === 0)) {
            that.joystick.isRight = false;
            that.joystick.isLeft = false;
        }
        
        // Move joystick pad images
        //that.joystickPad.x = that.joystick.positionX;
        //that.joystickPad.y = that.joystick.positionY;
    };
    
} (Phaser));