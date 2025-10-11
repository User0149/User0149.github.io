let h=window.innerHeight-30;
let w=window.innerWidth-30;

let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");
canvas.style.height=`${h-140}px`;
canvas.style.width=`${w-10}px`;
canvas.height=h-140;
canvas.width=w-10;

let max_y=16;
let unit=canvas.height/(2*max_y);
let centre_x=canvas.width/2;
let centre_y=canvas.height/2;
let max_x=canvas.width/(2*unit);

let max_degree=4;
let max_root;
let roots=[];
let coefficient=1;
let constant;
let wait=500; // wait wait millseconds after finished 

function generate_polynomial(){
    roots=[];
    wait=1000;

    let degree=Math.floor(Math.random()*(max_degree+1)); // [0,max_degree]
    max_root=Math.floor(Math.pow(max_y,1/degree)); // degreeth root of max_y

    for(let root=1;root<=degree;root++){
        roots.push(Math.floor(Math.random()*(2*max_root+1)) - max_root); // [-max_root,max_root] 
    }
    roots.sort(function(a,b){
        return a-b;
    });
    constant=Math.random()*2*max_y-max_y; // [-max_y,max_y]
    coefficient=(Math.random()>=0.5?1:-1);

    write_equation();
}

function write_equation(){
    let equation='';

    if(roots.length==0) equation=String(constant);
    else{
        let power_x=0;

        let pointer=0;
        for(let i=-max_root;i<=max_root;i++){
            let first=pointer;
            while(pointer<=roots.length-1 && roots[pointer]==i) pointer++;

            let power=pointer-first;
            if(i==0){
                power_x=power;
                continue;
            }

            if(power>=1){
                equation+='(x';
                if(i<=0) equation+=('+'+String(-i));
                else equation+=('-'+String(i));
                equation+=')';
                if(power>=2) equation+=('^'+String(power));
            }
        }

        if(power_x>=2) equation='x^'+String(power_x)+equation;
        else if(power_x==1) equation='x'+equation;
        
        if(coefficient==-1) equation='-'+equation;
    }

    document.getElementById("equation").innerHTML="\\[y="+equation+"\\]";
    MathJax.typeset();
}

function func(x){
    if(roots.length==0) return constant;

    let y=1;
    for(let i of roots){
        y*=(x-i);
    }

    return y*coefficient;
}

function plot(x,y,colour){
    ctx.lineWidth=1;
    ctx.strokeStyle=colour;
    ctx.beginPath();
    ctx.arc(x,y,1.5,0,2*Math.PI);
    ctx.stroke();
    
    ctx.fillStyle=colour;
    ctx.fill();
}

let inc=0.05;

function graph(x){
    let y=func(x); 

    let cor_x=centre_x+unit*x;
    let cor_y=centre_y-unit*y; // y coordinates go the wrong way
    plot(cor_x,cor_y,"red");
}


function draw_line(a,b,width=0.5,colour="black"){
    ctx.lineWidth=width;
    ctx.strokeStyle=colour;
    ctx.beginPath();
    ctx.moveTo(a[0],a[1]);
    ctx.lineTo(b[0],b[1]);
    ctx.stroke();
}

let plane;

function draw_plane(){
    for(let x=centre_x+unit;x<=canvas.width;x+=unit){
        draw_line([x,0],[x,canvas.height]);
    }
    for(let x=centre_x-unit;x>=0;x-=unit){
        draw_line([x,0],[x,canvas.height]);
    }

    for(let y=centre_y+unit;y<=canvas.height;y+=unit){
        draw_line([0,y],[canvas.width,y]);
    }
    for(let y=centre_y-unit;y>=0;y-=unit){
        draw_line([0,y],[canvas.width,y]);
    }

    draw_line([centre_x,0],[centre_x,canvas.height],1.5);
    draw_line([0,centre_y],[canvas.width,centre_y],1.5);

    plane=ctx.getImageData(0,0,canvas.width,canvas.height);
}

let cur_x=-max_x;
let interval=10;
let desired_change=0.1;

function adjust_inc(){
    let y=func(cur_x);

    if(roots.length>0 && cur_x>roots[roots.length-1] && Math.abs(y)>max_y) wait-=interval;
    if(wait<=0){
        inc=100;
        return;
    }

    if(y<-max_y || y>max_y){ // cheap gradient descent
        let diff;
        if(y>max_y) diff=y-max_y;
        else diff=-y-max_y;
        
        if(diff<0){ // wrong way
            inc=0.05;
            return; 
        }

        let dx=0.001;
        let gradient=(func(cur_x+dx)-y)/dx;

        if(Math.sign(gradient)!=-Math.sign(y)){
            inc=0.05;
            return; // going the wrong way
        }
        if(y>max_y) gradient*=-1;

        inc=diff/gradient;
        return;
    }

    let dx=0.001;
    let old_y=func(cur_x-dx);
    let dy=y-old_y;
    let change=Math.sqrt(dx*dx+dy*dy);
    inc=dx*(desired_change/change);
}

draw_plane();
generate_polynomial();
window.setInterval(function(){
    if(cur_x>=max_x){
        generate_polynomial();
        cur_x=-max_x;

        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.putImageData(plane,0,0);
    }
    else{
        graph(cur_x);
        adjust_inc();
        cur_x+=inc;
    }
},interval);
