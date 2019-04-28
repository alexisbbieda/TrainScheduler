// Initialize Firebase (YOUR OWN APP)
//Configuration from firebase
var config = {
  apiKey: "AIzaSyD9Al4k-mzMNYsPHrUnfwMMicnGLoEiago",
  authDomain: "alexis-practice-project.firebaseapp.com",
  databaseURL: "https://alexis-practice-project.firebaseio.com",
  projectId: "alexis-practice-project",
  storageBucket: "alexis-practice-project.appspot.com",
  messagingSenderId: "741055052741"
};

//Initialize the configuration
firebase.initializeApp(config);



//Variable that references the database
var database = firebase.database();

//Create an initial value variable
var initialValue = 100;

//Create a variable that keeps track of the clicks
var clickCounter = initialValue;

//Get snapshot of the current data
//Value event listener function that keeps the page updated when values change in firebase
database.ref().on("value", function(snapshot) {

// This "snapshot" allows the page to get the most current values in firebase.
//Print the snapshot to the console
console.log(snapshot.val());

//Set the value of the clickCounter to the value in the database
clickCounter = snapshot.val().clickCount;

//Print the value to the console
console.log(clickCounter);

//Add the value to the DOM
$("#click-value").text(clickCounter);

//Firebase error logging
//This is taken from teh firebase library
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});


//Click event listener function
$("#click-button").on("click", function() {

  //Decrement the click counter
  clickCounter--;

  //If there are no more remaining
  if (clickCounter === 0) {

    //Alert the user
    alert("Phew! You made it! That sure was a lot of clicking.");

    //Start over
    clickCounter = initialValue;

  }

//Save the value to the route location (firebase)
database.ref().set({
  clickCount: clickCounter
});

  //Print the value to the console
  console.log(clickCounter);

});

//Click event listener for the reset button
$("#restart-button").on("click", function() {

  //Set the values equal to eachother
  clickCounter = initialValue;

  //Save the value to the route location (firebase)
  database.ref().set({
    clickCount: clickCounter
  });

  //Print the value to the console
  console.log(clickCounter);

  //Change the HTML values
  $("#click-value").text(clickCounter);


});
