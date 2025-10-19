document.addEventListener("DOMContentLoaded",()=>{
    let h=window.innerHeight-30;
    let w=window.innerWidth-30;    
    let canvas=document.getElementById("canvas");
    let ctx=canvas.getContext("2d");
    canvas.style.height=`${h-75}px`;
    canvas.style.width=`${w-10}px`;
    canvas.height=h-75;
    canvas.width=w-10;

    let radius=10;

    let positions=[];
    let seen=[];

    function generate(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        positions=[];
        seen=[];

        let tree_height=Math.floor(Math.random()*4)+3;
        for(let i=1;i<=(1<<tree_height)+1;i++){
            positions.push([-1,-1]);
            seen.push(false);
        }
        positions[0]=[0,0]; // necessary for node 1 to exist

        for(let depth=0;depth<=tree_height-1;depth++){ // draw edges
            let y=Math.min(Math.max(radius+1,depth*(canvas.height/tree_height)),canvas.height-(radius+1));
            let nodes_lvl=(1<<depth);
            for(let node=1;node<=nodes_lvl;node++){
                let number=(1<<depth)-1+node;
                let parent=Math.floor(number/2);
                if(positions[parent][0]!=-1 && Math.random()<=Math.pow(0.5,1/tree_height)){
                    let x=Math.min(Math.max(node*(canvas.width/(nodes_lvl+1)),radius+1),canvas.width-(radius+1));
                    positions[number]=[x,y];
                    
                    if(number!=1){
                        ctx.beginPath();
                        a=positions[number];
                        b=positions[parent];
                        ctx.moveTo(a[0],a[1]);
                        ctx.lineTo(b[0],b[1]);
                        ctx.stroke();
                    }
                }
            }
        }
        for(let node=1;node<=positions.length-1;node++){ // draw nodes
            let x=positions[node][0];
            let y=positions[node][1];
            if(x==-1) continue;
            
            ctx.beginPath();
            ctx.arc(x,y,radius,0,2*Math.PI);
            ctx.stroke();
            ctx.fillStyle="white";
            ctx.fill();
        }
    }

    function colour(node,c){
        let x=positions[node][0];
        let y=positions[node][1];

        if(x!=-1){
            ctx.beginPath();
            ctx.arc(x,y,radius,0,2*Math.PI);
            ctx.stroke();
            ctx.fillStyle=c;
            ctx.fill();
        }
    }

    let stack=[];
    window.setInterval(function(){
        if(stack.length==0){ // Generate a new tree
            generate();
            if(positions[1][0]!=-1) stack.push(1);
        }
        else{ // Continue with DFS
            let max_node=positions.length-1;
            let node=stack[stack.length-1];
            if(!seen[node]){
                colour(node,"green");
                if(node*2+1<=max_node && positions[node*2+1][0]!=-1) stack.push(node*2+1);
                if(node*2<=max_node && positions[node*2][0]!=-1) stack.push(node*2);
                seen[node]=true;
            }
            else{
                colour(node,"red");
                stack.pop();
            }
        }
    },500);
});