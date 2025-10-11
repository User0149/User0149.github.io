let h=window.innerHeight-100;
let w=window.innerWidth-100;

let unit=30; // length in pixels

let R=Math.floor(h/(unit+2));
let C=Math.floor(w/(unit+2));

function cell_id(r,c){
    return (r-1)*C+c;
}

function colour(node,colour){
    document.getElementById(node).style.backgroundColor=colour;
}

let path=[];
function generate(){
    let root=[];
    let adjlist=[];
    for(let i=0;i<=(R+5)*(C+5);i++){
        root.push(i);
        adjlist.push([]);
    }
    
    function get_root(node){
        if(root[node]==node) return node;
        root[node]=get_root(root[node]);
        return root[node];
    }
    
    function merge(a,b){
        root[get_root(a)]=get_root(b);
    }
    
    let connections=[]; // {left,right,1} or {up,down,0}
    for(let i=1;i<=R;i++){
        for(let j=1;j<=C;j++){
            let cell=cell_id(i,j);
            // add edges going up or to the left
            if(i>=2) connections.push([cell_id(i-1,j),cell,0]);
            if(j>=2) connections.push([cell_id(i,j-1),cell,1]);
        }
    }
    
    // randomise connections 
    for(let i=0;i<=connections.length-1;i++){
        let j=Math.floor(Math.random()*i);
    
        let temp_i=connections[i];
        connections[i]=connections[j];
        connections[j]=temp_i;
    }
    
    // get edges
    let edges=[];
    for(let edge of connections){
        let a=edge[0];
        let b=edge[1];
    
        if(get_root(a)!=get_root(b)){
            merge(a,b);
            edges.push(edge);
            adjlist[a].push(b);
            adjlist[b].push(a);
        }
    }
    
    // generate webpage
    let maze=document.getElementById('maze');
    maze.innerHTML='';
    
    // initialise grid
    for(let i=1;i<=R;i++){
        let row=maze.insertRow();
        for(let j=1;j<=C;j++){
            let cell=row.insertCell();
            cell.id=cell_id(i,j);
    
            cell.style.width=cell.style.height=`${unit}px`;
        }
    }
    
    // add edges
    for(let edge of edges){
        let a=document.getElementById(edge[0]);
        let b=document.getElementById(edge[1]);
        let horizontal=edge[2];
    
        if(!horizontal){
            a.style.borderBottom='1px solid transparent';
            b.style.borderTop='1px solid transparent';
        }
        else{
            a.style.borderRight='1px solid transparent';
            b.style.borderLeft='1px solid transparent';
        }
    }

    // DFS
    let seen=[];
    let parent=[];
    for(let i=0;i<=(R+5)*(C+5);i++){
        seen.push(0);
        parent.push(-1);
    }
    function dfs(node){
        seen[node]=1;
        for(let child of adjlist[node]){
            if(!seen[child]){
                parent[child]=node;
                dfs(child);
            }
        }
    }

    dfs(cell_id(1,1));
    path=[];

    let cell=cell_id(R,C);
    while(cell!=-1){
        path.push(cell)
        cell=parent[cell];
    }
    path.reverse();

    colour(path[0],'tomato');
}

generate();

let cur=0; // cell to be highlighted next
setInterval(function(){
    if(cur==path.length){
        generate();
        cur=0;
    }
    else{
        if(cur>=1) colour(path[cur-1],'orange');
        colour(path[cur],'tomato');
        cur++;
    }

},100);