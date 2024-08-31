let grid_input=[1,  2,  8,  3,
    9,  5,  6,  4,
   13, 10,  7, 11,
    '*', 14, 15, 12];
let n=11;
let moves=[13, 9, 5, 6, 8, 3, 4, 8, 7, 11, 12];
let xcoords=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
let ycoords=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
//
let src_elem=document.getElementById('src_elem');
let grid=document.getElementById('grid');

src_elem.setAttribute('transform','translate(30,30)');

function color(num,x,y){
    if(x==((num-1)%4)*80 && y==Math.floor((num-1)/4)*80) return '#DEE7BE';
    else return '#E7CACA';
}

function adjacent(num){
    return Math.abs(xcoords[num]-xcoords[16])+Math.abs(ycoords[num]-ycoords[16])==80;
}

for(let i=1;i<=16;i++){
    let num=(grid_input[i-1]!='*'?grid_input[i-1]:16);
    let x=((i-1)%4)*80;
    let y=Math.floor((i-1)/4)*80;
    xcoords[num]=x;
    ycoords[num]=y;

    if(num==16) continue;

    let square=document.createElementNS('http://www.w3.org/2000/svg','g');
    square.setAttribute('transform',`translate(${x},${y})`);
    
    square.setAttribute('id',`square${num}`);
    square.innerHTML+=`<rect id='${num}' width="80" height="80" stroke='black' fill='${color(num,x,y)}'/><text x='${40}' y='${40}' text-anchor='middle' dominant-baseline='middle' style='font-size:32px; font-weight: bold'>${num}</text>`;
    grid.appendChild(square);
}

let t=0;
for(let i of moves){
    let elem=document.getElementById(i);
    let elem_square=document.getElementById(`square${i}`);
    let x2=xcoords[16];
    let y2=ycoords[16];
    if(adjacent(i)){
        let temp=xcoords[16];
        xcoords[16]=xcoords[i];
        xcoords[i]=temp;

        temp=ycoords[16];
        ycoords[16]=ycoords[i];
        ycoords[i]=temp;
        
        elem.innerHTML+=`<animate fill='freeze' attributeName='fill' to='#FFFF66' begin='${t}s' dur='0.4s'/>`; // select
        t+=0.4;

        elem.innerHTML+=`<animate fill='freeze' attributeName='fill' to='${color(i,x2,y2)}' begin='${t}s' dur='0.4s'/>`;
        elem_square.innerHTML+=`<animateTransform fill='freeze' attributeName='transform' type='translate' to='${x2} ${y2}' begin='${t}s' dur='0.4s'/>`; // move
        console.log(elem_square.innerHTML);
        t+=0.4; // unselect
    }
    else{ // error
        elem.innerHTML+=`<animate fill='freeze' attributeName='fill' to='#F72424' begin='${t}s' dur='0.4s'/>`;
        t+=0.4;
        break;
    }
}
