$(document).ready(function(){

  var albumsJSON = "https://codepen.io/kristoferek/pen/oGJPPO.js";

  // Show title in selector
  function showDefault(selector){
    // Instert title into selector
    selector ? $(selector).html($('<h1>').text('East Village Vinyl')) : null;
  }

  // Show list of albums in #content
  function listAlbums(){
    // Display "Loading JSON..." until data are being processed
    var content = $('#content').html($('<div>').addClass("waiting").text("Loading JSON..."));
    // Parse albums from JSON file
    $.getJSON(albumsJSON).done(function(response){
      // Create list
      var list = $('<ul>').addClass("albums");
      // extract albums
      $.each(response, function(index, album){
        var title = album.title + ' - ' + album.artist;
        var year = 'year: ' + album.year;
        var tracks = 'tracks: ' + album.tracks;
        // Construct list item
        var listItem = $('<li>')
          //Add album data to list item
          .append($('<h2>').html(title).addClass("title"))
          .append($('<div>').html(year).addClass("details"))
          .append($('<div>').html(tracks).addClass("details"));
        // Add list item to the list
        list.append(listItem);
      });
      // insert list into #content
      content.html(list);
    // In case of failure console log info
    }).fail(function(response){
      console.log(response);
    });
  }

  // Load albums

  var albumsHTML = "https://codepen.io/kristoferek/pen/eGbwvN.html";
  function loadAlbums(){
    // Get album section and insert it to .mainContent
    // When succeeded load albums from JSON file to the list
      var mainContent = $('.mainContent')
      // Display "Loading HTML..." until loading succeeded
      .html($('<div>').addClass("waiting").text('Loadin HTML...'));
    mainContent
      // Load album html section
      .load(albumsHTML,
      // Load albums from JSON file and put them into the list
      function(){
        listAlbums();
      });
  };

  showDefault('.mainContent');
  // Add event listeners for menu items
  $('#albumsLink').parent().click(loadAlbums);
  $('#albumsLink').parent().nextAll().click(function(){showDefault('.mainContent')});
  // Initialize content with title
});
