window.onload = function () {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    var player = {
        color: "#00A",
        x: 0,
        y: 0,
        factor: 1,
        width: 32, 
        height: 32,
        draw: function(){
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        },
        update: function(){
            if( this.x > 400 || this.y > 400){
                this.factor = -1;
            }
            if( this.x < 40 || this.y < 40) {
                this.factor = 1;
            }
            this.x += this.factor;
            this.y += this.factor;
        }
    };
    //set up initial position
    player.x = 40;
    player.y = 40;

    var FPS = 30;
    setInterval(function(){
        //draw
        (function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            player.draw();
        })();

        //update
        (function () {
            player.update();
        })();
    }, 1000/30);
};
