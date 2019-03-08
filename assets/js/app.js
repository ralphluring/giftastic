let topics = ["cats","dogs","fruit"];
let apiKey = "FjWs1QzYB8vau7ndQTIg4Mw2ujGoBsUn";
let userSearch = "dogs";

for(let j = 0; j < topics.length; j++){
    let topicButton = $("<button>");
    topicButton.text(topics[j]);
    topicButton.attr("value", topics[j]);
    $("#buttons").append(topicButton);
}

$("button").on("click", function(){
   let topic =  $(this).attr("value");

   // queryURL for Giphy API
    let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + apiKey + "&limit=10";

    $.ajax({

    url: queryURL,
    method: "GET"

    }).then(function(response) {
        let results = response.data;
        console.log(results);

        for(let i = 0; i < results.length; i++){  
            
            let gif = $("<img>");
            gif.attr("class", "gif");
            gif.attr("data-state", "still");
            gif.attr("data-still", results[i].images.fixed_height_still.url);  
            gif.attr("data-animate", results[i].images.fixed_height.url);  
            gif.attr("src", results[i].images.fixed_height_still.url);
            $("#gifs").prepend(gif);
            
       
        }
        $(".gif").on("click", function(){
            let dataState = $(this).attr("data-state");
               if(dataState === "still"){
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
               }else{
                    $(this).attr("data-state", "still");
                    $(this).attr("src", $(this).attr("data-still"));          
               }
               
            });

       
    
});

});


