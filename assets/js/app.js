$(document).ready(function(){
    // sets the initial data for the buttons to get gifs
    let topics = ["cats","dogs","fruit"];

    // loops the topics array creates buttons for each element 
    function makeButtons(){
        // clear the buttons 
        $("#buttons").empty();
        // loop through the topics add a button for each and add to button section
        for(let j = 0; j < topics.length; j++){
            let topicButton = $("<button>");
            topicButton.attr("class","topicButton");
            topicButton.attr("value", topics[j]);
            topicButton.text(topics[j]);
            $("#buttons").append(topicButton);
        }
    };
    // listens for click on the add button next to the input
    $("#addButton").on("click", function(){
        event.preventDefault();
        // get the value entered by the user
        let topic =  $("#userInput").val().trim();	
        topics.push(topic);
        // reset the input field
        $("#userInput").val("");
        // call make buttons to update the button list
		makeButtons();
    });
    // first call of the program creates the initial buttons.
    makeButtons();

    function getData(){
        // console.log($(this));
        // this is equal to the topic button that was pressed get the value attribute of that element 
        // make it the search term for the query
        let queryTopic = $(this).attr("value");
        
        // queryURL for Giphy API
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + queryTopic + "&api_key=FjWs1QzYB8vau7ndQTIg4Mw2ujGoBsUn&limit=10";    
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            // set results to the response data from ajax call
            let results = response.data;
            // create buttons from the data and set the attributes
            for(let i = 0; i < results.length; i++){            
                let gif = $("<img>");
                gif.attr("class", "gif");
                gif.attr("data-state", "still");
                gif.attr("data-still", results[i].images.fixed_height_still.url);  
                gif.attr("data-animate", results[i].images.fixed_height.url);  
                gif.attr("src", results[i].images.fixed_height_still.url);
                // add the gifs to the page
                $("#gifs").prepend(gif);
            }
        });
        
    }
  
    function animateGifs(){
        // toggle the animation on clicking the gifs
        let dataState = $(this).attr("data-state");
        if(dataState === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }else{
            $(this).attr("data-state", "still");
            $(this).attr("src", $(this).attr("data-still"));          
        }        
    };

    // listen for a click on a topic button and make the ajax call to giphy
    $(document).on("click", ".topicButton", getData);
    // listen for clicks on a gif and run animate to start or stop them
    $(document).on("click", ".gif", animateGifs);

});
