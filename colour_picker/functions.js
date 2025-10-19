let prev_rgb="rgb(0,0,0)";
let prev_hex="#000000";

function copy(id){
    let val=document.getElementById(id).value;
    navigator.clipboard.writeText(val);
}

function show_prev_values(){
    let rgb_value=document.getElementById("rgb_value");
    let hex_value=document.getElementById("hex_value");
    rgb_value.value=prev_rgb;
    hex_value.value=prev_hex;
}
function hide_preview_no_change_rgb(){
    let preview=document.getElementById("colour_preview_box");
    preview.style.display="none";
    let hex_value=document.getElementById("hex_value");
    hex_value.value=prev_hex;
}
function hide_preview_no_change_hex(){
    let preview=document.getElementById("colour_preview_box");
    preview.style.display="none";
    let rgb_value=document.getElementById("rgb_value");
    rgb_value.value=prev_rgb;
}
function hide_preview(){
    let preview=document.getElementById("colour_preview_box");
    preview.style.display="none";
    show_prev_values();
}
function preview(rgb_code){
    let preview=document.getElementById("colour_preview_box");
    preview.style.backgroundColor=rgb_code;
    preview.style.display='block';

    let rgb_value=document.getElementById("rgb_value");
    let hex_value=document.getElementById("hex_value");
    rgb_value.value=rgb_code;
    hex_value.value=rgb_to_hex(rgb_code);
}
function preview_no_change_rgb(rgb_code){
    let preview=document.getElementById("colour_preview_box");
    preview.style.backgroundColor=rgb_code;
    preview.style.display='block';

    let hex_value=document.getElementById("hex_value");
    hex_value.value=rgb_to_hex(rgb_code);
}
function preview_no_change_hex(rgb_code){
    let preview=document.getElementById("colour_preview_box");
    preview.style.backgroundColor=rgb_code;
    preview.style.display='block';

    let rgb_value=document.getElementById("rgb_value");
    rgb_value.value=rgb_code;
}

function simplify_rgb(code){
    code=code.slice(4,code.length-1);
    let rgb=code.split(",");
    return "rgb("+String(Math.floor(+rgb[0]))+","+String(Math.floor(+rgb[1]))+","+String(Math.floor(+rgb[2]))+")";
}
function simplify_hex(code){
    let ret="#";
    for(let i=1;i<=6;i++){
        if('A'<=code[i] && code[i]<='F') ret+=String.fromCharCode('a'.charCodeAt(0)+code.charCodeAt(i)-'A'.charCodeAt(0));
        else ret+=code[i];
    }
    return ret;
}

function rgb_to_hex_comp(n){ // int -> string
    let digits="0123456789abcdef";
    return digits[Math.floor(n/16)]+digits[n%16];
}
function hex_to_rgb_comp(s){ // string -> string
    let digits="0123456789abcdef";
    return String(digits.indexOf(s[0])*16+digits.indexOf(s[1]));
}

function rgb_to_hex(code){
    code=code.slice(4,code.length-1);
    let rgb=code.split(",");
    return "#"+rgb_to_hex_comp(+rgb[0])+rgb_to_hex_comp(+rgb[1])+rgb_to_hex_comp(+rgb[2]);
}
function hex_to_rgb(code){
    return "rgb("+hex_to_rgb_comp(code.slice(1,3))+","+hex_to_rgb_comp(code.slice(3,5))+","+hex_to_rgb_comp(code.slice(5,7))+")";
}

