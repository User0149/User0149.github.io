let h=window.innerHeight-30;
let w=window.innerWidth-30;

let info=document.getElementById('info');
info.style.height=`${h-65}px`;
info.style.width='350px';

function round(x,dp=2){
    return Math.round(x*Math.pow(10,dp))/Math.pow(10,dp);
}

class plane{
    id; canvas; ctx; standard;
    // standard and special
    unit; centre_x; centre_y; max_x; max_y;
    // special
    x_unit;
    y_unit;
    constructor(id,height,width,standard=1,max_x=NaN,max_y=NaN){ // parameters with default values are only for non-standard planes
        this.standard=standard;

        this.id=id;
        this.canvas=document.getElementById(this.id);
        this.ctx=this.canvas.getContext('2d');

        this.canvas.height=height;
        this.canvas.style.height=`${height}px`;
        this.canvas.width=width;
        this.canvas.style.width=`${width}px`;

        // actual information
        if(standard){
            this.unit=Math.min(this.canvas.height,this.canvas.width)/20;
            this.centre_x=this.canvas.width/2;
            this.centre_y=this.canvas.height/2;

            this.max_x=this.canvas.width/(2*this.unit);
            this.max_y=this.canvas.height/(2*this.unit);

            this.draw_plane();
        }
        else{
            this.max_x=max_x;
            this.max_y=max_y;
            this.x_unit=this.canvas.width/this.max_x;
            this.y_unit=this.canvas.height/this.max_y;

            this.centre_x=0;
            this.centre_y=this.canvas.height;

            this.draw_plane();
        }
    }
    
    plot(x,y,colour='black'){
        this.ctx.lineWidth=1;
        this.ctx.strokeStyle=colour;
        this.ctx.fillStyle=colour;
        this.ctx.beginPath();
        if(this.standard){
            this.ctx.arc(this.centre_x+this.unit*x,this.centre_y-this.unit*y,1,0,2*Math.PI);
        }
        else{
            this.ctx.arc(this.centre_x+this.x_unit*x,this.centre_y-this.y_unit*y,1,0,2*Math.PI);
        }
        this.ctx.stroke();
        this.ctx.fill();
    }

    draw_line(a,b,width=0.5,colour='black',transform=0){
        if(transform){
            if(this.standard){
                a[0]=this.centre_x+this.unit*a[0];
                a[1]=this.centre_y-this.unit*a[1];

                b[0]=this.centre_x+this.unit*b[0];
                b[1]=this.centre_y-this.unit*b[1];
            }
            else{
                a[0]=this.centre_x+this.x_unit*a[0];
                a[1]=this.centre_y-this.y_unit*a[1];

                b[0]=this.centre_x+this.x_unit*b[0];
                b[1]=this.centre_y-this.y_unit*b[1];
            }
        }

        this.ctx.lineWidth=width;
        this.ctx.strokeStyle=colour;
        this.ctx.beginPath();
        this.ctx.moveTo(a[0],a[1]);
        this.ctx.lineTo(b[0],b[1]);
        this.ctx.stroke();
    }

    draw_plane(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

        this.draw_line([this.centre_x,0],[this.centre_x,this.canvas.height],1.5);
        this.draw_line([0,this.centre_y],[this.canvas.width,this.centre_y],1.5);
        if(this.standard){
            for(let x=this.centre_x+this.unit;x<=this.canvas.width;x+=this.unit){
                this.draw_line([x,0],[x,this.canvas.height]);
            }
            for(let x=this.centre_x-this.unit;x>=0;x-=this.unit){
                this.draw_line([x,0],[x,this.canvas.height]);
            }

            for(let y=this.centre_y+this.unit;y<=this.canvas.height;y+=this.unit){
                this.draw_line([0,y],[this.canvas.width,y]);
            }
            for(let y=this.centre_y-this.unit;y>=0;y-=this.unit){
                this.draw_line([0,y],[this.canvas.width,y]);
            }
        }
        else{
            return;
            // for(let x=this.centre_x+this.x_unit;x<=this.canvas.width;x+=this.x_unit){
            //     this.draw_line([x,0],[x,this.canvas.height]);
            // }
            // for(let y=this.centre_y-this.y_unit;y>=0;y-=this.y_unit){
            //     this.draw_line([0,y],[this.canvas.width,y]);
            // }
        }
    }
}


class regression{
    graph; 
    m;
    c;
    points=300; 
    noise=1;
    points_list=[];

    constructor(graph){
        this.graph=graph;
        this.generate_regression();
        this.plot_regression();
    }
    
    generate_regression(){
        this.m=round(4*(Math.random()-0.5)); // [-2,2]
        this.c=round(this.graph.max_y*(Math.random()-0.5)); // [-max_y,max_y]
        
        let actual_regression=document.getElementById('actual_regression');
        actual_regression.innerHTML='\\(y='+this.m+'x'+(this.c<0?'-':'+')+Math.abs(this.c)+'\\)';
        
        MathJax.typeset();
    }

    eval(x){
        return this.m*x+this.c;
    }

