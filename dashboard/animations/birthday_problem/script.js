document.getElementById('table').style.display="table";
let table=document.getElementById('table').innerHTML;

let epoch=new Date(2016,0,1); // leap year
let four_years=new Date(2020,0,1).getTime()-epoch.getTime();

let trials=0;
let matches=0;

window.setInterval(function(){
    let match=0;
    document.getElementById('table').innerHTML=table;
    let colour=new Map();

    for(let i=1;i<=25;i++){
        let cell=document.getElementById(i);

        let birthday=new Date(epoch.getTime()+Math.floor(Math.random()*four_years)).toDateString().slice(4,-5);
        cell.innerHTML=birthday;
        if(!colour.has(birthday)) colour.set(birthday,"rgb("+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+")");

        for(let j=1;j<=i-1;j++){
            let prev_cell=document.getElementById(j);
            if(prev_cell.innerHTML==cell.innerHTML){
                match=1;
                cell.style.backgroundColor=prev_cell.style.backgroundColor=colour.get(birthday);
            }
        }
    }

    trials++;
    matches+=match;
    document.getElementById("prob").innerHTML=matches/trials;
},1000);