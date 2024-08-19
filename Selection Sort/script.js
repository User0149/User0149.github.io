let svg_elem=document.getElementById('svg_elem');
let title=document.getElementById('title');
let arrow=document.getElementById('arrow');
let border=document.getElementById('border');
let divider=document.getElementById('divider');
let rects=document.getElementById('rects');

let bottomsectionheight=270;
let width=500;
let height=2*bottomsectionheight;

// dimension/position initialisation
svg_elem.setAttribute('width',`${width}`);
svg_elem.setAttribute('height',`${height}`);
border.setAttribute('width',`${width}`);
border.setAttribute('height',`${height}`);

let bottom1=height-bottomsectionheight;
let bottom2=height;
divider.setAttribute('x1','0');
divider.setAttribute('x2',`${width}`);
divider.setAttribute('y1',`${bottom1}`);
divider.setAttribute('y2',`${bottom1}`);

title.setAttribute('x',`${width/2}`);
title.setAttribute('y','30');

// create rectangles
for(let i=1;i<=12;i++){
    // moving rect
    let rect=document.createElementNS('http://www.w3.org/2000/svg','rect');
    rect.setAttribute('id',`rectcopy${i}`);
    rect.setAttribute('x',`${10+40*(i-1)}`);

    let rect_h=Math.random()*200;
    rect.setAttribute('y',`${bottom1-rect_h}`);
    rect.setAttribute('width','30');
    rect.setAttribute('height',`${rect_h}`);

    rect.setAttribute('stroke','black');
    rect.setAttribute('fill','green');

    rects.appendChild(rect);

    // actual rect
    rect=document.createElementNS('http://www.w3.org/2000/svg','rect');
    rect.setAttribute('id',`rect${i}`);
    rect.setAttribute('x',`${10+40*(i-1)}`);

    rect.setAttribute('y',`${bottom1-rect_h}`);
    rect.setAttribute('width','30');
    rect.setAttribute('height',`${rect_h}`);

    rect.setAttribute('stroke','black');
    rect.setAttribute('fill','green');

    rects.appendChild(rect);
}

// arrow, max initialisation 
let arrow_x=0;
let arrow_y=0;

let sorted=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let t=0;
for(let i=1;i<=12;i++){
    let min_height=1e9;
    let min_rect=-1;

    
    for(let j=1;j<=12;j++){
        if(sorted[j]) continue;

        // move arrow to rectj
        let rectj=document.getElementById(`rect${j}`);
        let rectjx=(+rectj.getAttribute('x'))+(+rectj.getAttribute('width'))/2;
        if(j==1){
            if(i==1){ // first arrow move; instant
                arrow.setAttribute('transform',`translate(${arrow_x-=arrow_x},${arrow_y-=arrow_y})`);
                arrow.setAttribute('transform',`translate(${arrow_x+=rectjx},${arrow_y+=bottom1})`);
            }
            else{ // animate
                arrow.innerHTML+=`<animateTransform attributeName="transform" fill="freeze" type="translate" to="${rectjx} ${bottom1}" begin="${t}s" dur="1.5s"/>`
                t+=1.5;
            }
        }
        else{
            arrow.innerHTML+=`<animateTransform attributeName="transform" fill="freeze" type="translate" to="${rectjx} ${bottom1}" begin="${t}s" dur="0.5s"/>`
            t+=0.5;
        }

        // change colour if necessary
        let rect_height=+rectj.getAttribute('height');
        if(rect_height<min_height){
            if(min_rect!=-1){
                document.getElementById(`rect${min_rect}`).innerHTML+=`<animate attributeName='fill' to='green' begin="${t}s" fill='freeze' dur='0.5s'/>`;
            }

            min_rect=j;
            min_height=rect_height;
            
            rectj.innerHTML+=`<animate attributeName='fill' to='red' begin="${t}s" fill='freeze' dur='0.5s'/>`;
        }
        t+=0.5;
    }

    sorted[min_rect]=1;
    document.getElementById(`rect${min_rect}`).innerHTML+=`<animate attributeName='fill' to='#FFFACD' begin="${t}s" fill='freeze' dur='1.5s'/>`;
    document.getElementById(`rectcopy${min_rect}`).innerHTML+=`<animate attributeName='x' to='${10+40*(i-1)}' begin="${t}s" fill='freeze' dur='1.5s'/>`;
    document.getElementById(`rectcopy${min_rect}`).innerHTML+=`<animate attributeName='y' to='${bottom2-min_height}' begin="${t}s" fill='freeze' dur='1.5s'/>`;
}

arrow.innerHTML+=`<animate attributeName="opacity" fill="freeze" to="0" begin="${t}s" dur="0.5s"/>`
