let h=window.innerHeight-80;
let w=window.innerWidth-30;    
let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");
canvas.style.height=`${h-75}px`;
canvas.style.width=`${w-10}px`;
canvas.height=h-75;
canvas.width=w-10;

let unit=Math.min(canvas.height,canvas.width)/2-1;
let centre_x=canvas.width/2;
let centre_y=canvas.height/2;

function coord(a){ // Cartesian to canvas coordinates
    let x=a[0];
    let y=a[1];
    x=centre_x+x*unit;
    y=centre_y-y*unit;
    return [x,y];
}

function generate(){
    ctx.strokeStyle="black";
    ctx.beginPath();
    ctx.arc(centre_x,centre_y,unit,0,2*Math.PI); // unit circle
    ctx.stroke();
}

function line(a,b,colour="black"){
    a=coord(a);
    b=coord(b);

    ctx.strokeStyle=colour;
    ctx.beginPath();
    ctx.moveTo(a[0],a[1]); 
    ctx.lineTo(b[0],b[1]);
    ctx.stroke();
}

generate();
let circle=ctx.getImageData(0,0,canvas.width,canvas.height);
let cur_chord=-1;

let a=-1;
let b=-1;
function chord(){
    a=Math.random()*2*Math.PI;
    b=Math.random()*2*Math.PI;
    line([Math.cos(a),Math.sin(a)],[Math.cos(b),Math.sin(b)]);
}

function unreflex(angle){
    if(angle>=180) angle=360-angle;
    return angle;
}

let deg=360;

function subtend(){
    let x=Math.cos(Math.PI*deg/180);
    let y=Math.sin(Math.PI*deg/180);
    line([x,y],[Math.cos(a),Math.sin(a)],"red");
    line([x,y],[Math.cos(b),Math.sin(b)],"red");

    document.getElementById('angle').innerHTML=unreflex(Math.round(Math.abs(180*(Math.atan2(Math.sin(a)-y,Math.cos(a)-x)-Math.atan2(Math.sin(b)-y,Math.cos(b)-x))/Math.PI)));
}

setInterval(function(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(deg==360){
        ctx.putImageData(circle,0,0);
        chord();
        cur_chord=ctx.getImageData(0,0,canvas.width,canvas.height);

        deg=0;
    }
    else{
        ctx.putImageData(cur_chord,0,0);
        subtend();
        deg++;
    }
},20);