// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCZx2woCZx4MUhOUZdSY81xV37_XI_rxew",
    authDomain: "clockingsystem-8baa6.firebaseapp.com",
    projectId: "clockingsystem-8baa6",
    storageBucket: "clockingsystem-8baa6.appspot.com",
    messagingSenderId: "515651665477",
    appId: "1:515651665477:web:bcdd8e19f92eca70a22d2c"
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
            window.location = "clockin.html"
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