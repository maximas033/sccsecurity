// create a function that will clock out the user
function clockOut(event){
    // do not refresh the page
    event.preventDefault();
    // get the user's name
    var nameClockedOut = document.getElementById("name").value; 
    // get the list of names from the database under SCCSECURITYPEOPLE 
    var SCCSECURITYPEOPLE = firebase.database().ref().child("SCCSECURITYPEOPLE");
    // check if the name is in the list
    SCCSECURITYPEOPLE.once('value', function(snapshot) {
        // if the nameClockedOut is in the list then clock out the user
        if(snapshot.hasChild(nameClockedOut)){
            // check if the person is clocked in or not
            firebase.database().ref("users/clockIn" + nameClockedOut).once("value", function(snapshot){
                // if the person is clocked in, then clock out that person
                if(snapshot.exists()){
                    // get the current time
                    var currentTime = new Date();
                    // get the current hour and minute
                    var currentHour = currentTime.getHours();
                    var currentMinute = currentTime.getMinutes();
                    // update the clock out time in the database
                    firebase.database().ref("users/clockOut" + nameClockedOut).set({
                        name: nameClockedOut,
                        hour: currentHour,
                        minute: currentMinute
                    });
                    nameClockedOut.innerHTML = " ";
                    // display the clock out time of the user
                    document.getElementById("alertSuccess").style.display = "block";
                    // color green
                    document.getElementById("alertSuccess").innerHTML = "You have successfully clocked out at " + currentHour + ":" + currentMinute;
                    // hide the alert message after 3 seconds
                    setTimeout(function(){ document.getElementById("alertSuccess").style.display = "none"; }, 3000);
                    // calculate the total time that the user has worked
                    calculateTime(event);
                }
                else{
                    nameClockedOut.innerHTML = " ";
                            document.getElementById("alertDanger").style.display = "block";
                            document.getElementById("alertDanger").innerHTML = "You are not clocked in yet! Please clock in first!";
                            // hide the alert message after 3 seconds
                            setTimeout(function(){ document.getElementById("alertDanger").style.display = "none"; }, 3000);
                            return
                }
            });
        }
        // if the person is not in the list of names
        else{
            nameClockedOut.innerHTML = " ";
            document.getElementById("alertDanger").style.display = "block";
            document.getElementById("alertDanger").innerHTML = "This person is not in the system! Please contact the administrator!";
            // hide the alert message after 3 seconds
            setTimeout(function(){ document.getElementById("alertDanger").style.display = "none"; }, 3000);
            return
        }
    });
}

        

