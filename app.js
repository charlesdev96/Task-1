const express = require("express");
const app = express();
const ip = require("ip");
const axios = require("axios");

// Replace 'YOUR_API_TOKEN' with your actual IPinfo API token
const WEATHER_API = "a951e82e49ff463298a190403240107";

app.get("/api/hello", async (req, res) => {
  const visitorName = req.query.visitor_name || "Visitor";
  const clientIp = ip.address();

  try {
    // Fetch location data based on client's IP address using auto:ip
    const locationResponse = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API}&q=auto:ip`
    );

    const city = locationResponse.data.location.name;

    if (!city) {
      throw new Error("City not found in WeatherAPI response");
    }

    // Get weather data for the city

    const weatherResponse = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API}&q=${city}`
    );
    const temperature = weatherResponse.data.current.temp_c;

    res.json({
      client_ip: clientIp,
      location: city,
      greeting: `Hello, ${visitorName}! The temperature is ${temperature} degrees Celsius in ${city}`,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Unable to fetch location or weather data" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
