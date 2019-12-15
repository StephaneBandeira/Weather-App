//Select element
const notificationElement = document.querySelector(".notification p");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location");

// API Key
const key = "82005d27a116c2880c8f0fcb866998a0";

// App data

const weather = {};

weather.temperature = {
  unit: "celcius"
};

// Check if supports geolocation
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  showError();
}

// Set user's location
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude, longitude);
}

// Show error if any
function showError() {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser does not support geolocation</p>";
}

// From Api provider
function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  fetch(api)
    .then(function(response) {
      let data = response.json();
      return data;
    })
    .then(function(data) {
      weather.temperature.value = data.main.temp;
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function() {
      displayWeather();
    });
}

function displayWeather() {
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png">`;
  tempElement.innerHTML = `${weather.temperature.value}º <span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}
