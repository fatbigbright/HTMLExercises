window.onload = function() {
    var canvas = document.getElementById("myCanvas");
    if(!canvas)return;

    var context = canvas.getContext("2d");
    var FPS = 30;
    var textX = 50;
    var textY = 50;
    var factor = 1;
    var update = function(){
        if(textX >= canvas.width - 100 || textY >= canvas.height - 100){
            factor = -1;
        }
        if(textX <= 0 || textY <= 0){
            factor = 1;
        }

        textX += factor;
        textY += factor;
    };
    var draw = function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#5a6f8f";
        context.font = "30px Verdana";
        context.fillText("Hello Anima!", textX, textY);
    };
    setInterval(function (){
        update();
        draw();
    }, 1000/FPS);
};
