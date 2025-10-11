let canvs=document.getElementById("canvs");
let ctx=canvs.getContext("2d");

let w;
let h;
let mid;

let n1;
let n2;

function round(n){
    return +(Math.round(n+"e+2")+"e-2");
}

function rad(deg){
    return deg*(Math.PI/180);
}

function deg(rad){
    return (180/Math.PI)*rad;
}

function update(elem,val){
    elem.innerHTML=val;
}

function set_opacity(elem,val){
    elem.style.opacity=val;
}

function draw_line(a,b,colour="black",dash=[]){
    ctx.beginPath();
    ctx.moveTo(a[0],a[1]);
    ctx.lineTo(b[0],b[1]);
    ctx.strokeStyle=colour;
    ctx.setLineDash(dash);
    ctx.stroke();
}

function shine(angle){
    let dx=w;
    let dy=w*Math.tan(angle);
    draw_line(mid,[mid[0]-dx,mid[1]-dy],"red");

    ctx.beginPath();
    ctx.arc(mid[0],mid[1],30,Math.PI,Math.PI+angle);
    ctx.stroke();
}

function reflect(angle){
    let reflected_angle=angle;
    let dx=w;
    let dy=w*Math.tan(reflected_angle);
    draw_line(mid,[mid[0]-dx,mid[1]+dy]);

    ctx.beginPath();
    ctx.arc(mid[0],mid[1],30,Math.PI-reflected_angle,Math.PI);
    ctx.stroke();
}

function refract(angle){
    let refracted_angle=Math.asin((Math.sin(angle)*n1)/n2);
    if(isNaN(refracted_angle)){
        set_opacity(document.getElementById("TIR"),1);
        update(document.getElementById("refracted_angle"),"N/A");
        reflect(angle);
        return;
    }

    let dx=w;
    let dy=w*Math.tan(refracted_angle);
    draw_line(mid,[mid[0]+dx,mid[1]+dy])

    ctx.beginPath();
    ctx.arc(mid[0],mid[1],30,0,refracted_angle);
    ctx.stroke();

    set_opacity(document.getElementById("TIR"),0);
    update(document.getElementById("refracted_angle"),round(deg(refracted_angle))+"°");
}

function refraction(angle){
    shine(angle);
    refract(angle);
}

function calc_critical_angle(){
    let index1=document.getElementById("index1").value;
    let index2=document.getElementById("index2").value;

    if(isNaN(index1) || index1<1){
        update(document.getElementById("critical_angle"),"N/A");
        return;
    }
    if(isNaN(index2) || index2<1){
        update(document.getElementById("critical_angle"),"N/A");
        return;
    }

    if(index1<=index2){
        update(document.getElementById("critical_angle"),"N/A");
    }
    else{
        update(document.getElementById("critical_angle"),round(deg(Math.asin(index2/index1)))+"°");
    }
}

function check_input(){
    let valid=true;
    let index1=document.getElementById("index1").value;
    let index2=document.getElementById("index2").value;
    let incident_angle=document.getElementById("incident_angle").value;

    if(isNaN(index1) || index1<1){
        valid=false;
        set_opacity(document.getElementById("index1_error"),1);
    }
    else set_opacity(document.getElementById("index1_error"),0);

    if(isNaN(index2) || index2<1){
        valid=false;
        set_opacity(document.getElementById("index2_error"),1);
    }
    else set_opacity(document.getElementById("index2_error"),0);

    if(isNaN(incident_angle) || incident_angle=="" || incident_angle<0 || incident_angle>=90){
        valid=false;
        set_opacity(document.getElementById("incident_angle_error"),1);
    }
    else set_opacity(document.getElementById("incident_angle_error"),0);

    return valid;
}

function redraw(){
    calc_critical_angle();
    if(!check_input()) return;

    ctx.clearRect(0,0,canvs.width,canvs.height);
    draw_line([w/2,0],[w/2,h]);
    draw_line([0,h/2],[w,h/2],"black",[5,3]);
    n1=document.getElementById("index1").value;
    n2=document.getElementById("index2").value;
    let incident_angle=rad(document.getElementById("incident_angle").value);
    refraction(incident_angle);
}

function resize(){
    document.body.style.display="none";

    w=innerWidth-20;
    h=innerHeight-20;
    mid=[w/2,h/2];

    let medium1=document.getElementById("medium1");
    let medium2=document.getElementById("medium2");
    canvs.height=h;
    canvs.width=w;
    
    canvs.style.heigh=medium1.style.height=medium2.style.height=`${h}px`;
    canvs.style.width=`${w}px`;
    medium1.style.width=medium2.style.width=`${w/2}px`;
    medium1.style.left="0px";
    medium2.style.left=`${w/2}px`;

    redraw();

    document.body.style.display="block";
}

// The function resize() draws the webpage to the window dimensions
// The webpage is initialised with this function, and the function is called whenever the window is resized.
// The canvas content is automatically cleared and redrawn whenever inputs are changed by the user.

resize();
window.addEventListener("resize",resize);