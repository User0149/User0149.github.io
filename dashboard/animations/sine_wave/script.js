let h=window.innerHeight-30;
let w=window.innerWidth-30;

let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");
canvas.style.height=`${h-75}px`;
canvas.style.width=`${w-10}px`;
canvas.height=h-75;
canvas.width=w-10;

let unit=Math.min(canvas.height,canvas.width)/4; // [-2,2]
let centre_x=canvas.width/2;
let centre_y=canvas.height/2;
let max_x=(canvas.width/(2*unit)); // max_y=2

function draw_node(x,y,colour="red",radius=1,fill=0){
    ctx.lineWidth=1;
    ctx.strokeStyle=colour;
    ctx.beginPath();
    ctx.arc(x,y,radius,0,2*Math.PI);
    ctx.stroke();

    ctx.fillStyle=colour;
    if(fill) ctx.fill();
}

function draw_line(a,b,width=0.5,colour="black"){
    ctx.lineWidth=width;
    ctx.strokeStyle=colour;
    ctx.beginPath();
    ctx.moveTo(a[0],a[1]);
    ctx.lineTo(b[0],b[1]);
    ctx.stroke();
}

let plane=-1;
function draw_plane(){
    // grid
    for(let x=centre_x+unit/5;x<=canvas.width;x+=unit/5){
        draw_line([x,0],[x,canvas.height]);
    }
    for(let x=centre_x-unit/5;x>=0;x-=unit/5){
        draw_line([x,0],[x,canvas.height]);
    }

    for(let y=centre_y+unit/5;y<=canvas.height;y+=unit/5){
        draw_line([0,y],[canvas.width,y]);
    }
    for(let y=centre_y-unit/5;y>=0;y-=unit/5){
        draw_line([0,y],[canvas.width,y]);
    }

    draw_line([centre_x,0],[centre_x,canvas.height],1.5);
    draw_line([0,centre_y],[canvas.width,centre_y],1.5);

    // circle
    draw_node(centre_x+unit,centre_y,"blue",unit);

    plane=ctx.getImageData(0,0,canvas.width,canvas.height);
}

let theta=0;
let inc=0.01;
draw_plane();
setInterval(function(){
    ctx.putImageData(plane,0,0);

    draw_node((centre_x+unit)+Math.cos(theta)*unit,centre_y-Math.sin(theta)*unit,"green",2,1);
    draw_line([(centre_x+unit)+unit*Math.cos(theta),centre_y-unit*Math.sin(theta)],[centre_x,centre_y-unit*Math.sin(theta)],1,"green"); // horizontal
    draw_line([centre_x+unit,centre_y],[(centre_x+unit)+unit*Math.cos(theta),centre_y-unit*Math.sin(theta)],1); // diagonal
    for(let x=-max_x;x<0;x+=inc){
        if(theta>=-x){
            let y=Math.sin(x+theta);
            draw_node(centre_x+unit*x,centre_y-unit*y,"red",1,1);
        }
    }

    theta+=inc;
},15);