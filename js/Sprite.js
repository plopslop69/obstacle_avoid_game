import { angle } from "./script.js";
import { canvas } from "./script.js";

class Sprite {
  constructor(gravity, { position, velocity, property /*, isPlayer*/ }) {
    this.gravity = gravity;
    this.position = position;
    this.velocity = velocity;
    this.property = property;
    // this.isPlayer = isPlayer
  }
  draw(c) {
    // Draws the sprite as a rectangle (as of yet)
    c.fillStyle = this.property.color;
    // c.fillStyle = this.isPlayer
    // if (this.velocity.x > 0) {
    //   c.save();
    //   c.clearRect(0, 0, canvas.width, canvas.height);
    //   c.rotate((angle * Math.PI) / 180);
    //   c.fillRect(
    //     this.position.x,
    //     this.position.y,
    //     this.property.width,
    //     this.property.height
    //   );
    //   //   this.draw(c);
    //   c.restore();
    // } else {
    c.fillRect(
      this.position.x,
      this.position.y,
      this.property.width,
      this.property.height
    );
    // }
  }
  update(c) {
    // updates each frame by clearing and drawing new sprites for each frame
    this.draw(c);

    this.position.x += this.velocity.x; // Increases x value for each frame
    this.position.y += this.velocity.y; // Increases y value for each frame

    // Setting movement boundary

    if (this.position.y + this.property.height <= 480) {
      this.velocity.y += this.gravity;
      // this.property.isGround = false
      // Provies a {graviity} acceleration factor for each looping frame
      // setTimeout(() => {
      //     console.log('falseee');
      // }, 200)
    } else {
      this.velocity.y = 0;
      this.property.isGround = true;
    }
  }
  // move(key){
  //     console.log('yes');
  //     switch(key){
  //         case 'ArrowRight' :{
  //             this.draw()
  //             this.position.x += this.velocity.x
  //         }
  //     }
  // }
}

export default Sprite;
