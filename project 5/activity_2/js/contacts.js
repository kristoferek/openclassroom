/*
Activity: Contact manager
*/

// View list of contacts
function viewContactList(list){
  console.log("Here is the list of all your contacts:");
   if (list) {
    for (var i = 0; i < list.length; i++) {
      console.log("Last name: " + list[i].lname + ", first name: " + list[i].fname);
    }
  }  else {
    console.log("List is empty");
  }
}

// Prompt for new contact first and last name
function addNewContact(){
  // Prompt for first name
  var fname = prompt("Type in first name:");
  // If empty - propmt again
  while (fname==="") {
    fname = prompt("Type in first name (it can't be empty):");
  }

  // Prompt for last name
  var lname = prompt("Type in last name:");
  // If empty - propmt again
  while (lname==="") {
    lname = prompt("Type in last name (it can't be empty):");
  }

  // Return contact object
  return {
    lname: lname,
    fname: fname
  };
}

// Display controls key menu
function displayControls(){
  console.log("1: List contacts");
  console.log("2: Add a contact");
  console.log("0: Quit");
}

// Handle actions depending on key pressed
function handleKeyPress(e){
  var newContact ="";

  // Action for appropriate key pressed
  switch (e.key) {
    // View list
    case "1":
      viewContactList(contactList);
      break;
    // Add new contact
    case "2":
      contactList.push(addNewContact());
      console.log("New contact added.");
      break;
    // Quit contact mangement
    case "0":
      console.log("Quitting contact list");
      // Remove event listener
      window.removeEventListener('keydown', handleKeyPress);
      // Leave immediately
      return;
    // Handle other key pressed
    default:
        console.log("Unnown command: ", e.key);
  }
  // After each action dsplay control menu
  displayControls();
}

// Handle contact list management
function handleContacts(){
  // Add event listener for key pressed calling handleKeyPress()
  window.addEventListener('keydown', handleKeyPress)
  // Display welcome message and control menu
  console.log("Welcome to your contact mamger.");
  // Display initial control menu
  displayControls();
}

// Contact list - initialize array of objects
var contactList = [
  {
    lname: "Smith",
    fname: "John"
  },
  {
    lname: "Doe",
    fname: "Jane"
  }
]

// Run contact list management
handleContacts();
