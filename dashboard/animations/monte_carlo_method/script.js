let h=window.innerHeight-30;
let w=window.innerWidth-30;

let info=document.getElementById("info");
info.style.height=`${h-65}px`;
info.style.width="350px";

let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");
canvas.height=h-85;
canvas.width=w-380;
canvas.style.height=`${h-85}px`;
canvas.style.width=`${w-380}px`;

let centre=[canvas.width/2,canvas.height/2]
let radius=Math.min(canvas.width/2,canvas.height/2)-1;
let red=0;
let total=0;

function draw_rect(a,b,c,d){ // top-left: (a,b); bottom-right: (c,d)
    let x_coords=[a,c];
    let y_coords=[b,d];
    
    for(x of x_coords){
        ctx.beginPath();
        ctx.moveTo(x,y_coords[0]);
        ctx.lineTo(x,y_coords[1]);
        ctx.stroke();
    }
    for(y of y_coords){
        ctx.beginPath();
        ctx.moveTo(x_coords[0],y);
        ctx.lineTo(x_coords[1],y);
        ctx.stroke();
    }
}

function generate(){
    ctx.beginPath();
    ctx.arc(centre[0],centre[1],radius,0,2*Math.PI);
    ctx.stroke();

    draw_rect(centre[0]-radius,centre[1]-radius,centre[0]+radius,centre[1]+radius);
}

function process(x,y){
    let inside=(x*x+y*y<=radius*radius);

    ctx.beginPath();
    ctx.arc(centre[0]+x,centre[1]+y,2,0,2*Math.PI);
    ctx.stroke();
    ctx.fillStyle=(inside?"red":"blue");
    ctx.fill();

    if(inside) red++;
    total++;
}

function round(n){
    n=Math.round(n*1000)/1000;
    let ans=n.toString();
    if(!ans.includes('.')) ans+='.';

    let i=0;
    for(char of ans){
        if(char=='.') break;
        i++;
    }
    let dp=(ans.length-1)-i;
    for(;dp<=2;dp++) ans+='0';

    return ans;
}

function write(){
    document.getElementById("total").innerHTML=total;
    document.getElementById("inside").innerHTML=red;
    document.getElementById("ratio").innerHTML=round(red/total);
    document.getElementById("pi_var").innerHTML=round(4*(red/total));
}

function add_point(){
    let x=Math.random()*radius;
    let y=Math.random()*radius;
    if(Math.random()<=0.5) x*=-1;
    if(Math.random()<=0.5) y*=-1;

    process(x,y);
    write();
}

generate();
window.setInterval(add_point,100);