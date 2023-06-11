function calculateTime(event) {
  // prevent page refresh
  event.preventDefault();
  // get the user's name
  const name = document.getElementById("name").value;

  // get the users clock in time
  // THIS WILL FETCH THE CLOCKED IN TIME FOR THAT SPECIFIC USER
  firebase
    .database()
    .ref(`users/clockIn${name}`)
    .once("value", function (clockInSnapshot) {
      let clockInHour = clockInSnapshot.val().hour;
      let clockInMinute = clockInSnapshot.val().minute;
    });

  // get the users clock out time
  // THIS WILL FETCH THE CLOCKED OUT TIME FOR THAT SPECIFIC USER
  firebase
    .database()
    .ref(`users/clockOut${name}`)
    .once("value", function (clockOutSnapshot) {
      let clockOutHour = clockOutSnapshot.val().hour;
      let clockOutMinute = clockOutSnapshot.val().minute;
    });

  var TotalHoursWorked = clockOutHour - clockInHour;
  var TotalMinutesWorked = clockOutMinute - clockInMinute;

  console.log(
    "Total Hours Worked: " +
      TotalHoursWorked.toFixed(2) +
      " Hours, " +
      TotalMinutesWorked.toFixed(2) +
      " Minutes"
  );
}
