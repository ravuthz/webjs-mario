'use strict';
// import "./styles.css";

// document.getElementById("app").innerHTML = `<h1>Hello Vanilla!</h1>`;

// https://youtu.be/4q2vvZn5aoo
// https://youtu.be/4q2vvZn5aoo?t=2721
// https://morioh.com/p/640ca3b95c5d?fbclid=IwAR3LVbtrB2N-LAE1z5J4Hj9i6vJRovUspIBn-bsYl4jqqMjXE-PmCsGddbQ

const canvas = document.querySelector('canvas');

const gravity = 1.5;
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

class Pointer {
  constructor(x, y, w, h, c) {
    this.x = x; // position x
    this.y = y; // position y
    this.w = w; // width
    this.h = h; // height
    this.c = c || 'black'; // color
  }
  draw() {
    ctx.fillStyle = this.c;
    console.log('draw: ', this.c, this.x, this.y, this.w, this.h);
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

class Platform extends Pointer {
  constructor() {
    super(200, 100, 200, 20, 'blue');
  }
}

class Player extends Pointer {
  constructor() {
    super(100, 100, 30, 30, 'red');
    this.velocity = {
      x: 0,
      y: 1
    };
  }
  update() {
    this.draw()
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    if (this.y + this.w + this.velocity.y <= ctx.canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }

  jumpOn(obj) {
    if (this.y + this.h <= obj.y && this.y + this.h + this.velocity.y >= obj.y 
      && this.x + this.w >= obj.x && this.x <= obj.x + obj.w) {
      this.velocity.y = 0;
    }
  }
}

const platform = new Platform();
const player = new Player();
const keys = {
  left: { pressed: false },
  right: { pressed: false }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  player.update();
  platform.draw();

  if (keys.right.pressed) {
    player.velocity.x = 5;
  } else if (keys.left.pressed) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;
  }
 
  // When player on platform - platform collision detection
  // if (player.y + player.h <= platform.y && player.y + player.h + player.velocity.y >= platform.y 
  //   && player.x + player.w >= platform.x && player.x <= platform.x + platform.w) {
  //   player.velocity.y = 0;
  // }
  player.jumpOn(platform);
 
}

animate();

addEventListener('keydown', (e) => {
  console.log(e);
  switch(e.keyCode) {
    // left
    case 65: // a
    case 37: // arrow left
      keys.left.pressed = true;
      break;

    // down
    case 83: // s
    case 40: // arrow down
      break;

    // right
    case 68: // d
    case 39: // arrow right
      keys.right.pressed = true;
      break;

    // up
    case 87: // w
    case 38: // arrow up
    case 32: // space
      player.velocity.y -= 20;
      break;
  }
});

addEventListener('keyup', (e) => {
  console.log(e);
  switch(e.keyCode) {
    // left
    case 65: // a
    case 37: // arrow left
    keys.left.pressed = false;
      break;

    // down
    case 83: // s
    case 40: // arrow down
      break;

    // right
    case 68: // d
    case 39: // arrow right
      keys.right.pressed = false;
      break;

    // up
    case 87: // w
    case 38: // arrow up
    case 32: // space
      break;
  }
});