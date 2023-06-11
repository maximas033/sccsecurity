function fetchData(completion) {
    var databaseRef = firebase.database().ref().child("TotalHours");
    databaseRef.once("value", function(snapshot) {
        var personDataArray = [];

        var dataDict = snapshot.val();
        for (var name in dataDict) {
            if (dataDict.hasOwnProperty(name)) {
                var data = dataDict[name];
                var hoursWorked = data["hours"] || 0;
                var minutesWorked = Math.floor(data["minutes"]) || 0; // Here we round down the minutes to a full number
                var personData = { name: name, hoursWorked: hoursWorked, minutesWorked: minutesWorked };
                personDataArray.push(personData);
            }
        }

        completion(personDataArray);
    });
}


fetchData(function(personDataArray) {
    var workedHoursW = document.getElementById("workedHoursW");
    var table = document.createElement("table");

    var tableHead = document.createElement("thead");
    var tableHeadRow = document.createElement("tr");

    var nameHeader = document.createElement("th");
    nameHeader.textContent = "Name";
    var hoursWorkedHeader = document.createElement("th");
    hoursWorkedHeader.textContent = "Hours Worked";
    var minutesWorkedHeader = document.createElement("th");
    minutesWorkedHeader.textContent = "Minutes Worked";

    tableHeadRow.appendChild(nameHeader);
    tableHeadRow.appendChild(hoursWorkedHeader);
    tableHeadRow.appendChild(minutesWorkedHeader);

    tableHead.appendChild(tableHeadRow);
    table.appendChild(tableHead);

    var tableBody = document.createElement("tbody");

    personDataArray.forEach(function(personData) {
      var row = document.createElement("tr");
      var nameCell = document.createElement("td");
      var hoursWorkedCell = document.createElement("td");
      var minutesWorkedCell = document.createElement("td");

      nameCell.textContent = personData.name;
      hoursWorkedCell.textContent = personData.hoursWorked;
      minutesWorkedCell.textContent = personData.minutesWorked;

      row.appendChild(nameCell);
      row.appendChild(hoursWorkedCell);
      row.appendChild(minutesWorkedCell);

      tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    workedHoursW.appendChild(table);
  });
