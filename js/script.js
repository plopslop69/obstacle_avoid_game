import Sprite from "./Sprite.js";

export const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// Set gravity
const gravity = 0.25;

// Set canvas dimensions
canvas.width = 1024;
canvas.height = 578;

// Set environment
const bgcolor = "skyblue";
const groundheight = 480;

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
  c.fillStyle = "green";
  c.fillRect(0, 480, canvas.width, 20);
  c.fillStyle = "#523017";
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
  right: { pressed: false },
  left: { pressed: false },
  up: { pressed: false },
  d: { pressed: false },
  a: { pressed: false },
  w: { pressed: false },
};

const player1 = new Sprite(gravity, {
  get position() {
    return {
      x: canvas.width / 2 - 150,
      y: 0,
    };
  },
  get velocity() {
    return {
      x: 0,
      y: 0,
    };
  },
  property: {
    color: "purple",
    width: 75,
    height: 150,
    isGround: true,
    isJump: false,
  },
});

const player2 = new Sprite(gravity, {
  // Getter allows you to dynamically reflect the value of an internal object property into another property as a function, which is called when that particular property (position in this case) is called and assigned to it
  // Allows you to use 'this' method inside an object to access it's internal properties, otherwise it wouldn't let you do that

  get position() {
    return {
      x: canvas.width / 2 + 150 - this.property.width,
      y: 0,
    };
  },
  get velocity() {
    return {
      x: 0,
      y: 0,
    };
  },
  property: {
    color: "red",
    width: 75,
    height: 150,
    isGround: true,
    isJump: false,
  },
});

let player = [player1, player2]; // General player
// let isJump = {
//     p1: false, p2: false
// }
// let isGround = {
//     p1: false, p2: false
// }

function animate() {
  window.requestAnimationFrame(animate); // Callbacks the 'animate()' function in an infinite loop sequence
  // console.log('go');
  resetcanvas();

  // Player 1 Movement Controls
  if (
    (player1.position.x <= 0 && keys.a.pressed) ||
    (player1.position.x + player1.property.width >= canvas.width &&
      keys.d.pressed)
  ) {
    player1.velocity.x = 0;
    // This checks if the player hits the right or the left boundary and if it's still moving towards the bounday
    // If true, the player velocity is set to zero
    console.log("p1boundary");
  } else {
    if (keys.d.pressed && lastKey1 == "d") {
      player1.velocity.x = pmovespeed;
    } else if (keys.a.pressed && lastKey1 == "a") {
      player1.velocity.x = -pmovespeed;
    } else player1.velocity.x = 0;
    // console.log(player1.position.y);

    // Jump control
    if (keys.w.pressed && player1.property.isGround) {
      if (
        player1.position.y >=
        groundheight - player1.property.height - pjumpheight
      ) {
        player1.velocity.y = -pjumpspeed;
      } else {
        console.log("limitreach");
        player1.property.isGround = false;
      }
    }
  }

  // Player 2 Movement Controls
  if (
    (player2.position.x <= 0 && keys.left.pressed) ||
    (player2.position.x + player2.property.width >= canvas.width &&
      keys.right.pressed)
  ) {
    player2.velocity.x = 0;
    console.log("p2boundary");
  } else {
    if (keys.right.pressed && lastKey2 == "right") {
      player2.velocity.x = pmovespeed;
    } else if (keys.left.pressed && lastKey2 == "left") {
      player2.velocity.x = -pmovespeed;
    } else player2.velocity.x = 0;

    console.log(player2.property.isGround);
    if (keys.up.pressed && player2.property.isGround) {
      if (
        player2.position.y >=
        groundheight - player2.property.height - pjumpheight
      ) {
        player2.velocity.y = -pjumpspeed;
      } else {
        console.log("limitreach");
        player2.property.isGround = false;
      }
    }
  }

  if (player1.position.y + player1.property.height > 480.25) {
    let er = player1.position.y + player1.property.height - 480;
    player1.position.y -= er;
    console.log("1111111111111111111111111111111111111");
    console.log(er);
  }

  if (player2.position.y + player2.property.height > 480.25) {
    let er = player2.position.y + player2.property.height - 480;
    player2.position.y -= er;
    console.log("22222222222222222222222222222222222222222");
  }
  player1.update(c);
  player2.update(c);

  // Tried making a single general player control but keydown conflicts caused bugs
  // So making do with individual repeated codes for both players (for now)

  // for(i in player){
  //     if((player[1].position.x <= 0 && keys.left.pressed) || (player[1].position.x + player[1].property.width >= canvas.width && keys.right.pressed)){
  //         player[1].velocity.x = 0
  //         // This checks if the player hits the right or the left boundary and if it's still moving towards the bounday
  //         // If true, the player velocity is set to zero
  //         console.log('p2boundary');
  //     }
  //     if((player[0].position.x <= 0 && keys.a.pressed) || (player[0].position.x + player[0].property.width >= canvas.width && keys.d.pressed)){
  //         player[0].velocity.x = 0
  //         console.log('p1boundary');
  //     }else{
  //         if(i == 0){
  //             if(keys.d.pressed && lastKey1 == 'd'){
  //                 player[i].velocity.x = pspeed
  //             }else if(keys.a.pressed && lastKey1 == 'a'){
  //                 player[i].velocity.x = -pspeed
  //             }else{
  //                 player[i].velocity.x = 0
  //             }
  //         }else{
  //             if(keys.right.pressed && lastKey2 == 'right'){
  //                 player[i].velocity.x = pspeed
  //             }else if(keys.left.pressed && lastKey2 == 'left'){
  //                 player[i].velocity.x = -pspeed
  //             }else{
  //                 player[i].velocity.x = 0
  //             }
  //         }
  //     }
  // }
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
      // if(player1.property.isGround){
      //     player1.velocity.y = -pjumpspeed
      // }
      break;
    }
    // Player 2
    case "ArrowRight": {
      keys.right.pressed = true;
      lastKey2 = "right";
      break;
    }
    case "ArrowLeft": {
      keys.left.pressed = true;
      lastKey2 = "left";
      break;
    }
    case "ArrowUp": {
      keys.up.pressed = true;
      // lastKey2 = 'up'
      break;
    }
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowRight": {
      keys.right.pressed = false;
      lastKey2 = "left";
      break;
    }
    case "ArrowLeft": {
      keys.left.pressed = false;
      lastKey2 = "right";
      break;
    }
    case "ArrowUp": {
      keys.up.pressed = false;
      break;
    }
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
