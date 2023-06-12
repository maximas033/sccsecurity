function BackgroundCheck() {
    var toggleStateRef = firebase.database().ref('toggleState');
    toggleStateRef.on('value', function(snapshot) {
        var toggleState = snapshot.val();
        if (toggleState) {
            window.location.href = 'Underconstruction.html';
        }
    }, function(error) {
        console.error("Error checking toggle state: ", error);
    });
}

BackgroundCheck()