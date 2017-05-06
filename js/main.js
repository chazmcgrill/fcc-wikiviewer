$(document).ready(function(){

  var $searchItem = $(".searchItem")
  var searchVal = "";

  // define search result
  $(".form").on("submit", function(e){
    e.preventDefault();
    searchVal = $searchItem.val();
    searchResults();
  });

  // retrieve search data from wikiMedia api
  function searchResults(){
    $.ajax({
      url: '//en.wikipedia.org/w/api.php',
      data: {
        action: 'query',
        list: 'search',
        srsearch: searchVal,
        format: 'json'
      },
      dataType: 'jsonp',
      success: function (data) {
        if(data.query.search[0] !== undefined){
          for(var i = 0; i < 10; i++){
            var title = data.query.search[i].title;
            var href = "https://en.wikipedia.org/wiki/" + title.replace(/\s/g, '_');
            $("#listitem" + i).html(title);
            $("#listinfo" + i).html(data.query.search[i].snippet);
            $("#searchLink" + i).attr("href", href);
          }
        } else {
          $("#listitem1").html("Sorry");
          $("#listinfo1").html("no results found.");
        }
      }
    });
  }



});
