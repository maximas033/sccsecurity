// Save the toggle state to the Realtime Database
function saveToggleState() {
    var constructionToggle = document.getElementById('constructionToggle');
    var toggleStateRef = firebase.database().ref('toggleState');
    toggleStateRef.set(constructionToggle.checked);
}

// Listen for changes in the toggle switch state
function listenForToggleChanges() {
    var constructionToggle = document.getElementById('constructionToggle');
    constructionToggle.addEventListener('change', function() {
        saveToggleState();
        applyToggleStyles(constructionToggle.checked);
    });
}


// Apply styles based on the toggle state
function applyToggleStyles(isToggleOn) {
    var sliderElement = document.querySelector('.slider');
    var underConstructionSection = document.getElementById('underConstruction');
    var toggleSwitchLabel = document.querySelector('.toggle-switch');

    if (isToggleOn) {
        underConstructionSection.style.display = 'block';
        sliderElement.style.backgroundColor = '#2196F3';
    } else {
        underConstructionSection.style.display = 'block';
        sliderElement.style.backgroundColor = '#ccc';
    }
}
// Run the functions on page load
document.addEventListener('DOMContentLoaded', function() {
    listenForToggleChanges();
    var constructionToggle = document.getElementById('constructionToggle');
    var toggleStateRef = firebase.database().ref('toggleState');
    toggleStateRef.on('value', function(snapshot) {
        var toggleState = snapshot.val();
        constructionToggle.checked = toggleState;
        applyToggleStyles(toggleState);
    });
});
