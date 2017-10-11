// Composing and displaying polite phrase

var salutations = [
  "Dear",
  "My beloved",
  "My procious",
  "Sweet",
  "Enchanting",
  "Adorable"
];
var refusals = [
  "I think",
  "In my humble opinion",
  "After a careful analisys I realize that",
  "After a deep thought I conclude that",
  "Actually",
  "I'm afraid",
  "To be honest,",
  "I'm not quite satisfied with this idea. I must admit that",
  "I really appreciate your proposal, but",
  "Normally I'd be able to, but",
  "I wish I could, but",
  "I'd love to, but"
];
var reasons = [
  "is not the most desired activity for me at the moment.",
  "is the last thing I am about to consider at the moment.",
  "is beyond my today's ability to do anything.",
  "makes me look so funny and stupid that I'm not going to risk.",
  "makes me fill so unimportant and depressed. Oh my...",
  "is for me like asking a pig to fly.",
  "is asking me to dig a deep grave to bury myself immediately.",
  "is like to lunge at the sun with a hoe.",
  "is not something that I'm going to shed my  blood for.",
  "will put me at a disadvantage. I'm in pain everywhere."
];
var recapitulations = [
  "In fact I don't think that I will ever be ready for this!",
  "Honestly saying I have currently far more pleasant things to do with really nice people.",
  "I don't think I could be more confused with your idea.",
  "It's so truely indecent that I already fill shivers on my back.",
  "I fact I'm not sure if it's even legal.",
  "Wouldn't that be extreamly exciting to do it by yourself alone?",
  "Who else have you tried to convince that you are the right person for this moderatly interesting activity?"
];

// Object composing complete phrase concatenated from passed arguments
function phrase(salutation, name, refusal, activity, reason, recapitulation){
    this.value = `${salutation} ${name}! ${refusal} ${activity} ${reason} ${recapitulation}`;
}
// Prototype function displaying complete phrase in selector with passed id
phrase.prototype.display = function(id) {
  var result = document.getElementById(id);
  result.classList.remove('sample');
  result.innerText = this.value;
}

// Function validating and returning input values
function handleInput(id){
  var inputField = document.querySelector(`input[id="${id}"]`);

  // If input field is empty or not "a word" show warning
  if (inputField.value.search(/\w/) < 0) {
    inputField.nextElementSibling.classList.remove('hidden');
    return undefined;
  } else {
    inputField.nextElementSibling.classList.add('hidden');
    return inputField.value;
  }
}

// Generate random index function
function getRandomIndex(arrayLength) {
    return Math.floor(Math.random() * (arrayLength));
}

// Make string Title Case
function titleCase(string){
  var title= "";
  var nextCharUpperCase = true;
  for (var i = 0; i < string.length; i++) {
    title += nextCharUpperCase
      ? string[i].toUpperCase()
      : string[i];
     nextCharUpperCase = (string[i] ===" ");
  }
  return title;
}

// Function displaying phrase depending input
function handleGeneratePhrase(){
  var interlocutorName = handleInput('interlocutor');
  var activity = handleInput('activity');

  // If interlocutor and activity inputs are not empty
  if (activity!=undefined && interlocutorName!=undefined) {
    // Make every interlocutor name lowercase with first capital letter
    var interlocutorName = titleCase(interlocutorName);
    // Make activity words lowercase in the middle of sentence
    activity = activity.toLowerCase();
    // Make activity words lowercase with first letter capital at the  beggining of santence
    activityUpperCase =  activity.substr(0, 1).toUpperCase() + activity.substr(1, activity.length-1);

    // Generate random indexes
    var salutationIndex = getRandomIndex(salutations.length);
    var refusalIndex =  getRandomIndex(refusals.length);
    var reasonsIndex = getRandomIndex(reasons.length);
    var recapitulationIndex =  getRandomIndex(recapitulations.length);

    // Generate randomly composed new phrase depending on chosen complexity
    var complexity = document.getElementById('complexity').value;
    switch (complexity) {
      // moderately complex
      case '2':
        var newPhrase = new phrase(salutations[salutationIndex], interlocutorName, refusals[refusalIndex], activity, reasons[reasonsIndex],"");
        break;
      // complex
      case '3':
        var newPhrase = new phrase(salutations[salutationIndex], interlocutorName, refusals[refusalIndex], activity, reasons[reasonsIndex], recapitulations[recapitulationIndex]);
        break;
      // simple
      default:
        var newPhrase = new phrase(salutations[salutationIndex], interlocutorName, "", activityUpperCase, reasons[reasonsIndex], "");

    }
    // Display new phrase
    newPhrase.display("answer");
  }
}

function handleComplexity(){
  var inputRange = document.getElementById('complexity').value;
  var buttonGenerate = document.getElementById('generate');
  switch (inputRange) {
    case '2':
      buttonGenerate.innerHTML = "Generate <strong>medium</strong> phrase";
      break;
    case '3':
      buttonGenerate.innerHTML = "Generate <strong>long</strong> phrase";
      break;
    default:
    case '2':
      buttonGenerate.innerHTML = "Generate <strong>short</strong> phrase";
      break;
  }
}
