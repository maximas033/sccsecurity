// create a function that will clock in the user
function clockInUser(event){
    // get the current date and time
    // do not refresh the page
    event.preventDefault();
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
    var time = (h + " " + " : " + m + " " + ": " + s);
    // get the user's name
    var name = document.getElementById("name").value;

    // check if the user's name is empty or not 
    if(name == ""){
        alert("Please enter your name");
    }
    else{
        // check the array of users and if the user is in the array then clock in the user otherwise alert the user that he is not in the array
        var users = ["Vadim", "Maxim", "Dan", "Vitaliy", "David", "Pasha", "Gena", "Slavic", "Roman", "Edward", "Dima", "Viktor"];
        if(users.includes(name)){
            firebase.database().ref("users/clockIn" + name).set({
                name: name,
                hour: h,
                minute: m,
                date: n + " " + d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear()
            });
            document.getElementById("alertSuccess").style.display = "block";
            document.getElementById("alertSuccess").innerHTML = "You have clocked in successfully";
            setTimeout(function(){
                document.getElementById("alertSuccess").style.display = "none";
            }
            , 2000);
        }
        else{
            document.getElementById("alertDanger").style.display = "block";
            document.getElementById("alertDanger").innerHTML = "You are not in the list of users";
            setTimeout(function(){
                document.getElementById("alertDanger").style.display = "none";
            }
            , 2000);
        }
    }   
}


// create a function that will clock out the user
function clockOutUser(event){
    // get the current date and time
    // do not refresh the page
    event.preventDefault();
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
    var time = (h + " " + " : " + m + " " + ": " + s);
    // get the user's name
    var name = document.getElementById("name").value;

    // check if the user's name is empty or not 
    if(name == ""){
        alert("Please enter your name");
    }
    else{
        // check the array of users and if the user is in the array then clock in the user otherwise alert the user that he is not in the array
        var users = ["Vadim", "Maxim", "Dan", "Vitaliy", "David", "Pasha", "Gena", "Slavic", "Roman", "Edward", "Dima", "Viktor"];
        if(users.includes(name)){
            //check if the user has clocked in or not if he has clocked in then clock out the user otherwise alert the user that he has not clocked in
            firebase.database().ref("users/clockIn" + name).once("value", function(snapshot){
                if(snapshot.exists()){
                    firebase.database().ref("users/clockOut" + name).set({
                        name: name,
                        hour: h,
                        minute: m,
                        date: n + " " + d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear()
                    });
                    document.getElementById("alertSuccess").style.display = "block";
                    document.getElementById("alertSuccess").innerHTML = "You have clocked out successfully";
                    setTimeout(function(){
                        document.getElementById("alertSuccess").style.display = "none";
                    }
                    , 2000);
                }
                else{
                    document.getElementById("alertDanger").style.display = "block";
                    document.getElementById("alertDanger").innerHTML = "You have not clocked in";
                    setTimeout(function(){
                        document.getElementById("alertDanger").style.display = "none";
                    }
                    , 2000);
                }
            });
        }
        else{
            document.getElementById("alertDanger").style.display = "block";
            document.getElementById("alertDanger").innerHTML = "You are not in the list of users";
            setTimeout(function(){
                document.getElementById("alertDanger").style.display = "none";
            }
            , 2000);
        }
    }
}


// create a function that will get the user's clock in and clock out time and calculate the total time that the user has worked
// display the total time that the user has worked inside console
function calculateTime(event){
// do not refresh the page
    event.preventDefault();
    // get the user's name
    var name = document.getElementById("name").value;
    // get the users clock in time
    firebase.database().ref("users/clockIn" + name).once("value", function(snapshot){
        // get the users clocked in hour and minute
        var clockInHour = snapshot.val().hour;
        var clockInMinute = snapshot.val().minute;
        // get the users clock out time
        firebase.database().ref("users/clockOut" + name).once("value", function(snapshot){
            // get the users clocked out hour and minute
            var clockOutHour = snapshot.val().hour;
            var clockOutMinute = snapshot.val().minute;
            // calculate the total time that the user has worked
            var totalHour = clockOutHour - clockInHour;
            var totalMinute = clockOutMinute - clockInMinute;
            // display the total time that the user has worked
            console.log(totalHour + " " + "hours" + " " + totalMinute + " " + "minutes");

            // add the total time that the user has worked to the current users total time
            firebase.database().ref("users/totalTime" + name).once("value", function(snapshot){
                if(snapshot.exists()){
                    var totalTimeHour = snapshot.val().totalHour;
                    var totalTimeMinute = snapshot.val().totalMinute;
                    var newTotalHour = totalTimeHour + totalHour;
                    var newTotalMinute = totalTimeMinute + totalMinute;
                    firebase.database().ref("users/totalTime" + name).set({
                        name: name,
                        totalHour: newTotalHour,
                        totalMinute: newTotalMinute
                    });
                }
                else{
                    firebase.database().ref("users/totalTime" + name).set({
                        name: name,
                        totalHour: totalHour,
                        totalMinute: totalMinute
                    });
                }
                // delete the clock in and clock out time of the user
                firebase.database().ref("users/clockIn" + name).remove();
                firebase.database().ref("users/clockOut" + name).remove();
            });
        });
    });
}
