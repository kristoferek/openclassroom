// Composing and displaying polite phrase

var salutations = [
  "Dear",
  "My beloved"
];
var refusals = [
  "I think",
  "In my humble opinion",
  "After a careful analisys I realize that",
  "After a deep thought I conclude that"
];
var reasons = [
  "is not the most desired activity for me at the moment.",
  "is the last thing I am about to consider now."
];
var recapitulations = [
  "In fact I don't think that it will ever be!",
  "Honestly saying I have currently far more pleasant things to do with really nice people."
];

// Object composing complete phrase concatenated from passed arguments
function phrase(salutation, name, refusal, activity, reason, recapitulation){
    this.value = salutation + " " + name + "! " + refusal + " " + activity + " " + reason + " " + recapitulation;
}
// Prototype function displaying complete phrase in selector with passed id
phrase.prototype.display = function(id) {
  var result = document.getElementById(id);
  result.classList.remove('sample');
  result.innerText = this.value;
}

// Function returning inut values and taking care for empty input fields
function handleInput(id){
  var inputField = document.querySelector(`input[id="${id}"]`);

  // If input field is empty show next element
  if (inputField.value === "") {
    inputField.nextElementSibling.classList.remove('hidden');
  } else {
    inputField.nextElementSibling.classList.add('hidden');
  }
  return inputField.value;
}

// Generate random index function
function getRandomIndex(arrayLength) {
    return Math.floor(Math.random() * (arrayLength));
}

// Function displaying phrase depending input
function handleGeneratePhrase(){
  var interlocutorName = handleInput('interlocutor');
  var activity = handleInput('activity');

  // If interlocutor and activity are specified
  if (activity!=="" && interlocutorName!=="") {
    // Make interlocutor name lowercase with first capital letter
    interlocutorName = interlocutorName.substr(0, 1).toUpperCase() + interlocutorName.substr(1, interlocutorName.length-1).toLowerCase();
    // Make activity lowercase
    activity = activity.toLowerCase();
    activityUpperCase =  activity.substr(0, 1).toUpperCase() + activity.substr(1, activity.length-1);

    // Generate random indexes
    var salutationIndex = getRandomIndex(salutations.length);
    var refusalIndex =  getRandomIndex(refusals.length);
    var reasonsIndex = getRandomIndex(reasons.length);
    var recapitulationIndex =  getRandomIndex(recapitulations.length);

    // Generate randomly composed new phrase depending on chosen complexity
    var complexity = document.getElementById('complexity').value;
    console.log(complexity);
    switch (complexity) {
      case '2':
        var newPhrase = new phrase(salutations[salutationIndex], interlocutorName, refusals[refusalIndex], activity, reasons[reasonsIndex],"");
        break;
      case '3':
        var newPhrase = new phrase(salutations[salutationIndex], interlocutorName, refusals[refusalIndex], activity, reasons[reasonsIndex], recapitulations[recapitulationIndex]);
        break;
      default:
        var newPhrase = new phrase(salutations[salutationIndex], interlocutorName, "", activityUpperCase, reasons[reasonsIndex], "");

    }
    // Display new phrase
    newPhrase.display("answer");
  }
}
