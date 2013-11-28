$(document).ready(function(){
    var canvas = $('#myCanvas')[0];
    var context = canvas.getContext('2d');
    var BORDER_LEFT = 40;
    var BORDER_RIGHT = 600;
    var BORDER_BOTTOM = 440;
    var BORDER_UP = 40;

    var step = {
        value: 1,
        active: false
    };
    var player = {
        color: "#00A",
        x: 40,
        y: 400,
        vX: 0,
        vY: 0,
        width: 40,
        height: 40,
        moveUp: function(){
            if(this.vY > -3)
                this.vY += -3;
            else
                this.vY = -3;
        },
        moveDown: function(){
            if(this.vY < 3)
                this.vY += 3;
            else
                this.vY = 3;
        },
        moveLeft: function(){
            if(this.vX > -3)
                this.vX += -3;
            else
                this.vX = -3;
        },
        moveRight: function(){
            if(this.vX < 3)
                this.vX += 3;
            else
                this.vX = 3;
        },
        draw: function(){
            this.x += this.vX;
            this.y += this.vY;
            if(this.x <= BORDER_LEFT) this.x = BORDER_LEFT;
            if(this.x >= BORDER_RIGHT - this.width) this.x = BORDER_RIGHT - this.width;
            if(this.y <= BORDER_UP) this.y = BORDER_UP;
            if(this.y >= BORDER_BOTTOM - this.height) this.y = BORDER_BOTTOM - this.height;
            context.fillRect(this.x, this.y, this.width, this.height);
            /*
            if(this.vX > 0)
                this.vX -= 1;
            else if(this.vX < 0)
                this.vX += 1;

            if(this.vY > 0)
                this.vY -= 1;
            else if(this.vY < 0)
                this.vY += 1;
            */
        }
    };
    window.addEventListener('keydown', function(event){
        if(event.keyCode == 37){
            //player.x = player.x <= BORDER_LEFT ? BORDER_LEFT : player.x - 4;
            player.moveLeft();
        }
        else if(event.keyCode == 39){
            //player.x = player.x >= BORDER_RIGHT - player.width ? BORDER_RIGHT - player.width : player.x + 4;
            player.moveRight();
        }
        else if(event.keyCode == 38){//UP
            player.moveUp();
        }
        else if(event.keyCode == 40){//DOWN
            player.moveDown();
        }
    }, true);

    setInterval(function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        player.draw();
    }, 1000/60);
});
