// // create a function that will get the user's clock in and clock out time and calculate the total time that the user has worked
// // display the total time that the user has worked inside console
// function calculateTime(event){
//     // do not refresh the page
//         event.preventDefault();
//         // get the user's name
//         var name = document.getElementById("name").value;
//         // get the users clock in time
//         firebase.database().ref("users/clockIn" + name).once("value", function(snapshot){
//             // get the users clocked in hour and minute
//             var clockInHour = snapshot.val().hour;
//             var clockInMinute = snapshot.val().minute;
//             // get the users clock out time
//             firebase.database().ref("users/clockOut" + name).once("value", function(snapshot){
//                 // get the users clocked out hour and minute
//                 var clockOutHour = snapshot.val().hour;
//                 var clockOutMinute = snapshot.val().minute;
//                 // calculate the total time that the user has worked
//                 var totalHour = clockOutHour - clockInHour;
//                 var totalMinute = clockOutMinute - clockInMinute;

//                 // add the total time that the user has worked to the current users total time
//                 firebase.database().ref("users/totalTime" + name).once("value", function(snapshot){
//                     if(snapshot.exists()){
//                         var totalTimeHour = snapshot.val().totalHour;
//                         var totalTimeMinute = snapshot.val().totalMinute;
//                         var newTotalHour = totalTimeHour + totalHour;
//                         var newTotalMinute = totalTimeMinute + totalMinute;
//                         //if minutes is 60 than thats one hour so add one hour and set minutes to 0
//                         if(newTotalMinute == 60){
//                             newTotalHour = newTotalHour + 1;
//                             newTotalMinute = 0;
//                         }
//                         firebase.database().ref("users/totalTime" + name).set({
//                             name: name,
//                             totalHour: newTotalHour,
//                             totalMinute: newTotalMinute
//                         });
//                     }
//                     else{
//                         firebase.database().ref("users/totalTime" + name).set({
//                             name: name,
//                             totalHour: totalHour,
//                             totalMinute: totalMinute
//                         });
//                     }
//                     // delete the clock in and clock out time of the user
//                     firebase.database().ref("users/clockIn" + name).remove();
//                     firebase.database().ref("users/clockOut" + name).remove();
//                 });
//             });
//         });
//     }

const calculateTime = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  firebase
    .database()
    .ref(`users/clockIn/${name}`)
    .once("value", (snapshot) => {
      const { hour: clockInHour, minute: clockInMinute } = snapshot.val();
      firebase
        .database()
        .ref(`users/clockOut/${name}`)
        .once("value", (snapshot) => {
          const { hour: clockOutHour, minute: clockOutMinute } = snapshot.val();
          const totalHour = clockOutHour - clockInHour;
          let totalMinute = clockOutMinute - clockInMinute;
          firebase
            .database()
            .ref(`users/totalTime/${name}`)
            .once("value", (snapshot) => {
              if (snapshot.exists()) {
                const { totalHour, totalMinute } = snapshot.val();
                let newTotalHour = totalHour + totalHour;
                let newTotalMinute = totalMinute + totalMinute;
                if (newTotalMinute === 60) {
                  newTotalHour++;
                  newTotalMinute = 0;
                }
                firebase.database().ref(`users/totalTime/${name}`).set({
                  name,
                  totalHour: newTotalHour,
                  totalMinute: newTotalMinute,
                });
              } else {
                firebase.database().ref(`users/totalTime/${name}`).set({
                  name,
                  totalHour,
                  totalMinute,
                });
              }
              firebase.database().ref(`users/clockIn/${name}`).remove();
              firebase.database().ref(`users/clockOut/${name}`).remove();
            });
        });
    });
};
