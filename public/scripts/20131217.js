function MovingObject(canvas){
    var canvasHeight = canvas.height;
    var canvasWidth = canvas.Width;
    var canvasContext = canvas.getContext('2d');
    this.up_flag = false;
    this.down_flag = false;
    this.left_flag = false;
    this.right_flag = false;

     /* Accelerations */
    var vertical_ac = 0;
    var horizonal_ac = 0;

        /* speed */
    var vertical_speed = 0;
    var horizonal_speed = 0;
        
    var x = 0; 
    var y = 0;
    var width = 20;
    var height = 20;
    var color = "#124534";
    this.draw = function(){
        if(this.up_flag){
            vertical_ac -= 0.1;
        }
        else{
            vertical_ac = 0;
        }

        if(this.down_flag){
            vertical_ac += 0.1;
        }
        else{
            vertical_ac = 0;
        }

        if(this.left_flag){
            horizonal_ac -= 0.1;
        }
        else{
            horizonal_ax = 0;
        }

        if(this.right_flag){
            horizonal_ac += 0.1;
        }
        else{
            horizonal_ax = 0;
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
        else if(y + height >= canvasHeight)
            y = canvasHeight - height;

        x += horizonal_speed;
        if(x <= 0 || x + width >= canvasWidth) {
            horizonal_speed = 0;
            horizonal_ac = 0;
        }
        if(x <= 0) 
            x = 0;
        else if(x + width >= canvasWidth)
            x = canvasWidth - width;

        canvasContext.fillStyle = color;
        canvasContext.fillRect(x, y, width, height);
    };
}

window.onload = function(){
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var obj = new MovingObject(canvas);
    
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
                obj.left_flag = true;
                break;
            case 39://Right
                obj.right_flag = true;
                break;
            case 38://Up
                obj.up_flag = true;
                break;
            case 40://Down
                obj.down_flag = true;
                break;
            default:
                break;
        }
    };
    window.onkeyup = function(e){
        var keyCode;
        if(window.event){
            keyCode = e.keyCode;
        }
        else if(e.which){
            keyCode = e.which;
        }
        switch(keyCode){
            case 37://Left
                obj.left_flag = false;
                break;
            case 39://Right
                obj.right_flag = false;
                break;
            case 38://Up
                obj.up_flag = false;
                break;
            case 40://Down
                obj.down_flag = false;
                break;
            default:
                break;
        }
    };

    setInterval(function(){
        clearCanvas();
        obj.draw();
    }, 1000/60);
}
