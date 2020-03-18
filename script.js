// Define variables 

  $cityForm = $("#city-search"); 
  $searchInput = $("#search-input");
  $weatherBody = $("#weather-body"); 
  $currentWeather = $("#current-weather"); 
  $historyCard = $("#history-card"); 
  $searchHistory = $("search-history"); 
  $forcastSection = $("#forecast-section"); 
  $fiveDayDiv = $("#five-day"); 
  $searchBtn = $(".btn-primary"); 
  //$submitbtn= $()

// url and api key 


var apiKey = "6213b1d15264822a42b98a5db46ee611"; 



// step 1
// create sumbmit event listener for the search button 

$cityForm.on("submit", function(event){

  event.preventDefault();

  var userInput = $searchInput.val();
  
  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid=${apiKey}`
  
  
// Need to collect the user input

// Once the user input, need to take information and use it call the API 
// ajax call api


  $.ajax({
    url:queryURL,
    method: 'GET',         
    }).then(function(response){ 

    // $('..').JSON.stringify(response)  
      console.log(response);
  });

// extract the data from this api and add to html. 



})
