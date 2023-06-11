// Function to add a person to the AllUsers list
function addPersonToTheList(event){
    // Prevent the page from refreshing
    event.preventDefault();
    // Get the name input by the user and trim any whitespace
    let addUser = document.getElementById("DiffrentPerson").value.trim();

    // If the input field is empty, show an alert message and return
    if(addUser === "") {
        let alertMessageElem = document.getElementById("AlertMessages");
        alertMessageElem.style.display = "block";
        alertMessageElem.style.backgroundColor = "red";
        alertMessageElem.style.color = "#ffffff";
        alertMessageElem.innerHTML = "Please enter a name";
        setTimeout(() => { 
            alertMessageElem.style.display = "none"; 
        }, 3000);
        return;
    }
    // Reference to the AllUsers node in the Firebase database
    let allUsersRef = firebase.database().ref().child("AllUsers");

    // Reference to the AlertMessages element for displaying messages to the user
    let alertMessageElem = document.getElementById("AlertMessages");

    // Read the data at the AllUsers reference once
    allUsersRef.once('value').then((snapshot) => {
        // Initialize a flag to check if the user already exists
        let userExists = false;

        // Loop through each child snapshot in the AllUsers node
        snapshot.forEach((childSnapshot) => {
            // If the entered name matches any existing name in the database, set userExists to true
            if (childSnapshot.val().name === addUser) {
                userExists = true;
                return true; // stops the loop
            }
        });

        // If the user already exists, show an alert message
        if (userExists) {
            alertMessageElem.style.display = "block";
            alertMessageElem.style.backgroundColor = "red";
            alertMessageElem.style.color = "#ffffff";
            alertMessageElem.innerHTML = "This person is already in the list, please try a different name";
        } else {
            // If the user doesn't exist, generate a unique key and add the user to the database
            let key = allUsersRef.push().key;
            if (key) {
                allUsersRef.child(key).set({
                    name: addUser
                }).then(() => {
                    // After successfully adding the user, show a success message and clear the input field
                    alertMessageElem.style.display = "block";
                    alertMessageElem.style.backgroundColor = "green";
                    alertMessageElem.style.color = "#ffffff";
                    alertMessageElem.innerHTML = "The person has been added to the list successfully";
                    document.getElementById("DiffrentPerson").value = ""
                }).catch((error) => {
                    console.error(error);
                });
            }
        }

        // Hide the alert message after 3 seconds
        setTimeout(() => { 
            alertMessageElem.style.display = "none"; 
        }, 3000);
    });
}
