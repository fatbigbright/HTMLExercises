//$(document).ready(function(){
window.onload = function(){
    //var canvas = $('#myCanvas')[0];
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    var BLOCK_WIDTH = 5;
    var BLOCK_HEIGHT = 5;

    var WIDTH = 540;
    var HEIGHT = 750;

    var MAX_AXIS_X = 108;
    var MAX_AXIS_Y = 150;

    var game = {
        currentFrame: [],
        nextFrame: [],
        aliveColor: "#125643",
        deadColor: "#bebebe",
        initWithArray: function(array){
            this.swap(this.currentFrame, array);
            this.swap(this.nextFrame, this.currentFrame);
        },
        init: function(){
            this.currentFrame = new Array();
            for(var x = 0; x < MAX_AXIS_X ; x++){
                this.currentFrame[x] = new Array();
                for(var y = 0; y < MAX_AXIS_Y; y++){
                    this.currentFrame[x][y] = Math.floor(Math.random()*20)%20 == 1 ? 1 : 0;
                }
            }
            this.swap(this.nextFrame, this.currentFrame);
        },
        draw: function(){
            for(var x = 0; x < MAX_AXIS_X ; x++){
                for(var y = 0; y < MAX_AXIS_Y; y++){
                    this.fillBlock(x, y, this.currentFrame[x][y]);
                }
            }
        },
        fillBlock: function(x, y, alive){
            if(x >= MAX_AXIS_X || y >= MAX_AXIS_Y) return;
            var realX = y * BLOCK_WIDTH;
            var realY = x * BLOCK_HEIGHT;

            context.fillStyle = alive ? this.aliveColor : this.deadColor;
            context.fillRect(realX, realY, BLOCK_WIDTH, BLOCK_HEIGHT);
        },
        swap: function(destination, source){
            for(var index = 0; index < MAX_AXIS_X; index++){
                destination[index] = source[index].slice();
            }
        },
        nextTick: function(){
            var isAroundCellAvailable = function(centerX, centerY, x, y){
                return !((x == centerX && y == centerY) || x < 0 || x >= MAX_AXIS_X || y < 0 || y >= MAX_AXIS_Y);
            };
            var getAroundAlive = function(frame, x, y){
                var aroundAlive = 0;
                for(var i = x - 1; i <= x + 1; i++){
                    for(var j = y - 1; j <= y + 1; j++){
                        if(!isAroundCellAvailable(x, y, i, j)) 
                            continue;
                        if(frame[i][j] == 1)
                            aroundAlive++;
                    }
                }
                return aroundAlive;
            };
            for(var x = 0; x < MAX_AXIS_X ; x++){
                for(var y = 0; y < MAX_AXIS_Y; y++){
                    var aroundAlive = getAroundAlive(this.currentFrame, x, y);

                    if(this.currentFrame[x][y] == 1){
                        if(aroundAlive < 2 || aroundAlive > 3)
                            this.nextFrame[x][y] = 0;
                    }
                    else{
                        if(aroundAlive >= 3)
                            this.nextFrame[x][y] = 1;
                    }
                }
            }
            
            // Copy nextFrame to currentFrame at last
            // 2-dimention array is not the same as 1-dimention!!!!
            //this.currentFrame = this.nextFrame.slice();
            this.swap(this.currentFrame, this.nextFrame);
        }
    };
    game.init();
    //game.initWithArray([[0, 0, 0], [1, 1, 1], [0, 0, 0]]);

    var axis_x = 0;
    var axis_y = 0;
    setInterval(function(){
        game.draw();
        game.nextTick();
    }, 1000/15);
};
