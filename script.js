// Define variables
// put var
$(document).ready(function() {
  var cityForm = $("#city-search");
  var searchInput = $("#search-input");
  var weatherBody = $("#weather-body");
  var currentWeather = $("#current-weather");
  var historyCard = $("#history-card");
  var searchHistory = $("#search-history");
  var forcastSection = $("#forecast-section");
  var fiveDayDiv = $("#five-day");
  var searchBtn = $(".btn-primary");
  var errormsg = $("#error-message");
  //listItems = $(".list-group.list-group-flush")

  // api key

  var apiKey = "6213b1d15264822a42b98a5db46ee611";

  // momnet.js

  var currentDate = moment().format("dddd, MMMM Do");

  // define event listeners for previous search terms and search  bar

  cityForm.on("submit", function(event) {
    event.preventDefault();
    
    var userInput = searchInput.val();
 

    todayweatherforcast(userInput);
    storeSearchTerms(userInput);

    //addlistItemToSearchHistory(userInput);
  });

  function todayweatherforcast(location) {
    // Need to collect the user input

    // query URL

    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}+&units=imperial+&appid=${apiKey}`;

    // Weather forcast AJAX call

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      //$weatherBody.text(JSON.stringify(response));
      // console.log(response)
      // define variables, use reponse to add necessary data to weather body
      var name = $("<h1>").text(response.name + " "+ currentDate);
      var temprature = $("<div>").text(
        "Temprature:" + " " + response.main.temp + "F"
      );

      var weatherIcon = $("<img>");
      weatherIcon.attr("src","https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
      );
      weatherIcon.attr("alt",response.weather[0].main + " - " + response.weather[0].description
      );

      //console.log(response.weather[0].icon);

      var humidity = $("<div>").text("Humidity:"+ " " + response.main.humidity);
      var wind = $("<div>").text("wind Speed:"+ " " + response.wind.speed);

      // clear weatherbody before appending new varibles to the DOM
      weatherBody.empty();
      // append new items to the DOM
      weatherBody.append(name, temprature, humidity, wind, weatherIcon);

      errormsg.hide();

      // Need coordinates from weather forcast API to use the UV api
      cityCoords = response.coord;
      // calling necessary functions after the first event listener
      calluvindex(cityCoords);

      call5dayforcast(location);

    });
  }

  // 5 day forcast API call

  function call5dayforcast(userInput) {
    var queryURL2 = `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}+&units=imperial+&appid=${apiKey}`;

    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(function(response) {
      //console.log(response);
      //console.log(response.list);

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

          var forcastTitle = $("<h5>").add("forcast-title").text(responseDate.format("MM/DD/YYYY"));

          var forcastTemp = $("<div>").text("Temp:" + responseRef.main.temp + "C");

          var forcastHumid = $("<div>").text("Humidity:" + responseRef.main.humidity + "%"
          );

          cardBody.append(forcastCard, cardBody,forcastTitle,forcastTemp,forcastHumid);

          fiveDayDiv.append(cardBody);
        }
      }
    });
  }

  // UV API AJAX call
  function calluvindex(cityCoords) {
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

  // search term function
  function addlistItemToSearchHistory(userInput) {

    
console.log(userInput);

    var searchterms = $("<li>").text(userInput);
    searchterms.attr("class", "search-list-item");

    searchterms.on("click", function(event) {
      event.preventDefault();
      var location = $(this).text();
      console.log(location);

      // once a click on list item it changes the weather to that city
      todayweatherforcast(location);
    });

    searchHistory.append(searchterms);
  }

  // save user inputs to local storage
  userinputs = localStorage.getItem("search-term");
  userinputs = JSON.parse(userinputs);
  if (userinputs === null) {
    userinputs = [];
  }
  //console.log(userinputs);

  // when page loads, the previous search results are there.
  userinputs.forEach(addlistItemToSearchHistory);

  function storeSearchTerms(userInput) {
    userinputs.push(userInput);

    //console.log(userinputs);

    addlistItemToSearchHistory(userInput);

    //console.log(userinputs);

    localStorage.setItem("search-term", JSON.stringify(userinputs));
  }

  // create add event listner for list items
});
