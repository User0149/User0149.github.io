// Set all the settings to current values on starup

// show buttons
sites.forEach(i => {
    if(localStorage.getItem(i+"_on")==null){
        localStorage.setItem(i+"_on","true");
    }
    if(localStorage.getItem(i+"_on")=="false"){
        document.getElementById("site"+i+"_show").checked=false;
    }
    else if(localStorage.getItem(i+"_on")=="true"){
        document.getElementById("site"+i+"_show").checked=true;
    }
    else{
        window.alert("There's a bug with the cookies this site uses. Please tell the developer.");
    }
});
// Embed/link
sites.forEach(i => {
    if(localStorage.getItem("embed/link"+i)==null){
        localStorage.setItem("embed/link"+i,"embed"); // default to embed
    }
    if(localStorage.getItem("embed/link"+i)=="embed"){
        document.getElementById("site"+i+"_type").checked=true;
    }
    else{
        document.getElementById("site"+i+"_type").checked=false;
    }
});
// Site name
sites.forEach(i => {
    if(localStorage.getItem("site_name"+i)==null){
        localStorage.setItem("site_name"+i,"Example");
    }
    document.getElementById("site"+i+"_name").value=localStorage.getItem("site_name"+i);
});
// Site link
var example="https://www.example.com";
sites.forEach(i => {
    if(localStorage.getItem("site_link"+i)==null){
        localStorage.setItem("site_link"+i,example);
    }
    document.getElementById("site"+i+"_link").value=localStorage.getItem("site_link"+i);
});


var refresh_buttons;

refresh_buttons=function refresh_buttons(){
    sites.forEach(i => {
        if(localStorage.getItem(i+"_on")=="false"){
            document.getElementById("button"+i).style.display="none";
        }
        else if(localStorage.getItem(i+"_on")=="true"){
            document.getElementById("button"+i).style.display="initial";
        }
        
        document.getElementById("button"+i).innerHTML=localStorage.getItem("site_name"+i);
        document.getElementById("site"+i+"_show_text").innerHTML=localStorage.getItem("site_name"+i);
        
        if(localStorage.getItem("embed/link"+i)=="embed"){
            document.getElementById("site"+i).src=localStorage.getItem("site_link"+i);
            document.getElementById("button"+i).onclick=function onclick(event){toggle('site'+i);};
        }
        else if(localStorage.getItem("embed/link"+i)=="link"){
            var open_link="site_link"+i;
            document.getElementById("button"+i).onclick=function onclick(event){window.open(localStorage.getItem(open_link));};
        }
        else window.alert("There is a problem with the embed/link cookie. Please contact the developer.");
    });
}

// Show/hide a button
var update_show;
update_show=function update_show(id,on){
    if(on){
        localStorage.setItem(id+"_on","true");
        document.getElementById("button"+id).style.display="initial";
    }
    else{
        localStorage.setItem(id+"_on","false");
        document.getElementById("button"+id).style.display="none";
    }
}
// Change whether a site is an embed/link
var update_type;

update_type=function update_type(id,on){
    if(on){
        localStorage.setItem("embed/link"+id,"embed");
    }
    else{
        localStorage.setItem("embed/link"+id,"link");
    }
    refresh_buttons();
}
// Change the name of the button
var update_name;
update_name=function update_name(id,value){
    localStorage.setItem("site_name"+id,value);
    refresh_buttons();
}
// Change the webpage url of a site
var update_link;
update_link=function update_link(id,value){
    localStorage.setItem("site_link"+id,value);
    refresh_buttons();
}

// Add buttons on startup
refresh_buttons(); 