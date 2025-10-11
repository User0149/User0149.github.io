document.addEventListener("DOMContentLoaded",()=>{
    var checked=document.getElementById('checked');
    var checking=document.getElementById('checking');
    var animation=document.getElementById('animation');

    let start=Math.floor(Math.random()*1000)+1
    let cur=start
    let steps=0
    checking.innerHTML="Checking: "+start
    let reached=false

    window.setInterval(function(){
        if(cur==1){
            if(!reached){
                reached=true
                animation.innerHTML+=1
                animation.style.color="green"
                checked.innerHTML+=(start+" ("+steps+" steps), ")
            }
            else{
                reached=false
                animation.innerHTML=""
                animation.style.color="black"
                start=cur=Math.floor(Math.random()*1000)+1
                steps=0
                checking.innerHTML="Checking: "+start;
            }
        }
        else{
            animation.innerHTML+=(cur+" ");
            if(cur%2==0) cur/=2;
            else cur=3*cur+1;
            steps++;
        }
    },50);
});