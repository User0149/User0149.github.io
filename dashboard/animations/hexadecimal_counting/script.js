document.addEventListener("DOMContentLoaded",()=>{
    let box=document.getElementById("box");
    let info=document.getElementById("info");

    let rgb;
    let shows=[[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];
    let cur=shows[Math.floor(Math.random()*shows.length)];
    let inc=Math.floor(Math.random()*2);
    if(inc) rgb=[0,0,0];
    else rgb=[255,255,255];

    function update(){
        box.style.backgroundColor=`rgb(${rgb})`;
        info.innerHTML=`rgb(${rgb})`;
    }

    function increment(){
        let i=0;
        while(rgb[cur[i]]==255 && i<=1){
            i++;
        }
        if(rgb[cur[i]]!=255) rgb[cur[i]]++;
        else{
            inc=0;
            cur=shows[Math.floor(Math.random()*shows.length)];
        }
    }
    function decrement(){
        let i=0;
        while(rgb[cur[i]]==0 && i<=1){
            i++;
        }
        if(rgb[cur[i]]!=0) rgb[cur[i]]--;
        else{
            inc=1;
            cur=shows[Math.floor(Math.random()*shows.length)];
        }
    }

    window.setInterval(function(){
        if(inc) increment();
        else decrement();
        update();
    },20);
});