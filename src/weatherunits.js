function showFahrenheitTemperature(event) {
  event.preventDefault();
  console.log("Change Temperature Units To Fanrenheit");
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
