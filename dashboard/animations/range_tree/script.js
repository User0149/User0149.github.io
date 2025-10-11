let h=window.innerHeight-30;
let w=window.innerWidth-30;    
let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");
canvas.style.height=`${h-75}px`;
canvas.style.width=`${w-10}px`;
canvas.height=h-75;
canvas.width=w-10;

let margin=50; // margin at bottom of canvas
let radius=10;

function draw_line(a,b,colour="black"){
    ctx.strokeStyle=colour;
    ctx.beginPath();
    ctx.moveTo(a[0],a[1]);
    ctx.lineTo(b[0],b[1]);
    ctx.stroke();
}

function draw_node(node,colour="black"){
    let x=pos[node][0];
    let y=pos[node][1];
    ctx.strokeStyle=colour;
    ctx.beginPath();
    ctx.arc(x,y,radius,0,2*Math.PI);
    ctx.stroke();
}

function fill_node(node,colour="white"){
    let x=pos[node][0];
    let y=pos[node][1];
    ctx.beginPath();
    ctx.arc(x,y,radius,0,2*Math.PI);
    ctx.fillStyle=colour;
    ctx.fill();
}

let pos=[];
let l=[];
let r=[];
let sum=[];

for(let i=0;i<=64;i++){
    pos.push([-1,-1]);
    l.push(-1);
    r.push(-1);
    sum.push(0);
}

function generate(){
    let unit_y=(canvas.height-margin-(radius+1))/5; // need to fit 5 spaces between 6 levels between [radius+1,canvas.height-margin]

    for(let depth=0;depth<=5;depth++){ // draw edges
        let y=radius+1+unit_y*depth;

        let n=(1<<depth); // nodes on level
        let unit_x=canvas.width/(n+1); // fit nodes+1 spaces surrounding n nodes 

        for(let j=1;j<=n;j++){
            let number=(1<<depth)-1+j;
            
            let x=unit_x*j;
            pos[number]=[x,y];
            l[number]=1+32/(1<<depth)*(j-1);
            r[number]=32/(1<<depth)*j;

            if(depth!=0){
                let node=pos[number];
                let parent=pos[Math.floor(number/2)];
                draw_line(node,parent);
            }
        }
    }
    for(let node=1;node<=63;node++){ // draw nodes
        draw_node(node);
        fill_node(node);
    }
}

generate();

let tree=ctx.getImageData(0,0,canvas.width,canvas.height);
let q=[]; // [node,depth]
let pointer=0;
let a=-1;
let b=-1;

function brace(y,a,b,colour){
    let left=canvas.width/33*a-radius-2;
    let right=canvas.width/33*b+radius+2;
    draw_line([left,y],[right,y],colour);
    draw_line([left,y],[left,y-10],colour);
    draw_line([right,y],[right,y-10],colour);
}

function process(node,depth){
    if(l[node]>b || r[node]<a){
        fill_node(node,"red");
    }
    else if(a<=l[node] && r[node]<=b){
        fill_node(node,"green");
        brace(canvas.height-17,l[node],r[node],"green");
    }
    else{
        fill_node(node,"aqua");
        q.push([node*2,depth+1]);
        q.push([node*2+1,depth+1]);
    }
}

let wait=0;

setInterval(function(){
    if(pointer==q.length){
        if(wait) wait=0; // wait 1 more interval
        else{
            ctx.putImageData(tree,0,0);
            q=[[1,0]];
            pointer=0;
            a=Math.floor(Math.random()*32)+1;
            b=Math.floor(Math.random()*32)+1;
            if(a>b){
                let temp=a;
                a=b;
                b=temp;
            }

            brace(canvas.height-2,a,b,"red");
            wait=1;
        }
    }
    else{
        let depth=q[pointer][1];
        while(pointer<q.length && q[pointer][1]==depth){
            process(q[pointer][0],q[pointer][1]);
            pointer++;
        }
    }
},1000);