var requestedCity = '';
let history = [];
var historyContainerEl = document.querySelector('#history-container');
loadHistory();



$('#submitCityBtn').click(function(event) {
    event.preventDefault();
    requestedCity = $('#cityInput').val();
    mainCityCall();
    history.push(requestedCity);
    console.log(history);
    localStorage.setItem("Searched Cities", JSON.stringify(history));
    getSearchedCities();

});

function mainCityCall () {
    fetch('http://api.openweathermap.org/data/2.5//weather?appid=f510236949173fad67a61182bbdd1a37&q='+requestedCity+'&units=imperial')
        .then((response) => {
            return response.json();
        })
        .then(function (myJson) {       
            const {name} = myJson;            
            const {dt} = myJson;
            const {timezone} = myJson;
            var adjustedTime = timezone / 60; 
            var formattedTime = moment.unix(dt).utc().utcOffset(adjustedTime).format('MM/DD/YYYY');          
            const {temp} = myJson.main;
            const {speed} = myJson.wind;
            const {humidity} = myJson.main;
            const {lat} = myJson.coord;
            const {lon} = myJson.coord; 
            const {icon} = myJson.weather[0]
            $('#currentHumid').text(humidity+"%");
            $("#currentCityName").text(name);
            $("#cityDateTime").text(formattedTime);
            $("#currentTemp").text(temp + "°F");
            $('#currentWindSpeed').text(speed+" MPH"); 
            $('#weatherIcon').attr("src",'http://openweathermap.org/img/wn/'+ icon +'.png') ;      
            return secondCityCall(lat, lon)
        });
};

function secondCityCall (lat, lon) {
    fetch('http://api.openweathermap.org/data/2.5/onecall?appid=f510236949173fad67a61182bbdd1a37&lat='+ lat +'&lon='+ lon +'&exclude=hourly,minutely&units=imperial')
        .then((response) => {
            return response.json();
        })
        .then(function (secondJson) { 
            const {uvi} = secondJson.current;
            $('#currentUV').text(uvi);
            if (~~($('#currentUV').text()) < 2) {
                $('#currentUV').attr('class','ms-1 favorableUV')
            } 
            else if (~~($('#currentUV').text()) >= 2 && ~~($('#currentUV').text()) <= 8 ) {
                $('#currentUV').attr('class','ms-1 moderateUV')
            }
            else if (~~($('#currentUV').text()) > 7) {
                $('#currentUV').attr('class','ms-1 severeUV')
            };

            (function() {
            const {dt} = secondJson.daily[1];
            const {timezone_offset} = secondJson;
            const {icon} = secondJson.daily[1].weather[0];
            const {day} = secondJson.daily[1].temp;
            const {wind_speed} = secondJson.daily[1];
            const {humidity} = secondJson.daily[1];
            var adjustedTime = timezone_offset / 60; 
            var forecastday1 = moment.unix(dt).utc().utcOffset(adjustedTime).format('MM/DD/YYYY');
            $('#forecastDay1').text(forecastday1);
            $('#weatherIconDay1').attr("src",'http://openweathermap.org/img/wn/'+ icon +'.png');
            $("#day1Temp").text("Temp: "+ day + "°F");
            $('#day1WindSpeed').text("Wind Speed: "+ wind_speed +" MPH"); 
            $('#day1Humid').text("Humidity: "+ humidity +"%");
            })();

            (function() {
                const {dt} = secondJson.daily[2];
                const {timezone_offset} = secondJson;
                const {icon} = secondJson.daily[2].weather[0];
                const {day} = secondJson.daily[2].temp;
                const {wind_speed} = secondJson.daily[2];
                const {humidity} = secondJson.daily[2];
                var adjustedTime = timezone_offset / 60; 
                var forecastday2 = moment.unix(dt).utc().utcOffset(adjustedTime).format('MM/DD/YYYY');
                $('#forecastDay2').text(forecastday2);
                $('#weatherIconDay2').attr("src",'http://openweathermap.org/img/wn/'+ icon +'.png');
                $("#day2Temp").text("Temp: "+ day + "°F");
                $('#day2WindSpeed').text("Wind Speed: "+ wind_speed +" MPH");
                $('#day2Humid').text("Humidity: "+ humidity +"%");
                })();

            (function() {
                const {dt} = secondJson.daily[3];
                const {timezone_offset} = secondJson;
                const {icon} = secondJson.daily[3].weather[0];
                const {day} = secondJson.daily[3].temp;
                const {wind_speed} = secondJson.daily[3];
                const {humidity} = secondJson.daily[3];
                var adjustedTime = timezone_offset / 60; 
                var forecastday3 = moment.unix(dt).utc().utcOffset(adjustedTime).format('MM/DD/YYYY');
                $('#forecastDay3').text(forecastday3);
                $('#weatherIconDay3').attr("src",'http://openweathermap.org/img/wn/'+ icon +'.png');
                $("#day3Temp").text("Temp: "+ day + "°F");
                $('#day3WindSpeed').text("Wind Speed: "+ wind_speed +" MPH");
                $('#day3Humid').text("Humidity: "+ humidity +"%");
                })();

            (function() {
                const {dt} = secondJson.daily[4];
                const {timezone_offset} = secondJson;
                const {icon} = secondJson.daily[4].weather[0];
                const {day} = secondJson.daily[4].temp;
                const {wind_speed} = secondJson.daily[4];
                const {humidity} = secondJson.daily[4];
                var adjustedTime = timezone_offset / 60; 
                var forecastday4 = moment.unix(dt).utc().utcOffset(adjustedTime).format('MM/DD/YYYY');
                $('#forecastDay4').text(forecastday4);
                $('#weatherIconDay4').attr("src",'http://openweathermap.org/img/wn/'+ icon +'.png');
                $("#day4Temp").text("Temp: "+ day + "°F");
                $('#day4WindSpeed').text("Wind Speed: "+ wind_speed +" MPH");
                $('#day4Humid').text("Humidity: "+ humidity +"%");
                })();

            (function() {
                const {dt} = secondJson.daily[5];
                const {timezone_offset} = secondJson;
                const {icon} = secondJson.daily[5].weather[0];
                const {day} = secondJson.daily[5].temp;
                const {wind_speed} = secondJson.daily[5];
                const {humidity} = secondJson.daily[5];
                var adjustedTime = timezone_offset / 60; 
                var forecastday5 = moment.unix(dt).utc().utcOffset(adjustedTime).format('MM/DD/YYYY');
                $('#forecastDay5').text(forecastday5);
                $('#weatherIconDay5').attr("src",'http://openweathermap.org/img/wn/'+ icon +'.png');
                $("#day5Temp").text("Temp: "+ day + "°F");
                $('#day5WindSpeed').text("Wind Speed: "+ wind_speed +" MPH");
                $('#day5Humid').text("Humidity: "+ humidity +"%");
                })();

        });      

};

