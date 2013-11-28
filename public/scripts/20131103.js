$(document).ready(function(){
    var canvas = $("#myCanvas");

    //pay attention to "get(0)"
    var context = canvas.get(0).getContext("2d");

    var player = {
        color: "#00B",
        position: {
            x: 40,
            y: 40
        },
        size: {
            width: 30,
            height: 30
        },
        draw: function(){
            context.fillStyle = this.color;
            context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        },
        update: function(){
        }
    };

    var LEFT_KEY = 37;
    var RIGHT_KEY = 39;

    $(document).keydown(function(event){
        if(event.keyCode == RIGHT_KEY){
            player.position.x = player.position.x > 500 ? player.position.x : player.position.x + 5;
        }
        else if(event.keyCode == LEFT_KEY){
            player.position.x = player.position.x < 40 ? 40 : player.position.x - 5;
        }
    });

    var FPS = 30;
    setInterval(function(){
        // $("#myCanvas") get a set of elements, not the canvas itself
        context.clearRect(0, 0, canvas[0].width, canvas[0].height);
        player.update();
        player.draw();
    }, 1000/FPS);

});
