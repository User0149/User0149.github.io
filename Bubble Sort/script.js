let svg_elem=document.getElementById('svg_elem');
let border=document.getElementById('border');
let separator=document.getElementById('separator');
let blocks=document.getElementById('blocks');
let interval=document.getElementById('interval');
let title=document.getElementById('title');

let block_space=240;
let other_space=30;
let h=block_space+other_space;
let w=410;

svg_elem.setAttribute('height',h);
svg_elem.setAttribute('width',w);
border.setAttribute('height',h);
border.setAttribute('width',w);
title.setAttribute('x',w/2);
title.setAttribute('y',30);

separator.setAttribute('x1',0);
separator.setAttribute('x2',w);
separator.setAttribute('y1',block_space);
separator.setAttribute('y2',block_space);

let block_order=[-1,1,2,3,4,5,6,7,8,9,10];

// generate blocks
for(let i=1;i<=10;i++){
    let recti=document.createElementNS('http://www.w3.org/2000/svg','rect');
    recti.setAttribute('id','rect'+i);
    recti.setAttribute('fill','green');
    recti.setAttribute('width','30');
    let h=Math.random()*200;
    recti.setAttribute('height',''+h);
    recti.setAttribute('x',''+(10+40*(i-1)));
    recti.setAttribute('y',''+(block_space-h));

    blocks.appendChild(recti);
}

interval.setAttribute('transform','translate('+(10+30+5)+','+block_space+')');

let t=0;
let sorted=0;
while(!sorted){
    interval.innerHTML+=`<animateTransform dur="0.5s" attributeName="transform" fill="freeze" type="translate" begin="${t}s" to="${10+30+5} ${block_space}"/>`
    t+=0.5;

    sorted=1;
    for(let i=1;i<=9;i++){
        interval.innerHTML+=`<animateTransform dur="0.25s" attributeName="transform" fill="freeze" type="translate" begin="${t}s" to="${5+40*i} ${block_space}"/>`;
        t+=0.5;

        let h1=+document.getElementById('rect'+block_order[i]).getAttribute('height');
        let h2=+document.getElementById('rect'+block_order[i+1]).getAttribute('height');
        if(h1>h2){
            sorted=0;

            document.getElementById('rect'+block_order[i]).innerHTML+=`<animate dur="0.25s" attributeName="x" fill="freeze" begin="${t}s" to="${10+40*i}"/>`;
            document.getElementById('rect'+block_order[i+1]).innerHTML+=`<animate dur="0.25s" attributeName="x" fill="freeze" begin="${t}s" to="${10+40*(i-1)}"/>`;
            t+=0.25;

            block_order[i]^=block_order[i+1];
            block_order[i+1]^=block_order[i]; 
            block_order[i]^=block_order[i+1];
        }
    }
}
interval.innerHTML+=`<animate dur="0.5s" attributeName="opacity" fill="freeze" begin="${t}s" to="0"/>`;
t+=0.5;
blocks.innerHTML+=`<animateTransform dur="0.5s" attributeName="transform" fill="freeze" type="translate" begin="${t}s" to="0 ${other_space}"/>`;
separator.innerHTML+=`<animateTransform dur="0.5s" attributeName="transform" fill="freeze" type="translate" begin="${t}s" to="0 ${other_space}"/>`;
