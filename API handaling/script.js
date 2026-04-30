document.addEventListener("DOMContentLoaded", () => {
  const inputCity = document.getElementById("cityInput");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weatherInfo");
  const cityNameDisplay = document.getElementById("cityName");
  const tempDisplay = document.getElementById("temparature");
  const descriptionDisplay = document.getElementById("description");
  const errorMsg = document.getElementById("errorMassege");

  const API_key = "51bf3532161889a68db26cd92a8180d6";

  getWeatherBtn.addEventListener("click", async () => {
    const cityName = inputCity.value.trim();
    if (cityName === "") return;

    try {
      const weatherData = await fetchWeatherData(cityName);
      displayWeatherData(weatherData);
    } catch (error) {
      diaplayError();
    }
  });

  async function fetchWeatherData(cityName) {
    //get weather data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_key}`;
    const response = await fetch(url)
    console.log(typeof response);
    console.log(response);

    if(!response.ok){
        throw new Error("city name not found"); 
    }
    const data = await response.json() 
    return data
  }



  function displayWeatherData(data) {
  if (data.length === 0) {
    displayError();
    return;
  }

  const { name,weather,main } = data;

  cityNameDisplay.textContent = name;
  tempDisplay.textContent = `Temparature : ${main.temp}`
  descriptionDisplay.textContent = `Weather : ${weather[0].description}`

  weatherInfo.classList.remove("hidden");
  errorMsg.classList.add("hidden");
}

  function diaplayError() {
    weatherInfo.classList.remove("hidden");
    errorMsg.classList.add("hidden");
  }
});
