var requestedCity = '';
var historyContainerEl = document.querySelector('#history-container');
$('#history-containger li:gt(7)').remove();

$('#submitCityBtn').click(function(event) {
    event.preventDefault();
    requestedCity = $('#cityInput').val();
    mainCityCall();
    var historyCity = document.createElement('li');
    historyCity.textContent = $('#cityInput').val();
    historyContainerEl.appendChild(historyCity);
    if (historyContainerEl.children.length >= 10) {
        historyContainerEl.removeChild(historyContainerEl.firstElementChild);
      };
    
    

});

function mainCityCall () {
    fetch('http://api.openweathermap.org/data/2.5//weather?appid=f510236949173fad67a61182bbdd1a37&q='+requestedCity+'&units=imperial')
        .then((response) => {
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson);       
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

            //console.log(moment(formattedTime, "MM/DD/YYYY").add(1, 'days'));       
            return secondCityCall(lat, lon)
        });
};

function secondCityCall (lat, lon) {
    fetch('http://api.openweathermap.org/data/2.5/onecall?appid=f510236949173fad67a61182bbdd1a37&lat='+ lat +'&lon='+ lon +'&exclude=hourly,minutely&units=imperial')
        .then((response) => {
            return response.json();
        })
        .then(function (secondJson) {
            console.log(secondJson); 
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