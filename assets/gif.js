

var topics = ['surfing', 'sharks', 'swimming', 'dolphins'];

$("form").on("submit", function (e) {
  e.preventDefault();
  var textContentInput = $("#tropical-input").val();
  console.log(textContentInput);
  var button = $("<button>").text(textContentInput);
  button.attr("class", "gifButton")
  button.data("value", textContentInput);
  $("#top-button-div").append(button);
 
})
  $(document).on("click", ".gifButton", function(){
  var searchTopic = $(this).data("value");
  var queryURL = `http://api.giphy.com/v1/gifs/search?api_key=q6ewL2txJWuDd9n6s5JV86UPm61kD4hM&q=${searchTopic}&limit=10` 
  console.log(queryURL);

$("#gifs-appear-here").empty();

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
//giphy is returning 1 result for some reason - need to investigate
    var results = response.data;
    console.log("hi");
    for (var i = 0; i < results.length; i++) {
      var JSONReturn = results[i];
      var showDiv = $("<div>");
      var rating = JSONReturn.rating || "no rating";
      var defaultAnimatedSrc = JSONReturn.images.fixed_height.url;
      var staticSrc = JSONReturn.images.fixed_height_still.url;
      var showImage = $("<img>").on("click", pausePlayGifs);
      var p = $("<p>").text("Rating: " + rating);
      

      showImage.attr("src", staticSrc);
      showImage.addClass("img");
      showImage.attr("data-state", "still");
      showImage.attr("data-still", staticSrc);
      showImage.attr("data-animate", defaultAnimatedSrc);
      showDiv.append(showImage);
      showDiv.append(p).addClass("p");
      $("#gifs-appear-here").prepend(showDiv);
    
}



  

 
  function pausePlayGifs() {
  	 var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }
}

  });});
    
