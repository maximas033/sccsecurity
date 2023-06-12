function fetchClockedInUsers() {
    let clockedInUsersRef = firebase.database().ref('ClockInUsers');

    clockedInUsersRef.on('value', function(snapshot) {
        if (snapshot.exists()) {
            let allClockedInUsers = snapshot.val();
            this.clockedInUsers = Object.keys(allClockedInUsers);
            // document.getElementById("clockedInUsersInformation").innerHTML = `Clocked-in users: ${this.clockedInUsers}`
            document.getElementById("clockedInUsersInformation").innerHTML = `Number of clocked-in users: ${this.clockedInUsers.length}`
            this.numberOfClockedInUsers = `Number of clocked-in users: ${this.clockedInUsers.length}`;
            document.getElementById("clockedInUsersInformation").style.backgroundColor = "red"
            document.getElementById("clockedInUsersInformation").style.color = "white"
            document.getElementById("clockedInUsersInformation").style.padding = "10px"
            document.getElementById("clockedInUsersInformation").style.margin = "0 auto"
            document.getElementById("clockedInUsersInformation").style.borderRadius = "10px"
            return this.clockedInUsers
        } else {
            document.getElementById("clockedInUsersInformation").innerHTML = "No users are currently clocked in."
            document.getElementById("clockedInUsersInformation").style.color = "grey"
            document.getElementById("clockedInUsersInformation").style.fontWeight = "normal"
            document.getElementById("clockedInUsersInformation").style.backgroundColor = "white"
            this.numberOfClockedInUsers = "No users are currently clocked in.";
            this.clockedInUsers = [];
        }
    }.bind(this), function(error) {
        console.log(`Failed to fetch clocked-in users: ${error.message}`);
        this.numberOfClockedInUsers = `Failed to fetch clocked-in users: ${error.message}`;
    }.bind(this));
}

window.onload = fetchClockedInUsers()

function displayWho(){
    let clockedInUsersRefrence = firebase.database().ref('ClockInUsers');
    
    clockedInUsersRefrence.on('value', function(snapshot) {
        if (snapshot.exists()) {
                let allClockedInUsers = snapshot.val();
                this.clockedInUsers = Object.keys(allClockedInUsers);
                console.log(`Clocked-in users: ${this.clockedInUsers}`)

                // Get the peopleList element
                let peopleList = document.getElementById('peopleList');
                
                // Clear out the previous list
                while (peopleList.firstChild) {
                    peopleList.firstChild.remove();
                }

                // For each clocked in user, create a new list item and append it to the peopleList
                this.clockedInUsers.forEach(user => {
                    let listItem = document.createElement('li');
                    listItem.textContent = user;
                    peopleList.appendChild(listItem);
                    let breakPoint = document.createElement('br')
                    peopleList.appendChild(breakPoint)
                });

        } else {
                console.log("no users clocked in");
        }
    }.bind(this), function(error) {
            console.log(`Failed to fetch clocked-in users: ${error.message}`);
    }.bind(this));
}

window.onload = displayWho()


function displayWhoRelocate(){
    let clockedInUsersRefrence = firebase.database().ref('ClockInUsers');
    clockedInUsersRefrence.on('value', function(snapshot) {
        if (snapshot.exists()) {
            let allClockedInUsers = snapshot.val();
            this.clockedInUsers = Object.keys(allClockedInUsers);
            console.log(`Clocked-in users: ${this.clockedInUsers}`)

            if (this.clockedInUsers.length > 0) {
                // Redirect to ClockedInPeopleList.html
                window.location.href = 'ClockedInPeopleList.html';
            } else {
                console.log("no users clocked in");
            }

        } else {
            console.log("no users clocked in");
        }
    }.bind(this), function(error) {
        console.log(`Failed to fetch clocked-in users: ${error.message}`);
    }.bind(this));
}
