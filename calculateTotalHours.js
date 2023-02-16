async function calculateTime(event) {
  // prevent page refresh
  event.preventDefault();

  // get the user's name
  const name = document.getElementById("name").value;

  try {
    // get the users clock in time
    const clockInSnapshot = await firebase
      .database()
      .ref(`users/clockIn${name}`)
      .once("value");
    const clockInHour = clockInSnapshot.val().hour;
    const clockInMinute = clockInSnapshot.val().minute;

    // get the users clock out time
    const clockOutSnapshot = await firebase
      .database()
      .ref(`users/clockOut${name}`)
      .once("value");
    const clockOutHour = clockOutSnapshot.val().hour;
    const clockOutMinute = clockOutSnapshot.val().minute;

    // calculate the total time that the user has worked
    let totalHour = clockOutHour - clockInHour;
    let totalMinute = clockOutMinute - clockInMinute;

    console.log("total hours:" + totalHour);
    console.log("total minutes:" + totalMinute);

    // add the total time that the user has worked to the current users total time
    const totalTimeSnapshot = await firebase
      .database()
      .ref(`users/totalTime${name}`)
      .once("value");
    let newTotalHour = totalHour;
    let newTotalMinute = totalMinute;

    if (totalTimeSnapshot.exists()) {
      const totalTimeHour = totalTimeSnapshot.val().totalHour;
      const totalTimeMinute = totalTimeSnapshot.val().totalMinute;
      newTotalHour += totalTimeHour;
      newTotalMinute += totalTimeMinute;

      //if minutes is 60 than that's one hour so add one hour and set minutes to 0
      if (newTotalMinute >= 60) {
        newTotalHour += 1;
        newTotalMinute -= 60;
      }
    }

    await firebase.database().ref(`users/totalTime${name}`).set({
      name: name,
      totalHour: newTotalHour,
      totalMinute: newTotalMinute,
    });

    // delete the clock in and clock out time of the user
    await firebase.database().ref(`users/clockIn${name}`).remove();
    await firebase.database().ref(`users/clockOut${name}`).remove();
    console.log("Remove succeeded.");
  } catch (error) {
    console.log("Error: " + error.message);
  }
}
