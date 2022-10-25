// from the real-time database refrence users
// then refrence users/totalTime" + name
function getTotalTime(){
    // get the names of the people from the firebase database under SCCSECURITYPEOPLE
    var SCCSECURITYPEOPLE = firebase.database().ref().child("SCCSECURITYPEOPLE");
    // get the total time of time worked for each person
    SCCSECURITYPEOPLE.on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            var name = data.key;
            var totalTime = firebase.database().ref().child("users/totalTime" + name);
            totalTime.on("value", function(snapshot) {
                var total = snapshot.val();
               // create a table that will display the name of the user and the total hours and minutes that the user has worked
//             // appened the table to the div with the id of workedHoursW
            var table = document.createElement("table");
            table.setAttribute("class", "table table-striped");
            var thead = document.createElement("thead");
            var tr = document.createElement("tr");
            var th = document.createElement("th");

            th.innerHTML = "Name";
            tr.appendChild(th);
            th = document.createElement("th");
            th.innerHTML = "Hours";
            tr.appendChild(th);
            th = document.createElement("th");
            th.innerHTML = "Minutes";
            tr.appendChild(th);
            thead.appendChild(tr);
            table.appendChild(thead);
            var tbody = document.createElement("tbody");
            tr = document.createElement("tr");
            var td = document.createElement("td");
            td.innerHTML = snapshot.val().name;
            tr.appendChild(td);
            td = document.createElement("td");
            td.innerHTML = snapshot.val().totalHour;
            tr.appendChild(td);
            td = document.createElement("td");
            td.innerHTML = snapshot.val().totalMinute;
            // remove the line before the minute
            td.innerHTML = td.innerHTML.replace("-", "");
            tr.appendChild(td);
            tbody.appendChild(tr);
            table.appendChild(tbody);
            document.getElementById("workedHoursW").appendChild(table);
            });
        });
    });
}


//     firebase.database().ref("users/totalTime" + SCCSECURITYPEOPLE).once("value", function(snapshot){
//     // name of the user
//     for(var i = 0; i < SCCSECURITYPEOPLE.length; i++){
//         firebase.database().ref("users/totalTime" + SCCSECURITYPEOPLE[i]).once("value", function(snapshot){
//             // create a table that will display the name of the user and the total hours and minutes that the user has worked
//             // appened the table to the div with the id of workedHoursW
//             var table = document.createElement("table");
//             table.setAttribute("class", "table table-striped");
//             var thead = document.createElement("thead");
//             var tr = document.createElement("tr");
//             var th = document.createElement("th");

//             th.innerHTML = "Name";
//             tr.appendChild(th);
//             th = document.createElement("th");
//             th.innerHTML = "Hours";
//             tr.appendChild(th);
//             th = document.createElement("th");
//             th.innerHTML = "Minutes";
//             tr.appendChild(th);
//             thead.appendChild(tr);
//             table.appendChild(thead);
//             var tbody = document.createElement("tbody");
//             tr = document.createElement("tr");
//             var td = document.createElement("td");
//             td.innerHTML = snapshot.val().name;
//             tr.appendChild(td);
//             td = document.createElement("td");
//             td.innerHTML = snapshot.val().totalHour;
//             tr.appendChild(td);
//             td = document.createElement("td");
//             td.innerHTML = snapshot.val().totalMinute;
//             // remove the line before the minute
//             td.innerHTML = td.innerHTML.replace("-", "");
//             tr.appendChild(td);
//             tbody.appendChild(tr);
//             table.appendChild(tbody);
//             document.getElementById("workedHoursW").appendChild(table);
//         });
//     }
//     });
// }