    plot_regression(){
        for(let i=1;i<=this.points;i++){
            let x=2*this.graph.max_x*(Math.random()-0.5); // [-max_x,max_x]
            let delta=2*this.noise*(Math.random()-0.5); // [-noise,noise]

            let y=this.eval(x)+delta;
            this.graph.plot(x,y);
            this.points_list.push([x,y]);
        }

        this.graph.draw_line([-this.graph.max_x,this.eval(-this.graph.max_x)],[this.graph.max_x,this.eval(this.graph.max_x)],1,'red',1);
    }
}

class find_correlation{
    data;
    batch;
    graph;
    m=1;
    c=0;

    // hyperparameters
    small=0.001;
    epochs=5000;
    m_alpha=0.0001;
    c_alpha=0.01;
    batch_size=10;

    // results
    m_vals=[];
    c_vals=[];
    rms_errors=[];
    constructor(data,graph,epochs=5000){
        this.data=data;
        this.graph=graph;
        this.epochs=epochs;

        this.new_batch();
        this.add_result();
        for(let i=1;i<=this.epochs;i++){
            this.train();
            this.add_result();
        }
    }

    new_batch(){
        this.batch=[];
        for(let i=1;i<=this.batch_size;i++){
            let elem=this.data[Math.floor(Math.random()*this.data.length)];
            this.batch.push(elem);
        }
    }

    eval(x){
        return this.m*x+this.c;
    }

    loss(){
        let ans=0;
        for(let i of this.batch){
            let x=i[0];
            let y=i[1];
            
            let pred=this.eval(x);
            let diff=y-pred;

            ans+=diff*diff;
        }
        return ans;
    }

    dldm(){
        let old_loss=this.loss();
        this.m+=this.small;
        let diff=this.loss()-old_loss;
        this.m-=this.small;

        return diff/this.small;
    }

    dldc(){
        let old_loss=this.loss();
        this.c+=this.small;
        let diff=this.loss()-old_loss;
        this.c-=this.small;

        return diff/this.small;
    }

    train(){
        this.new_batch();

        let gradient=[this.dldm(),this.dldc()];
        this.m-=this.m_alpha*gradient[0];
        this.c-=this.c_alpha*gradient[1];
    }

    add_result(){
        this.rms_errors.push(Math.sqrt(this.loss()/this.batch_size));
        this.m_vals.push(this.m);
        this.c_vals.push(this.c);
    }

    publish(){
        // publish trendline
        this.graph.draw_line([-this.graph.max_x,this.eval(-this.graph.max_x)],[this.graph.max_x,this.eval(this.graph.max_x)],1,'green',1);

        // publish regression equation
        let predicted_regression=document.getElementById('predicted_regression');

        let m=round(this.m);
        let c=round(this.c);
        predicted_regression.innerHTML='\\(y='+m+'x'+(c<0?'-':'+')+Math.abs(c)+'\\)';
        MathJax.typeset();

        // publish hyperparameters
        document.getElementById('epochs').innerHTML=this.epochs;
        document.getElementById('m_learning_rate').innerHTML=this.m_alpha;
        document.getElementById('c_learning_rate').innerHTML=this.c_alpha;
        document.getElementById('batch_size').innerHTML=this.batch_size;
    }
}

// begin actual stuff here
let cur=0;
let epochs=30;

let graph;
let data;
let prediction;
let state;
let loss;
setInterval(function(){
    if(cur%epochs==0){
        cur=0;

        graph=new plane('graph',h-180,w-380);
        data=new regression(graph);
        state=graph.ctx.getImageData(0,0,graph.canvas.width,graph.canvas.height);

        prediction=new find_correlation(data.points_list,graph,epochs);
        loss=new plane('loss',300,300,0,epochs+1,Math.max(...prediction.rms_errors));
    }
    
    let m=prediction.m_vals[cur];
    let c=prediction.c_vals[cur];
    
    // publish trendline
    graph.ctx.putImageData(state,0,0);
    graph.draw_line([-graph.max_x,m*(-graph.max_x)+c],[graph.max_x,m*(graph.max_x)+c],1,'green',1);

    // publish regression equation
    let predicted_regression=document.getElementById('predicted_regression');
    m=round(m);
    c=round(c);
    predicted_regression.innerHTML='\\(y='+m+'x'+(c<0?'-':'+')+Math.abs(c)+'\\)';
    MathJax.typeset();

    // publish hyperparameters
    document.getElementById('epochs').innerHTML=prediction.epochs;
    document.getElementById('m_learning_rate').innerHTML=prediction.m_alpha;
    document.getElementById('c_learning_rate').innerHTML=prediction.c_alpha;
    document.getElementById('batch_size').innerHTML=prediction.batch_size;

    // publish RMSE
    loss.plot(cur,prediction.rms_errors[cur],'red');
    loss.draw_line([cur,prediction.rms_errors[cur]],[cur-1,prediction.rms_errors[cur-1]],0.5,'red',1);
    document.getElementById('max_RMSE').innerHTML=round(Math.max(...prediction.rms_errors));
    
    // increment cur
    cur++;
},100);