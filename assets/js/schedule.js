
  //Initialize Firebase
  var config = {
    apiKey: "AIzaSyD96bPNj81nvjJjV2jWvK6HuecVzdneHWE",
    authDomain: "train-time-fb788.firebaseapp.com",
    databaseURL: "https://train-time-fb788.firebaseio.com",
    projectId: "train-time-fb788",
    storageBucket: "train-time-fb788.appspot.com",
    messagingSenderId: "1070846836871"
  };
  firebase.initializeApp(config);


//Create a variable to reference the database
var database = firebase.database();

//Grabs the time you input the data at
var currentTime = moment().format();

//Create a click event listener function for the submit button
$("#add-user").on("click", function (event) {

  //Prevents the page from refreshing
  event.preventDefault();

  //Get the input values
  var name = $("#nameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var time = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
  var frequency = $("#frequencyInput").val().trim();


  //Print the variables to the console
  console.log(name);
  console.log(destination);
  console.log(time);
  console.log(frequency);


  //Logic for storing and receiving data
  //Push it to the firebase database
  database.ref().push({
    name: name,
    destination: destination,
    time: time,
    frequency: frequency
  });


});

//Only listen at that location for this specific event
//database.ref is the route location
//"cild_added" is the event listener
database.ref().on("child_added", function (snapshot) {


//Console log the snapshot value
  console.log(snapshot.val());

  //Create a varaibles for the snapshot value of the inputs
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var time = snapshot.val().time;
  var frequency = snapshot.val().frequency;

  //Console log the variables
  console.log(name);
  console.log(destination);
  console.log(time);
  console.log(frequency);

  //Convert time to military time
  var convertTrain = moment(time, "HH:mm");

  //Convert the time to minutes
  var timeDiff = moment().diff(moment(convertTrain), "minutes");

  //Print the minutes to the console
  console.log(timeDiff);

  //Create a variable for the eta of the train and set it to the difference between the minutes and hte frequency
  var eta = Math.abs(timeDiff % frequency);

  //Print the eta to the console
  console.log("Minutes Away: " + eta);

  //Create a variable and set it the current time plus the eta in minutes, and format it to military time
  var nextArrival = moment(currentTime).add(eta, "minutes").format("hh:mm A");

  //Print the arrival time to the console
  console.log("Next Arrival: " + nextArrival);

  //Append the content to new table rows
  var newRow = $("<tr>").append(
    $("<td>").text(name),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextArrival),
    $("<td>").text(eta)
  );

//Print the new rows to the console
console.log(newRow);

  //> means go inside
  //Append the new rows to the DOM
  $("#main-table > tbody").append(newRow);


});