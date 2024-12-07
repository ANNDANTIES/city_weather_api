document.getElementById('weatherForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const country = document.getElementById('country').value.trim();
    const apiKey = 'a6ecfdf42b26c97453fa1461c9cf440f'; // Replace with your OpenWeather API key
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Loading...';
  
    try {
      // Get cities in the country using the Geocoding API
      const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${country}&limit=5&appid=${apiKey}`);
      const geoData = await geoResponse.json();
  
      if (!geoData.length) {
        resultDiv.innerHTML = 'No cities found for the given country.';
        return;
      }
  
      // Use the first city's coordinates to fetch the weather
      const { lat, lon, name } = geoData[0];
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
      const weatherData = await weatherResponse.json();
  
      // Display weather information
      resultDiv.innerHTML = `
        <h2>Weather in ${name}, ${country}</h2>
        <p>Temperature: ${weatherData.main.temp}°C</p>
        <p>Weather: ${weatherData.weather[0].description}</p>
        <p>Humidity: ${weatherData.main.humidity}%</p>
        <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
      `;
    } catch (error) {
      console.error(error);
      resultDiv.innerHTML = 'An error occurred while fetching weather data.';
    }
  });
  