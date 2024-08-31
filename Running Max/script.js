let N=6;
let throws=[-1,500, 200, 300, 800, 100, 700];
let max_throw=0;
for(let i of throws) max_throw=Math.max(i,max_throw);

let svg_elem=document.getElementById('svg_elem');
let border=document.getElementById('border');
let max_elem=document.getElementById('max_elem');
let sep=document.getElementById('sep');

let width=30+30+max_throw;
let height=60+N*50;
svg_elem.setAttribute('width',width);
svg_elem.setAttribute('height',height);
border.setAttribute('width',width);
border.setAttribute('height',height);
sep.setAttribute('y2',height);

for(let i=1;i<=N;i++){
    let ball=document.createElementNS('http://www.w3.org/2000/svg','circle');
    ball.setAttribute('id',i);
    ball.setAttribute('cx',30);
    ball.setAttribute('cy',60+(i-1)*50);
    ball.setAttribute('r',10);
    ball.setAttribute('stroke','black');
    ball.setAttribute('fill','red');

    svg_elem.appendChild(ball);
}

let max_pos=0;
let t=0;
for(let i=1;i<=N;i++){
    let dist=throws[i];
    let ball=document.getElementById(i);
    if(dist>max_pos){
        let t1=max_pos/500;
        let t2=(dist-max_pos)/500;
        
        ball.innerHTML+=`<animateTransform fill='freeze' attributeName='transform' type='translate' dur='${t1}s' begin='${t}s' to='${max_pos} 0'/>`;
        t+=t1;
        max_elem.innerHTML+=`<animateTransform fill='freeze' attributeName='transform' type='translate' dur='${t2}s' begin='${t}s' to='${dist} 0'/>`;
        ball.innerHTML+=`<animateTransform fill='freeze' attributeName='transform' type='translate' dur='${t2}s' begin='${t}s' to='${dist} 0'/>`;
        t+=t2;

        max_pos=dist;
    }
    else{
        let t1=dist/500;
        ball.innerHTML+=`<animateTransform fill='freeze' attributeName='transform' type='translate' dur='${t1}s' begin='${t}s' to='${dist} 0'/>`;
        t+=t1;
    }
}