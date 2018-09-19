// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD_qNO6-LhCaCOZcGgUtWo9pGkTOcicl3E",
    authDomain: "train-scheduler-3021c.firebaseapp.com",
    databaseURL: "https://train-scheduler-3021c.firebaseio.com",
    projectId: "train-scheduler-3021c",
    storageBucket: "train-scheduler-3021c.appspot.com",
    messagingSenderId: "100791990044"
  };
// Configure Firebase
  firebase.initializeApp(config);

// variable to store database  
  var database = firebase.database();

// Starting values for variables
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;
var currentTime = moment();
var index = 0;
var trainIds = [];

// show current time
var datetime = null,
date = null;

var update = function() {
    date = moment(new Date())
    datetime.html(date.format("ddd, MMMM Do YYYY, h:mm:ss a"));
};
// set time to constantly update....research how to fix time area shifting the space...keep space constant
$(document).ready(function(){
    datetime = $("#current-status")
    update();
    setInterval(update, 1000);
});
    // add new train button
$("#add-train").on("click", function(){
    // Get values from text boxes...val().trim() goes here 
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrainName = $("#train-time").val().trim();
    frequency = $("#frequency").val().trim();
   
    // Difference between the times...research moment...set var for different time and conversion
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("Difference in time: " = diffTime);

    // time remainder....%?...not working!!!! 
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minutes until train...not working
    var minutesAway = frequency - tRemainder;
    console.log("Minutes away: " + moment(nextTrain).format("hh:mm"));

    // Train arrival time...
    var nextArrival = moment(nextTrain).format("hh:mm a");
    // need var for arrival update...set in a function date or datetime...see moment
    var nextArrivalUpdate = function() {
        date = moment(new Date())
        datetime.html(date.format("hh:mm a"));
    }
    // set up database folders with all vars...see database details...review timestamp
    // push....key: values added set from .push...or .set
    database.ref().push({
     trainName: trainName,
     destination: destination,
     firstTrainTime: firstTrainTime,
     frequency: frequency,
     minutesAway: minutesAway,
     nextArrival: nextArrival,
     dateAdded: firebase.database.ServerValue.TIMESTAMP   
    });

    alert("Form Submitted!");    
});
// same ref folder and specifics from project work....not currently working
database.ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function(snapshot) {
    console.log("Train name: " + snapshot.val().trainName);
    console.log("Destination: " + snapshot.val().destination);
    console.log("First train: " + snapshot.val().firstTrainTime);
    console.log("Frequency: " + snapshot.val().frequency);
    console.log("Next train: " + snapshot.val().nextArrival);
    console.log("Minutes away: " + snapshot.val().minutesAway);
   

    // HTML changes to identify new info..utilize table data...see project details
    $("#new-train").append("<tr><td>" + snapshot.val().trainName + "</td>" + 
    "<td>" + snapshot.val().destination + "</td>" +
    "<td>" + "Every " + snapshot.val().frequency + "mins" + "</td>" +
    "<td>" + snapshot.val().nextArrival + "</td>" +
    "<td>" + snapshot.val().minutesAway + " mins until arrival" + "</td>" +
    "</td></tr>");

    index++
        
    // Handle the errors from Firebase 
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
    


