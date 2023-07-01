var container = document.getElementById('container');

var Width = window.innerWidth;
var Height = window.innerHeight;

var radius = 100;
var time = 100;
var pi = Math.PI;
var red,green,blue;
function Rainbow(angle) {
    while(angle<0 || angle>=360) {
        if(angle < 0) {
            angle += 360;
        } else if(angle >= 360) {
            angle -= 360;
        }
    }

    if (angle<60) {red = 255; green = Math.round(angle*4.25-0.01); blue = 0;} else
    if (angle<120) {red = Math.round((120-angle)*4.25-0.01); green = 255; blue = 0;} else 
    if (angle<180) {red = 0, green = 255; blue = Math.round((angle-120)*4.25-0.01);} else 
    if (angle<240) {red = 0, green = Math.round((240-angle)*4.25-0.01); blue = 255;} else 
    if (angle<300) {red = Math.round((angle-240)*4.25-0.01), green = 0; blue = 255;} else 
                   {red = 255, green = 0; blue = Math.round((360-angle)*4.25-0.01);} 
    return "rgb("+red+","+green+","+blue+")";
}
/*
for(let i = 0;i<time;i++) {

    setTimeout(function () {

        var colorangle = 360/time*i;
        var angle = 2*pi/time*i;
        var sin = Math.sin(angle);
        var cos = 2*Math.cos(angle);
    
        var x = Width/2+(cos*radius);
        var y = Height/2+(sin*radius);
    
        var circle = document.createElement('div');
        circle.className += 'circle';
        circle.style.left = x+"px";
        circle.style.top = y+"px";
        var color = Rainbow(colorangle);
        console.log(color);
        circle.style.borderColor = color;
        container.appendChild(circle);
    }, i*50);

}*/

function px(px) {
    return px+"px";
}

var pingpong = document.getElementById('pingpong');
var pinginfo = {
    speed: {
        x : 0,
        y : 0
    },
    location: {
        x : Width/2,
        y : Height/2
    },
    size : 25 //radius
};

pingpong.style.width = px(2*pinginfo.size)
pingpong.style.height = px(2*pinginfo.size);
pingpong.style.margin = px(-pinginfo.size);

//Start Location
pingpong.style.left = px(Width/2);
pingpong.style.top = px(Height/2);

//set Random Speed
pinginfo.speed.x = (Math.random()*2-1);
pinginfo.speed.y = (Math.random()*2-1);

function setLocation() {
    pingpong.style.left = px(pinginfo.location.x);
    pingpong.style.top = px(pinginfo.location.y);
}

function MovePingPong() {
    var x = pinginfo.location.x+pinginfo.speed.x;
    var y = pinginfo.location.y+pinginfo.speed.y;
    var isblocked = false;
    if(x<pinginfo.size || x>Width-pinginfo.size) {
        pinginfo.speed.x *= -1;
        isblocked = true;
    }
    if(y<pinginfo.size || y>Height-pinginfo.size) {
        pinginfo.speed.y *= -1;
        isblocked = true;
    }
    if(!isblocked) {
        pinginfo.location.x = x;
        pinginfo.location.y = y;
        setLocation();
    }
}

//Repeating Function
function Start() {
    setInterval(function() {
    
        MovePingPong();
    
    },10);
}

//setting
var setting = document.getElementById('setting');
var input = {
    speed : document.getElementById('speed'),
    trace : document.getElementById('trace')
}
setting.style.left = px((Width)/2);
setting.style.top = px((Height)/2);

var check = document.getElementById('check');
check.addEventListener('click', function() {
    var multiply = input.speed.value;
    pinginfo.speed.x *= multiply;
    pinginfo.speed.y *= multiply;
    setting.style.display = "none";
    Start();
});
