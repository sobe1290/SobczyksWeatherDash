var requestedCity = '';

$('#submitCityBtn').click(function(event) {
    event.preventDefault();
    requestedCity = $('#cityInput').val();
    mainCityCall();

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
            console.log(formattedTime);
            $("#cityDateTime").text(formattedTime);

            
});
};

