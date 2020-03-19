// Define variables 

  cityForm = $("#city-search"); 
  searchInput = $("#search-input");
  weatherBody = $("#weather-body"); 
  currentWeather = $("#current-weather"); 
  historyCard = $("#history-card"); 
  searchHistory = $("search-history"); 
  forcastSection = $("#forecast-section"); 
  fiveDayDiv = $("#five-day"); 
  searchBtn = $(".btn-primary"); 
  errormsg = $("#error-message")

  
  //$submitbtn= $()

// url and api key 

    var apiKey = "6213b1d15264822a42b98a5db46ee611"; 

    var currentDate = moment().format("dddd, MMMM Do");

     // console.log("hello");
    // step 1
    // create sumbmit event listener for the search button 

    cityForm.on("submit", function(event){

      event.preventDefault();

      // Need to collect the user input

      var userInput = searchInput.val();
      
      var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apiKey}`
      
// Once the user input, need to take information and use it call the API 
// ajax call api

  $.ajax({
    url:queryURL,
    method: 'GET',         
    }).then(function(response){ 

      //$weatherBody.text(JSON.stringify(response)); 
     
      // console.log(response)

      //var weatherIcon = $("<img>", src= "https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png")
      var name = $("<h1>").text(response.name +currentDate )
      var temprature = $("<div>").text( "Temprature:"+ response.main.temp +"F")
      var humidity = $("<div>").text(response.main.humidity)
      var wind = $("<div>").text(response.wind.speed)
      
      weatherBody.append(name,temprature,humidity, wind);

      errormsg.addClass("hide"); 
 
      weatherForcast(userInput);

  })




// create local storgae for search history 

})


function weatherForcast (userInput){

  var queryURL2= `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid=${apiKey}`
                     

 $.ajax({
   url:queryURL2,    
   method: 'GET',  

   }).then(function(response){ 
 
    //console.log(response);
     //console.log(response.list);

   for(let i = 0; i <response.cnt; i++){
     var responseRef = response.list[i]; 


     //console.log(responseRef);
     //console.log(i);

     //get the date of this forcast 
     var responseDate = moment(responseRef.dt_txt);
    // console.log(responseDate);
     if(parseInt(responseDate.format("HH"))== 12){

        var forcastCard = $("<div>").add("card", "bg-primary", "col-10", "col-lg-2", "p-0", "mx-auto", "mt-3");

        var cardBody = $("<div>").add("card-body", "text-light", "p-2"); 

        var forcastTitle = $("<h5>").add("forcast-title").text(responseDate.format('MM/DD/YYYY')); 

        var forcastTemp = $("<div>").text("Temp:"+ responseRef.main.temp+ "C"); 

        var forcastHumid = $("<div>").text("Humidity:"+ responseRef.main.humidity+ "%"); 

        cardBody.append(forcastCard,cardBody, forcastTitle, forcastTemp,forcastHumid)

        fiveDayDiv.append(cardBody);


     }

   }
   
    })
 };

//`https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid=${apiKey}`





// function uvAPI(){
//   var userInput = searchInput.val();

// }


// function displayCurrentUV(response){
//   var weatherUV = $("<div>"); 
//   var weatherUV.text
// }