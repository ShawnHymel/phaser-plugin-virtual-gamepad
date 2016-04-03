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
        
        // Add the joystick and button images
        
        /*this.game.load.spritesheet('button', 
            'assets/button_spritesheet.png', 100, 100);*/
        this.button = this.game.add.button(400, 400, 'button');
        this.button.anchor.set(0.5);
        this.button.fixedToCamera = true;
    };
    
    //Extends the Phaser.Plugin template, setting up values we need
	Phaser.Plugin.VirtualGamepad.prototype = 
        Object.create(Phaser.Plugin.prototype);
	Phaser.Plugin.VirtualGamepad.prototype.constructor = 
        Phaser.Plugin.VirtualGamepad;
    
} (Phaser));