function getSearchedCities() {
    var savedCities = localStorage.getItem('Searched Cities');
    if (savedCities) {
      savedCities = JSON.parse(savedCities);
    }
    historyContainerEl.innerHTML = '';

    for (var i = savedCities.length - 1; i >= 0; i--) {
        var btn = document.createElement('button');
        btn.setAttribute('type', 'button');        
        btn.textContent = savedCities[i];
        btn.setAttribute('data-search', savedCities[i]);
        historyContainerEl.append(btn);
    
  };
};

historyContainerEl.addEventListener('click', buttonCityCall);

function buttonCityCall(event) {
   
    var btn = event.target;
    var btnName = btn.getAttribute('data-search');
    mainHistoryCityCall(btnName);
    secondHistoryCityCall;

   

  };
  

function mainHistoryCityCall (btnName) {
    fetch('http://api.openweathermap.org/data/2.5//weather?appid=f510236949173fad67a61182bbdd1a37&q='+ btnName +'&units=imperial')
        .then((response) => {
            return response.json();
        })
        .then(function (myJson) {       
            const {name} = myJson;            
            const {dt} = myJson;
            const {timezone} = myJson;
            var adjustedTime = timezone / 60; 
            var formattedTime = moment.unix(dt).utc().utcOffset(adjustedTime).format('MM/DD/YYYY');          
            const {temp} = myJson.main;
            const {speed} = myJson.wind;
            const {humidity} = myJson.main;
            const {lat} = myJson.coord;
            const {lon} = myJson.coord; 
            const {icon} = myJson.weather[0]
            $('#currentHumid').text(humidity+"%");
            $("#currentCityName").text(name);
            $("#cityDateTime").text(formattedTime);
            $("#currentTemp").text(temp + "°F");
            $('#currentWindSpeed').text(speed+" MPH"); 
            $('#weatherIcon').attr("src",'http://openweathermap.org/img/wn/'+ icon +'.png') ;     
            return secondHistoryCityCall(lat, lon)
        });
};

