const apiKey = "53ad89469f9fa96af07e77e3254c4565";

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const weatherDiv = document.getElementById("weatherResult");
  const errorDiv = document.getElementById("error");

  weatherDiv.innerHTML = "";
  errorDiv.textContent = "";

  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

  try {
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (geoData.length === 0) {
      errorDiv.textContent = "⛔ City not found.";
      return;
    }

    const { lat, lon } = geoData[0];
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    const description = weatherData.weather[0].description;
    const temp = weatherData.main.temp;
    const cityName = weatherData.name;

    weatherDiv.innerHTML = `
      <h3>🏙️ ${cityName}</h3>
      <p><strong>🌡️ Temperature:</strong> ${temp}°C</p>
      <p><strong>☁️ Condition:</strong> ${description}</p>
    `;
  } catch (error) {
    errorDiv.textContent = "⚠️ Error fetching weather data.";
    console.error(error);
  }
}
