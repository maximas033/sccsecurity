// from the real-time database refrence users
// then refrence users/totalTime" + name
function getTotalTime(){
    var name = ["David", "Maxim", "Vadim", "Vitaliy", "Dan", "Pasha", "Gena", "Slavic", "Roman", "Edward", "Dima", "Viktor"];
    for(var i = 0; i < name.length; i++){
        firebase.database().ref("users/totalTime" + name[i]).on("value", function(snapshot){
            // display the total time that the user has worked inside console
            console.log(snapshot.val());
            // create a table that will display the name of the user and the total hours and minutes that the user has worked
            // appened the table to the div with the id of workedHoursW
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
            tr.appendChild(td);
            tbody.appendChild(tr);
            table.appendChild(tbody);
            document.getElementById("workedHoursW").appendChild(table);
        });
    }
} 
