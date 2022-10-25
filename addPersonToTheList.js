// get the new persons name from AddNewPerson input 
function addPersonToTheList(event){
    event.preventDefault();
    var ADDUSERS = document.getElementById("DiffrentPerson").value; 
    // add the name to the list of people in the database under the name of SCCSECURITYPEOPLE
    var SCCSECURITYPEOPLE = firebase.database().ref().child("SCCSECURITYPEOPLE");
    // check if the name is already in the list
    SCCSECURITYPEOPLE.once('value', function(snapshot) {
        if (snapshot.hasChild(ADDUSERS)) {
            // if the name is already in the list alert the user
            document.getElementById("AlertMessages").style.display = "block";
            // color light red
            document.getElementById("AlertMessages").style.backgroundColor = "#ffcccc";
            // color red
            document.getElementById("AlertMessages").style.color = "#ff0000";
            document.getElementById("AlertMessages").innerHTML = "This person is already in the list, please try a different name";
            // hide the alert message after 3 seconds
            setTimeout(function(){ document.getElementById("AlertMessages").style.display = "none"; }, 3000);
        } else {
            // if the name is not in the list add it to the list
            SCCSECURITYPEOPLE.child(ADDUSERS).set({
                name: ADDUSERS
            });
            document.getElementById("AlertMessages").style.display = "block";
            // color light green
            document.getElementById("AlertMessages").style.backgroundColor = "#ccffcc";
            // color green
            document.getElementById("AlertMessages").style.color = "#4CAF50";
            document.getElementById("AlertMessages").innerHTML = "The person has been added to the list successfully";
            // hide the alert message after 3 seconds
            setTimeout(function(){ document.getElementById("AlertMessages").style.display = "none"; }, 3000);
        }
    }
    );
}


