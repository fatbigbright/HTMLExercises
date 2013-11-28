$(document).ready(function(){
    var canvas = $('#myCanvas')[0];
    var context = canvas.getContext('2d');

    var LEFT_MAX = 40;
    var RIGHT_MAX = 600;
    var BORDER_UP = 20;

    function Player(){
        var localPlayer = {
            color: "#00A",
            x: 40,
            y: 400,
            width: 30,
            height: 30,
            draw: function(){
                context.fillStyle = this.color;
                context.fillRect(this.x, this.y, this.width, this.height);
            }
        };
        return localPlayer;
    };
    function Bullet(initX, initY){
        var localBullet = {
            color: "#000",
            active: true,
            x: initX,
            y: initY,
            width: 2,
            height: 15,
            draw: function(){
                if (this.active == true){
                    context.fillStyle = this.color;
                    context.fillRect(this.x, this.y, this.width, this.height);
                }
                if (this.y <= BORDER_UP){
                    this.active = false;
                } else {
                    this.y -= 3;
                }
            }
        };
        return localBullet;
    };


    var player = Player();
    var bullets = {
        localBullets: [],
        timer: 0,
        draw: function(){
            this.localBullets.forEach(function(bullet){
                bullet.draw();
            });
            if (this.localBullets.length > 0 && this.localBullets[0].active == false){
                this.localBullets.shift();
            }
            if (this.timer >= 15){
                this.localBullets.push(Bullet(player.x + player.width/2 - 1, player.y - 10));
                this.timer = 0;
            }else{
                this.timer++;
            }
        }
    };

    $(document).keydown(function(event){
        if(event.keyCode == 37){ //LEFT
            player.x = player.x <= LEFT_MAX ? LEFT_MAX : player.x - 5;
        }
        else if(event.keyCode == 39){ //RIGHT
            player.x = player.x + player.width >= RIGHT_MAX ? RIGHT_MAX - player.width : player.x + 5;
        }
    });

    var FPS = 30;
    setInterval(function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        player.draw();
        bullets.draw();
    }, 1000/30);
});
