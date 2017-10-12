// Composing and displaying polite sentence

var salutations = [
  "Dear",
  "My beloved",
  "My procious",
  "Sweet",
  "Enchanting",
  "Adorable"
];
var names =[
  "Peter",
  "Susan",
  "Naomi",
  "Sherlock",
  "Watson",
  "Deborah",
  "Mom",
  "Son",
  "Dad",
  "God",
  "Ego"
]
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
var activities = [
  "speed dating",
  "playing dumb",
  "fighting",
  "going to restaurant",
  "composing uverture",
  "flying to Zambezi",
  "cleaning",
  "washing my ears",
  "being nice",
  "responding",
  "shooting president"
]
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

// Compose complete sentence concatenated from passed arguments
function cmoposeSentence(salutation, name, refusal, activity, reason, recapitulation){
    return `${salutation} ${name}! ${refusal} ${activity} ${reason} ${recapitulation}`;
}

// Display content in selector with specified id
function displayHTML(content, id) {
  var result = document.getElementById(id);
  if (result) {

    result.innerText = content;
  } else {
    console.log('Selector of id=', id, ' not found');
  }
}

// Take care for letter case of a string
function changeCase(string, caseType){

  switch (caseType) {
    //Title Case
    case 'title':
      // If string[i] is " " make string[i+1] uppercase
      // initialy true for first letter Uppercsae
      var result= "";
      var nextCharUpperCase = true;
      for (var i = 0; i < string.length; i++) {
        // if nextCharUpperCase is true make string[i] uppercase
        result += nextCharUpperCase
          ? string[i].toUpperCase()
          : string[i].toLowerCase();
        // set nextCharUpperCase true if string[i] is " "
        nextCharUpperCase = (string[i] ===" ");
      }
      return result;
      // break;

    // Sentence case
    case 'sentence':
      return string.substr(0, 1).toUpperCase() + string.substr(1, string.length-1);

    // lower case
    case 'lower':
      return string.toLowerCase();

    // do nothing
    default:
      return string;
  }
}

// Get random array element
function randomArrElement(arr){
  var randomIndex = arr.length > 1 ? Math.floor(Math.random() * (arr.length)) : 0;
  return arr[randomIndex];
}

// Function validating and returning input values
function getInputValue(id){

  // Find input with given id
  var inputField = document.querySelector(`input[id="${id}"]`);

  // If  input field exist and is text type validate
  if (inputField.type === "text"){
    // If input field is empty or not "a word" show warning
    if (inputField.value.search(/\w/) < 0) {
      inputField.nextElementSibling.classList.remove('hidden');
      return false;
    } else {
      inputField.nextElementSibling.classList.add('hidden');
      return inputField.value;
    }
  } else if (inputField.type === "range") {
    return inputField.value;
  } else {
    console.log('handleInputText(', id, ') failed querying selector');
  }
}

// Generate sentence depending on complexity
function generateRandomStatement(interlocutorName, activity, complexity){
  // make name Title Case
  var name = changeCase(interlocutorName, 'title');

  switch (complexity) {
    // long sentence
    case '3':
      // make activity lower case
      var action = changeCase(activity, 'lower')
      var randomSentence = cmoposeSentence(randomArrElement(salutations), name, randomArrElement(refusals), action, randomArrElement(reasons), randomArrElement(recapitulations));
      break;
    // medium sentence
    case '2':
      // make activity lower case
      action = changeCase(activity, 'lower')
      var randomSentence = cmoposeSentence(randomArrElement(salutations), name, randomArrElement(refusals), action, randomArrElement(reasons),"");
      break;
    // short sentence
    default:
      // make activity Sentence case
      action = changeCase(activity, 'sentence')
      var randomSentence = cmoposeSentence(randomArrElement(salutations), name, "", action, randomArrElement(reasons), "");
  }
  return randomSentence;
}

// Handle button click and display sentence randomly generated from six parts:
// salutation + name + refusal + activity + reason + recapitulations
function handleClickDefaultButton(rangeId, targetId){
  var newContent = generateRandomStatement(randomArrElement(names), randomArrElement(activities), getInputValue(rangeId))
  displayHTML(newContent, targetId);
}

// Handle button click and display sentence randomly generated of six parts
// including custom input fields:
// salutation + input[name] + refusal + input[activity] + reason + recapitulations
function handleClickCustomButton(nameId, activityId, rangeId, targetId){

  // Get user input values
  var interlocutorName = getInputValue(nameId);
  var activity = getInputValue(activityId);
  var complexity = getInputValue(rangeId);

  // If propelly validated text inputs
  if (activity !== false && interlocutorName !== false) {
    // Generate new sentence
    var newContent = generateRandomStatement(interlocutorName, activity, complexity);
    // Display new sentence
    displayHTML(newContent, targetId);
  }
}

// Handle complexity change and change text on the button
function handleChangeComplexity(e, rangeId, targetId){
  var inputRange = e.target.value;
  var targetElement = document.getElementById(targetId);
  switch (inputRange) {
    case '2':
      targetElement.innerHTML = "<strong>Medium</strong><br/> sentence";
      targetElement.className = "text-center";
      break;
    case '3':
      targetElement.innerHTML = "<strong>Long</strong><br/>  sentence";
      targetElement.className = "text-right";
      break;
    default:
      targetElement.innerHTML = "<strong>Short</strong><br/> sentence";
      targetElement.className = "text-left";
      break;
  }
}
