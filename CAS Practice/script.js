let h=window.innerHeight-30;
let w=window.innerWidth-30;

let question_box=document.getElementById("question_box");
let info=document.getElementById("info");
info.style.height=`${h}px`;
info.style.width="350px";

question_box.style.height=`${h}px`;
question_box.style.width=`${w-380}px`;

// actual code: always return bracketed stuff

let prompt=document.getElementById('prompt');
let equation=document.getElementById('equation');
let input=document.getElementById('input');
let score=document.getElementById('score');
let delete_score=document.getElementById('delete_score');
let time=document.getElementById('time');
let avg_score=document.getElementById('avg_score');
let high_score=document.getElementById('high_score');

// initialisation
if(localStorage.getItem('scores_CAS')==null) localStorage.setItem('scores_CAS',JSON.stringify([]));
let scores=JSON.parse(localStorage.getItem('scores_CAS')); // array of [date,score]

// useful things

function round(n){
    return Math.round(n*100)/100;
}

function constant(x=0){
    let ans=String(Math.floor(1/Math.pow(Math.random(),2))-1); // non-negative integer

    if(ans!='0') ans=(Math.random()<0.5?'-':'')+ans;
    return ans;
}

function coefficient(){
    let ans=constant(); 
    while(ans=='0') ans=constant();
    if(ans=='1') ans='';
    else if(ans=='-1') ans='-'; // -1x term
    
    return ans;
}

function add(...a){ // first term is nonzero; all constants are integers
    let ans='';
    ans+=a[0];

    for(let i=1;i<=a.length-1;i++){
        if(a[i][0]=='0') a[i]=''; // don't add anything
        else if(a[i][0]!='-') a[i]='+'+a[i]; // add a plus sign
        ans+=a[i];
    }
    return ans;
}

// functions

function exp(x){
    let a=coefficient();
    return a+'e^'+x;
}

function sqrt(x){
    let a=coefficient();
    return a+'\\sqrt '+x;
}

function linear(x){
    let a=coefficient();
    let b=constant();

    let ans=add(a+x,b);
    return ans;
}

function quadratic(x){
    let a=coefficient();
    let b=coefficient();
    let c=constant()

    let ans=add(a+x+'^2',b+x,c);
    return ans;
}

let functions=[exp,constant,linear,quadratic,sqrt];

function random_function(x){
    let f=functions[Math.floor(Math.random()*functions.length)];
    return f(x);
}

function display(){
    prompt.innerHTML='Solve for $x$ in the following equation:';
    equation.innerHTML='$'+random_function('x')+"="+random_function('x')+'$';
    MathJax.typeset();
}

function update_high_scores(){
    let best_time=10000000000; // no one will spend 10 million seconds on a question, right?
    let avg_time=0;

    let new_scores=[];
    for(let i of scores){
        let date=i[0];
        if(new Date().getUTCMilliseconds()-date<1000*60*60*24*7){ // within a week
            avg_time+=i[1];
            best_time=Math.min(best_time,i[1]);

            new_scores.push(i);
        }
    }

    avg_time/=new_scores.length;
    localStorage.setItem('scores_CAS',JSON.stringify(scores));

    if(best_time==10000000000) high_score.innerHTML='0.00';
    else high_score.innerHTML=round(best_time);

    if(isNaN(avg_time)) avg_score.innerHTML='0.00';
    else avg_score.innerHTML=round(avg_time);
}

let time_taken=0;

function show_time(){
    time.innerHTML=round(time_taken);
    score.style.display='block';
    delete_score.style.display='block';
}
function save(){
    scores.push([new Date().getUTCMilliseconds(),time_taken]);
    update_high_scores();
}

function next(){
    score.style.display='none';
    delete_score.style.display='none';
    input.value='';
    display();
}

// actual gameplay
let previous_start=new Date();
let cur_time=new Date();

let do_save=0;
let display_time=0;
let go_to_next=1;

update_high_scores();
setInterval(function(){
    cur_time=new Date();
    if(display_time){
        time_taken=(cur_time-previous_start)/1000;
        show_time();
        display_time=0;
    }
    if(do_save){
        save();
        do_save=0;
    }
    if(go_to_next){
        next();
        previous_start=new Date();
        go_to_next=0;
    } 
},10);