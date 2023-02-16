function clockInUser(event) {
  // do not refresh the page
  event.preventDefault();
  //get all names from the SCCSECURITYPEOPLE list in the database
  var SCCSECURITYPEOPLE = firebase.database().ref().child("SCCSECURITYPEOPLE");
  // get the name of the person that is clocking in
  let clockingInUser = document.getElementById("name").value;
  // get the names from the list
  SCCSECURITYPEOPLE.once("value", function (snapshot) {
    // check if the clockingInUser is in the list of names or not
    if (snapshot.hasChild(clockingInUser)) {
      // check if the the peron is clocked in
      firebase
        .database()
        .ref("users/clockIn" + clockingInUser)
        .once("value", function (snapshot) {
          // if the person is clocked in then alert the user
          if (snapshot.exists()) {
            // clear the input field
            document.getElementById("name").value = "";
            // if the person is clocked in already, then do not clock them in and display an error message
            document.getElementById("alertDanger").style.display = "block";
            document.getElementById("alertDanger").innerHTML =
              "You are already clocked in!";
            //do not show the message for 2.5 seconds
            setTimeout(function () {
              document.getElementById("alertDanger").style.display = "none";
            }, 2500);
          } else {
            // if the person is not clocked in, then clock them in
            // get the current time
            let date = new Date();
            // get the current hour
            let hour = date.getHours();
            // get the current minute
            let minute = date.getMinutes();
            // get the current second
            let second = date.getSeconds();
            // get the current day
            let day = date.getDate();
            // get the current month
            let month = date.getMonth() + 1;
            // get the current year
            let year = date.getFullYear();
            // get the current date
            let currentDate = month + "/" + day + "/" + year;
            // get the current time
            let currentTime = hour + ":" + minute + ":" + second;
            // set the clock in time in the database
            firebase
              .database()
              .ref("users/clockIn" + clockingInUser)
              .set({
                name: clockingInUser,
                hour: hour,
                minute: minute,
              });
            // clear the input field
            document.getElementById("name").value = "";
            document.getElementById("alertSuccess").style.display = "block";
            document.getElementById("alertSuccess").innerHTML =
              "You have clocked in successfully at " + hour + ":" + minute;
            //do not show the message for 2.5 seconds
            setTimeout(function () {
              document.getElementById("alertSuccess").style.display = "none";
            }, 2500);
          }
        });
    } else {
      // if the person is not in the list of names, then display an error message
      document.getElementById("alertDanger").style.display = "block";
      document.getElementById("alertDanger").innerHTML =
        "You are not in the system! Please contact the administrator!";
      //do not show the message for 2.5 seconds
      setTimeout(function () {
        document.getElementById("alertDanger").style.display = "none";
      }, 2500);
    }
  });
}