function valid_rgb(code){
    if(code.slice(0,4)!="rgb(") return 0;
    if(code[code.length-1]!=")") return 0;
    code=code.slice(4,code.length-1);
    let rgb=code.split(",");
    if(rgb.length!=3) return 0;
    if(!(0<=+rgb[0] && +rgb[0]<=255) || rgb[0].trim()=="") return 0;
    if(!(0<=+rgb[1] && +rgb[1]<=255) || rgb[1].trim()=="") return 0;
    if(!(0<=+rgb[2] && +rgb[2]<=255) || rgb[2].trim()=="") return 0;
    return 1;
}
function valid_hex(code){
    if(code.length!=7) return 0;
    if(code[0]!='#') return 0;
    if(!(('0'<=code[1] && code[1]<='9') || ('a'<=code[1] && code[1]<='f') || ('A'<=code[1] && code[1]<='F'))) return 0;
    if(!(('0'<=code[2] && code[2]<='9') || ('a'<=code[2] && code[2]<='f' || ('A'<=code[2] && code[2]<='F')))) return 0;
    if(!(('0'<=code[3] && code[3]<='9') || ('a'<=code[3] && code[3]<='f') || ('A'<=code[3] && code[3]<='F'))) return 0;
    if(!(('0'<=code[4] && code[4]<='9') || ('a'<=code[4] && code[4]<='f') || ('A'<=code[4] && code[4]<='F'))) return 0;
    if(!(('0'<=code[5] && code[5]<='9') || ('a'<=code[5] && code[5]<='f') || ('A'<=code[5] && code[5]<='F'))) return 0;
    if(!(('0'<=code[6] && code[6]<='9') || ('a'<=code[6] && code[6]<='f') || ('A'<=code[6] && code[6]<='F'))) return 0;
    return 1;
}

function mix_rgb(a,b,k){
    a_comps=a.slice(4,a.length-1).split(',');
    b_comps=b.slice(4,b.length-1).split(',');
    return "rgb("+String(Math.round((1-k)*(+a_comps[0])+k*(+b_comps[0])))+","+String(Math.round((1-k)*(+a_comps[1])+k*(+b_comps[1])))+","+String(Math.round((1-k)*(+a_comps[2])+k*(+b_comps[2])))+")"
}

function get_rgb(e,slider_idx){
    let c_name=colours[slider_idx];
    let rgb_code=rgb_values[slider_idx];
    let slider_id=`${c_name}_slider`;
    let slider=document.getElementById(slider_id);

    let x1=slider.getBoundingClientRect().x;
    let x2=x1+slider.getBoundingClientRect().width;

    let x=e.pageX;

    let k=(x-x1)/(x2-x1);
    let a=prev_rgb;
    let b=rgb_code;
    return mix_rgb(a,b,k);
}

function try_rgb_preview(rgb_code){
    if(valid_rgb(rgb_code)) preview_no_change_rgb(simplify_rgb(rgb_code));
    else hide_preview_no_change_rgb();
}
function try_hex_preview(hex_code){
    if(valid_hex(hex_code)) preview_no_change_hex(hex_to_rgb(simplify_hex(hex_code)));
    else hide_preview_no_change_hex();
}

function update_gradients(initial_rgb_code){
    for(let i=0;i<=colours.length-1;i++){
        let c_name=colours[i];
        let rgb_code=rgb_values[i];

        let slider=document.getElementById(`${c_name}_slider`);
        slider.style.backgroundImage=`linear-gradient(to right,${initial_rgb_code},${rgb_code})`
    }
}

function set_colour(rgb_code){
    let square=document.getElementById("colour_box");
    square.style.backgroundColor=rgb_code;

    let rgb_value=document.getElementById("rgb_value");
    rgb_value.value=prev_rgb=rgb_code;
    let hex_value=document.getElementById("hex_value");
    hex_value.value=prev_hex=rgb_to_hex(rgb_code);

    update_gradients(rgb_code);
}

function try_set_rgb(rgb_code){
    if(valid_rgb(rgb_code)){
        hide_preview();
        set_colour(simplify_rgb(rgb_code));
    }
    else{
        hide_preview();
        let rgb_value=document.getElementById("rgb_value");
        rgb_value.value=prev_rgb;
    }
}
function try_set_hex(hex_code){
    if(valid_hex(hex_code)){
        hide_preview();
        set_colour(hex_to_rgb(simplify_hex(hex_code)));
    }
    else{
        hide_preview();
        let hex_value=document.getElementById("hex_value");
        hex_value.value=prev_hex;
    }
}