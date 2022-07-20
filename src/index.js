


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
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let min= date.getMinutes();
  if (min < 10) {
    min = `0${min}`;
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
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return days[day];
  }
  function displayForecast(response) {
    let forecast=response.data.daily;
    let forecastElement = document.querySelector("#forecast");
  
    
  
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index){
      if (index <6) {

      
      forecastHTML =
        forecastHTML +`<div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max)} ° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
        `;
      }
    });
  
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    
  }
  function getForecast(coordinates) {
    console.log(coordinates);
    let key = "d8d7e4c7bfa89a557e94bf9dd8ee842f";
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=metric`;
    axios.get(url).then(displayForecast);
  }
  
  function getTemperature (response) {
    let temperatureElement=document.querySelector("#temperature")
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
  document.querySelector("#cityName").innerHTML=response.data.name
 document.querySelector("#wind-speed").innerHTML= Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML=response.data.weather[0].description;
  document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector("#icon").setAttribute("src",` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  let iconElement=document.querySelector("#icon");
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  getForecast(response.data.coord);
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
  
  function displayFahrenheitTemperature (event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);

 }; 



  function displayCelsiusTemperature (event) {
  event.preventDefault();
  
  celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(celsiusTemperature);
};

  let celsiusTemperature = null;
  
  
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  
  
  let temperat = document.querySelector("#search-form");
  temperat.addEventListener("submit",cityIn);
  
  
   
  let getPlace = document.querySelector("#current-button");
  getPlace.addEventListener("click", clickOn);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
  
  searchCity("Kharkiv");
  