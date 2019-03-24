// This code has been modified but was adapted from Frank Poth's, FreeCodeCamp 2D Platformer Tutorial.

/* This is a fixed time step game loop. It can be used for any game and will ensure
that game state is updated at the same rate across different devices which is important
for uniform gameplay. In addition, you can do things like frame dropping
and interpolation with a fixed step loop, which allows your game to play and look
smooth on slower devices rather than freezing or lagging to the point of unplayability. */

// lesson # 6

/* Instead of calling window.requestAnimationFrame after updating game logic,
call it after. this prevents RAF from being called, after requesting a stop. */

const Engine = function(time_step, update, render) {

  this.accumulated_time        = 0;
  this.animation_frame_request = undefined,
  this.time                    = undefined,
  this.time_step               = time_step,

  this.updated = false;

  this.update = update;
  this.render = render;

  this.run = function(time_stamp) {

    /* I moved this line from the bottom of this function to the top. This is better
    anyway, because it ensures that if my game logic runs too long, a new frame will
    already be requested before 30 or 60 frames pass and I miss a request entirely.
    This could cause a "spiral of death" for my CPU, but since I have the frame dropping
    safety if statement, this probably won't crash the user's computer. */
    this.animation_frame_request = window.requestAnimationFrame(this.handleRun);

    this.accumulated_time += time_stamp - this.time;
    this.time = time_stamp;

    /* This is the safety if statement. */
    if (this.accumulated_time >= this.time_step * 3) {

      this.accumulated_time = this.time_step;

    }

    while(this.accumulated_time >= this.time_step) {

      this.accumulated_time -= this.time_step;

      this.update(time_stamp);

      this.updated = true;

    }

    if (this.updated) {

      this.updated = false;
      this.render(time_stamp);

    }

  };

  this.handleRun = (time_step) => { this.run(time_step); };

};

Engine.prototype = {

  constructor:Engine,

  start:function() {

    this.accumulated_time = this.time_step;
    this.time = window.performance.now();
    this.animation_frame_request = window.requestAnimationFrame(this.handleRun);

  },

  stop:function() { window.cancelAnimationFrame(this.animation_frame_request); }

};