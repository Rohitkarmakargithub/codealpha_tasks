document.addEventListener('DOMContentLoaded', function () {

    const searchForm = document.getElementById('searchform');
    const cityInput = searchForm.querySelector('.form-control');
    const cityNameElement = document.getElementById('cityName');
    const temperatureElement = document.getElementById('temperature');
    const windSpeedElement = document.getElementById('windSpeed');
    const humidityElement = document.getElementById('humidity');
    const weatherIconElement = document.getElementById('weatherIcon');
    const weatherDescriptionElement = document.getElementById('weatherDescription');
    const weatherCardsDiv = document.querySelector('.weather-cards');
    const API_Key = "115495068226fe03997dc0f26ecfbacb";

    const createWeatherCard = (weatherItem) => {
        const iconStyle = `font-size: 2rem;`; 
        const iconClass = `wi wi-owm-${weatherItem.weatherId}`;
        return `<li class="card card-transparent1">
                    <i class="${iconClass}" style="${iconStyle}"></i>
                    <br>
                    <h6>${weatherItem.date}</h6>
                    <h4>Temp: ${weatherItem.temp} C</h4>
                    <h4>Wind: ${weatherItem.wind} M/S</h4>
                    <h4>Humidity: ${weatherItem.humidity}%</h4>
                </li>`;
    }

    const updateCurrentWeather = (weatherData) => {
        cityNameElement.textContent = weatherData.city;
        temperatureElement.textContent = `Temperature: ${weatherData.temp} C`;
        windSpeedElement.textContent = `Wind: ${weatherData.wind} M/S`;
        humidityElement.textContent = `Humidity: ${weatherData.humidity}%`;
        weatherIconElement.src = `http://openweathermap.org/img/w/${weatherData.icon}.png`;
        weatherDescriptionElement.textContent = weatherData.description;
        document.body.style.backgroundImage = `url('${weatherData.city.toLowerCase()}.jpg')`;
    }

    const getWeatherDetails = (cityName) => {
        const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_Key}`;
        fetch(WEATHER_API_URL)
            .then(res => res.json())
            .then(data => {
                const weatherData = {
                    city: data.name,
                    temp: (data.main.temp - 273.15).toFixed(2),
                    wind: data.wind.speed,
                    humidity: data.main.humidity,
                    icon: data.weather[0].icon,
                    description: data.weather[0].description
                };

                updateCurrentWeather(weatherData);
            })
            .catch(error => {
                console.error("Error fetching current weather data:", error);
                alert("An error occurred while fetching the weather!");
            });

        const WEATHER_FORECAST_API_URL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_Key}`;
        fetch(WEATHER_FORECAST_API_URL)
            .then(res => res.json())
            .then(data => {
                const sevenDayForecast = data.list;

                const formattedForecast = sevenDayForecast.map(forecast => {
                    return {
                        date: forecast.dt_txt.split(" ")[0],
                        temp: (forecast.main.temp - 273.15).toFixed(2),
                        wind: forecast.wind.speed,
                        humidity: forecast.main.humidity,
                        weatherId: forecast.weather[0].id
                    };
                });

             
                const groupedForecast = {};
                formattedForecast.forEach(item => {
                    if (!groupedForecast[item.date]) {
                        groupedForecast[item.date] = item;
                    }
                });
       
                weatherCardsDiv.innerHTML = '';

                const firstSevenDaysForecast = Object.values(groupedForecast).slice(0, 7);

                firstSevenDaysForecast.forEach(weatherItem => {
                    weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(weatherItem));
                });
            })
            .catch(error => {
                console.error("Error fetching weather forecast data:", error);
                alert("An error occurred while fetching the weather forecast!");
            });
    }

    const handleSearch = (event) => {
        event.preventDefault();
        const city_input = cityInput.value.trim();
        if (!city_input)
            return;
        getWeatherDetails(city_input);
    }

    searchForm.addEventListener('submit', handleSearch);

    getWeatherDetails('Bengaluru');

    const homeLink = document.getElementById('homeLink');
    homeLink.addEventListener('click', function(event) {
        event.preventDefault();
        getWeatherDetails('Bengaluru');
    });
});
