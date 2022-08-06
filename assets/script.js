var requestedCity = '';

$('#submitCityBtn').click(function(event) {
    event.preventDefault();
    requestedCity = $('#cityInput').val();
    mainCityCall()
})

function mainCityCall () {
    fetch('http://api.openweathermap.org/data/2.5//weather?appid=f510236949173fad67a61182bbdd1a37&q='+requestedCity+'&units=imperial')
        .then((response) => {
            return response.json();
    })
        .then((myJson) => {
            console.log(myJson);
    });
};


//

// https://api.openweathermap.org/data/2.5/onecall?lat=47.43&lon=-122.10&exclude=hourly,minutely&appid=f510236949173fad67a61182bbdd1a37&units=imperial