function secondHistoryCityCall (lat, lon) {
    fetch('http://api.openweathermap.org/data/2.5/onecall?appid=f510236949173fad67a61182bbdd1a37&lat='+ lat +'&lon='+ lon +'&exclude=hourly,minutely&units=imperial')
        .then((response) => {
            return response.json();
        })
        .then(function (secondJson) {
            const {uvi} = secondJson.current;
            $('#currentUV').text(uvi);
            if (~~($('#currentUV').text()) < 2) {
                $('#currentUV').attr('class','ms-1 favorableUV')
            } 
            else if (~~($('#currentUV').text()) >= 2 && ~~($('#currentUV').text()) <= 8 ) {
                $('#currentUV').attr('class','ms-1 moderateUV')
            }
            else if (~~($('#currentUV').text()) > 7) {
                $('#currentUV').attr('class','ms-1 severeUV')
            };

            (function() {
            const {dt} = secondJson.daily[1];
            const {timezone_offset} = secondJson;
            const {icon} = secondJson.daily[1].weather[0];
            const {day} = secondJson.daily[1].temp;
            const {wind_speed} = secondJson.daily[1];
            const {humidity} = secondJson.daily[1];
            var adjustedTime = timezone_offset / 60; 
            var forecastday1 = moment.unix(dt).utc().utcOffset(adjustedTime).format('MM/DD/YYYY');
            $('#forecastDay1').text(forecastday1);
            $('#weatherIconDay1').attr("src",'http://openweathermap.org/img/wn/'+ icon +'.png');
            $("#day1Temp").text("Temp: "+ day + "°F");
            $('#day1WindSpeed').text("Wind Speed: "+ wind_speed +" MPH"); 
            $('#day1Humid').text("Humidity: "+ humidity +"%");
            })();

            (function() {
                const {dt} = secondJson.daily[2];
                const {timezone_offset} = secondJson;
                const {icon} = secondJson.daily[2].weather[0];
                const {day} = secondJson.daily[2].temp;
                const {wind_speed} = secondJson.daily[2];
                const {humidity} = secondJson.daily[2];
                var adjustedTime = timezone_offset / 60; 
                var forecastday2 = moment.unix(dt).utc().utcOffset(adjustedTime).format('MM/DD/YYYY');
                $('#forecastDay2').text(forecastday2);
                $('#weatherIconDay2').attr("src",'http://openweathermap.org/img/wn/'+ icon +'.png');
                $("#day2Temp").text("Temp: "+ day + "°F");
                $('#day2WindSpeed').text("Wind Speed: "+ wind_speed +" MPH");
                $('#day2Humid').text("Humidity: "+ humidity +"%");
                })();

            (function() {
                const {dt} = secondJson.daily[3];
                const {timezone_offset} = secondJson;
                const {icon} = secondJson.daily[3].weather[0];
                const {day} = secondJson.daily[3].temp;
                const {wind_speed} = secondJson.daily[3];
                const {humidity} = secondJson.daily[3];
                var adjustedTime = timezone_offset / 60; 
                var forecastday3 = moment.unix(dt).utc().utcOffset(adjustedTime).format('MM/DD/YYYY');
                $('#forecastDay3').text(forecastday3);
                $('#weatherIconDay3').attr("src",'http://openweathermap.org/img/wn/'+ icon +'.png');
                $("#day3Temp").text("Temp: "+ day + "°F");
                $('#day3WindSpeed').text("Wind Speed: "+ wind_speed +" MPH");
                $('#day3Humid').text("Humidity: "+ humidity +"%");
                })();

            (function() {
                const {dt} = secondJson.daily[4];
                const {timezone_offset} = secondJson;
                const {icon} = secondJson.daily[4].weather[0];
                const {day} = secondJson.daily[4].temp;
                const {wind_speed} = secondJson.daily[4];
                const {humidity} = secondJson.daily[4];
                var adjustedTime = timezone_offset / 60; 
                var forecastday4 = moment.unix(dt).utc().utcOffset(adjustedTime).format('MM/DD/YYYY');
                $('#forecastDay4').text(forecastday4);
                $('#weatherIconDay4').attr("src",'http://openweathermap.org/img/wn/'+ icon +'.png');
                $("#day4Temp").text("Temp: "+ day + "°F");
                $('#day4WindSpeed').text("Wind Speed: "+ wind_speed +" MPH");
                $('#day4Humid').text("Humidity: "+ humidity +"%");
                })();

            (function() {
                const {dt} = secondJson.daily[5];
                const {timezone_offset} = secondJson;
                const {icon} = secondJson.daily[5].weather[0];
                const {day} = secondJson.daily[5].temp;
                const {wind_speed} = secondJson.daily[5];
                const {humidity} = secondJson.daily[5];
                var adjustedTime = timezone_offset / 60; 
                var forecastday5 = moment.unix(dt).utc().utcOffset(adjustedTime).format('MM/DD/YYYY');
                $('#forecastDay5').text(forecastday5);
                $('#weatherIconDay5').attr("src",'http://openweathermap.org/img/wn/'+ icon +'.png');
                $("#day5Temp").text("Temp: "+ day + "°F");
                $('#day5WindSpeed').text("Wind Speed: "+ wind_speed +" MPH");
                $('#day5Humid').text("Humidity: "+ humidity +"%");
                })();

        });      

};

function loadHistory () {
    var savedCities = localStorage.getItem('Searched Cities');
    if (savedCities) {
      savedCities = JSON.parse(savedCities);
      historyContainerEl.innerHTML = '';

    for (var i = savedCities.length - 1; i >= 0; i--) {
        var btn = document.createElement('button');
        btn.setAttribute('type', 'button');        
        btn.textContent = savedCities[i];
        btn.setAttribute('data-search', savedCities[i]);
        historyContainerEl.append(btn);

    }
    } else return;
};