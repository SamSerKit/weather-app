// let apiKey = "214cd21ef5b7a8732f19634dcd0aa2e7";
// let city = "Sydney";
// let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

// function showTemperature(response) {
//   let temperature = Math.roung(response.data.main.temp);
//   let temperatureElement = document.querySelector("#temperature");
//   let description = document.querySelector("#temperature-description");
//   temperatureElement.innerHTML = `${temperature}°C`;
//   description.innerHTML = response.data.weather[0].description;
// }

// let h1 = document.querySelector("#city");
// h1.innerHTML = city;

// axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);

// Week 5 Homework
// When a user searches for a city, it should display the name of the city on the result pade and the current temperature of the city

// code to display city name via search function after the user submits the form.
function citySearchUpdate(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let city = document.querySelector("#cityName");
  city.innerHTML = `${input.value}`;
  //let apiKey = "214cd21ef5b7a8732f19634dcd0aa2e7";
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  //axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
let citySearch = document.querySelector("#citySearch");
citySearch.addEventListener("submit", citySearchUpdate);

// Bonus point
// Add a current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display the city and current temperature using the OpenWeather API

// STEP TWO
// function that takes current position of user and gets the weather information for that location
// then runs showTemperature function
function currentPosition(position) {
  let apiKey = "214cd21ef5b7a8732f19634dcd0aa2e7";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

//STEP THREE
// takes weather data from "showPostion" function
// cleans up that data
// and replaces current h1 with selected information
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let temperatureDisplay = document.querySelector("h1");
  temperatureDisplay.innerHTML = `It is currently ${temperature}°C in ${city}.`;
}

// STEP ONE
// listens for button click
// get the current location of page user
// then run function "showPosition"
function getCurrentPosition(); {
    navigator.geolocation.getCurrentPosition(currentPosition);
}

// puts an event listener on the "Current Location" button
// runs getCurrentPosition function when "Current Location" button is clicked
let button = document.querySelector("#currentLocation");
button.addEventListener("click", getCurrentPosition);