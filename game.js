const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
//(0,0 is top left)
//initializze canvas to screen size need to update on game loop (if users changes window size)
fitCanvas();
function fitCanvas(){
    //canvas.width = window.innerWidth;
    //canvas.height = window.innerHeight;
    canvas.width = 1280;
    canvas.height = 720;
    
}

// set screen to blac for testing
//ctx.fillRect(0,0,canvas.width,canvas.height);

//using classes since it makes sense for games (es6 version)

class Sprite{
    //for now make box but late load in images
    
    constructor({
        position,
        imgSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 }
    }){
        this.position = position;
        this.height = 100;
        this.width = 100;
        this.image = new Image();
        this.image.src = imgSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.offset = offset;

    }
    draw(){
        ctx.drawImage(
            this.image,
            //this.framesCurrent * (this.image.width / this.framesMax),
            0,
            0,
            //this.image.width / this.framesMax,
            this.image.width,
            this.image.height,
            //this.position.x - this.offset.x,
            //this.position.y - this.offset.y,
            0,
            0,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        );

    }
    animateFrames() {
        this.framesElapsed++
    
        if (this.framesElapsed % this.framesHold === 0) {
          if (this.framesCurrent < this.framesMax - 1) {
            this.framesCurrent++
          } else {
            this.framesCurrent = 0
          }
        }
      }

    update(){
        this.draw();
        //this.animateFrames();
    }

}
const background = new Sprite({
    position:{
        x:0,
        y:0
    },
    imgSrc:'./assets/world/intro_screen.png'
})


//RESPONSIVVENESS
const keys = {
    w:{
        pressed: false
    },
    s:{
        pressed: false
    },
    a:{
        pressed: false
    },
    d:{
        pressed: false
    }
    
    };
    let lastKey;

//animation loop loop
function animate(){
    //console.log("test");
    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    background.update();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
    ctx.fillRect(0,0,canvas.width,canvas.height);
 

    /*
    player.velocity.x = 0;
    player.velocity.y = 0;
    if(keys.w.pressed){
        player.velocity.y = -player.movementspeed;
    }else if(keys.s.pressed){
        player.velocity.y = player.movementspeed;
    }else if(keys.a.pressed){
        player.velocity.x = -player.movementspeed;
    }else if(keys.d.pressed){
        player.velocity.x = player.movementspeed;
    }
*/
}



// event listeners for key strokes
animate();
window.addEventListener('keydown',(e)=>{
    switch(e.key){
        case'w':
           keys.w.pressed = true
            break
        case's':
            keys.s.pressed = true
            break
        case'a':
            keys.a.pressed = true
            break
        case'd':
            keys.d.pressed = true
            break
    }
});
window.addEventListener('keyup',(e)=>{
    switch(e.key){
        case'w':
            keys.w.pressed = false
            break
        case's':
            keys.s.pressed = false
            break
        case'a':
            keys.a.pressed = false
            break
        case'd':
            keys.d.pressed = false
            break
    }
});