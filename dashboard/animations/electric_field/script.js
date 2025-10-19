let h=window.innerHeight-30;
let w=window.innerWidth-30;

let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");
canvas.style.height=`${h-75}px`;
canvas.style.width=`${w-10}px`;
canvas.height=h-75;
canvas.width=w-10;

let charges=[];

function plot(x,y,colour,radius=1){
    ctx.lineWidth=1;
    ctx.strokeStyle=colour;
    ctx.beginPath();
    ctx.arc(x,y,radius,0,2*Math.PI);
    ctx.stroke();

    ctx.fillStyle=colour;
    ctx.fill();
}

function calc_force(x,y,charge){
    let dx=x-charge[0];
    let dy=y-charge[1];
    dx*=charge[2];
    dy*=charge[2];

    let dist=Math.sqrt(dx*dx+dy*dy);
    if(dist==0) return [0,0];
    let magnitude=1/(dx*dx+dy*dy);

    let dilation=magnitude/dist;

    dy*=dilation;
    dx*=dilation;

    return [dx,dy];
}

function draw_field(x,y){
    let unit=10;
    for(let i=1;i<=10;i++){
        plot(x,y,"black",0.1);

        let force_x=0;
        let force_y=0;
        for(let i of charges){
            let force=calc_force(x,y,i);
            force_x+=force[0];
            force_y+=force[1];
        }
        let dist=Math.sqrt(force_x*force_x+force_y*force_y);
        let dilation=unit/dist;
        force_x*=dilation;
        force_y*=dilation;

        x+=force_x;
        y+=force_y;
    }
}


function generate(){
    charges=[];
    ctx.clearRect(0,0,canvas.width,canvas.height);

    let num=Math.floor(Math.random()*10)+1;
    for(let i=0;i<=num-1;i++){
        charges.push([Math.random()*canvas.width,Math.random()*canvas.height,Math.random()>0.5?1:-1]);
        plot(charges[i][0],charges[i][1],charges[i][2]==1?"red":"blue",5);
    }

    // draw field
    for(let i of charges){
        let x=i[0];
        let y=i[1];
        if(i[2]==1){ // positive
            let trials=20;
            for(let i=1;i<=trials;i++){
                let start_x=Math.random()*10+(x-5); // [x-5,x+5]
                let start_y=Math.random()*10+(y-5);
                draw_field(start_x,start_y);
            }
        }
    }
    for(let i=1;i<=1000;i++){
        let start_x=Math.random()*canvas.width;
        let start_y=Math.random()*canvas.height;
        draw_field(start_x,start_y);
    }
    for(let i of charges){
        plot(i[0],i[1],i[2]==1?"red":"blue",5);
    }
}

generate();
setInterval(generate,2000);