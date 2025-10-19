let h=window.innerHeight-30;
let w=window.innerWidth-30;

let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");
canvas.style.height=`${h-130}px`;
canvas.style.width=`${w-10}px`;
canvas.height=h-130;
canvas.width=w-10;

let trials;
let prob;
let unit;
let distribution=[];

function reset(){
    trials=100;
    prob=Math.round(Math.random()*100)/100;
    document.getElementById("probability").innerHTML=prob;
    unit=canvas.width/trials;
    
    distribution=[];
    for(let i=0;i<=105;i++) distribution.push(0);
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function plot(x,y,colour="red"){
    ctx.lineWidth=3;
    ctx.strokeStyle=colour;
    ctx.beginPath();
    ctx.arc(x,y,1,0,2*Math.PI);
    ctx.stroke();
}

reset();
window.setInterval(function(){
    let count=0;
    for(let i=1;i<=trials;i++){
        count+=(Math.random()<=prob);
    }
    
    distribution[count]+=6;
    plot(count*unit,canvas.height-distribution[count]);

    if(distribution[count]>=canvas.height) reset();
},50);