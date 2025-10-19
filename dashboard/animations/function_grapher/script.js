let h=window.innerHeight-30;
let w=window.innerWidth-30;

let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");
canvas.style.height=`${h-140}px`;
canvas.style.width=`${w-10}px`;
canvas.height=h-140;
canvas.width=w-10;

let unit=Math.min(canvas.height,canvas.width)/20;
let centre_x=canvas.width/2;
let centre_y=canvas.height/2;
let max_x=canvas.width/(2*unit); // max_y=10

let wait=5;
let small=0.001;

let functions=[
    ["x",[-10,10+wait],1],
    ["x^2",[-Math.sqrt(10),Math.sqrt(10)+wait],1],
    ["x^3",[-Math.pow(10,1/3),Math.pow(10,1/3)+wait],1],
    ["\\sqrt x",[0,max_x],1],
    ["\\sin x",[-max_x,max_x],1],
    ["\\tan x",[-max_x,max_x],1],
    ["\\ln x",[small,max_x],1],
    ["1/x",[-max_x,max_x],1],
    ["|x|",[-10,10],1],
    ["\\sqrt[3]x",[-max_x,max_x],1],
    ["x\\ln x",[small,5.8+wait],1],
    ["\\csc x",[-max_x,max_x],1],
    ["\\lfloor x\\rfloor",[-10,11+wait],0],
    ["e^x",[-max_x,Math.log(10)+wait],1],
    ["\\text{triangle wave}",[-max_x,max_x],1],
    ["\\sinh^{-1} x",[-max_x,max_x],1],
    ["\\cosh x",[-Math.acosh(10),Math.acosh(10)+wait],1],
    ["\\tanh x",[-max_x,max_x],1],
    ["x^{-1/2}",[small,max_x],1],
    ["x^{1/x}",[small,max_x],1],
    ["\\text{random}",[-max_x,max_x],0],
    ["\\pm\\sqrt{25-x^2}",[-10,10+wait],0],
    ["10/(1+e^{-x})",[-max_x,max_x],1],
    ["1/x^2",[-max_x,max_x],1],
    ["(\\ln x)^2",[small,max_x],1]
];

let choice=-1;
let lo=-1;
let hi=-1;
let derivative=true;
function choose_func(){
    choice=Math.floor(Math.random()*functions.length);
    // choice=functions.length-1;
    // choice=6;

    lo=functions[choice][1][0];
    hi=functions[choice][1][1];
    derivative=functions[choice][2];

    document.getElementById("equation").innerHTML="\\[y="+functions[choice][0]+"\\]";
    MathJax.typeset();
}

function func(x){
    switch(choice){
        case 0: return x;
        case 1: return x*x;
        case 2: return x*x*x;
        case 3: return Math.sqrt(x);
        case 4: return Math.sin(x);
        case 5: return Math.tan(x);
        case 6: return Math.log(x);
        case 7: return 1/x;
        case 8: return Math.abs(x);
        case 9: return Math.cbrt(x);
        case 10: return Math.log(x)*x;
        case 11: return 1/Math.sin(x);
        case 12: return Math.floor(x);
        case 13: return Math.exp(x);
        case 14: return 4*1/4*Math.abs((((x-4/4)%4)+4)%4-4/2)-1;
        case 15: return Math.asinh(x);
        case 16: return Math.cosh(x);
        case 17: return Math.tanh(x);
        case 18: return 1/Math.sqrt(x);
        case 19: return Math.pow(x,1/x);
        case 20: return Math.random()*20-10;
        case 21: return ((Math.random()>0.5)?1:-1)*Math.sqrt(25-x*x);
        case 22: return 10/(1+Math.exp(-x));
        case 23: return 1/(x*x);
        case 24: return Math.log(x)*Math.log(x);
        default: return 0;
    }
}

function plot(x,y,colour){
    ctx.lineWidth=1;
    ctx.strokeStyle=colour;
    ctx.beginPath();
    ctx.arc(x,y,1,0,2*Math.PI);
    ctx.stroke();
}

let inc=0.05;

function graph(x){
    let y=func(x); 

    if(y>10 || y<-10) return;

    let cor_x=centre_x+unit*x;
    let cor_y=centre_y-unit*y; // y coordinates go the wrong way
    plot(cor_x,cor_y,"red");

    // derivative
    if(derivative){
        let dx=0.001;
        let dy=(y-func(x-dx))/dx;
        let cor_dy=centre_y-unit*dy;
        plot(cor_x,cor_dy,"green");
    }
}

let plane=-1;

function draw_line(a,b,width=0.5,colour="black"){
    ctx.lineWidth=width;
    ctx.strokeStyle=colour;
    ctx.beginPath();
    ctx.moveTo(a[0],a[1]);
    ctx.lineTo(b[0],b[1]);
    ctx.stroke();
}

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

let cur_x=max_x+5;
let desired_change=0.05;
function adjust_inc(){
    let y=func(cur_x);

    if(cur_x>max_x || cur_x<-max_x){
        inc=0.05;
        return;
    }
    if(y<-10 || y>10){ // cheap gradient descent
        let diff;
        if(y>10) diff=y-10;
        else diff=-y-10;
        
        if(diff<0){ // wrong way
            inc=0.05;
            return; 
        }

        let dx=0.001;
        let gradient=(func(cur_x+dx)-y)/dx;

        if(Math.sign(gradient)!=-Math.sign(y)){ // going the wrong way
            inc=0.05;
            return; 
        }
        if(y>10) gradient*=-1;

        inc=Math.max(diff/gradient,0.0001);

        if(isNaN(inc)) inc=0.05;
        return;
    }

    let dx=0.001;
    let new_y=func(cur_x+dx);
    let dy=new_y-y;
    let change=Math.sqrt(dx*dx+dy*dy);
    inc=dx*(desired_change/change);

    if(isNaN(inc)) inc=0.05;
}

draw_plane();
choose_func();
window.setInterval(function(){
    if(cur_x>=hi){
        choose_func();
        cur_x=lo;

        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.putImageData(plane,0,0);
    }
    else{
        graph(cur_x);
        if(derivative) adjust_inc();
        cur_x+=inc;
    }
},10);
