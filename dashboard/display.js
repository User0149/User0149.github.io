var toggle; 
var on="dashboard";
toggle=function toggle(id){
    if(on!=id){
        if(on=="dashboard") hide_dashboard();
        else document.getElementById(on).style.display="none";
        on=id;
        if(id=="dashboard") show_dashboard();
        else document.getElementById(id).style.display="inline-block";
    }
}