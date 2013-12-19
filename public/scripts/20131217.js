//acceleration is changing
function MovingObjectAcceleration(canvas){
    var canvasHeight = canvas.height;
    var canvasWidth = canvas.width;
    var canvasContext = canvas.getContext('2d');
    var up_flag = false;
    var down_flag = false;
    var left_flag = false;
    var right_flag = false;

     /* Accelerations */
    var vertical_ac = 0;
    var horizonal_ac = 0;

        /* speed */
    var vertical_speed = 0;
    var horizonal_speed = 0;
        
    var width = 20;
    var height = 20;
    var x = (canvasWidth - width) / 2; 
    var y = (canvasHeight - height) / 2;
    var color = "#124534";

    // public methods
    //
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
        if(up_flag){
            vertical_ac -= 0.1;
            up_flag = false;
        }
        else if(down_flag){
            vertical_ac += 0.1;
            down_flag = false;
        }
        else{
            vertical_ac = 0;
        }

        if(left_flag){
            horizonal_ac -= 0.1;
            left_flag = false;
        }
        else if(right_flag){
            horizonal_ac += 0.1;
            right_flag = false;
        }
        else{
            horizonal_ac = 0;
        }

        vertical_speed += vertical_ac;
        horizonal_speed += horizonal_ac;

        y += vertical_speed;
        if(y <= 0 || y + height >= canvasHeight) {
            vertical_speed = 0;
            vertical_ac = 0;
        }
        if(y <= 0)
            y = 0;
        if(y + height >= canvasHeight)
            y = canvasHeight - height;

        x += horizonal_speed;
        if(x <= 0 || x + width >= canvasWidth) {
            horizonal_speed = 0;
            horizonal_ac = 0;
        }
        if(x <= 0) 
            x = 0;
        if(x + width >= canvasWidth)
            x = canvasWidth - width;

        canvasContext.fillStyle = color;
        canvasContext.fillRect(x, y, width, height);
    };
}

//speed is changing
function MovingObjectSpeed(canvas){
    var canvasHeight = canvas.height;
    var canvasWidth = canvas.width;
    var canvasContext = canvas.getContext('2d');
    var width = 20;
    var height = 20;
    var x = (canvasWidth - width) / 2;
    var y = (canvasHeight - height) / 2;
    var color = "#7812aa";
    var vertical_speed = 0;
    var horizonal_speed = 0;
    var step = 0.1;
    this.pressUp = function(){
        vertical_speed -= step;
    };
    this.pressDown = function(){
        vertical_speed += step;
    };
    this.pressLeft = function(){
        horizonal_speed -= step;
    };
    this.pressRight = function(){
        horizonal_speed += step;
    };
    this.draw = function(){
        x += horizonal_speed;
        if(x <= 0 || x + width >= canvasWidth) {
            horizonal_speed = 0;
        }
        if(x <= 0)
            x = 0;
        if(x + width >= canvasWidth)
            x = canvasWidth - width;
        //horizonal_speed = 0;
        y += vertical_speed;
        if(y <= 0 || y + height >= canvasHeight) {
            vertical_speed = 0;
        }
        if(y <= 0)
            y = 0;
        if(y + height >= canvasHeight)
            y = canvasHeight - height;
        //vertical_speed = 0;
        canvasContext.fillStyle = color;
        canvasContext.fillRect(x, y, width, height);
    };
}
function MovingObjectWithDefect(canvas){
    var canvasHeight = canvas.height;
    var canvasWidth = canvas.width;
    var canvasContext = canvas.getContext('2d');
    var width = 20;
    var height = 20;
    var x = (canvasWidth - width) / 2;
    var y = (canvasHeight - height) / 2;
    var color = "#2309ee";
    var step = 5;
    this.pressUp = function(){
        y -= step;
        if(y < 0) y = 0;
    };
    this.pressDown = function(){
        y += step;
        if(y > canvasHeight - height) y = canvasHeight - height;
    };
    this.pressLeft = function(){
        x -= step;
        if(x < 0) x = 0;
    };
    this.pressRight = function(){
        x += step;
        if(x > canvasWidth - width) x = canvasWidth - width;
    };
    this.draw = function(){
        canvasContext.fillStyle = color;
        canvasContext.fillRect(x, y, width, height);
    };
}

window.onload = function(){
    var canvas = document.getElementById('myCanvas');
    var objectMode = 1;

    var movingObjectAcceleration = new MovingObjectAcceleration(canvas);
    var movingObjectSpeed = new MovingObjectSpeed(canvas);
    var movingObjectDefect = new MovingObjectWithDefect(canvas);

    var button = document.getElementById('changeMode');
    var buttonText = document.getElementById('changeModeText');
    var context = canvas.getContext('2d');
    var obj = movingObjectAcceleration;
    
    var clearCanvas = function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    window.onkeydown = function(e){
        var keyCode;
        if(window.event){
            keyCode = e.keyCode;
        }
        else if(e.which){
            keyCode = e.which;
        }

        switch(keyCode){
            case 37://Left
                obj.pressLeft();
                break;
            case 39://Right
                obj.pressRight();
                break;
            case 38://Up
                obj.pressUp();
                break;
            case 40://Down
                obj.pressDown();
                break;
            default:
                break;
        }
    };
    var loopMovingObject;

    button.onclick = function(){
        var currentObjectMode = objectMode;
        switch(currentObjectMode){
            case 1:
                objectMode = 2;
                buttonText.innerText = 'Change to Mode 3';
                button.style.backgroundColor = 'Purple';
                buttonText.style.color = 'Aqua';
                obj = movingObjectSpeed;
                break;
            case 2:
                objectMode = 3;
                buttonText.innerText = 'Change to Mode 1';
                button.style.backgroundColor = 'Red';
                buttonText.style.color = 'Yellow';
                obj = movingObjectDefect;
                break;
            case 3:
                objectMode = 1;
                buttonText.innerText = 'Change to Mode 2';
                button.style.backgroundColor = 'Aqua';
                buttonText.style.color = 'Black';
                obj = movingObjectAcceleration;
                break;
            default:
                break;
        }

        clearInterval(loopMovingObject);
        loopMovingObject = setInterval(function(){
            clearCanvas();
            obj.draw();
        }, 1000/15);
    };

    loopMovingObject = setInterval(function(){
        clearCanvas();
        obj.draw();
    }, 1000/15);
}
