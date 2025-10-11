let h=window.innerHeight-30;
let w=window.innerWidth-30;

let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");
canvas.style.height=`${h-75}px`;
canvas.style.width=`${w-10}px`;
canvas.height=h-75;
canvas.width=w-10;

let balls=[];
let ticks=1000000000;

function plot(x,y,colour="red",radius=1){
    ctx.lineWidth=1;
    ctx.strokeStyle=colour;
    ctx.beginPath();
    ctx.arc(x,y,radius,0,2*Math.PI);
    ctx.stroke();

    ctx.fillStyle=colour;
    ctx.fill();
}

function random_colour(){
    let r=Math.floor(Math.random()*256);
    let g=Math.floor(Math.random()*256);
    let b=Math.floor(Math.random()*256);

    return 'rgb('+r+','+g+','+b+')';
}

function new_ball(){
    let x=Math.floor(Math.random()*canvas.width);
    let y=Math.floor(Math.random()*canvas.height);

    let dx=(Math.random()>0.5?1:-1);
    let dy=(Math.random()>0.5?1:-1)*Math.random();
    if(Math.random()>0.5) dy=1/dy;

    let dist=Math.sqrt(dx*dx+dy*dy);
    let dilate=1/dist;
    dx*=dilate;
    dy*=dilate;

    balls.push([[x,y],[dx,dy],random_colour()]);
}

function move_balls(){
    for(i of balls){
        let x=i[0][0];
        let y=i[0][1];
        let dx=i[1][0];
        let dy=i[1][1];

        plot(x,y,i[2]);
        x+=dx;
        y+=dy;
        if(x>=canvas.width || x<=0) dx*=-1;
        if(y>=canvas.height || y<=0) dy*=-1;

        i[0][0]=x;
        i[0][1]=y;
        i[1][0]=dx;
        i[1][1]=dy;
    }
}

let interval=5;
setInterval(function(){
    if(ticks>=1000/interval){
        ticks=0;
        new_ball();
    }
    ticks++;

    move_balls();
},interval);