var requestedCity = '';
var historyContainerEl = document.querySelector('#history-container')

$('#submitCityBtn').click(function(event) {
    event.preventDefault();
    requestedCity = $('#cityInput').val();
    mainCityCall();
    // var historyCity = document.createElement('a');
    // historyCity.classList = 'list-item flex-row justify-space-between align-center';
    // historyCity.setText('text',;
    

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
            $('#currentWindSpeed').text(speed+"km/h"); 
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
            const {dt} = secondJson.daily[0];
            const {timezone_offset} = secondJson;
            const {icon} = secondJson.daily[0].weather[0]
            var adjustedTime = timezone_offset / 60; 
            var forecastday1 = moment.unix(dt).utc().utcOffset(adjustedTime).format('MM/DD/YYYY');
            $('#forecastDay1').text(forecastday1);
            $('#weatherIconDay1').attr("src",'http://openweathermap.org/img/wn/'+ icon +'.png')
            })();

            (function() {
                const {dt} = secondJson.daily[1];
                const {timezone_offset} = secondJson;
                const {icon} = secondJson.daily[1].weather[0]
                var adjustedTime = timezone_offset / 60; 
                var forecastday2 = moment.unix(dt).utc().utcOffset(adjustedTime).format('MM/DD/YYYY');
                $('#forecastDay2').text(forecastday2);
                $('#weatherIconDay2').attr("src",'http://openweathermap.org/img/wn/'+ icon +'.png')
                })();

            (function() {
                const {dt} = secondJson.daily[2];
                const {timezone_offset} = secondJson;
                const {icon} = secondJson.daily[2].weather[0]
                var adjustedTime = timezone_offset / 60; 
                var forecastday3 = moment.unix(dt).utc().utcOffset(adjustedTime).format('MM/DD/YYYY');
                $('#forecastDay3').text(forecastday3);
                $('#weatherIconDay3').attr("src",'http://openweathermap.org/img/wn/'+ icon +'.png')
                })();

            (function() {
                const {dt} = secondJson.daily[3];
                const {timezone_offset} = secondJson;
                const {icon} = secondJson.daily[3].weather[0]
                var adjustedTime = timezone_offset / 60; 
                var forecastday4 = moment.unix(dt).utc().utcOffset(adjustedTime).format('MM/DD/YYYY');
                $('#forecastDay4').text(forecastday4);
                $('#weatherIconDay4').attr("src",'http://openweathermap.org/img/wn/'+ icon +'.png')
                })();

            (function() {
                const {dt} = secondJson.daily[4];
                const {timezone_offset} = secondJson;
                const {icon} = secondJson.daily[4].weather[0]
                var adjustedTime = timezone_offset / 60; 
                var forecastday5 = moment.unix(dt).utc().utcOffset(adjustedTime).format('MM/DD/YYYY');
                $('#forecastDay5').text(forecastday5);
                $('#weatherIconDay5').attr("src",'http://openweathermap.org/img/wn/'+ icon +'.png')
                })();

        });      

};