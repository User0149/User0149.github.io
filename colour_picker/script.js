let colours=["red","green","blue","black","white","grey","yellow","light blue","magenta","orange","brown","dark green"];
let rgb_values=["rgb(255,0,0)","rgb(0,255,0)","rgb(0,0,255)","rgb(0,0,0)","rgb(255,255,255)","rgb(128,128,128)","rgb(255,255,0)","rgb(0,191,255)","rgb(255,0,255)","rgb(255,140,0)","rgb(139,69,19)","rgb(0,128,0)"];
;
let slider_table=document.getElementById("slider_table");

for(let i=0;i<=colours.length-1;i++){
    let c_name=colours[i];
    let rgb_code=rgb_values[i];

    let new_row=slider_table.insertRow(-1);
    let cell1=new_row.insertCell(-1);
    let cell2=new_row.insertCell(-1);
    new_row.classList.add("slider_row");
    cell1.classList.add("table_colour");

    let colour_container=document.createElement("div");
    colour_container.classList.add("flex","flex_align_center");
    cell1.appendChild(colour_container);

    let colour_name=document.createElement("div");
    colour_name.classList.add("courier_new","flex_float_right");
    colour_name.innerText=c_name;
    colour_container.appendChild(colour_name);

    let colour_preview=document.createElement("div");
    colour_preview.classList.add("table_colour_preview","flex_float_right");
    colour_preview.style.backgroundColor=rgb_code;
    colour_preview.onclick=function(){set_colour(rgb_code);};
    colour_preview.onmouseenter=function(){preview(rgb_code);};
    colour_preview.onmouseleave=hide_preview;
    colour_container.appendChild(colour_preview);
    
    let slider=document.createElement("div");
    slider.id=`${c_name}_slider`;
    slider.classList.add("slider","black_border");
    slider.style.backgroundImage=`linear-gradient(to right,rgb(0,0,0),${rgb_code})`;
    slider.onclick=function(e){
        set_colour(get_rgb(e,i));
        preview(get_rgb(e,i))
    };
    slider.onmousemove=function(e){preview(get_rgb(e,i));};
    slider.onmouseleave=hide_preview;
    cell2.appendChild(slider);
}