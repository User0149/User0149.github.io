let overflow=false;
function compile(){
    window.localStorage.setItem('code',document.getElementById('editor').value);
    
    if(document.getElementById('editor').scrollHeight > document.getElementById('editor').clientHeight){
        document.getElementById('display').innerHTML=localStorage.getItem('code')+'\n\n\n\n\n';
        overflow=true;
    }
    else{
        document.getElementById('display').innerHTML=localStorage.getItem('code');
        overflow=false;
    }

    MathJax.typeset();
}

if(localStorage.getItem('code')==null){
    localStorage.setItem('code','');
}

document.getElementById('editor').value=localStorage.getItem('code');
compile();