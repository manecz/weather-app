/*
Simple Weather App
*/

const KEY = 'your_key';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?`;
const weather = [];

//Dom Manipulation
const button = document.querySelector('#get');
const search = document.querySelector('#search');

button.addEventListener('click', (e)=> {
    e.preventDefault();
    (search.value)? getWeather(null, null, null, search.value).then(processor) : false
    //reset input
    search.value = '';
    
});

getWeather = async (type, lat, lon, city) => {
    let search = (type == 'coords')? `lat=${lat}&lon=${lon}` : `q=${city}`;
    let response = await fetch(API_URL + search + KEY);
    let data = await response.json();
    return data;
}

processor = (data) => {
    let date = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Out', 'Nov', 'Dec'];
    weather.temperature = Math.round(data.main.temp) + 'º';
    weather.min_temp = 'Min. ' + Math.round(data.main.temp_min) + 'º';
    weather.max_temp = 'Max. ' + Math.round(data.main.temp_max) + 'º';
    weather.wind = 'Wind ' + data.wind.speed + 'km/h';
    weather.city = data.name;
    weather.icon = data.weather[0].icon;
    weather.description = data.weather[0].description;
    weather.humidity = 'Humidity ' + data.main.humidity + '%';
    weather.date = date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
    console.log(data);

    for (const value in weather) {
        document.getElementById(value).innerHTML = weather[value];
        (value == 'icon')?document.getElementById(value).src = 'images/' + weather[value] + '.png' : false;
    }

}

//getWeather(null, null, null, 'Porto').then(data => console.log(data));


navigator.geolocation.getCurrentPosition(
    position => {getWeather('coords', position.coords.latitude, position.coords.longitude, null).then(processor)},
    (() => {console.log('error')})()
);
