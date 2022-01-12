// code to run the updating of weather data
// takes user submited city and inputs to the "search" function
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

// call current weather data for selected city
function search(city) {
  let apiKey = "214cd21ef5b7a8732f19634dcd0aa2e7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

// displays weather data for selected city
function showTemperature(response) {
  console.log(response.data);
  // display current temperature on page
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#currentTemp").innerHTML =
    Math.round(celsiusTemperature);

  // display city name on page
  document.querySelector("#cityName").innerHTML = response.data.name;

  // display current weather description
  document.querySelector("#weatherDescribed").innerHTML =
    response.data.weather[0].main;

  // display today's minimum temperature
  /* document.querySelector("#todayMin").innerHTML = Math.round(
    response.data.main.temp_min
  ); */

  // display today's maximum temperature
  /* document.querySelector("#todayMax").innerHTML = Math.round(
    response.data.main.temp_max
  ); */

  // display feels like temperature
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );

  // display current wind speed
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  // display correct weather icon for location and have correct alt text for img
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#weather-icon")
    .setAttribute("alt", response.data.weather[0].description);

  // Send coordinates to forecast function
  getForecast(response.data.coord);
}

// Get Forecast Data

function getForecast(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;

  let apiKey = "214cd21ef5b7a8732f19634dcd0aa2e7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showForecast);
}

// show forecast data

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row forecast">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
              <ul>
                <li><img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="" width="42" /></li>
                <li><span>${Math.round(forecastDay.temp.max)}°c / ${Math.round(
          forecastDay.temp.min
        )}°c</span></li>
                <li><span>${formatDay(forecastDay.dt)}</span></li>
              </ul>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// format date
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

// listening for user submissionn of city to display weather for
let citySearch = document.querySelector("#citySearch");
citySearch.addEventListener("submit", handleSubmit);

// requests current location of user and gets weather information for that location
function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "214cd21ef5b7a8732f19634dcd0aa2e7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

// prompts for user location data
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

// listening for user click of "Current Location" button
let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentPosition);

// Update displayed Temperature Units
function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  document.querySelector("#currentTemp").innerHTML = Math.round(
    fahrenheitTemperature
  );
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#currentTemp").innerHTML =
    Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);

// pre selected city so live data loads to page on opening, rather than waiting for user input
search("Melbourne");
