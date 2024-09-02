let n=6;
let m=15;
let balls=[-1,3,1,4,3,6,6,5,2,3,1,2,6,3,6,6];
let svg_elem=document.getElementById('svg_elem');
let border=document.getElementById('border');

let radius=40;

let max_balls=0;
let freq=[];
for(let i=0;i<=n;i++) freq.push(0);
for(let i of balls){
    if(i==-1) continue;
    freq[i]++;
    max_balls=Math.max(max_balls,freq[i]);
}

let bucket_height=2*radius*max_balls+30;
let baseline=100+bucket_height;

let width=(50+2*radius)*n+50;
let height=100+bucket_height+50+70;
svg_elem.setAttribute('width',width);
svg_elem.setAttribute('height',height);
border.setAttribute('width',width);
border.setAttribute('height',height);

let capacity=[-1];
let count_elem=[-1]; // number of current count elem
let next_position=[-1]; // centre of next ball
for(let i=1;i<=n;i++){
    let x=50+(50+2*radius)*(i-1);
    let y=100;
    svg_elem.innerHTML+=`<path fill='white' stroke='black' d='M ${x} ${y} v ${bucket_height} h ${2*radius} v ${-bucket_height}'/>`;

    let text=document.createElementNS('http://www.w3.org/2000/svg','text');
    text.setAttribute('id',`count${i}_1`);
    text.setAttribute('fill','red');
    text.setAttribute('text-anchor','middle');
    text.setAttribute('dominant-baseline','middle');
    text.setAttribute('font-size','xx-large');
    text.setAttribute('font-weight','bold');
    text.setAttribute('x',x+radius);
    text.setAttribute('y',baseline+30);
    text.innerHTML='0';
    svg_elem.appendChild(text);

    capacity.push(0);
    count_elem.push(1);
    next_position.push(baseline-radius);
}

let t=0;
for(let i=1;i<=m;i++){
    let bucket=balls[i];
    capacity[bucket]++;
    let x=50+(50+2*radius)*(bucket-1)+radius;
    let y=50;

    let ball=document.createElementNS('http://www.w3.org/2000/svg','circle');
    ball.setAttribute('cx',x);
    ball.setAttribute('cy',y);
    ball.setAttribute('r',radius);
    ball.setAttribute('stroke','black');
    ball.setAttribute('fill','green');
    ball.setAttribute('opacity','0');
    svg_elem.appendChild(ball);

    let dest_y=next_position[bucket];
    next_position[bucket]-=2*radius;
    let time=(dest_y-y)/500;
    ball.innerHTML+=`<animate fill='freeze' attributeName='opacity' to='1' begin='${t}s' dur='${0.1}s'/>`; // show ball
    t+=0.1;
    ball.innerHTML+=`<animate fill='freeze' attributeName='cy' to='${dest_y}' begin='${t}s' dur='${time}s'/>`; // drop ball
    t+=time;

    // replace text
    let anim=document.createElementNS('http://www.w3.org/2000/svg','animate');
    anim.setAttribute('fill','freeze');
    anim.setAttribute('attributeName','opacity');
    anim.setAttribute('to','0');
    anim.setAttribute('begin',`${t}s`);
    anim.setAttribute('dur',`${0.3}s`);
    document.getElementById(`count${bucket}_${count_elem[bucket]}`).appendChild(anim); // fade old elem
    count_elem[bucket]++;

    // // create new elem
    let text=document.createElementNS('http://www.w3.org/2000/svg','text');
    text.setAttribute('id',`count${bucket}_${count_elem[bucket]}`);
    text.setAttribute('fill',(capacity[bucket]==1?'green':'red'));
    text.setAttribute('text-anchor','middle');
    text.setAttribute('dominant-baseline','middle');
    text.setAttribute('font-size','xx-large');
    text.setAttribute('font-weight','bold');
    text.setAttribute('opacity','0');
    text.setAttribute('x',x);
    text.setAttribute('y',baseline+30);
    text.innerHTML=capacity[bucket];

    text.innerHTML+=`<animate fill='freeze' attributeName='opacity' to='1' begin='${t}s' dur='${0.3}s'/>`; // show new elem
    svg_elem.appendChild(text);
}

let arrow=document.createElementNS('http://www.w3.org/2000/svg','use');
arrow.setAttribute('href','#arrow');
arrow.setAttribute('fill','red');
arrow.setAttribute('x',50+radius);
arrow.setAttribute('y',baseline+40);
arrow.setAttribute('opacity',0);
arrow.innerHTML+=`<animate fill='freeze' attributeName='opacity' to='1' begin='${t}s' dur='${0.3}s'/>`;
svg_elem.appendChild(arrow);
t+=0.3;

for(let i=1;i<=n;i++){
    arrow.innerHTML+=`<animateTransform fill='freeze' attributeName='transform' type='translate' to='${(50+2*radius)*(i-1)} 0' begin='${t}s' dur='${0.5}s'/>`;
    t+=1;
    if(capacity[i]==1){
        arrow.innerHTML+=`<animate fill='freeze' attributeName='fill' to='green' begin='${t}s' dur='${0.5}s'/>`;
        break;
    }
}
