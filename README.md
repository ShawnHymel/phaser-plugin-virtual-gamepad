Phaser Plugin: VirtualGamepad
=============================

![Phaser Plugin - Virtual Gamepad](https://cloud.githubusercontent.com/assets/5232145/14267007/e6b2ad2a-fa89-11e5-9e5a-7a39488f3adb.png)

The Virtual Gamepad is an overlay for Phaser games intended for mobile devices. The joystick and button will work with a mouse, but it's pretty pointless if you want to use the joystick and button at the same time.

How to Install
--------------

 * Copy *js/phaser-plugin-virtual-gamepad.js* to your page's JavaScript directory
 * Copy *assets/gamepad/gamepad_spritesheet.png* to your page's assets directory

How to Use
----------

 * In your game, load `gamepad_spritesheet.png` as part of your preload
 * Add the plugin with `var gamepad = game.plugins.add(Phaser.Plugin.VirtualGamepad)`
 * Add a joystick with `var joystick = gamepad.addJoystick(x, y, scale, '<SPRITESHEET>')`
 * Add a button with `var button = this.gamepad.addButton(x, y, scale, '<SPRITESHEET>')`
 * Joystick properties can be read with `joystick.properties.<PROPERTY>`. Properties include:
  * inUse
  * up
  * down
  * left
  * right
  * x
  * y
  * distance
  * angle
  * rotation
 * Button state can be read with `button.isDown`
 
See code in *js/start.js* as an example on how to use the VirtualGamepad.

Demo
----

A playable demo of this repository can be found at [http://shawnhymel.github.io/phaser-plugin-virtual-gamepad/](http://shawnhymel.github.io/phaser-plugin-virtual-gamepad/).

Version History
---------------

 * v0.1.0 - Initial release

Known Bugs
----------

 * Right now, only one joystick and one button are supported
 
Credits
-------

Joystick math is based on work by [Eugenio Fage](https://github.com/Gamegur-us), whose original touch control plugin can be found [here](https://github.com/Gamegur-us/phaser-touch-control-plugin).
 
License Information
-------------------

The MIT License (MIT)
Copyright (c) 2016 Shawn Hymel

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.