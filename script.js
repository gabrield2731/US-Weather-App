const API_KEY = config.MY_API_KEY;

// get weather data from specific city
async function getWeather(city) {
  const response = await fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      ",us&APPID=" +
      API_KEY
  );

  const data = await response.json();

  displayWeather(data);
}

// displays weather
function displayWeather(data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity, feels_like } = data.main;
  const { speed } = data.wind;

  document.querySelector(".city").innerText = "Weather in: " + name;
  document.querySelector(".weather__icon").src =
    "http://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector(".temp").innerText =
    Math.round(1.8 * (temp - 273) + 32) + "°F";
  document.querySelector(".description").innerText = description;
  document.querySelector(".wind").innerText = "Wind Speed: " + speed + " mph";
  document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
  document.querySelector(".feels_like").innerText =
    "Feels like: " + Math.round(1.8 * (feels_like - 273) + 32) + "°F";
}

// get the city that the user inputs
function searchWeather() {
  const city = document.querySelector(".search__bar").value;
  getWeather(city);
}

document.querySelector(".search__bar").addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    searchWeather();
  }
});

// Listen for click event on search button
document
  .querySelector(".search__button")
  .addEventListener("click", () => searchWeather());

getWeather("Nashville");
