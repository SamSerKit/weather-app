function showPosition(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    let h1 = document.querySelector("h1");
    h1.innerHTML = `Your latitude is ${position.coords.latitude} and your longitude is ${position.coords.longitude}`;
}

function getCurrentPosition(); {
    navigator.geolocation.getCurrentPosition(showPosition);
}


let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

//successfull code to get current location and then display the current temperature at that location

// STEP TWO
// function that takes current position of user and gets the weather information for that location
// then runs showTemperature function
function showPosition(position) {
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
// get the current location of page user
// then run function "showPosition"
navigator.geolocation.getCurrentPosition(showPosition);


