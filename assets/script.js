var requestedCity = '';
var historyContainerEl = document.querySelector('#history-container')

$('#submitCityBtn').click(function(event) {
    event.preventDefault();
    requestedCity = $('#cityInput').val();
    mainCityCall();
    // var historyCity = document.createElement('a');
    // historyCity.classList = 'list-item flex-row justify-space-between align-center';
    // historyCity.setText('text',;

})

function mainCityCall () {
    fetch('http://api.openweathermap.org/data/2.5//weather?appid=f510236949173fad67a61182bbdd1a37&q='+requestedCity+'&units=imperial')
        .then((response) => {
            return response.json();
    })
        .then(function (myJson) {
            console.log(myJson);
            const {name} = myJson;
            $("#currentCityName").text(name);
            const {dt} = myJson;
            const {timezone} = myJson;
            var adjustedTime = timezone / 60;
            var formattedTime = moment.unix(dt).utc().utcOffset(adjustedTime).format('MM/DD/YYYY');
            $("#cityDateTime").text(formattedTime);
            const {temp} = myJson.main;
            $("#currentTemp").text(temp + "°F");
            const {speed} = myJson.wind;
            $('#currentWindSpeed').text(speed+"km/h");
            const {humidity} = myJson.main;
            $('#currentHumid').text(humidity+"%");
            const {lat} = myJson.coord;
            const {lon} = myJson.coord;
            
            return fetch('https://api.openweathermap.org/data/3.0/onecall?lat='+ lat +'&lon='+ lon +'&exclude=hourly,daily&appid=3ba0433d68e21e81f2e4cb6134abf857');
            
            //waiting for API key to be activated before testing again

        })

        .then(response2 => response2.json())
        console.log(response2)

};

