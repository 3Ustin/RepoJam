//initilizing variables and canvas
var ctx = document.getElementById("canvas").getContext("2d");
var playerImg = document.createElement("IMG");
playerImg.src = "img/GiantOwlL.png";

//loading all things that need loading.

window.onload = function initGame(){
    ctx.drawImage(playerImg,80,80);
}



//VARIABLES
//Player Object holding position
var player = {
    Health: 20,
    x: 80,
    y: 80,
    dir: "l",
    staffUp: false, 
    Rfooting: true, // for walk cycle, which footing image to go to next
    timeWalking: 0, // for walk cycle, how long til next image

    //player input data
    mPosX: 0,
    mPosY: 0,
    lastMClickX: 0,
    lastMClickY: 0,
    keysDown: []

}
//Bullet Constructor for instantiation of bullet objects
function Bullet(X, Y, toX,toY) {
    this.x = X;
    this.y = Y;
    this.tox = toX;
    this.toy = toY;
}
//Array of bullets to be drawn.
var drawBullets = [];
//A variable to hold all collisionable objects.
var collision = [];
collision.push(player);
//This will update the state of the world for the elapsed time since last render.
function update(progress){



    // player walking based off keysDown array
    if (player.keysDown.includes("d")) { // walking right / diaginal right
        if (player.keysDown.includes("w")) { 
            playerWalk("wd", "img/walkR-legL.png", "img/walkR-legR.png") 
        } else if (player.keysDown.includes("s")) {
            playerWalk("sd", "img/walkR-legL.png", "img/walkR-legR.png") 
        } else { // if d is pressed but not diaginal
            playerWalk("d", "img/walkR-legL.png", "img/walkR-legR.png") 
        }
    } else if (player.keysDown.includes("a")) { // walking left / diaginal left
        if (player.keysDown.includes("w")) {
            playerWalk("wa", "img/walkL-legL.png", "img/walkL-legR.png") 
        } else if (player.keysDown.includes("s")) {
            playerWalk("sa", "img/walkL-legL.png", "img/walkL-legR.png") 
        } else { // if a is pressed but not diaginal
            playerWalk("a", "img/walkL-legL.png", "img/walkL-legR.png") 
        }
    //Runs the collision check;    
    isCollision();
    
    } else if (player.keysDown.includes("w") && !((player.keysDown.includes("a")) || (player.keysDown.includes("d")))) { // walking up
        if (player.dir == "l") { playerWalk("w", "img/walkL-legL.png", "img/walkL-legR.png")  }
        else if (player.dir == "r") { playerWalk("w", "img/walkR-legL.png", "img/walkR-legR.png") }
    } else if (player.keysDown.includes("s") && !((player.keysDown.includes("a")) || (player.keysDown.includes("d")))) { // walking up
        if (player.dir == "l") { playerWalk("s", "img/walkL-legL.png", "img/walkL-legR.png")  }
        else if (player.dir == "r") { playerWalk("s", "img/walkR-legL.png", "img/walkR-legR.png") }
    }
    
    
    

    //This forLoop's job is to update the bullet's and do everything relating to bullets. 
    //  For now this just means to make the bullets move toward a clicked point,
    //  and stop. Then it re-stores the last spot in the array then pops it.
    for(var i = 0; i < drawBullets.length; i++){
        //xPop and yPop are boolean variables seeking to ask if the current drawBullet should be popped.
        var xPop = false;
        var yPop = false;

        //FOR TESTING ::: console.log("Update Bullets: " + drawBullets[i] + drawBullets[i].y);

        //If the bullet needs to go down make it go down.
        if(drawBullets[i].x > drawBullets[i].tox){
            //I think these are linear, but I x and tox are different variables. 
            drawBullets[i].x = drawBullets[i].x - (drawBullets[i].x - drawBullets[i].tox)/32;
        }
        //If we are lower than where we need to go, go up.
        if(drawBullets[i].x < drawBullets[i].tox){
            drawBullets[i].x = drawBullets[i].x + (drawBullets[i].tox - drawBullets[i].x)/32;
        }
        //Check to see if we are at a logical stopping point. AKA close enough to the finish line.
        if((drawBullets[i].x <= drawBullets[i].tox + .9 && drawBullets[i].x >= drawBullets[i].tox) || 
            (drawBullets[i].x >= drawBullets[i].tox - .9 && drawBullets[i].x <= drawBullets[i].tox)){
            xPop = true;
        }
        //If we are higher than where we need to go, go down.
        if(drawBullets[i].y > drawBullets[i].toy){
            drawBullets[i].y = drawBullets[i].y - (drawBullets[i].y - drawBullets[i].toy)/32;
        }
        //If we are lower than where we need to go, go up.
        if(drawBullets[i].y < drawBullets[i].toy){
            drawBullets[i].y = drawBullets[i].y + (drawBullets[i].toy - drawBullets[i].y)/32;
        }
        //Check to see if we are at a logical stopping point. AKA close enough to the finish line.
        if((drawBullets[i].y >= drawBullets[i].toy && drawBullets[i].y <= drawBullets[i].toy + .9) || 
            (drawBullets[i].y <= drawBullets[i].toy && drawBullets[i].y >= drawBullets[i].toy - .9)){
            yPop = true;
        }
        //Check to see if we are at a logical stopping point. AKA close enough to the finish line.
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

    ctx.font = "30px Arial";
    ctx.fillText(player.keysDown, 10, 50); 


    //drawing the player to the canvas
    if (player.staffUp) {
        ctx.drawImage(playerImg,player.x, player.y-94);
    } else { ctx.drawImage(playerImg,player.x, player.y); }

    //Looping through the drawBullets array
    for(var i = 0; i < drawBullets.length; i++){
        //console.log(drawBullets[i]);
        ctx.beginPath();
        ctx.arc(drawBullets[i].x, drawBullets[i].y, 5, 0, 2 * Math.PI);
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

    player.staffUp = true;
    // depending on which dir character is facing, change image to match
    if (player.dir == "l") {
        playerImg.src = "img/staffUP-GiantOwlL.png"
    } if (player.dir == "r") { 
        playerImg.src = "img/staffUP-GiantOwlR.png"
    }

    // after some time, stop the staff going up
    setTimeout( () => {
        player.staffUp = false;

        if (player.dir == "l") {
            playerImg.src = "img/GiantOwlL.png"
        } if (player.dir == "r") { 
            playerImg.src = "img/GiantOwlR.png"
        }
      }, 250); // 1/4 a millasec

    //check if bits change;
    changeBits();



    // create bullets
    console.log("X: " + event.clientX + ", and Y: " + event.clientY);
    player.lastMClickX = event.clientX;
    player.lastMClickY = event.clientY;
    // create bullet bases on direction owl is facing
    if (player.dir == "l") {
        var bullet = new Bullet(player.x, player.y, player.lastMClickX, player.lastMClickY);
    } else if (player.dir == "r") {
        var bullet = new Bullet(player.x+259, player.y, player.lastMClickX, player.lastMClickY);
    }

    //Bullets being checked on collision
    collision.push(bullet);
    //Bullets being pushed to the draw function.
    drawBullets.push(bullet);

    console.log(drawBullets);
    
}

function isCollision(){
    console.log("collisionIsRunnging");
    for(var i = 0; i<collision.length;i++){
        var iX = collision[i].x
        var iY = collision[i].y
        for(var j = 0; j < collision.length; j++){
            var jX = collision[j].x;
            var jY = collision[j].y;
            if(iX == jX && iY == jY){
                console.log(collision[i], " :Is Colliding with: ", collision[j])
            }
        }
    }
}

function changeBits(){
    var bits = document.getElementById("bits");
    bits.innerText = parseInt(bits.innerText) - 1;
    if(bits.innerText == "0"){
        console.log("here");
        restartGame();
    }
}

function restartGame(){
    ctx.clearRect(0,0,800,800);
    ctx.drawImage(playerImg,80,80,100,100);
    drawBullets = [];
    collision = [];
    player.Health = 20;
    var bits = document.getElementById("bits");
    bits.innerText = player.Health;
    player.x = 80;
    player.y = 80;
    player.mx = 0;
    player.my = 0;
    player.lastMClickX = 0;
    player.lastMClickY =  0;
    player.dir = "r";
    player.staffUp = false;
    player.Rfooting =  true;
    player.timeWalking = 0;
}













function playerWalk(direction, imgSrcLegL, imgSrcLegR) {
    // walking animation
    player.timeWalking += 1;
    if (player.timeWalking >= 3) { 
        player.timeWalking = 0;
        if (player.Rfooting) { player.Rfooting = false} else { player.Rfooting = true}
        // console.log("change dir to: " + player.Rfooting)
    }
    if (player.Rfooting && !player.staffUp) { playerImg.src = imgSrcLegR
    } else if (!player.Rfooting && !player.staffUp) { playerImg.src = imgSrcLegL }

    if (direction == "d") { player.dir = "r"; player.x +=3; } 
    else if (direction == "a") {  player.dir = "l"; player.x -=3; }
    else if (direction == "w") {  player.y -=3; }
    else if (direction == "s") {  player.y +=3; }
    // diagnal directions
    if (direction == "wd") { player.dir = "r"; player.x +=3; player.y -=3; }
    else if (direction == "wa") {  player.dir = "l"; player.x -=3; player.y -=3; }
    else if (direction == "sd") {  player.dir = "r"; player.x +=3; player.y +=3; }
    else if (direction == "sa") {  player.dir = "l"; player.x -=3; player.y +=3; }
}



// player input, update the players' keysDown array (used for drawing image of player)
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
function onKeyDown(e){ 
    if (e.key == "d" && !player.keysDown.includes("d") && !player.keysDown.includes("a"))  { player.dir = "r"; player.keysDown.push("d"); }
    if (e.key == "a" && !player.keysDown.includes("a") && !player.keysDown.includes("d")) { player.dir = "l"; player.keysDown.push("a"); }
    if (e.key == "s" && !player.keysDown.includes("s") && !player.keysDown.includes("w")) { player.keysDown.push("s"); }
    if (e.key == "w" && !player.keysDown.includes("w") && !player.keysDown.includes("s")) { player.keysDown.push("w"); }
}
function onKeyUp(e){ // if key is up take it out of the keysDown array
    if (e.key == "d") { if (player.keysDown.includes("d")) { player.keysDown.splice(player.keysDown[player.keysDown.indexOf("d")], 1); player.keysDown.splice(player.keysDown[player.keysDown.indexOf("d")], 1);}
    } if (e.key == "a") { if (player.keysDown.includes("a")) { player.keysDown.splice(player.keysDown[player.keysDown.indexOf("a")], 1); player.keysDown.splice(player.keysDown[player.keysDown.indexOf("a")], 1);}
    } if (e.key == "s") { if (player.keysDown.includes("s")) { player.keysDown.splice(player.keysDown[player.keysDown.indexOf("s")], 1); player.keysDown.splice(player.keysDown[player.keysDown.indexOf("s")], 1);}
    } if (e.key == "w") {if (player.keysDown.includes("w")) { player.keysDown.splice(player.keysDown[player.keysDown.indexOf("w")], 1); player.keysDown.splice(player.keysDown[player.keysDown.indexOf("w")], 1);}
    }
}