let h=window.innerHeight-30;
let w=window.innerWidth-30;    
let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");
canvas.style.height=`${h-75}px`;
canvas.style.width=`${w-10}px`;
canvas.height=h-75;
canvas.width=w-10;

let nodes=-1;
let roots=-1;
let root=[];
let pos=[];
let adjlist=[];
let dist=[];
let seen=[];
let connections=[]; // dist,a,b

let colour=["red"]; // colour for each dist


function draw_node(){
    let x=Math.floor(Math.random()*(canvas.width-60))+30;
    let y=Math.floor(Math.random()*(canvas.height-60))+30;
    pos.push([x,y]);

    ctx.strokeStyle="black";
    ctx.beginPath();
    ctx.arc(x,y,10,0,2*Math.PI);
    ctx.stroke();
}

function colour_node(node){
    if(dist[node]>=colour.length) colour.push("rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")");
    let x=pos[node][0];
    let y=pos[node][1];

    ctx.fillStyle=colour[dist[node]];
    ctx.beginPath();
    ctx.arc(x,y,10,0,2*Math.PI);
    ctx.fill();

    ctx.font="15px Arial";
    ctx.fillText(dist[node],x+15,y-15);
}

function get_root(node){
    if(root[node]==node) return node;
    root[node]=get_root(root[node]);
    return root[node];
}

function draw_edge(a,b){
    root[get_root(a)]=get_root(b);

    ctx.strokeStyle="black";
    ctx.beginPath();
    ctx.moveTo(pos[a][0],pos[a][1]);
    ctx.lineTo(pos[b][0],pos[b][1]);
    ctx.stroke();
}

function sedist(a,b){ // squared euclidean distance
    let x1=a[0];
    let y1=a[1];
    let x2=b[0];
    let y2=b[1];

    return Math.abs(x1-x2)+Math.abs(y1-y2);
}

function generate_connections(){
    for(let i=0;i<=nodes-1;i++){
        for(let j=i+1;j<=nodes-1;j++){
            let dist=sedist(pos[i],pos[j]);
            connections.push([dist,i,j]);
        }
    }
    connections.sort(function(a,b){
        if(a[0]<b[0]) return -1;
        else if(a[0]>b[0]) return 1;
        return 0;
    }); 
    connections.reverse();    
}
let q=[];
let pointer=0;

window.setInterval(function(){
    if(pointer==q.length){ // generate new graph
        ctx.clearRect(0,0,canvas.width,canvas.height);
        q=[];
        pointer=0;

        root=[];
        seen=[];
        pos=[];
        adjlist=[];
        dist=[];
        colour=["red"];
        connections=[];

        nodes=Math.ceil(Math.random()*30);
        roots=nodes;
        for(let i=0;i<=roots-1;i++){
            draw_node();
            root.push(i);
            adjlist.push([]);
            dist.push(-1);
            seen.push(0);
        }
        generate_connections();

        dist[0]=0;

        ctx.strokeStyle="black";
        ctx.beginPath();
        ctx.arc(pos[0][0],pos[0][1],15,0,2*Math.PI);
        ctx.stroke();

        while(roots>=2){
            let i=connections.length-1;
            let a=connections[i][1];
            let b=connections[i][2];
            connections.pop();

            if(get_root(a)!=get_root(b)){
                roots--;
                draw_edge(a,b);
                adjlist[a].push(b);
                adjlist[b].push(a);
            }
        }

        q.push(0);
        dist[0]=0;
    }
    else{
        let node=q[pointer];
        seen[node]=1;
        pointer++;
        
        colour_node(node);
        for(let i=0;i<=adjlist[node].length-1;i++){
            let child=adjlist[node][i];
            if(!seen[child]){
                seen[child]=1;
                dist[child]=dist[node]+1;
                q.push(child);
            }            
        }
    }
},500);