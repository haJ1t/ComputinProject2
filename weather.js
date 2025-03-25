document.addEventListener("DOMContentLoaded", () => {
    const weatherResult = document.getElementById("weatherResult");
  
    const API_KEY = "c9be484918aa467eb75143918252503"; // ✅ Your actual WeatherAPI key
  
    if (!navigator.geolocation) {
      weatherResult.innerText = "Geolocation is not supported by your browser.";
      return;
    }
  
    navigator.geolocation.getCurrentPosition(success, error);
  
    function success(position) {
      const { latitude, longitude } = position.coords;
      const query = `${latitude},${longitude}`;
  
      fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}`)
        .then(res => res.json())
        .then(data => {
          const city = data.location.name;
          const temp = data.current.temp_c;
          const humidity = data.current.humidity;
          const wind = data.current.wind_kph;
          const condition = data.current.condition.text;
          const icon = data.current.condition.icon;
  
          let advice = "";
  
          if (condition.toLowerCase().includes("rain")) {
            advice = "🌧️ It's rainy — skip watering today!";
          } else if (temp >= 30) {
            advice = "🔥 Hot weather — water more often and move plants to shade.";
          } else if (temp <= 5) {
            advice = "❄️ Cold weather — bring sensitive plants indoors.";
          } else if (humidity < 40) {
            advice = "💨 Dry air — mist your plants or use a humidifier.";
          } else {
            advice = "🌤️ Great conditions! Keep your regular plant care routine.";
          }
  
          weatherResult.innerHTML = `
            <h3>Weather in ${city}</h3>
            <img src="https:${icon}" alt="${condition}" style="margin-bottom: 10px;">
            <p><strong>Condition:</strong> ${condition}</p>
            <p><strong>Temperature:</strong> ${temp}°C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Wind:</strong> ${wind} kph</p>
            <hr>
            <p><strong>Plant Tip:</strong> ${advice}</p>
          `;
        })
        .catch(err => {
          console.error("Weather API error:", err);
          weatherResult.innerText = "❌ Failed to load weather data.";
        });
    }
  
    function error() {
      weatherResult.innerText = "❌ Unable to access your location.";
    }
  });