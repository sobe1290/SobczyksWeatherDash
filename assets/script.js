var requestedCity = '';

$('#submitCityBtn').click(function(event) {
    event.preventDefault();
    requestedCity = $('#cityInput').val();
    mainCityCall();

})

function mainCityCall () {
    fetch('http://api.openweathermap.org/data/2.5//weather?appid=f510236949173fad67a61182bbdd1a37&q='+requestedCity+'&include=uvi&units=imperial')
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



            
});
};

