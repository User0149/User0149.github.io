// Add sites
var number_site=10;
var sites=[];
for(var i=1;i<=10;i++){
    sites.push(String(i));
}
// Add modal box functionality
window.onclick=function(event){
    if(event.target==settings) {
        settings.style.display="none";
    }
}