//initilizing variables and canvas
var ctx = document.getElementById("canvas").getContext("2d");
var image = document.createElement("IMG");
image.src = "img/GiantOwl.png";

//loading all things that need loading.
window.onload = function initGame(){
    ctx.drawImage(image,80,80,100,100);
}

//This will update the state of the world for the elapsed time since last render.
function update(progress){
//This grabs player key input and uses it for updating player position.
    document.onkeydown = function onKeyDown(e){
        console.log("hello");
        console.log(e);
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
}
    

function playerClick(event){
    console.log("X: " + event.clientX + ", and Y: " + event.clientY);
    player.lastMClickX = event.clientX;
    player.lastMClickY = event.clientY;
}
//This will draw all of the updates to the canvas.
function draw(){
    //clearing the canvas of everything
    ctx.clearRect(0,0,800,800);
    //drawing the player to the canvas
    ctx.drawImage(image,player.x, player.y, 100,100);
    //drawing a circle where the player clicks and it actually stays.
    ctx.beginPath();
    ctx.arc(player.lastMClickX, player.lastMClickY, 50, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

//This will continully loop through the update and draw funtions.
function loop(timestamp) {
    //progress will be the elapsed time since last render.
    var progress = timestamp - lastRender
    //testing
    console.log("Testing space: ")
    //updates all game variables before drawing.
    update(progress)
    //draws everything needed drawing to the canvas.
    draw()
    //while closing it checks the time for future reference.
    lastRender = timestamp
    window.requestAnimationFrame(loop)
}
//init lastRender, a var that holds the amount of time has ellapsed before last loop of loop.
var lastRender = 0
//Window object represents an open window in a browser.
window.requestAnimationFrame(loop)

//Player Object holding position
var player = {
    x: 80,
    y: 80,
    mPosX: 0,
    mPosY: 0,
    lastMClickX: 0,
    lastMClickY: 0
}



//TEST CODE FOR THE ENTIRE PAGE TO BE EFFECTED BY ONCLICK EVENTS.
// document.onclick = function(event){
//     console.log("X: " + event.clientX + ", and Y: " + event.clientY);
// }