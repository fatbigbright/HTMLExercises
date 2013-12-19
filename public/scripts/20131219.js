function MovingObjectWithDefect(canvas){
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var canvasContext = canvas.getContext('2d');
    var width = 20;
    var height = 20;
    var x = (canvasWidth - width) / 2;
    var y = (canvasHeight - height) / 2;
    var offsetX = 0;
    var offsetY = 0;
    var step = 3;
    this.pressUp = function(){
        if(y - step >= 0)
            offsetY = -step;
        else
            offsetY = 0;
    };
    this.pressDown = function(){
        if(y - height + step <= canvasHeight)
            offsetY = step;
        else
            offsetY = 0;
    };
    this.pressLeft = function(){
        if(x - step >= 0)
            offsetX = -step;
        else
            offsetX = 0;
    };
    this.pressRight = function(){
        if(x - width + step <= canvasWidth)
            offsetX = step;
        else
            offsetX = 0;
    };
    this.draw = function(){
        x += offsetX;
        offsetX = 0;
        y += offsetY;
        offsetY = 0;
        canvasContext.fillStyle = 'Purple';
        canvasContext.fillRect(x, y, width, height);
    };
}

function MovingObject(canvas){
    var canvasContext = canvas.getContext('2d');
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var width = 20;
    var height = 20;
    var x = (canvasWidth - width) / 2;
    var y = (canvasHeight - height) / 2;
    var up_flag = false;
    var down_flag = false;
    var left_flag = false;
    var right_flag = false;

    var offsetX = 0;
    var offsetY = 0;
    var step = 3;

    this.pressUp = function(){
        up_flag = true;
    };
    this.pressDown = function(){
        down_flag = true;
    };
    this.pressLeft = function(){
        left_flag = true;
    };
    this.pressRight = function(){
        right_flag = true;
    };
    this.draw = function(){
        if(up_flag)
            offsetY = -step;
        else if(down_flag)
            offsetY = step;

        if(left_flag)
            offsetX = -step;
        else if(right_flag)
            offsetX = step;

        if(x + offsetX < 0) x  = 0;
        else if(x + offsetX > canvasWidth  - width) x = canvasWidth - width;
        else x += offsetX;

        if(y + offsetY < 0) y = 0;
        else if(y + offsetY > canvasHeight - height) y = canvasHeight - height;
        else y += offsetY;

        offsetX = 0;
        offsetY = 0;
        up_flag = false;
        down_flag = false;
        left_flag = false;
        right_flag = false;

        canvasContext.fillStyle = '#672398';
        canvasContext.fillRect(x, y, width, height);
    };
}

window.onload = function(){
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    //var obj = new MovingObjectWithDefect(canvas);
    var obj = new MovingObject(canvas);

    window.onkeydown = function(e){
        var keyCode;
        if(window.event){
            keyCode = e.keyCode;
        }
        else if(e.which){
            keyCode = e.which;
        }

        switch(keyCode){
            case 37:
                obj.pressLeft();
                break;
            case 38:
                obj.pressUp();
                break;
            case 39:
                obj.pressRight();
                break;
            case 40:
                obj.pressDown();
                break;
            default:
                break;
        }
    };

    setInterval(function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        obj.draw();
    }, 1000/15);
};
