const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
//(0,0 is top left)
//initializze canvas to screen size need to update on game loop (if users changes window size)
fitCanvas();
function fitCanvas(){
    //canvas.width = window.innerWidth;
    //canvas.height = window.innerHeight;
    canvas.width = 950;
    canvas.height = 720;
}

// set screen to blac for testing
ctx.fillRect(0,0,canvas.width,canvas.height);

//using classes since it makes sense for games (es6 version)
class Sprite{
    //for now make box but late load in images
    
    constructor({position,velocity}){
        this.position = position;
        this.velocity = velocity;
        this.height = 100;
        this.width = 100;
        this.movementspeed = 4 

    }
    draw(){
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x,this.position.y,50,100)

    }
    update(){
        this.draw();
        // update with mouse velocity
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if(this.position.x + this.width >= canvas.width){

            
        }
        if(this.position.y + this.height >= canvas.height){


        }

    }

}
const player = new Sprite({
    position:{
        x:0,
        y:0
    },
    velocity:{
        x:0,
        y:0
    }
})
const enemy = new Sprite({
    position:{
        x:500,
        y:500
    },
    velocity:{
        x:0,
        y:0
    }
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
    ctx.fillRect(0,0,canvas.width,canvas.height);
    player.update();
    enemy.update();
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