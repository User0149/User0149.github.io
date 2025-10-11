let h=window.innerHeight-30;
let w=window.innerWidth-30;

let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");
canvas.style.height=`${h-75}px`;
canvas.style.width=`${w-10}px`;
canvas.height=h-75;
canvas.width=w-10;

function plot(x,y,colour='red'){
    ctx.lineWidth=1;
    ctx.strokeStyle=colour;
    ctx.beginPath();
    ctx.arc(x,y,1,0,2*Math.PI);
    ctx.stroke();
}

let points=[];
function init(){
    for(let i=1;i<=1000;i++){
        points.push([Math.random()*canvas.width,Math.random()*canvas.height]);
    }
}

function s(x){ // displacement of position x at time t=0
    return canvas.width/16*Math.sin(x/(canvas.width/16));
}

let v=15; // velocity of wave (units per time)
function draw(t){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(i of points){
        let x=i[0];
        let y=i[1];
        plot(x+s(x-v*t),y);
    }
}

let time=0.0;
init();
draw(time);
setInterval(function(){
    time++;
    draw(time);
},100);
