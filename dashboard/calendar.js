function convert_month(m){
    if(m==0) return "January";
    if(m==1) return "February";
    if(m==2) return "March";
    if(m==3) return "April";
    if(m==4) return "May";
    if(m==5) return "June";
    if(m==6) return "July";
    if(m==7) return "August";
    if(m==8) return "September";
    if(m==9) return "October";
    if(m==10) return "November";
    if(m==11) return "December";
    else alert("Error in converting month.");
}
function convert_day(d){
    if(d==0) return "Sunday";
    if(d==1) return "Monday";
    if(d==2) return "Tuesday";
    if(d==3) return "Wednesday";
    if(d==4) return "Thursday";
    if(d==5) return "Friday";
    if(d==6) return "Saturday";
    else alert("Error in converting day.");
}

var today=new Date();
var date=today.getDate();
var month=today.getMonth();
var day=today.getDay();

document.getElementById("date").innerHTML=`Today is ${convert_day(day)} ${String(date)} ${convert_month(month)}.`;