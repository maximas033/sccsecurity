function clockIn(event) {
  event.preventDefault();
  let name = document.getElementById("name").value;
  const allUsersRef = firebase.database().ref('AllUsers');
  allUsersRef.once('value').then((snapshot) => {
      if (snapshot.exists()) {
          const allUsers = snapshot.val();
          const userExists = Object.values(allUsers).some((userDict) => {
              return userDict['name'] === name;
          });

          if (userExists) {
              const clockInUsersRef = firebase.database().ref('ClockInUsers').child(name);
              clockInUsersRef.once('value').then((statusSnapshot) => {
                  const statusDict = statusSnapshot.val();
                  if (statusDict && statusDict['status'] === 'ClockedIn') {
                    document.getElementById("alertDanger").style.display = "block"
                    document.getElementById("alertDanger").innerHTML = `Clock in failed, ${name} is already clocked in`
                    document.getElementById("name").value = ""
                    // wait 2 seconds 
                    setTimeout(function() {
                      document.getElementById("alertDanger").style.display = "none"
                    }, 3000)
                  } else {
                      const currentTime = new Date();
                      const currentTimeString = currentTime.toISOString().split('T')[0] + ' ' + currentTime.toTimeString().split(' ')[0];
                      const clockInData = {
                          'name': name,
                          'status': 'ClockedIn',
                          'time': currentTimeString
                      };
                      clockInUsersRef.set(clockInData);
                      document.getElementById("alertSuccess").style.display = "block"
                      document.getElementById("alertSuccess").innerText = `${name} Clocked in Successfully`
                      document.getElementById("name").value = ""
                      // wait 2 seconds 
                      setTimeout(function() {
                        document.getElementById("alertSuccess").style.display = "none"
                      }, 3000)
                  }
              });
          } else {
            document.getElementById("alertDanger").style.display = "block"
            document.getElementById("alertDanger").innerHTML = `Clock in failed, ${name} is not in the list`
            document.getElementById("name").value = ""
            // wait 2 seconds 
            setTimeout(function() {
              document.getElementById("alertDanger").style.display = "none"
            }, 3000)
          }
      } else {
        document.getElementById("alertDanger").style.display = "block"
        document.getElementById("alertDanger").innerHTML = 'Database Error', 'No users found'
        document.getElementById("name").value = ""
        // wait 2 seconds 
        setTimeout(function() {
          document.getElementById("alertDanger").style.display = "none"
        }, 3000)
      }
  }).catch((error) => {
    document.getElementById("alertDanger").style.display = "block"
    document.getElementById("alertDanger").innerHTML = ('Database Error', error.message)
    document.getElementById("name").value = ""
    // wait 2 seconds 
    setTimeout(function() {
      document.getElementById("alertDanger").style.display = "none"
    }, 3000)
  });
}