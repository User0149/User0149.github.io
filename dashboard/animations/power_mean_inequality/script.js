let numbers=document.getElementById("numbers");

let r=Math.ceil(Math.random()*500);
let l=1;
document.getElementById("r").innerHTML=r;

function round(n){
    return Math.round(n*100)/100;
}

let list=[];
function add_number(){
    let number=Math.random()*((r-l)+0.01)-0.005; // [-0.005,(r-l)+0.005)
    number=round(number+l);  // [l,r) with even distribution

    list.push(number);
    numbers.innerHTML+=number+"&nbsp&nbsp ";
    return number;
}

function calc_expected(){
    let e_qm=r/Math.sqrt(3)-l/Math.sqrt(3);
    let e_am=r/2-l/2;
    let e_gm=Math.exp((1/r)*r*(Math.log(r)-1));
    let e_hm=r/(Math.log(r)-Math.log(l));

    document.getElementById("e-min").innerHTML=l;
    document.getElementById("e-qm").innerHTML=round(e_qm);
    document.getElementById("e-am").innerHTML=round(e_am);
    document.getElementById("e-gm").innerHTML=round(e_gm);
    document.getElementById("e-hm").innerHTML=round(e_hm);
    document.getElementById("e-max").innerHTML=r;
}

function max(){
    let ans=0;
    for(let i=0;i<=list.length-1;i++) ans=Math.max(ans,list[i]);

    return ans;
}

function qm(){
    let sum=0;
    for(let i=0;i<=list.length-1;i++) sum+=list[i]*list[i];
    
    return round(Math.sqrt(sum/list.length));
}

function gm(){
    let mean=1;
    for(let i=0;i<=list.length-1;i++){
        mean*=Math.pow(list[i],1/list.length);  
    } 
    
    return round(mean);
}

function am(){
    let sum=0;
    for(let i=0;i<=list.length-1;i++) sum+=list[i];
    
    return round(sum/list.length);
}

function hm(){
    let sum=0;
    for(let i=0;i<=list.length-1;i++) sum+=1/list[i];
    
    return round(list.length/sum);
}

function min(){
    let ans=1e8;
    for(let i=0;i<=list.length-1;i++) ans=Math.min(ans,list[i]);
    
    return ans;
}

calc_expected();

window.setInterval(function(){
    let number=add_number();
    document.getElementById("generated").innerHTML++;

    document.getElementById("max").innerHTML=max();
    document.getElementById("qm").innerHTML=qm();
    document.getElementById("am").innerHTML=am();
    document.getElementById("gm").innerHTML=gm();
    document.getElementById("hm").innerHTML=hm();
    document.getElementById("min").innerHTML=min(list);
},100);