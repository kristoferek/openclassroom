// List of links to show. Each link has:
// - a title
// - a URL
// - an author (the person who added it)

var linkList = [
    {
        title: "Kottke",
        url: "http://kottke.org",
        author: "brett.suggs"
    },
    {
        title: "National Geographic",
        url: "http://www.nationalgeographic.com",
        author: "jessica"
    },
    {
        title: "American Museum of Natural History",
        url: "http://www.amnh.org",
        author: "aurora.nicole"
    }
];

function createLinkElement(link) {
    var linktitle = document.createElement("a");
    linktitle.href = link.url;
    linktitle.style.color = "#428bca";
    linktitle.style.textDecoration = "none";
    linktitle.style.marginRight = "5px";
    linktitle.appendChild(document.createTextNode(link.title));

    var linkUrl = document.createElement("span");
    linkUrl.innerText= link.url;

    var titleLine = document.createElement("h4");
    titleLine.style.margin = "0px";
    titleLine.appendChild(linktitle);
    titleLine.appendChild(linkUrl);

    var detailsLine = document.createElement("span");
    detailsLine.appendChild(document.createTextNode("Added by " + link.author));

    var linkDiv = document.createElement("div");
    linkDiv.classList.add("link");
    linkDiv.appendChild(titleLine);
    linkDiv.appendChild(detailsLine);

    return linkDiv;
}

// New item handling

// Hide or show element
function elementShow(element, isVisible = true){
  if (element){
    (isVisible)
    ? element.classList.remove('hidden')
    : element.classList.add('hidden');
  }
}

// Check if link is correct
function validateLink(txt){
  if (txt.indexOf('http://')===0 || txt.indexOf('https://')===0) {
    return txt;
  } else {
    return 'http://' + txt;
  }
}

// Add new element at the beginnng of the list
function addData(title, linkUrl, author){
  var link = {
    title: title,
    url: linkUrl,
    author: author
  }
  content.insertBefore(createLinkElement(link), content.firstChild);
}

// Empty form fields for later use
function emptyForm(myForm){
    for (var i = 0; i < myForm.length; i++) {
    myForm[i].value="";
  }
}

// Handle submitting form
function handleSubmitItem(){
  var title = document.forms.newItem.querySelector('[name=title]').value;
  var author = document.forms.newItem.querySelector('[name=author]').value;
  var linkUrl = document.forms.newItem.querySelector('[name=linkUrl]').value;

  // If one ore more fields are empty alert and exit
  if (title=='' || author=='' || linkUrl=='') {
    alert('All fields are required');
    return null;
  // If all fields aren't empty add new row to the list
  } else {
    // Add new row to the list
    addData(title, validateLink(linkUrl), author);
    // Empty form
    emptyForm(document.forms.newItem);
    // Hide form
    elementShow(document.forms.newItem, false);
    // Show success message
    document.getElementById('itemTitle').innerText = title;
    elementShow(document.querySelector('div#msgsuccess'), true);
    // After 2s
    setTimeout(function functionName() {
      // Hide success message
      elementShow(document.querySelector('div#msgsuccess'), false)
    }, 2000);
    // Show Add Item button
    elementShow(document.querySelector('button#addItem'), true);
  }
}

// Handle adding item button
function handleAddItem(){
  // Show form
  elementShow(document.forms.newItem, true);
  // Hide Add Item button
  elementShow(document.querySelector('button#addItem'), false);
}

// List generating
var content = document.getElementById("content");
linkList.forEach(function (link) {
    var linkElement = createLinkElement(link);
    content.appendChild(linkElement);
});


// Generating control element - button, message and form

// Create DOM element
function createDOMElement(element, type, name, value, placeholder, id, classes){
  var newElement = document.createElement(element);
  type ? newElement.type = type : null;
  name ? newElement.name = name : null;
  value ? newElement.value = value : null;
  placeholder ? newElement.placeholder = placeholder : null;
  id ? newElement.id = id : null;
  classes ? newElement.className = classes : null;
  return newElement;
}

// Create success message
var message = createDOMElement('div', '', '', '', '', 'msgsuccess', 'success hidden');
message.appendChild(document.createTextNode('The link to "'));
message.appendChild(createDOMElement('span', '', '', '', '', 'itemTitle'));
message.appendChild(document.createTextNode('" was successfully added'));

// Create form fields and button
var buttonAddItem =  createDOMElement('button', 'button', 'addItem', 'Add Item', '', 'addItem');
buttonAddItem.appendChild(document.createTextNode('Add Item'));
var titleInput = createDOMElement('input', 'text', 'title', '', 'Title');
var authorInput = createDOMElement('input','text', 'author', '', 'Author Name');
var linkInput = createDOMElement('input', 'text', 'linkUrl', '', 'http://yoururl.com');
var buttonSubmitItem = createDOMElement('button', 'button', 'submitItem', 'Add', '', 'submitItem');
buttonSubmitItem.appendChild(document.createTextNode('Add'));

// Create form and fill with fields and button
var newForm = document.createElement('form');
newForm.id='newItem';
newForm.appendChild(titleInput);
newForm.appendChild(authorInput);
newForm.appendChild(linkInput);
newForm.appendChild(buttonSubmitItem);
newForm.className='hidden';

// Insert message, button and form into page
var controls = document.getElementById('controls');
controls.appendChild(message);
controls.appendChild(buttonAddItem);
controls.appendChild(newForm);

// Add event listeners
buttonAddItem.addEventListener("click", handleAddItem);
buttonSubmitItem.addEventListener("click", handleSubmitItem);
