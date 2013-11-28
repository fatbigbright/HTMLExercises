$(document).ready(function (){
    var canvas = $("#myCanvas")[0];
    var context = canvas.getContext("2d");

    var player = {
        color: "#3300BB",
        position: {
            x: 40,
            y: 400
        },
        size: {
            width: 30, 
            height: 30
        },
        draw: function() {
            context.fillStyle = this.color;
            context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        },
        update: function() {
        }
    };

    //define Bullet class
    function Bullet() {
        var bullet = {
            color: "#000",
            active: true,
            position: {
                x: player.position.x + 14,
                y: player.position.y - 10 
            },
            size: {
                width: 2,
                height: 10
            },
            draw: function() {
                if(this.active == true){
                    context.fillStyle = this.color;
                    context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
                }
            },
            update: function() {
            }
        };
        return bullet;
    };

    var bullets = [];
    bullets.push(Bullet());

    var LEFT_MAX = 40;
    var RIGHT_MAX = canvas.width - LEFT_MAX - player.size.width;

    var LEFT_KEY = 37;
    var RIGHT_KEY = 39;
    var SPACE_KEY = 32;
    $(document).keydown(function (event) {
        if(event.keyCode == LEFT_KEY){
            player.position.x = player.position.x <= LEFT_MAX ? LEFT_MAX : player.position.x - 3;
        }
        else if(event.keyCode == RIGHT_KEY){
            player.position.x = player.position.x >= RIGHT_MAX ? RIGHT_MAX : player.position.x + 3;
        }
        else if(event.keyCode == SPACE_KEY){
        }
    });
    var FPS = 60;
    setInterval(function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        player.draw();
        
        //shooting bullets
        (function(){
            bullets.forEach(function(bullet){
                bullet.draw();
                bullet.position.y -= 1;
                if(bullet.position.y <= 50){
                    bullet.active = false;
                }
            });
        })();

    }, 1000/FPS);
});
