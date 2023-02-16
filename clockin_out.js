
// WHEN THE CHECK IN BUTTON IS CLICKED
function clockIn(event){
    event.preventDefault()
    const securityPeople = ["Vadim", "Maxim", "Dan", "Vitaliy", "David", "Pasha", "Gena", "Slavic", "Roman", "Edward", "Dima", "Viktor"];
    var persons_name = document.getElementById("name").value

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

    if(securityPeople.includes(persons_name)){
        firebase.database().ref("clockedIn").push({
            timeDate: n,
            Name: persons_name,
            timeH: h,
            timeM: m,
        })


        // DISPLAYING SUCCESS ALERS
        document.getElementById('name').value = ""
        document.getElementById('name').style.borderColor ="black"
        document.getElementById('alertSuccess').style.display = "block"
        alertSuccess.innerHTML = (persons_name + " has been successfully clocked in at " + h + " : " + m)
        setTimeout(function(){
            alertSuccess.style.display = "none";
        }, 3000);
    }
    else{
        //DISPLAY ERROR ALERT
        document.getElementById("name").style.borderColor = "red"
        document.getElementById('alertDanger').style.display = "block"
        alertDanger.innerHTML = ("This person is not in the system, please try again")
        setTimeout(function(){
            alertDanger.style.display = "none";
        }, 3000);
    }
}









// WHEN THE CHECK OUT BUTTON IS CLICKED
function clockOut(event){
    event.preventDefault()
    var securityPeople = ["Vadim", "Maxim", "Dan", "Vitaliy", "David", "Pasha", "Gena", "Slavic", "Roman","Edward", "Dima", "Viktor"];
    var persons_name = document.getElementById("name").value

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
    
    if(securityPeople.includes(persons_name)){
        firebase.database().ref("clockedOut").push({
            Nameclock: persons_name,
            timeHour: h,
            timeMinute: m,
            timeDate: n,
        })

         // DISPLAYING SUCCESS ALERS
         document.getElementById('name').value = ""
         document.getElementById('name').style.borderColor ="black"
         document.getElementById('alertSuccess').style.display = "block"
         alertSuccess.innerHTML = (persons_name + " has been successfully clocked out at " + h + " : " + m)
         setTimeout(function(){
             alertSuccess.style.display = "none";
         }, 3000);


            firebase.database().ref("clockedIn").once('value', function(snapshot){
                snapshot.forEach(
                    function(Childsnapshot){
                        let name = Childsnapshot.val().Name + " - " 
                        let hour = Childsnapshot.val().timeH + " : "
                        let minute = Childsnapshot.val().timeM + " "
                        console.log(name, hour, minute);
                    }
                )
            })

            firebase.database().ref("clockedOut").once('value', function(snapshot){
                snapshot.forEach(
                    function(Childsnapshot){
                        let nameclo = Childsnapshot.val().Nameclock + " - " 
                        let hourclock = Childsnapshot.val().timeHour + " : "
                        let minuteclo = Childsnapshot.val().timeMinute + " "
                        console.log(nameclo ,hourclock ,minuteclo);
                    }
                )
            })
        }
    else{
          //DISPLAY ERROR ALERT
          document.getElementById("name").style.borderColor = "red"
          document.getElementById('alertDanger').style.display = "block"
          alertDanger.innerHTML = ("This person is either not in the system, or the fields is emptry")
          setTimeout(function(){
              alertDanger.style.display = "none";
          }, 3000);
     }
    }
