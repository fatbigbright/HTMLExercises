$(document).ready(function(){
    var canvas = $("#myCanvas")[0];
    var context = canvas.getContext("2d");

    var LEFT_MAX = 40;
    var RIGHT_MAX = canvas.width - LEFT_MAX;
    var TOP = 40;

    var LEFT_KEY = 37;
    var RIGHT_KEY = 39;

    var player = {
        color: "#363",
        position: {
            x: 0,
            y: 0
        },
        size: {
            width: 30,
            height: 30
        },
        draw: function(){
            context.fillStyle = this.color;
            context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        }
    };


    function Bullet(axisX, axisY){
        var bullet = {
            color: "#00A",
            active: true,
            step: 3,
            position: {
                x: axisX,
                y: axisY
            },
            size: {
                width: 2,
                height: 10
            },
            draw: function(){
                context.fillStyle = this.color;
                context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
                if(this.position.y - this.step <= TOP){
                    this.active = false;
                } else {
                    this.position.y -= this.step;
                }
            }
        };
        return bullet;
    };

    var bullets = {
        allBullets: [],
        timer: 0,
        addBullet: function(bullet){
            if(this.allBullets.length <= 15 && this.timer >= 10){
                this.allBullets.push(bullet);
                this.timer = 0;
            }
            else{
                this.timer += 1;
            }
        },
        draw: function(){
            this.allBullets.forEach(function(bullet){
                bullet.draw();
            });
            if(this.allBullets.length > 0 && this.allBullets[0].active == false){
                this.allBullets.shift();
            }
        }
    };

    //initialize player
    player.position.x = 40;
    player.position.y = 400;

    $(document).keydown(function(event){
        if(event.keyCode == LEFT_KEY) {
            player.position.x = player.position.x <= LEFT_MAX ? LEFT_MAX : player.position.x - 3;
        } else if(event.keyCode == RIGHT_KEY) {
            player.position.x = player.position.x >= RIGHT_MAX - player.size.width ? RIGHT_MAX - player.size.width : player.position.x + 3;
        }
    });

    var FPS = 30;
    setInterval(function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        player.draw();
        bullets.draw();
        bullets.addBullet(Bullet(player.position.x + player.size.width/2 - 1, player.position.y - 10));
    }, 1000/FPS);
});
