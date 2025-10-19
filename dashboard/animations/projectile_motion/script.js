let h=window.innerHeight-30;
let w=window.innerWidth-30;

let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");
canvas.style.height=`${h-75}px`;
canvas.style.width=`${w-10}px`;
canvas.height=h-75;
canvas.width=w-10;

let launcher=[0,canvas.height];
let g=9.8;
let fps=100;
let projectiles=[]; // x,y,dx,dy,colour,out of bounds

function random_colour(){
    let r=Math.floor(Math.random()*256);
    let g=Math.floor(Math.random()*256);
    let b=Math.floor(Math.random()*256);

    return 'rgb('+r+','+g+','+b+')';
}

function plot(x,y,colour,radius=1){
    ctx.lineWidth=1;
    ctx.strokeStyle=colour;
    ctx.beginPath();
    ctx.arc(x,y,radius,0,2*Math.PI);
    ctx.stroke();

    ctx.fillStyle=colour;
    ctx.fill();
}

function fire(i){
    plot(i[0],i[1],i[4]);
    i[0]+=i[2];
    i[1]+=i[3];
    i[3]+=(1/fps)*(g/fps);

    if(i[0]>=canvas.width || i[0]<=0 || i[1]>=canvas.height) return 0;
    return 1;
}

function generate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    projectiles=[];
    launcher=[Math.random()*canvas.width,Math.random()*canvas.height];

    let rockets=100;
    let prob_up=1;
    let max_height=launcher[1];

    for(let i=1;i<=rockets;i++){
        let angle=Math.random()*(Math.PI/2);
        let max_velocity=Math.sqrt(2*g*max_height)/Math.sin(angle);
        let velocity=Math.random()*max_velocity; // distance/second 
        
        let x=launcher[0];
        let y=launcher[1];
        let dx=Math.cos(angle)*(Math.random()>0.5?1:-1);
        let dy=Math.sin(angle)*(Math.random()<prob_up?-1:1);
        dx*=velocity/fps;
        dy*=velocity/fps;

        projectiles.push([x,y,dx,dy,random_colour(),0]);        
    }
}

setInterval(function(){
    let active=0;
    for(let i of projectiles) active+=fire(i);
    if(active==0) generate();

    plot(launcher[0],launcher[1],"red",15);
},1000/fps);