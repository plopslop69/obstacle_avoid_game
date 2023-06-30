class Sprite {
  constructor(
    gravity,
    isPlayer,
    { position, velocity, property /*, isPlayer*/ }
  ) {
    this.gravity = gravity;
    this.isPlayer = isPlayer;
    this.position = position;
    this.velocity = velocity;
    this.property = property;
    // this.isPlayer = isPlayer
  }
  draw(c) {
    if (this.isPlayer) {
      // Player draw code
      c.beginPath();
      c.fillStyle = this.property.color.hat1;
      c.arc(
        this.position.x + this.property.width / 2,
        this.position.y - 5,
        5,
        0,
        2 * Math.PI
      );
      c.fill();
      c.fillRect(this.position.x, this.position.y, this.property.width, 20);

      c.fillStyle = this.property.color.skin;
      c.fillRect(
        this.position.x,
        this.position.y + 20,
        this.property.width,
        this.property.height - 20
      );
      c.fillStyle = this.property.color.hat2;
      c.fillRect(
        this.position.x - 5,
        this.position.y + 19,
        this.property.width + 10,
        10
      );
      c.closePath();
    }
    if (!this.isPlayer) {
      console.log("rawewd");
      // Enemy draw code
      c.fillStyle = "red";
      c.fillRect(
        this.position.x,
        this.position.y,
        this.property.width,
        this.property.height
      );
    }
  }
  update(c) {
    // updates each frame by clearing and drawing new sprites for each frame
    this.draw(c);

    this.position.x += this.velocity.x; // Increases x value for each frame
    this.position.y += this.velocity.y; // Increases y value for each frame

    // Setting movement boundary

    if (this.position.y + this.property.height <= 480) {
      this.velocity.y += this.gravity;
      // this.propert y.isGround = false
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
