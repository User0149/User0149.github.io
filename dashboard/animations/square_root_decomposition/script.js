let w=innerWidth-30;

let table=document.getElementById('SQRT');
let sqrt=Math.floor(Math.sqrt(w/30));

function generate(){
    let buckets=table.insertRow();
    let cells=table.insertRow();

    for(let i=0;i<=sqrt-1;i++){
        let bucket=buckets.insertCell();
        bucket.id="b"+i;
        bucket.classList.add('bucket');
        bucket.style.width=`${30*sqrt}px`;
        bucket.colSpan=sqrt;

        bucket.innerHTML=0;
    }
    let elements=sqrt*sqrt;
    for(let i=0;i<=elements-1;i++){
        let element=cells.insertCell();
        element.id=i;
        element.classList.add('element');

        element.innerHTML=0;
    }
}

let coloured=[];

function reset(){
    while(coloured.length!=0){
        let id=coloured.pop();
        document.getElementById(id).style.backgroundColor="initial";
    }

    if(table.rows.length>=5){
        table.deleteRow(4);
        table.deleteRow(3);
        table.deleteRow(2);
    }
}

function create_brace(a,b,v){
    for(let r=1;r<=3;r++){
        let braces=table.insertRow();
        for(let i=0;i<=a-1;i++){
            let brace=braces.insertCell();
            brace.classList.add('brace');
            if(r==2) brace.style.height='10px';
        }

        {
            let range=b-a+1;
            let brace=braces.insertCell();
            brace.classList.add('brace');
            brace.colSpan=range;
            if(r==2) brace.style.height='10px';
            if(r==2){
                brace.style.borderLeft="1px solid black";
                brace.style.borderRight="1px solid black";
                brace.style.borderBottom="1px solid black";
            }
            if(r==3) brace.innerHTML=v;
        }

        for(let i=b+1;i<=sqrt*sqrt-1;i++){
            let brace=braces.insertCell();
            brace.classList.add('brace');
            if(r==2) brace.style.height='10px';
        }
    }
}

function mark_inc(i,v){
    let sign=(v>=0?'+':'');
    create_brace(i,i,sign+v);
}

function mark_sum(a,b,v){
    create_brace(a,b,v);
}

function highlight(id,colour){
    document.getElementById(id).style.backgroundColor=colour;
    coloured.push(id);
}

function query(a,b){
    let sum=0;

    let start_bucket=Math.ceil(a/sqrt);
    let end_bucket=Math.floor((b+1)/sqrt)-1;
    if(start_bucket>end_bucket){
        for(let i=a;i<=b;i++){
            highlight(i,"red");
            sum+=parseInt(document.getElementById(i).innerHTML);
        }
    }
    else{
        for(let i=start_bucket;i<=end_bucket;i++){
            highlight('b'+i,"red");
            sum+=parseInt(document.getElementById('b'+i).innerHTML);
        }
        for(let i=a;i%sqrt!=0;i++){
            highlight(i,"red");
            sum+=parseInt(document.getElementById(i).innerHTML);
        }
        for(let i=b;i%sqrt!=sqrt-1;i--){
            highlight(i,"red");
            sum+=parseInt(document.getElementById(i).innerHTML);
        }
    }

    mark_sum(a,b,sum);
}

function update(i,v){
    mark_inc(i,v);

    let bucket=document.getElementById('b'+Math.floor(i/sqrt));
    highlight('b'+Math.floor(i/sqrt),"green");
    bucket.innerHTML=parseInt(bucket.innerHTML)+v;

    let element=document.getElementById(i);
    highlight(i,"green");
    element.innerHTML=parseInt(element.innerHTML)+v;
}

generate();

let pos=0.75;
setInterval(function(){
    reset();

    if(Math.random()>0.5){
        let a=Math.floor(Math.random()*sqrt*sqrt);
        let b=Math.floor(Math.random()*sqrt*sqrt);
        if(a>b){
            let temp=a;
            a=b;
            b=temp;
        }
        query(a,b);
    }
    else{
        let i=Math.floor(Math.random()*sqrt*sqrt);
        let sign=Math.random()<=pos?1:-1;
        let v=sign*Math.floor(Math.random()*11);
        update(i,v);
    }
},1000);