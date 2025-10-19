document.addEventListener("DOMContentLoaded",()=>{
    let h=window.innerHeight-80;
    let w=window.innerWidth-30;    
    let canvas=document.getElementById("canvas");
    let ctx=canvas.getContext("2d");
    canvas.style.height=`${h-75}px`;
    canvas.style.width=`${w-10}px`;
    canvas.height=h-75;
    canvas.width=w-10;

    let nodes=0;
    let edges=0;
    let root=[];
    let positions=[];
    let connections=[]; // dist,a,b

    function draw_node(){
        let x=Math.floor(Math.random()*(canvas.width-12))+6;
        let y=Math.floor(Math.random()*(canvas.height-12))+6;
        positions.push([x,y]);

        ctx.strokeStyle="black";
        ctx.beginPath();
        ctx.arc(x,y,5,0,2*Math.PI);
        ctx.stroke();
        // ctx.fillStyle="red";
        // ctx.fill();
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
                let dist=sedist(positions[i],positions[j]);
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

    function draw_edge(a,b,colour){
        root[get_root(a)]=get_root(b);

        ctx.strokeStyle=colour;
        ctx.beginPath();
        ctx.moveTo(positions[a][0],positions[a][1]);
        ctx.lineTo(positions[b][0],positions[b][1]);
        ctx.stroke();

        if(colour=="black") edges++;
    }

    function get_root(node){
        if(root[node]==node) return node;
        root[node]=get_root(root[node]);
        return root[node];
    }

    let prev_bad=0;
    let prev_img=-1;
    window.setInterval(function(){
        if(prev_bad){
            ctx.putImageData(prev_img,0,0);
            prev_bad=0;
        }

        if(edges>=nodes-1){ // Generate new graph
            ctx.clearRect(0,0,canvas.width,canvas.height);
            positions=[];
            root=[];
            connections=[];
            edges=0;
            
            nodes=Math.ceil(Math.random()*30);
            for(let i=0;i<=nodes-1;i++){
                draw_node();
                root.push(i);
            }

            generate_connections();
        }
        else{
            let i=connections.length-1;
            document.getElementById("length").innerHTML=+(Math.round(Math.sqrt(connections[i][0])+"e+2")+"e-2");
            let a=connections[i][1];
            let b=connections[i][2];
            if(get_root(a)!=get_root(b)) draw_edge(a,b,"black");
            else{
                prev_bad=1;
                prev_img=ctx.getImageData(0,0,canvas.width,canvas.height);
                
                draw_edge(a,b,"red");
            }

            connections.pop();
        }
    },500);
});