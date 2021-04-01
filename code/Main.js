function makeCircle(element){
    var ctx = element.getContext("2d");
    
    ctx.beginPath();
    ctx.lineWidth = "6";
    ctx.strokeStyle = "red";
    ctx.rect(5, 5, 290, 140);
    ctx.stroke();
}