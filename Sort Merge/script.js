let n=7;
let m=10;
let a=[-1,70,105,105,125,140,200,200];
let b=[-1,20,40,80,100,100,110,125,150,190,195];

let width=(n+m)*60+30;

let svg_elem=document.getElementById('svg_elem');
let border=document.getElementById('border');
let l1=document.getElementById('l1');
let l2=document.getElementById('l2');

svg_elem.setAttribute('width',width);
border.setAttribute('width',width);
l1.setAttribute('x2',width);
l2.setAttribute('x2',width);

for(let i=1;i<=n;i++){
    let x=30+(i-1)*60;
    let y=250;

    let group=document.createElementNS('http://www.w3.org/2000/svg','g'); // centre is bottom left corner
    group.setAttribute('id',`a${i}`);
    group.setAttribute('transform',`translate(${x} ${y})`);
    group.innerHTML+=`<rect id='rect_a${i}' y='${-a[i]}' width='30' height='${a[i]}' stroke='black' fill='green'/><text font-size='x-large' font-weight='bold' dominant-baseline='middle' text-anchor='middle' x='15' y='${-a[i]-15}'>${a[i]}</text>`;
    svg_elem.appendChild(group);
}

for(let i=1;i<=m;i++){
    let x=30+(i-1)*60;
    let y=500;

    let group=document.createElementNS('http://www.w3.org/2000/svg','g'); // centre is bottom left corner
    group.setAttribute('id',`b${i}`);
    group.setAttribute('transform',`translate(${x} ${y})`);
    group.innerHTML+=`<rect id='rect_b${i}' y='${-b[i]}' width='30' height='${b[i]}' stroke='black' fill='green'/><text font-size='x-large' font-weight='bold' dominant-baseline='middle' text-anchor='middle' x='15' y='${-b[i]-15}'>${b[i]}</text>`;
    svg_elem.appendChild(group);
}

let t=0;
let taken=0;

let a_next=1;
let b_next=1;
document.getElementById(`rect_a${a_next}`).innerHTML+=`<animate fill='freeze' attributeName='fill' to='red' begin='${t}s' dur='0.5s'/>`;
document.getElementById(`rect_b${b_next}`).innerHTML+=`<animate fill='freeze' attributeName='fill' to='red' begin='${t}s' dur='0.5s'/>`;
t+=0.5;

while(a_next<=n && b_next<=m){
    // move and increment
    if(a[a_next]<=b[b_next]){
        document.getElementById(`a${a_next}`).innerHTML+=`<animateTransform fill='freeze' attributeName='transform' type='translate' to='${30+taken*60} 750' begin='${t}s' dur='1s'/>`;
        document.getElementById(`rect_a${a_next}`).innerHTML+=`<animate fill='freeze' attributeName='fill' to='blue' begin='${t}s' dur='0.5s'/>`;

        a_next++;
        if(a_next<=n) document.getElementById(`rect_a${a_next}`).innerHTML+=`<animate fill='freeze' attributeName='fill' to='red' begin='${t}s' dur='0.5s'/>`;
        t+=1;
    }
    else{
        document.getElementById(`b${b_next}`).innerHTML+=`<animateTransform fill='freeze' attributeName='transform' type='translate' to='${30+taken*60} 750' begin='${t}s' dur='1s'/>`;
        document.getElementById(`rect_b${b_next}`).innerHTML+=`<animate fill='freeze' attributeName='fill' to='blue' begin='${t}s' dur='0.5s'/>`;

        b_next++;
        if(b_next<=m) document.getElementById(`rect_b${b_next}`).innerHTML+=`<animate fill='freeze' attributeName='fill' to='red' begin='${t}s' dur='0.5s'/>`;
        t+=1;
    }
    taken++;
}

while(a_next<=n){
    document.getElementById(`a${a_next}`).innerHTML+=`<animateTransform fill='freeze' attributeName='transform' type='translate' to='${30+taken*60} 750' begin='${t}s' dur='1s'/>`;
    document.getElementById(`rect_a${a_next}`).innerHTML+=`<animate fill='freeze' attributeName='fill' to='blue' begin='${t}s' dur='0.5s'/>`;

    a_next++;
    if(a_next<=n) document.getElementById(`rect_a${a_next}`).innerHTML+=`<animate fill='freeze' attributeName='fill' to='red' begin='${t}s' dur='0.5s'/>`;
    t+=1;

    taken++;
}
while(b_next<=m){
    document.getElementById(`b${b_next}`).innerHTML+=`<animateTransform fill='freeze' attributeName='transform' type='translate' to='${30+taken*60} 750' begin='${t}s' dur='1s'/>`;
    document.getElementById(`rect_b${b_next}`).innerHTML+=`<animate fill='freeze' attributeName='fill' to='blue' begin='${t}s' dur='0.5s'/>`;

    b_next++;
    if(b_next<=m) document.getElementById(`rect_b${b_next}`).innerHTML+=`<animate fill='freeze' attributeName='fill' to='red' begin='${t}s' dur='0.5s'/>`;
    t+=1;

    taken++;
}