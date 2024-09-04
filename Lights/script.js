let r=6;
let c=4;
let grid=["*--*",
"--*-",
"***-",
"****",
"-***",
"****"];

function opposite(c){
    return (c=='brown'?'yellow':'brown');
}

function color(i,j){
    i-=1;
    j-=1;
    return (grid[i][j]=='*'?'yellow':'brown');
}

let svg_elem=document.getElementById('svg_elem');

let square_w=35;
let rect_width=square_w*4+30; // 15 px margin
let rect_height=40+square_w*6+15;

svg_elem.setAttribute('width',rect_width*8);
svg_elem.setAttribute('height',rect_height*2);

let sq_color=[[]];
for(let i=1;i<=r;i++){
    sq_color.push([-1]);
    for(let j=1;j<=c;j++) sq_color[i].push(color(i,j));
}

function flip(i,j,k,t){
    let cell=document.getElementById(`${i}cell${j}_${k}`);
    cell.innerHTML+=`<animate fill='freeze' attributeName='fill' to='${opposite(sq_color[j][k])}' begin='${t}s' dur='0.5s'/>`;
    sq_color[j][k]=opposite(sq_color[j][k]);

    if(j>=2){
        let cell=document.getElementById(`${i}cell${j-1}_${k}`);
        cell.innerHTML+=`<animate fill='freeze' attributeName='fill' to='${opposite(sq_color[j-1][k])}' begin='${t}s' dur='0.5s'/>`;
        sq_color[j-1][k]=opposite(sq_color[j-1][k]);
    }
    if(j<=r-1){
        let cell=document.getElementById(`${i}cell${j+1}_${k}`);
        cell.innerHTML+=`<animate fill='freeze' attributeName='fill' to='${opposite(sq_color[j+1][k])}' begin='${t}s' dur='0.5s'/>`;
        sq_color[j+1][k]=opposite(sq_color[j+1][k]);
    }
    if(k>=2){
        let cell=document.getElementById(`${i}cell${j}_${k-1}`);
        cell.innerHTML+=`<animate fill='freeze' attributeName='fill' to='${opposite(sq_color[j][k-1])}' begin='${t}s' dur='0.5s'/>`;
        sq_color[j][k-1]=opposite(sq_color[j][k-1]);
    }
    if(k<=c-1){
        let cell=document.getElementById(`${i}cell${j}_${k+1}`);
        cell.innerHTML+=`<animate fill='freeze' attributeName='fill' to='${opposite(sq_color[j][k+1])}' begin='${t}s' dur='0.5s'/>`;
        sq_color[j][k+1]=opposite(sq_color[j][k+1]);
    }
}

for(let i=0;i<=15;i++){
    let rect_x=(i%8)*(rect_width);
    let rect_y=(i<=7?0:rect_height);
    svg_elem.innerHTML+=`<rect id='box${i}' stroke='black' fill='white' width='${rect_width}' height='${rect_height}' transform='translate(${rect_x} ${rect_y})'/>`;
    
    for(let j=1;j<=r;j++){
        for(let k=1;k<=c;k++){
            let cell_x=15+(k-1)*square_w;
            let cell_y=40+(j-1)*square_w;
            
            svg_elem.innerHTML+=`<rect id='${i}cell${j}_${k}' x='${cell_x}' y='${cell_y}' stroke='black' fill='${color(j,k)}' width='${square_w}' height='${square_w}' transform='translate(${rect_x} ${rect_y})'/>`;
            sq_color[j][k]=color(j,k);
        }
    }

    for(let j=3;j>=0;j--){
        let x=rect_width-15-(j+1)*square_w+square_w/2;
        let y=25;
        
        svg_elem.innerHTML+=`<text x='${x}' y='${y}' font-size='xx-large' font-weight='bold' dominant-baseline='middle' text-anchor='middle' transform='translate(${rect_x} ${rect_y})'>${+(((1<<j)&i)!=0)}</text>`;
    }

    let t=0.5;
    for(let k=1;k<=c;k++){
        if((1<<(3-(k-1)) & i)){
            flip(i,1,k,t);
            t+=0.5;
        }
    }
    for(let j=2;j<=r;j++){
        for(let k=1;k<=c;k++){
            if(sq_color[j-1][k]=='brown'){
                flip(i,j,k,t);
                t+=0.5;
            }
        }
    }

    let good=1;
    for(let j=1;j<=c;j++) good&=(sq_color[r][j]=='yellow');
    if(good){
        let box=document.getElementById(`box${i}`); 
        box.innerHTML+=`<animate fill='freeze' attributeName='fill' to='green' begin='${t}s' dur='0.5s'/>`;
    }
}