

function mainCityCall () {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=47.43&lon=-122.10&appid=f510236949173fad67a61182bbdd1a37')
        .then((response) => {
            return response.json();
    })
        .then((myJson) => {
            console.log(myJson);
    });
};

mainCityCall();