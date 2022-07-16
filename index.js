


// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100
//   },
//   moscow: {
//     temp: -5,
//     humidity: 20
//   }
// };

// let city = prompt("Enter a city?");
//  city = city.toLowerCase();
//  if (weather[city] !== undefined) {
//    let temperature = weather[city].temp;
//    let humidity = weather[city].humidity;
//    let celsiusTemperature = Math.round(temperature);
//   let fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32);

//   alert(
//     `It is currently ${celsiusTemperature}°C (${fahrenheitTemperature}°F) in ${city} with a humidity of ${humidity}%`
//   );
// } else {
//    alert(
//      `Sorry we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
//   );
//  }



function formatDate (timestamp) {
let date = new Date (timestamp);
let hours = date.getHours();
if (hours < 10) {
  hours = 0`${hours}`;
}
let min= date.getMinutes();
if (min < 10) {
  min = 0`${min}`;
}

let days = [
"Sun",
"Mon",
"Tue",
"Wed",
"Thu",
"Fri",
"Sat"
];
let dayIndex = date.getDay();
let day = days[dayIndex];

let months = [
"Jan",
"Feb",
"Mar",
"Apr",
"May",
"June",
"July",
"Aug",
"Sep",
"Oct",
"Nov",
"Dec"
];
let month = months[date.getMonth()];

return `${hours}:${min},${day} ${month} `;

}


function getTemperature (response) {
document.querySelector("#temperature").innerHTML=Math.round(response.data.main.temp);
document.querySelector("h2").innerHTML=response.data.name
document.querySelector("#date").innerHTML=formatDate(response.data.dt * 1000);
}


function searchCity(city) {
let key="d8d7e4c7bfa89a557e94bf9dd8ee842f";
let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
axios.get(url).then(getTemperature);
}
function cityIn (event) {
  event.preventDefault();
  let city = document.querySelector("#exampleInputtext1").value; 
searchCity(city);
}

function currentPosition (position) {
let key="d8d7e4c7bfa89a557e94bf9dd8ee842f";
let lon = position.coords.longitude;
let lat= position.coords.latitude;
let url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`; 
axios.get(url).then(getTemperature);
 }

 function clickOn (event) {
  event.preventDefault();
navigator.geolocation.getCurrentPosition(currentPosition);
 }

function fullTempInput (event) {
event.preventDefault();
let celsiusTemperature = document.querySelector("#temperature");
celsiusTemperature.innerHTML =25;
}

function fullTemp (event) {
event.preventDefault();
let fahrenheitTemperature = document.querySelector("#temperature");
fahrenheitTemperature.innerHTML = 77;
}

let dateElement = document.querySelector("h4");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);


let temperat = document.querySelector("#search-form");
temperat.addEventListener("submit",cityIn);


 
let getPlace = document.querySelector("#current-button");
getPlace.addEventListener("click", clickOn)

