function circle(canvas, x, y, radius, color, mass){
    var context = canvas.getContext('2d');
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var gradient;
    var speed_x = 0;
    var speed_y = 0;
    var up_flag = false;
    var down_flag = false;
    var left_flag = false;
    var right_flag = false;
    var step = 0.3;
    var MAX_SPEED = 3;
    var MAX_SPEED_X = MAX_SPEED;
    var MIN_SPEED_X = -MAX_SPEED;
    var MAX_SPEED_Y = MAX_SPEED;
    var MIN_SPEED_Y = -MAX_SPEED;
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.mass = mass;
    this.getOriginalForce = function(speed){
        speed_x = speed.x;
        speed_y = speed.y;
    };
    this.massEffect = function(g_x, g_y){
        speed_x += g_x;
        speed_y += g_y;
    };
    /*
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
    */
    this.draw = function(){
        if(up_flag){
            speed_y += -step; 
            up_flag = false;
        }
        if(down_flag){
            speed_y += step;
            down_flag = false;
        }
        if(left_flag){
            speed_x += -step;
            left_flag = false;
        }
        if(right_flag){
            speed_x += step;
            right_flag = false;
        }

        if(speed_x <= MIN_SPEED_X) speed_x = MIN_SPEED_X; 
        if(speed_x >= MAX_SPEED_X) speed_x = MAX_SPEED_X;
        if(speed_y <= MIN_SPEED_Y) speed_x = MIN_SPEED_Y;
        if(speed_y >= MAX_SPEED_Y) speed_y = MAX_SPEED_Y;

        this.x += speed_x;
        this.y += speed_y;

        if(this.x - this.radius <= 0) {
            this.x = this.radius;
            speed_x = 0;
        }
        if(this.x + this.radius >= canvasWidth) {
            this.x = canvasWidth - this.radius;
            speed_x = 0;
        }
        if(this.y - this.radius <= 0){
            this.y = this.radius;
            speed_y = 0;
        }
        if(this.y + this.radius >= canvasHeight){
            this.y = canvasHeight - this.radius;
            speed_y = 0;
        }

        gradient = context.createLinearGradient(this.x - this.radius/2, this.y - this.radius/2, this.x + this.radius/2, this.y + this.radius/2);
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(1, color);
        
        context.fillStyle = gradient;
        context.beginPath();
        //x, y,radius, startAngle, endAngle, counterclockwise
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    };
}

window.onload = function(){
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var gravity = function(star, planet){
        var G = 6.67;
        var deltaX = star.x - planet.x;
        var deltaY = star.y - planet.y;
        var distanceSquare = deltaX * deltaX + deltaY * deltaY;
        var distance = Math.sqrt(distanceSquare);
        var gravity_factor = G * star.mass / (distanceSquare * distance);
        var g_planet_x = deltaX * gravity_factor;
        var g_planet_y = deltaY * gravity_factor;

        planet.massEffect(g_planet_x, g_planet_y);
    };

    var circle1 = new circle(canvas, canvasWidth/2 - 40, canvasHeight/2 - 100, 10, '#0000FF', 1);
    var sun = new circle(canvas, canvasWidth/2, canvasHeight/2, 20, 'yellow', 88);

    circle1.getOriginalForce({ x: 2.4, y: 0});
    /*
    window.onkeydown = function(e){
        var keyCode;
        if(window.event){
            keyCode = e.keyCode;
        }else if(e.which){
            keyCode = e.which;
        }

        switch(keyCode){
            case 37:
                circle1.pressLeft();
                break;
            case 38:
                circle1.pressUp();
                break;
            case 39:
                circle1.pressRight();
                break;
            case 40:
                circle1.pressDown();
                break;
            default:
                break;
        }
    };
    */

    setInterval(function(){
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        //context.save();
        gravity(sun, circle1);
        sun.draw();
        circle1.draw();
    }, 1000/30);
    circle1.draw();
};
