$(document).ready(function(){
    var canvas = $("#myCanvas")[0];
    var context = canvas.getContext("2d");

    var LEFT_MAX = 40;
    var RIGHT_MAX = 600;


    var bullets = [];

    var player = {
        position: {
            x: LEFT_MAX,
            y: 400
        },
        size: {
            width: 30,
            height: 30
        },
        color: "#00A",
        draw: function(){
            context.fillStyle = this.color;
            context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        }
    };

    function Bullet(){
        var bullet = {
            color: "black",
            active: true,
            position: {
                x: player.position.x + 14,
                y: player.position.y - 10
            },
            size: {
                width: 2,
                height: 10
            },
            draw: function(){
                context.fillStyle = this.color;
                context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
            }
        };
        return bullet;
    };

    bullets.push(Bullet());

    var LEFT_KEY = 37;
    var RIGHT_KEY = 39;
    $(document).keydown(function(event){
        if(event.keyCode == LEFT_KEY){
            player.position.x = player.position.x <= LEFT_MAX ? LEFT_MAX : player.position.x - 3;
        } else if(event.keyCode == RIGHT_KEY){
            player.position.x = player.position.x + player.size.width >= RIGHT_MAX ? RIGHT_MAX - player.size.width : player.position.x + 3;
        }
    });

    var FPS = 30;
    setInterval(function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        player.draw();

        (function () {
            bullets.forEach(function(bullet){
                bullet.draw();
                bullet.position.y -= 1;
                if (bullet.position.y <= 50)
                    bullet.active = false;
            });
            if (bullets.length > 0 && bullets[0].active == false){
                //delete the first element if inactive
                bullets.shift();
                bullets.push(Bullet());
            }
        })();
    }, 1000/FPS);
});
