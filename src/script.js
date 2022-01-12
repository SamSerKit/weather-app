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
  // display current temperature on page
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  // display city name on page
  document.querySelector("#cityName").innerHTML = response.data.name;

  // display current weather description
  document.querySelector("#weatherDescribed").innerHTML =
    response.data.weather[0].main;

  // display today's minimum temperature
  document.querySelector("#todayMin").innerHTML = Math.round(
    response.data.main.temp_min
  );

  // display today's maximum temperature
  document.querySelector("#todayMax").innerHTML = Math.round(
    response.data.main.temp_max
  );

  // display feels like temperature
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );

  // display correct weather icon for location
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

// listening for user submissionn of city to display weather for
let citySearch = document.querySelector("#citySearch");
citySearch.addEventListener("submit", handleSubmit);

// pre selected city so live data loads to page on opening, rather than waiting for user input
search("Melbourne");

// requests current location of user and gets weather information for that location
function currentPosition(position) {
  let apiKey = "214cd21ef5b7a8732f19634dcd0aa2e7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

// prompts for user location data
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

// listening for user click of "Current Location" button
let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentPosition);
