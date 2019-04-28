//Configuration from firebase
  var config = {
    apiKey: "AIzaSyD9Al4k-mzMNYsPHrUnfwMMicnGLoEiago",
    authDomain: "alexis-practice-project.firebaseapp.com",
    databaseURL: "https://alexis-practice-project.firebaseio.com",
    projectId: "alexis-practice-project",
    storageBucket: "alexis-practice-project.appspot.com",
    messagingSenderId: "741055052741"
  };
  firebase.initializeApp(config);

//Initialize the configuration (firebase)
var database = firebase.database();

//Create initial variables
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;


/Get snapshot of the current data
    //Value event listener function that keeps the page updated when values change in firebase
database.ref().on("value", function(snapshot) {

  // If Firebase has highPrice and highBidder stored
  if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

    // Set the variable to the firebase values
    highPrice = snapshot.val().highPrice;

    highBidder = snapshot.val().highBidder;


    //Send the informationt to the HTML
    $("#highest-price").text(highPrice);
    $("#highest-bidder").text(highBidder);


    //Print the firebase values to the console
    console.log(snapshot.val());
    console.log(highPrice);
    console.log(highBidder);

  }

  // If that is not the case then...
  else {

    //Send this informaiton to the HTML
    $("#highest-price").text(highPrice);
    $("#highest-bidder").text(highBidder);

    //Print the values to the console
    console.log(highPrice);
    console.log(highBidder);

  }


//Firebase error function
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

//Create click event for the submit button
$("#submit-bid").on("click", function(event) {

  //Prevent the page from refreshing
  event.preventDefault();

  //Get the user input information and store it in a variable
  var bidderName = $("#bidder-name").val();
  var bidderPrice = $("#bidder-price").val();

  //Print the values to the console
  console.log(bidderName);
  console.log(bidderPrice);

  //Log the information even if it is not the highest
  if (bidderPrice > highPrice) {

    //Send an alert to the user
    alert("You are now the highest bidder.");

    //Pass the information to the route location (firebase)
    database.ref().set({
      highPrice: bidderPrice,
      highBidder: bidderName,
    });

    //Log the new High Price to the console
    console.log(highPrice);

    //Store the new high price and bidder name as a local variable
    highPrice = bidderPrice;
    highBidder = bidderName

  }

  //If that is not the case
  else {
    //Send this alert to the user
    alert("Sorry that bid is too low. Try again.");
  }

});
