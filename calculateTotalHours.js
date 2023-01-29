function calculateTime(event) {
  // prevent page refresh
  event.preventDefault();

  // get the user's name
  let name = document.getElementById("name").value;

  // get the users clock in time
  firebase
    .database()
    .ref("users/clockIn" + name)
    .once("value", function (snapshot) {
      // get the users clocked in hour and minute
      let clockInHour = snapshot.val().hour;
      let clockInMinute = snapshot.val().minute;

      // get the users clock out time
      firebase
        .database()
        .ref("users/clockOut" + name)
        .once("value", function (snapshot) {
          // get the users clocked out hour and minute
          let clockOutHour = snapshot.val().hour;
          let clockOutMinute = snapshot.val().minute;

          // calculate the total time that the user has worked
          let totalHour = clockOutHour - clockInHour;
          let totalMinute = clockOutMinute - clockInMinute;

          // Update the total time worked

          // add the total time that the user has worked to the current users total time
          firebase
            .database()
            .ref("users/totalTime" + name)
            .once("value", function (snapshot) {
              if (snapshot.exists()) {
                let totalTimeHour = snapshot.val().totalHour;
                let totalTimeMinute = snapshot.val().totalMinute;
                let newTotalHour = totalTimeHour + totalHour;
                let newTotalMinute = totalTimeMinute + totalMinute;
                //if minutes is 60 than thats one hour so add one hour and set minutes to 0
                if (newTotalMinute >= 60) {
                  newTotalHour = newTotalHour + 1;
                  newTotalMinute = newTotalMinute - 60;
                }
                firebase
                  .database()
                  .ref("users/totalTime" + name)
                  .set({
                    name: name,
                    totalHour: newTotalHour,
                    totalMinute: newTotalMinute,
                  });
              } else {
                firebase
                  .database()
                  // finish updating the total time worked

                  .ref("users/totalTime" + name)
                  .set({
                    name: name,
                    totalHour: totalHour,
                    totalMinute: totalMinute,
                  });
              }
              // delete the clock in and clock out time of the user
              firebase
                .database()
                .ref("users/clockIn" + name)
                .remove();
              firebase
                .database()
                .ref("users/clockOut" + name)
                .remove();
            });
        });
    });
}
