window.onclick=function(event) {
    if(event.target==information) {
        information.style.display="none";
    }
    else if(event.target==settings) {
        settings.style.display="none";
    }
}

var number_site=10;
var sites=[];
for(var i=1;i<=10;i++){
    sites.push(String(i));
}

document.addEventListener("DOMContentLoaded",()=>{
    var document_height=window.innerHeight
    var document_width=window.innerWidth
    sites.forEach(i => {
        document.getElementById('site'+i).style.height=`${document_height-30.5}px`;
    });

    document.getElementById("main_embed").style.height=`${document_height-300}px`
    document.getElementById("main_embed").style.width=`${document_width-100}px`
});

document.addEventListener("DOMContentLoaded",()=>{
    var version="3.2.0";
    var last_updated="16 July 2022";
    document.getElementById("version").innerHTML=version
    document.getElementById("update_date").innerHTML=last_updated;
})

show_dashboard() // Shows dashboard on startup </script>