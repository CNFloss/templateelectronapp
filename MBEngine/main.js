// This code has been modified but was adapted from Frank Poth's, FreeCodeCamp 2D Platformer Tutorial.

// lesson # 5

"use strict";

/* The assets manager will be responsible for loading and storing graphics for
the game. Because it only has to load the tilesheet image right now, it's very specific
about what it does. */
/* Changes:
  1. The update function now check on every frame for game.world.door. If a door
     is selected, the game engine stops and the door's level is loaded.
  2. When the game is first initialized at the bottom of this file, game.world is
     loaded using it's default values defined in its constructor.
  3. The AssetsManager class has been changed to load both images and json.
*/

//// CONSTANTS ////

/* Each zone has a url that looks like: zoneXX.json, where XX is the current zone
identifier. When loading zones, I use the game.world's zone identifier with these
two constants to construct a url that points to the appropriate zone file. */
const ZONE_PREFIX = "js/levels/";
const ZONE_SUFFIX = ".json";

  /////////////////
 //// CLASSES ////
/////////////////

const AssetsManager = function() {

  this.tile_set_image = undefined;

};

AssetsManager.prototype = {

  constructor: Game.AssetsManager,

  /* Requests a file and hands the callback function the contents of that file
  parsed by JSON.parse. */
  requestJSON:function(url, callback) {

    let request = new XMLHttpRequest();

    request.addEventListener("load", function(event) {

      callback(JSON.parse(this.responseText));

    }, { once:true });

    request.open("GET", url);
    request.send();

  },

  /* Creates a new Image and sets its src attribute to the specified url. When
  the image loads, the callback function is called. */
  requestImage:function(url, callback) {

    let image = new Image();

    image.addEventListener("load", function(event) {

      callback(image);

    }, { once:true });

    image.src = url;

  },

};

  ///////////////////
 //// FUNCTIONS ////
///////////////////

var keyDownUp = function(event) {

  CONTROLLER.keyDownUp(event.type, event.keyCode);

};

var resize = function(event) {

  DISPLAY.resize(document.documentElement.clientWidth, document.documentElement.clientHeight, GAME.world.height / GAME.world.width);
  DISPLAY.render();

};

var render = function() {

  DISPLAY.drawMap   (ASSETS_MANAGER.tile_set_image,
  GAME.world.tile_set.columns, GAME.world.graphical_map, GAME.world.columns,  GAME.world.tile_set.tile_size);

  let frame = GAME.world.tile_set.frames[GAME.world.player.frame_value];

  DISPLAY.drawObject(ASSETS_MANAGER.tile_set_image,
  frame.x, frame.y,
  GAME.world.player.x + Math.floor(GAME.world.player.width * 0.5 - frame.width * 0.5) + frame.offset_x,
  GAME.world.player.y + frame.offset_y, frame.width, frame.height);

  DISPLAY.render();

};

var update = function() {

  if (CONTROLLER.left.active ) { GAME.world.player.moveLeft ();                               }
  if (CONTROLLER.right.active) { GAME.world.player.moveRight();                               }
  if (CONTROLLER.up.active   ) { GAME.world.player.jump();      CONTROLLER.up.active = false; }

  GAME.update();

  /* This if statement checks to see if a door has been selected by the player.
  If the player collides with a door, he selects it. The engine is then stopped
  and the assets_manager loads the door's level. */
  if (GAME.world.door) {

    ENGINE.stop();

    /* Here I'm requesting the JSON file to use to populate the GAME.world object. */
    ASSETS_MANAGER.requestJSON(ZONE_PREFIX + GAME.world.door.destination_zone + ZONE_SUFFIX, (zone) => {

      GAME.world.setup(zone);

      ENGINE.start();

    });

    return;

  }

};

  /////////////////
 //// OBJECTS ////
/////////////////

var ASSETS_MANAGER = new AssetsManager();
var CONTROLLER     = new Controller();
var DISPLAY        = new Display(document.querySelector("canvas"));
var GAME           = new Game();
var ENGINE         = new Engine(1000/30, render, update);

  ////////////////////
 //// INITIALIZE ////
////////////////////

DISPLAY.buffer.canvas.height = GAME.world.height;
DISPLAY.buffer.canvas.width  = GAME.world.width;
DISPLAY.buffer.imageSmoothingEnabled = false;

ASSETS_MANAGER.requestJSON(ZONE_PREFIX + GAME.world.zone_id + ZONE_SUFFIX, (zone) => {

  GAME.world.setup(zone);

  ASSETS_MANAGER.requestImage("imgs/rabbit-trap.png", (image) => {

    ASSETS_MANAGER.tile_set_image = image;

    resize();
    ENGINE.start();

  });

});

window.addEventListener("keydown", keyDownUp);
window.addEventListener("keyup"  , keyDownUp);
window.addEventListener("resize" , resize);
