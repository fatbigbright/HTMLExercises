window.onload = function(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    ctx.fillStyle = "red";
    ctx.fillRect(20, 20, 75, 50);
    ctx.globalCompositeOperation="source-over";
    ctx.fillStyle = "blue";
    ctx.fillRect(50, 50, 75, 50);

    ctx.fillStyle = "red";
    ctx.fillRect(150, 20, 75, 50);
    ctx.globalCompositeOperation="destination-over";
    ctx.fillStyle = "blue";
    ctx.fillRect(180, 50, 75, 50);
    ctx.globalCompositeOperation="destination-over";
    ctx.fillStyle = "Teal";
    ctx.fillRect(200, 60, 75, 50);
};
