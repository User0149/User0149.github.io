function display_parameter(id){
    return "block";
}
function fadein(id){
    document.getElementById(id).style.opacity=0;
    document.getElementById(id).style.display=display_parameter(id);
    var interval=null;
    var elem=document.getElementById(id);
    var opacity=0;
    clearInterval(interval);
    interval=setInterval(frame,1);
    function frame(){
        if(opacity==100){
            clearInterval(interval);
        } 
        else {
            elem.style.opacity=String(opacity)+'%';
            opacity++;
        }
    }
}
function show_dashboard(){
    fadein("main")
}
function hide_dashboard(){
    document.getElementById("main").style.display="none";  
}