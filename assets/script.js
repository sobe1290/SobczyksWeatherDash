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
            $('#weatherIcon').attr("src",'http://openweathermap.org/img/wn/'+ icon +'.png')         
            return secondCityCall(lat, lon)
        });
};

function secondCityCall (lat, lon) {
    fetch('http://api.openweathermap.org/data/2.5/onecall?appid=f510236949173fad67a61182bbdd1a37&lat='+ lat +'&lon='+ lon +'&exclude=hourly')
        .then((response) => {
            return response.json();
        })
        .then(function (secondJson) {
            console.log(secondJson); 
            const {uvi} = secondJson.current;
            $('#currentUV').text(uvi);
        });       
};