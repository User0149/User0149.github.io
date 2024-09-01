let n=12;
let m=5;
let ball_radius=15;
let colors=['-','red','blue','red','green','yellow'];
let start=[-1,1,9,8,2,5];
let transitions=[
    [],
    [[2,1],[3,0.8],[11,1],[7,1.2],[2,1.2],[4,1],[8,1.2],[6,0.8]],
    [[10,0.8],[3,1],[11,1.2],[5,1.2],[3,1],[11,0.8]],
    [[11,1.2],[2,1],[9,0.9],[8,1],[12,1],[9,0.8],[2,1.2]],
    [[10,1.2],[11,0.8],[3,1],[11,1],[6,1],[9,1.2],[2,1],[4,1.2]],
    [[3,1],[4,1],[5,1],[11,1.2],[8,0.9],[3,1.2],[4,1]]
];

function get_dist(a,b){
    return Math.sqrt((a[0]-b[0])*(a[0]-b[0])+(a[1]-b[1])*(a[1]-b[1]));
}

function move(a,b,d){ // returns new position
    let x1=a[0];
    let y1=a[1];
    let x2=b[0];
    let y2=b[1];

    let fraction=d/get_dist(a,b);
    return [x1+(x2-x1)*fraction,y1+(y2-y1)*fraction];
}

let svg_elem=document.getElementById('svg_elem');

let ppl_pos=[[-1,-1]];
for(let i=1;i<=n;i++){
    let theta=2*Math.PI/n;
    let x=250+200*Math.sin(theta*(i-1));
    let y=250-200*Math.cos(theta*(i-1));
    ppl_pos.push([x,y]);

    let circle=document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.setAttribute('cx',`${x}`);
    circle.setAttribute('cy',`${y}`);
    circle.setAttribute('r',20);
    circle.setAttribute('fill','white');
    circle.setAttribute('stroke','black');
    svg_elem.appendChild(circle);

    let text=document.createElementNS('http://www.w3.org/2000/svg','text');
    text.innerHTML=i;
    text.setAttribute('text-anchor','middle');
    text.setAttribute('dominant-baseline','middle');
    text.setAttribute('font-weight','bold');
    text.setAttribute('x',`${x}`);
    text.setAttribute('y',`${y}`);
    svg_elem.appendChild(text);
}

let pos=[[-1,-1]];
let v=[-1];
let dest=[-1];
let dest_idx=[-1];
let finished=[-1];
for(let i=1;i<=m;i++){
    finished.push(0);
    pos.push(ppl_pos[start[i]]);
    dest_idx.push(0);
    dest.push(transitions[i][0][0]);

    let dist=get_dist(pos[i],ppl_pos[dest[i]]);
    v.push(dist/transitions[i][0][1]);

    let x=pos[i][0];
    let y=pos[i][1];

    let ball=document.createElementNS('http://www.w3.org/2000/svg','circle');
    ball.setAttribute('id',`ball${i}`);
    ball.setAttribute('cx',`${x}`);
    ball.setAttribute('cy',`${y}`);
    ball.setAttribute('r',ball_radius);
    ball.setAttribute('fill',colors[i]);
    ball.setAttribute('stroke','black');
    svg_elem.appendChild(ball);
}

let inc=0.1;
let done=0; // finished balls
for(let t=0;done<=m-1;t+=inc){
    for(let i=1;i<=m;i++){
        if(finished[i]==1) continue;

        let dist_to_dest=get_dist(pos[i],ppl_pos[dest[i]]);
        let time_to_dest=dist_to_dest/v[i];
        if(time_to_dest<inc){
            dest_idx[i]++;
            if(dest_idx[i]>=transitions[i].length){ // will reach end of journey
                finished[i]=1;
                done++;

                pos[i]=ppl_pos[dest[i]];
            }
            else{
                let old_dest=dest[i];
                dest[i]=transitions[i][dest_idx[i]][0];
                let new_dest=dest[i];

                v[i]=get_dist(ppl_pos[old_dest],ppl_pos[new_dest])/transitions[i][dest_idx[i]][1];

                pos[i]=move(ppl_pos[old_dest],ppl_pos[new_dest],(inc-time_to_dest)*v[i]);
            }
        }
        else{ // just do it
            pos[i]=move(pos[i],ppl_pos[dest[i]],inc*v[i]);
        }

        let ball=document.getElementById(`ball${i}`);

        ball.innerHTML+=`<animate fill='freeze' attributeName='cx' to='${pos[i][0]}' begin='${t}s' dur='${inc}s'/>`;
        ball.innerHTML+=`<animate fill='freeze' attributeName='cy' to='${pos[i][1]}' begin='${t}s' dur='${inc}s'/>`;
    }

    for(let i=1;i<=m;i++){
        for(let j=i+1;j<=m;j++){
            if(get_dist(pos[i],pos[j])<=ball_radius*2){ // collision
                let x=0.5*(pos[i][0]+pos[j][0]);
                let y=0.5*(pos[i][1]+pos[j][1]);

                let explosion=document.createElementNS('http://www.w3.org/2000/svg','use');
                explosion.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href',`#rickroll`);
                explosion.setAttribute('x',x-15);
                explosion.setAttribute('y',y-15);
                explosion.setAttribute('width',30);
                explosion.setAttribute('height',30);
                explosion.setAttribute('opacity',0);
                explosion.innerHTML+=`<animate fill='freeze' attributeName='opacity' to='1' begin='${t}s' dur='${inc}s'/>`;
                explosion.innerHTML+=`<animate fill='freeze' attributeName='opacity' to='0' begin='${t+inc}s' dur='1.2s'/>`;
                
                // let explosion=document.createElementNS('http://www.w3.org/2000/svg','image');
                // explosion.setAttribute('href',`rickroll.png`);
                // explosion.setAttribute('x',x-15);
                // explosion.setAttribute('y',y-15);
                // explosion.setAttribute('width',30);
                // explosion.setAttribute('height',30);
                // explosion.setAttribute('opacity',0);
                // explosion.innerHTML+=`<animate fill='freeze' attributeName='opacity' to='1' begin='${t}s' dur='${inc}s'/>`;
                // explosion.innerHTML+=`<animate fill='freeze' attributeName='opacity' to='0' begin='${t+inc}s' dur='1.2s'/>`;

                svg_elem.appendChild(explosion);
            }
        }
    }
}