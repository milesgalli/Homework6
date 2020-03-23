// Define variables

cityForm = $("#city-search");
searchInput = $("#search-input");
weatherBody = $("#weather-body");
currentWeather = $("#current-weather");
historyCard = $("#history-card");
searchHistory = $("#search-history");
forcastSection = $("#forecast-section");
fiveDayDiv = $("#five-day");
searchBtn = $(".btn-primary");
errormsg = $("#error-message");

//$submitbtn= $()

// url and api key

var apiKey = "6213b1d15264822a42b98a5db46ee611";

var currentDate = moment().format("dddd, MMMM Do");

// console.log("hello");
// step 1
// create sumbmit event listener for the search button


cityForm.on("submit", submitListener()){

weatherForcast(userInput);
storeSearchTerms(userInput);
weatherForcast(userInput);

}


listitems.on("click", listLIstener)



cityForm.on("submit", function(event) {
  event.preventDefault();
});

  function AP1 (){

  // Need to collect the user input

  var userInput = searchInput.val();

  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}+&units=imperial+&appid=${apiKey}`;

  // Once the user input, need to take information and use it call the API
  // ajax call api

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    //$weatherBody.text(JSON.stringify(response));

    // console.log(response)

    var name = $("<h1>").text(response.name + currentDate);
    var temprature = $("<div>").text("Temprature:" + response.main.temp + "F");

    var weatherIcon = $("<img>");
    weatherIcon.attr(
      "src",
      "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
    );
    weatherIcon.attr(
      "alt",
      response.weather[0].main + " - " + response.weather[0].description
    );

    //console.log(response.weather[0].icon);

    var humidity = $("<div>").text(response.main.humidity);
    var wind = $("<div>").text(response.wind.speed);

    weatherBody.empty();

    weatherBody.append(name, temprature, humidity, wind, weatherIcon);

    errormsg.removeClass("hide");

    cityCoords = response.coord;

    uvAPI(cityCoords);

    weatherForcast(userInput);

    storeSearchTerms(userInput);
  });



}

function weatherForcast(userInput) {
  var queryURL2 = `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}+&units=imperial+&appid=${apiKey}`;

  $.ajax({
    url: queryURL2,
    method: "GET"
  }).then(function(response) {
    //console.log(response);
    //console.log(response.list);

    fiveDayDiv.empty();

    for (let i = 0; i < response.cnt; i++) {
      var responseRef = response.list[i];

      //console.log(responseRef);
      //console.log(i);

      //get the date of this forcast
      var responseDate = moment(responseRef.dt_txt);
      // console.log(responseDate);
      if (parseInt(responseDate.format("HH")) == 12) {
        var forcastCard = $("<div>").add(
          "card",
          "bg-primary",
          "col-10",
          "col-lg-2",
          "p-0",
          "mx-auto",
          "mt-3"
        );

        var cardBody = $("<div>").add("card-body", "text-light", "p-2");

        var forcastTitle = $("<h5>")
          .add("forcast-title")
          .text(responseDate.format("MM/DD/YYYY"));

        var forcastHumid = $("<div>").text(
          "Humidity:" + responseRef.main.humidity + "%"
        );

        cardBody.append(forcastCard, cardBody, forcastTitle, forcastHumid);

        fiveDayDiv.append(cardBody);
      }
    }
  });
}

function uvAPI(cityCoords) {
  var queryURL3 = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${cityCoords.lat}&lon=${cityCoords.lon}`;

  $.ajax({
    url: queryURL3,
    method: "GET"
  }).then(function(response) {
    // console.log(response.value);

    var uvIndex = $("<div>").text("UV Index:" + response.value);
    weatherBody.append(uvIndex);
  });
}

// create user storage for city coords + user input

// add weather icon to 5 day dislay

// fix search terms

// search History
// store whatever user input does in local storgae
// store to a list so a sidea bar
function addlistItemToSearchHistory (userInput){

  var searchterms = $("<li>").text(userInput);

  searchHistory.append(searchterms);

}


userinputs = localStorage.getItem("search-term");
userinputs = JSON.parse(userinputs);
// when load i load the page, the previous search results are there.
userinputs.forEach(addlistItemToSearchHistory);

function storeSearchTerms(userInput) {
  userinputs.push(userInput);

  //console.log(userinputs);
  
 addlistItemToSearchHistory (userInput); 

  //console.log(userinputs);

  localStorage.setItem("search-term", JSON.stringify(userinputs));
}

// create add event listner for list items 

