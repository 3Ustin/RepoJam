
var ctx = document.getElementById("canvas").getContext("2d");
// var image = document.getElementById("big-owl");
var image = document.createElement("IMG");
image.src = "img/GiantOwl.png";
// document.body.appendChild(image);


// draw border
ctx.beginPath();
ctx.lineWidth = "6";
ctx.strokeStyle = "red";
ctx.rect(5, 5, 500, 500);
ctx.stroke();


// window.onload = function initGame() {
//     ctx.drawImage(image,80,80,100,100);
// }

window.onload = function initGame() {
    ctx.drawImage(image,80,80,100,100);
}




// function testDrawImage() {
//     ctx.drawImage(image,80,80,100,100);
// }

// initalize owl
// setTimeout(testDrawImage, 3000)
// ctx.drawImage(image,80,80,100,100);
testDrawImage2()


console.log("STOP WATCHING ME");

function makeCircle () {
  ctx.drawImage(image,80,80,100,100);

}

document.onkeydown = function(e){
    switch(e.key){
        //Key D -- RIGHT
        case 68:

            break;
        //Key A -- LEFT
        case 65:

            break;
        //Key S -- DOWN
        case 83:

            break;
        //Key W -- UP
        case 87:

            break;
    }
}