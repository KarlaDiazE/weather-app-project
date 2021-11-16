function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp){
  let date = new Date(timestamp *1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

function displayForecast (response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
         <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
         <img
         src="http://openweathermap.org/img/wn/${
           forecastDay.weather[0].icon
         }@2x.png"
         alt=""
         Width="42"
         />
         <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-max"> ${Math.round(
              forecastDay.temp.max
            )}° </span>
            <span class="weather-forecast-temperature-min">${Math.round(
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

function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "250594dd1dfd2f21605c69d6c68a5cd9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  let description = document.querySelector("#temperature-description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#todaysIcon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "250594dd1dfd2f21605c69d6c68a5cd9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

 
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature= null;

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

searchCity("Santiago");
