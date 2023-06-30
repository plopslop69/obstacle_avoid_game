import Sprite from "./Sprite.js"; // Need from write .js too

export const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// Set gravity
const gravity = 0.25;

// Set canvas dimensions
canvas.width = 1536;
canvas.height = 578;

// Set environment
const bgcolor = "#171b33";
const groundheight = 480;

// Set sprite's initial position
const px = canvas.width / 2 - 200;
const py = 0;

// Set player's movement
const pmovespeed = 5;
const pjumpheight = 120;
const pjumpspeed = 7;
export const angle = 20; // Degrees

let lastKey1 = null;
let lastKey2 = null;

resetcanvas();
function resetcanvas() {
  c.fillStyle = bgcolor;
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "#ecfffd";
  c.fillRect(0, 480, canvas.width, 20);
  c.fillStyle = "#94f2f4";
  c.fillRect(0, 480 + 20, canvas.width, canvas.height);

  c.beginPath();
  c.fillStyle = "#ffff8a2F";
  c.arc(200, 150, 110, 0, 2 * Math.PI);
  c.fill();
  c.beginPath();
  // c.filter = "blur(2px)"
  c.fillStyle = "#ffff8a4F";
  c.arc(200, 150, 100, 0, 2 * Math.PI);
  c.fill();
  c.closePath();
  c.beginPath();
  c.fillStyle = "#ffef5c6F";
  c.arc(200, 150, 90, 0, 2 * Math.PI);
  c.fill();
  c.beginPath();
  c.fillStyle = "#fae62dFF";
  c.arc(200, 150, 80, 0, 2 * Math.PI);
  c.fill();
}
const keys = {
  d: { pressed: false },
  a: { pressed: false },
  w: { pressed: false },
  j: { press: false },
};

const player = new Sprite(gravity, true, {
  get position() {
    return {
      x: px,
      y: py,
    };
  },
  get velocity() {
    return {
      x: 0,
      y: 0,
    };
  },
  property: {
    color: {
      hat1: "#7a4dc3",
      hat2: "#d79cff",
      skin: "#f4c0c0",
    },
    width: 50,
    height: 100,
    isGround: true,
  },
});

const enemy = new Sprite(gravity, false, {
  get position() {
    return {
      x: canvas.width - this.property.width,
      y: groundheight - this.property.height,
    };
  },
  get velocity() {
    return {
      x: 0,
      y: 0,
    };
  },
  property: {
    color: "rgb(6, 82, 112)",
    width: 150,
    height: 300,
    isGround: true,
  },
});

function animate() {
  window.requestAnimationFrame(animate); // Callbacks the 'animate()' function in an infinite loop sequence
  // console.log('go');
  resetcanvas();

  // Player 1 Movement Controls
  if (
    (player.position.x <= 0 && keys.a.pressed) ||
    (player.position.x + player.property.width >=
      canvas.width - enemy.property.width - 150 &&
      keys.d.pressed)
  ) {
    player.velocity.x = 0;
    // This checks if the player hits the right or the left boundary and if it's still moving towards the bounday
    // If true, the player velocity is set to zero
    console.log("p1boundary");
  } else {
    if (keys.d.pressed && lastKey1 == "d") {
      player.velocity.x = pmovespeed;
    } else if (keys.a.pressed && lastKey1 == "a") {
      player.velocity.x = -pmovespeed;
    } else player.velocity.x = 0;
    // console.log(player.position.y);

    // Jump control
    if (keys.w.pressed && player.property.isGround) {
      if (
        player.position.y >=
        groundheight - player.property.height - pjumpheight
      ) {
        player.velocity.y = -pjumpspeed;
      } else {
        console.log("limitreach");
        player.property.isGround = false;
      }
    }
  }

  if (player.position.y + player.property.height > 480.25) {
    let er = player.position.y + player.property.height - 480;
    player.position.y -= er;
    console.log("1111111111111111111111111111111111111");
    console.log(er);
  }
  // const prototype = Object.getPrototypeOf(globalThis[Sprite].prototype);

  // // Get attributes of the object dynamically
  // const attributes = Object.getOwnPropertyNames(prototype);

  // console.log(player.constructor.name);
  // const prototype = Object.getPrototypeOf(Sprite.constructor);
  // const att = Object.getOwnPropertyNames(prototype);
  // console.log(att);
  player.update(c);
  enemy.update(c);
}
animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    // Player 1
    case "d": {
      keys.d.pressed = true;
      lastKey1 = "d";
      break;
    }
    case "a": {
      keys.a.pressed = true;
      lastKey1 = "a";
      break;
    }
    case "w": {
      keys.w.pressed = true;
      // if(player.property.isGround){
      //     player.velocity.y = -pjumpspeed
      // }
      break;
    }
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d": {
      keys.d.pressed = false;
      lastKey1 = "a";
      break;
    }
    case "a": {
      keys.a.pressed = false;
      lastKey1 = "d";
      break;
    }
    case "w": {
      keys.w.pressed = false;
    }
  }
});
