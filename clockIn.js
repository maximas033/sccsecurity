// create a function that will clock in the user
// writte comments to explain what the function does
function clockInUser(event){
    // do not refresh the page
    event.preventDefault();
    //get all names from the SCCSECURITYPEOPLE list in the database 
    var SCCSECURITYPEOPLE = firebase.database().ref().child("SCCSECURITYPEOPLE");
    // get the name of the person that is clocking in
    var clockingInUser = document.getElementById("name").value;
    // get the names from the list
    SCCSECURITYPEOPLE.once('value', function(snapshot) {
        // check if the clockingInUser is in the list of names or not
        if(snapshot.hasChild(clockingInUser)){
            // check if the the peron is clocked in
            firebase.database().ref("users/clockIn" + clockingInUser).once("value", function(snapshot){
                // if the person is clocked in then alert the user
                if(snapshot.exists()){
                // clear the input field
                clockingInUser.innerHTML = "";
                // if the person is clocked in already, then do not clock them in and display an error message
                document.getElementById("alertDanger").style.display = "block";
                document.getElementById("alertDanger").innerHTML = "You are already clocked in!";
                //do not show the message for 2.5 seconds
                setTimeout(function(){
                    document.getElementById("alertDanger").style.display = "none";
                }
                , 2500);
            }else{
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
                // if the person is not clocked in, then clock them in
                var clockInTime = new Date();
                // get the time that the person clocked in
                var clockInTime = clockInTime.toLocaleTimeString();
                // get the current hour 
                var currentHour = new Date().getHours();
                // get the current minute
                var currentMinute = new Date().getMinutes();
                firebase.database().ref("users/clockIn" + clockingInUser).set({
                    name: clockingInUser,
                    hour: h,
                    minute: m,
                    date: n + " " + d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear()
                });
                // clear the input field
                clockingInUser.innerHTML = "";
                document.getElementById("alertSuccess").style.display = "block";
                document.getElementById("alertSuccess").innerHTML = "You have clocked in successfully at " + currentHour + ":" + currentMinute;
                setTimeout(function(){
                    document.getElementById("alertSuccess").style.display = "none";
                }
                , 2000);
            }
            }
            );
        }else{
            // clear the input field
            clockingInUser.innerHTML = "";
            // if the person is not in the list of names, then display an error message
            document.getElementById("alertDanger").style.display = "block";
            document.getElementById("alertDanger").innerHTML = "This person is not in the system! Please contact the administrator!";
            setTimeout(function(){
                document.getElementById("alertDanger").style.display = "none";
            }
            , 2000);
        }
    });
}
