//initilizing variables and canvas
var ctx = document.getElementById("canvas").getContext("2d");
// var image = document.getElementById("big-owl");
var image = document.createElement("IMG");
image.src = "img/GiantOwl.png";
// document.body.appendChild(image);

//loading all things that need loading.
window.onload = function initGame(){
    ctx.drawImage(image,80,80,100,100);
}
    //VARIABLES
//Player Object holding position
var player = {
    x: 80,
    y: 80,
    mPosX: 0,
    mPosY: 0,
    lastMClickX: 0,
    lastMClickY: 0
}
//Bullet Constructor for instantiation of bullet objects
function Bullet(x, y, toX,toY) {
    this.PosX = x;
    this.PosY = y;
    this.toPosX = toX;
    this.toPosY = toY;
}
//Array of bullets to be drawn.
var drawBullets = []
//This will update the state of the world for the elapsed time since last render.
function update(progress){
//This grabs player key input and uses it for updating player position.
    document.onkeydown = function onKeyDown(e){
        console.log("hello");
        switch(e.key){
            //Key D -- RIGHT
            case "d":
                player.x +=3;
                break;
            //Key A -- LEFT
            case "a":
                player.x -=3;
                break;
            //Key S -- DOWN
            case "s":
                player.y +=3;
                break;
            //Key W -- UP
            case "w":
                player.y -=3;
                break;
        }
    }

    //Update bullets
    for(var i = 0; i < drawBullets.length; i++){
        var xPop = false;
        var yPop = false;
        console.log("Update Bullets: " + drawBullets[i] + drawBullets[i].PosY);
        if(drawBullets[i].PosX > drawBullets[i].toPosX){
            drawBullets[i].PosX = drawBullets[i].PosX - (drawBullets[i].PosX - drawBullets[i].toPosX)/32;
        }
        if(drawBullets[i].PosX < drawBullets[i].toPosX){
            drawBullets[i].PosX = drawBullets[i].PosX + (drawBullets[i].toPosX - drawBullets[i].PosX)/32;
        }
        if((drawBullets[i].PosX <= drawBullets[i].toPosX + .9 && drawBullets[i].PosX >= drawBullets[i].toPosX) || 
           (drawBullets[i].PosX >= drawBullets[i].toPosX - .9 && drawBullets[i].PosX <= drawBullets[i].toPosX)){
            console.log("MADE IT");
            xPop = true;
        }
        if(drawBullets[i].PosY > drawBullets[i].toPosY){
            drawBullets[i].PosY = drawBullets[i].PosY - (drawBullets[i].PosY - drawBullets[i].toPosY)/32;
        }
        if(drawBullets[i].PosY < drawBullets[i].toPosY){
            drawBullets[i].PosY = drawBullets[i].PosY + (drawBullets[i].toPosY - drawBullets[i].PosY)/32;
        }
        if((drawBullets[i].PosY >= drawBullets[i].toPosY && drawBullets[i].PosY <= drawBullets[i].toPosY + .9) || 
           (drawBullets[i].PosY <= drawBullets[i].toPosY && drawBullets[i].PosY >= drawBullets[i].toPosY - .9)){
            console.log("MADE IT");
            yPop = true;
        }
        if(yPop && xPop){
            drawBullets[i] = drawBullets[drawBullets.length - 1];
                drawBullets.pop();
            }
    }
}



//This will draw all of the updates to the canvas.
function draw(){
    //clearing the canvas of everything
    ctx.clearRect(0,0,800,800);

    //drawing the player to the canvas
    ctx.drawImage(image,player.x, player.y, 100,100);

    //Looping through the drawBullets array
    for(var i = 0; i < drawBullets.length; i++){
        console.log(drawBullets[i]);
        ctx.beginPath();
        ctx.arc(drawBullets[i].PosX, drawBullets[i].PosY, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}

//This will continully loop through the update and draw funtions.
function loop(timestamp) {
    //progress will be the elapsed time since last render.
    var progress = timestamp - lastRender;
    //console.log(progress);
    //updates all game variables before drawing.
    update(progress);
    //draws everything needed drawing to the canvas.
    draw();
    //while closing it checks the time for future reference.
    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}
//init lastRender, a var that holds the amount of time has ellapsed before last loop of loop.
var lastRender = 0;
//Window object represents an open window in a browser.
window.requestAnimationFrame(loop);

    
    //FUNCTIONS INVLOVED WITH UPDATING INFORMATION
//If player clicks on the canvas the event will be passed through this function.
function playerClick(event){
    console.log("X: " + event.clientX + ", and Y: " + event.clientY);
    player.lastMClickX = event.clientX;
    player.lastMClickY = event.clientY;

    var bullet = new Bullet(player.x, player.y, player.lastMClickX,player.lastMClickY);
    drawBullets.push(bullet);

    console.log(drawBullets);
    
}



