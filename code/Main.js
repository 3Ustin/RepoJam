
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
    switch(e.keyCode){
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