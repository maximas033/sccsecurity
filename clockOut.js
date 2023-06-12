function clockOut(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let dbReference = firebase.database().ref().child("AllUsers");
  
    dbReference.once("value")
      .then(function(snapshot) {
        if (snapshot.exists()) {
          let allUsers = snapshot.val();
          let users = Object.values(allUsers).map(user => user.name);
          if (users.includes(name)) {
            let clockInUsersRef = firebase.database().ref().child("ClockInUsers").child(name);
            clockInUsersRef.once("value")
              .then(function(statusSnapshot) {
                let statusDict = statusSnapshot.val();
                if (statusDict && statusDict.status === "ClockedIn") {
                  let currentTime = new Date();
                  let currentTimeString = currentTime.toISOString();
  
                  if (statusDict.time) {
                    let clockInTime = new Date(statusDict.time);
                    let timeDifference = currentTime.getTime() - clockInTime.getTime();
                    let roundedTimeDifference = Math.ceil(timeDifference / 1000);
                    let clockOutUsersRef = firebase.database().ref().child("ClockOutUsers").child(name);
                    let clockOutData = {
                      name: name,
                      status: "ClockedOut",
                      time: currentTimeString,
                      workDuration: roundedTimeDifference
                    };
                    clockOutUsersRef.set(clockOutData);
  
                    document.getElementById("alertSuccess").style.display = "block"
                    document.getElementById("alertSuccess").innerText = `${name} Clocked Out Successfully`
                    document.getElementById("name").value = ""
                    setTimeout(function() {
                        document.getElementById("alertSuccess").style.display = "none"
                    }, 3000)
  
                    let totalHoursRef = firebase.database().ref().child("TotalHours").child(name);
                    totalHoursRef.once("value")
                      .then(function(totalHoursSnapshot) {
                        let totalHoursWorked = 0;
                        let totalMinutesWorked = 0;
                        let totalHoursDict = totalHoursSnapshot.val();
                        if (totalHoursDict) {
                          let currentHours = totalHoursDict.hours || 0;
                          let currentMinutes = totalHoursDict.minutes || 0;
                          totalHoursWorked = currentHours;
                          totalMinutesWorked = currentMinutes;
                        }
                        let roundedTimeDifferenceInHours = roundedTimeDifference / 3600;
                        let hoursPart = Math.floor(roundedTimeDifferenceInHours);
                        let minutesPart = (roundedTimeDifferenceInHours - hoursPart) * 60;
                        totalHoursWorked += hoursPart;
                        totalMinutesWorked += minutesPart;
                        if (totalMinutesWorked >= 60) {
                          totalHoursWorked += 1;
                          totalMinutesWorked -= 60;
                        }
                        totalHoursRef.set({ hours: totalHoursWorked, minutes: totalMinutesWorked });
  
                        clockInUsersRef.remove();
                        clockOutUsersRef.remove();
                      });
                  } else {
                    document.getElementById("alertDanger").style.display = "block"
                    document.getElementById("alertDanger").innerHTML = `Clock Out Error, Error calculating work duration for  + ${name}`
                    document.getElementById("name").value = ""
                    setTimeout(function() {
                        document.getElementById("alertDanger").style.display = "none"
                    }, 3000)
                  }
                } else {
                  document.getElementById("alertDanger").style.display = "block"
                  document.getElementById("alertDanger").innerHTML = `Clock Out Failed, ${name} is not clocked in`
                  document.getElementById("name").value = ""
                  setTimeout(function() {
                      document.getElementById("alertDanger").style.display = "none"
                  }, 3000)
                }
              });
          } else {
            document.getElementById("alertDanger").style.display = "block"
            document.getElementById("alertDanger").innerHTML = `Clock Out Error, ${name} is not on the list`
            document.getElementById("name").value = ""
            setTimeout(function() {
                document.getElementById("alertDanger").style.display = "none"
            }, 3000)
          }
        } else {
          document.getElementById("alertDanger").style.display = "block"
          document.getElementById("alertDanger").innerHTML = `Clock Out Error, no user found`
          document.getElementById("name").value = ""
          setTimeout(function() {
              document.getElementById("alertDanger").style.display = "none"
          }, 3000)
        }
      })
      .catch(function(error) {
        console.log("Database Error", error.message);
      });
  }