let svg_elem=document.getElementById('svg_elem');
let border=document.getElementById('border');

let L=600;
svg_elem.setAttribute('width',L);
svg_elem.setAttribute('height',L);
border.setAttribute('width',L);
border.setAttribute('height',L);

function color(){
    return (Math.random()<0.5?255*Math.pow(Math.random(),1.5):255*(1-Math.pow(Math.random(),1.5)));
}

let t=0;
for(let i=1;i<=20;i++){ // A=0.5^i
    if(i%2==1){ // vertical rect
        let x=L*(1-Math.pow(0.5,(i-1)/2));
        let y=L*(1-Math.pow(0.5,(i-1)/2));

        let h=L*Math.pow(0.5,(i-1)/2);
        let w=L*Math.pow(0.5,(i+1)/2);

        let r=color();
        let g=color();
        let b=color();

        svg_elem.innerHTML+=`<rect opacity='0' stroke='black' fill='rgb(${r},${g},${b})' height='${h}' width='${w}' x='${x}' y='${y}'><animate fill='freeze' dur='1s' begin='${t}s' attributeName='opacity' to='1'/></rect>`;
    }
    else{ // horizontal
        let x=L*(1-Math.pow(0.5,i/2));
        let y=L*(1-Math.pow(0.5,i/2-1));

        let h=L*Math.pow(0.5,i/2);
        let w=L*Math.pow(0.5,i/2);
        
        
        let r=color();
        let g=color();
        let b=color();

        svg_elem.innerHTML+=`<rect opacity='0' stroke='black' fill='rgb(${r},${g},${b})' height='${h}' width='${w}' x='${x}' y='${y}'><animate fill='freeze' dur='1s' begin='${t}s' attributeName='opacity' to='1'/></rect>`;
    }
    t+=1;
}