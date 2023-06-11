function clockOut(event) {
  event.preventDefault();
  let name = document.getElementById("name").value
  const dbReference = firebase.database().ref('AllUsers');

  dbReference.once('value').then((snapshot) => {
      if (snapshot.exists()) {
          const allUsers = snapshot.val();
          const users = Object.values(allUsers).map((userDict) => userDict['name']);
          if (users.find((user) => user === name)) {
              const clockInUsersRef = firebase.database().ref('ClockInUsers').child(name);
              clockInUsersRef.once('value').then((statusSnapshot) => {
                  const statusDict = statusSnapshot.val();
                  if (statusDict && statusDict['status'] === 'ClockedIn') {
                      const currentTime = new Date();
                      const currentTimeString = currentTime.toISOString().split('T')[0] + ' ' + currentTime.toTimeString().split(' ')[0];
                      
                      const clockInTimeString = statusDict['time'];
                      const clockInTime = new Date(clockInTimeString.replace(" ", "T") + "Z");
                      const timeDifference = Math.ceil((currentTime.getTime() - clockInTime.getTime()) / 1000);
                      
                      const clockOutUsersRef = firebase.database().ref('ClockOutUsers').child(name);
                      const clockOutData = {
                          'name': name,
                          'status': 'ClockedOut',
                          'time': currentTimeString,
                          'workDuration': timeDifference
                      };
                      clockOutUsersRef.set(clockOutData);
                      document.getElementById("alertSuccess").style.display = "block"
                      document.getElementById("alertSuccess").innerText = `${name} Clocked out Successfully`
                      document.getElementById("name").value = ""
                      // wait 2 seconds 
                      setTimeout(function() {
                        document.getElementById("alertSuccess").style.display = "none"
                      }, 3000)
                      // Add this session's duration to the total hours worked
                      const totalHoursRef = firebase.database().ref('TotalHours').child(name);
                      totalHoursRef.once('value').then((totalHoursSnapshot) => {
                          let totalHoursWorked = 0;
                          let totalMinutesWorked = 0;
                          const totalHoursDict = totalHoursSnapshot.val();
                          if (totalHoursDict) {
                              totalHoursWorked = totalHoursDict['hours'] || 0;
                              totalMinutesWorked = totalHoursDict['minutes'] || 0;
                          }
                          const roundedTimeDifferenceInHours = timeDifference / 3600.0;
                          const hoursPart = Math.floor(roundedTimeDifferenceInHours);
                          const minutesPart = (roundedTimeDifferenceInHours - hoursPart) * 60.0;
                          totalHoursWorked += hoursPart;
                          totalMinutesWorked += minutesPart;
                          if (totalMinutesWorked >= 60) {
                              totalHoursWorked += 1;
                              totalMinutesWorked -= 60;
                          }
                          totalHoursRef.set({'hours': totalHoursWorked, 'minutes': totalMinutesWorked});

                          // Remove the user from ClockInUsers and ClockOutUsers after saving the data to TotalHours
                          clockInUsersRef.remove();
                          clockOutUsersRef.remove();
                      });
                  } else {
                    document.getElementById("alertDanger").style.display = "block"
                    document.getElementById("alertDanger").innerHTML = `Clock out failed, ${name} is not clocked in`
                    document.getElementById("name").value = ""
                    // wait 2 seconds 
                    setTimeout(function() {
                      document.getElementById("alertDanger").style.display = "none"
                    }, 3000)
                  }
              });
          } else {
            document.getElementById("alertDanger").style.display = "block"
            document.getElementById("alertDanger").innerHTML = `Clock out failed, ${name} is not in the list`
            document.getElementById("name").value = ""
            // wait 2 seconds 
            setTimeout(function() {
              document.getElementById("alertDanger").style.display = "none"
            }, 3000)
          }
      } else {
        document.getElementById("alertDanger").style.display = "block"
        document.getElementById("alertDanger").innerHTML = `Database Error, No users found.`
        document.getElementById("name").value = ""
        // wait 2 seconds 
        setTimeout(function() {
          document.getElementById("alertDanger").style.display = "none"
        }, 3000)
      }
  }).catch((error) => {
    document.getElementById("alertDanger").style.display = "block"
    document.getElementById("alertDanger").innerHTML = (`Database Error, error.message.`)
    document.getElementById("name").value = ""
        // wait 2 seconds 
    setTimeout(function() {
      document.getElementById("alertDanger").style.display = "none"
    }, 3000)
  });
}