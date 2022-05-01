
// DISPLAYING DATE AND THE TIME FOR THE ADMIN PAGE
setInterval(function clock(){
    // DISPLAYING THE TIME AND THE DATE ON THE ADMINS PAGE
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var prepand;
    if(h>=12) {
      prepand = "PM";
      h = h - 12;
    }
    else {
      prepand = "AM";
    }
    
    if(m<10) {
      m = "0" + m;
    }
    
    if(s<10) {
     s = "0" + s; 
    }
    
    var weekend = new Array(7);
    weekend[0] = "Sunday";
    weekend[1] = "Monday";
    weekend[2] = "Tuesday";
    weekend[3] = "Wednday";
    weekend[4] = "Thursday";
    weekend[5] = "Friday";
    weekend[6] = "Saturday";
    var n = weekend[d.getDay()];
    document.getElementById("diaplaying_Date").innerHTML = (n + " " + h + " " + " : " + m + " " + ": " + s + " " + prepand);
    }, 300);