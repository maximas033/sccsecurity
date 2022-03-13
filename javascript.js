var firebaseConfig = {
    apiKey: "AIzaSyCT7cOWYEvds7eWS4g68v1SvPafvX_bXNk",
    authDomain: "sccsecurity-575a0.firebaseapp.com",
    projectId: "sccsecurity-575a0",
    storageBucket: "sccsecurity-575a0.appspot.com",
    messagingSenderId: "41777650764",
    appId: "1:41777650764:web:3c24977a6ce574e0fea8e9",
    measurementId: "G-8H6F8K3B8K"
  };
    // Initialize Firebase
    var firebaseConfiguration = firebase.initializeApp(firebaseConfig);
    // const app = initializeApp(firebaseConfig);


firebase.auth().onAuthStateChanged(function(user){
    if(user){
        // document.getElementById("gName").innerHTML = ("Welcome " + user.displayName)
    }
    else{
        //USER IS SIGNED OUT
        // window.location = "login.html"
    }
});




//WHEN LOGIN BUTTON IS PRESSED...
function scclogin(event){
    event.preventDefault()
    var email = document.getElementById('securityEmail').value
    var password = document.getElementById('securityPassword').value
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
        //HANDELING ERRORS
        // console.log("Error signing in,",  error.message)
        document.getElementById("firebasealert").style.display = "block"
        firebasealert.innerHTML = (error.message)
        setTimeout(function(){
            firebasealert.style.display = "none";
        }, 3000);

    }).then(function(user){
        if(user != null && email === "Sccwatchdogs@yahoo.com"){
            window.location = "clockin.html"
        }
        else if (user != null && email === "max.personal9@gmail.com"){
            window.location = "userCheck.html"
        }
    })
 }


 //WHEN LOG OUT BUTTON IS PRESSED...
function logOut(){
    firebase.auth().signOut().then(function(){
        // SIGN-OUT SUCCESSFULL
        window.location = "index.html"
    }).catch(function(error){
        //AN ERROR HAPPENED SIGNING OUT
    });
}










// WHEN THE CHECK IN BUTTON IS CLICKED
function clockIn(event){
    event.preventDefault()
    const securityPeople = ["Vadim", "Maxim", "Dan", "Vitaliy", "David", "Pasha", "Gena", "Slavic", "Roman", "Edward"];
    var persons_name = document.getElementById("name").value


    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var prepand;
    if(h>=12) {
      prepand = "PM";
      h = h - 12;
    }
    else {
      prepand = "AM";
    }
    
    if(m<10) {
      m = "0" + m;
    }
    
    if(s<10) {
     s = "0" + s; 
    }
    
    var weekend = new Array(7);
    weekend[0] = "Sunday";
    weekend[1] = "Monday";
    weekend[2] = "Tuesday";
    weekend[3] = "Wednday";
    weekend[4] = "Thursday";
    weekend[5] = "Friday";
    weekend[6] = "Saturday";
    var n = weekend[d.getDay()];

    if(securityPeople.includes(persons_name)){
        firebase.database().ref("clockedIn").push({
            timeDate: n,
            Name: persons_name,
            timeH: h,
            timeM: m,
        })


        // DISPLAYING SUCCESS ALERS
        document.getElementById('name').value = ""
        document.getElementById('name').style.borderColor ="black"
        document.getElementById('alertSuccess').style.display = "block"
        alertSuccess.innerHTML = (persons_name + " has been successfully clocked in at " + h + " : " + m)
        setTimeout(function(){
            alertSuccess.style.display = "none";
        }, 3000);
    }
    else{
        //DISPLAY ERROR ALERT
        document.getElementById("name").style.borderColor = "red"
        document.getElementById('alertDanger').style.display = "block"
        alertDanger.innerHTML = ("This person is not in the system, please try again")
        setTimeout(function(){
            alertDanger.style.display = "none";
        }, 3000);
    }
}









// WHEN THE CHECK OUT BUTTON IS CLICKED
function clockOut(event){
    event.preventDefault()
    var securityPeople = ["Vadim", "Maxim", "Dan", "Vitaliy", "David", "Pasha", "Gena", "Slavic", "Roman"];
    var persons_name = document.getElementById("name").value


    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var prepand;
    if(h>=12) {
      prepand = "PM";
      h = h - 12;
    }
    else {
      prepand = "AM";
    }
    
    if(m<10) {
      m = "0" + m;
    }
    
    if(s<10) {
     s = "0" + s; 
    }
    var weekend = new Array(7);
    weekend[0] = "Sunday";
    weekend[1] = "Monday";
    weekend[2] = "Tuesday";
    weekend[3] = "Wednday";
    weekend[4] = "Thursday";
    weekend[5] = "Friday";
    weekend[6] = "Saturday";
    var n = weekend[d.getDay()];
    
    if(securityPeople.includes(persons_name)){
        firebase.database().ref("clockedOut").push({
            Nameclock: persons_name,
            timeHour: h,
            timeMinute: m,
            timeDate: n,
        })

         // DISPLAYING SUCCESS ALERS
         document.getElementById('name').value = ""
         document.getElementById('name').style.borderColor ="black"
         document.getElementById('alertSuccess').style.display = "block"
         alertSuccess.innerHTML = (persons_name + " has been successfully clocked in at " + h + " : " + m)
         setTimeout(function(){
             alertSuccess.style.display = "none";
         }, 3000);
    }
    else{
          //DISPLAY ERROR ALERT
          document.getElementById("name").style.borderColor = "red"
          document.getElementById('alertDanger').style.display = "block"
          alertDanger.innerHTML = ("This person is either not in the system, or the fields is emptry")
          setTimeout(function(){
              alertDanger.style.display = "none";
          }, 3000);
     }
}













