
var ctx = document.getElementById("canvas").getContext("2d");
var image = document.createElement("IMG");
image.src = "img/GiantOwl.png";


ctx.beginPath();
ctx.lineWidth = "6";
ctx.strokeStyle = "red";
ctx.rect(5, 5, 500, 500);
ctx.stroke();


console.log("STOP WATCHING ME");

function makeCircle(){
    ctx.drawImage(image,80,80,100,100);

}

document.onkeydown = function(e){

}