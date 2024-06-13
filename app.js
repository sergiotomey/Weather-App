const weatherInfo = document.querySelector(".container");
const forecastTab = document.querySelector('.forecast')
const button = document.querySelector("button");
const input = document.querySelector(".city-name");
const weatherIcon = document.querySelector(".weather-icon");
const cityLabel = document.querySelector('.city-label')
const weatherCondition = document.querySelector(".weather-condition");
const temperature = document.querySelector(".temperature");
const feelsLike = document.querySelector(".feels-like");
const windSpeed = document.querySelector(".wind-speed");
const Humidity = document.querySelector(".humidity");

async function getWeather() {
    forecastTab.classList.remove("hidden");
    const cityName = input.value;
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=8cef33abc08b430faca165944241103&q=${cityName}`,
            { mode: "cors" }
        );
        const data = await response.json();
        const iconData = await getWeatherIcons();
        setWeatherIcon(iconData, data);
        appendData(data);
    } catch (error) {
        console.log(error);
        console.log('Invalid city name')
    }
}

async function getWeatherIcons() {
    try {
        let iconResponse = await fetch(
            "weatherIcons.JSON"
        );
        let iconData = await iconResponse.json();
        return iconData;
    } catch (error) {
        console.log(error);
        console.log("Unable to retrieve weather icons");
        return null;
    }
}

function setWeatherIcon(iconData, data) {
    for (let i = 0; i < iconData.length; i++) {
        if (data.current.condition.code === iconData[i].code) {
            data.current.is_day === 1 ? weatherIcon.src = `day/${iconData[i].icon}.png` : weatherIcon.src = `night/${iconData[i].icon}.png`
            break;
        }
    }
}

function appendData(data) {
    cityLabel.textContent = data.location.name
    weatherCondition.textContent = data.current.condition.text;
    temperature.textContent = data.current.temp_c + "°C";
    feelsLike.textContent = data.current.feelslike_c + "°C";
    windSpeed.textContent = data.current.wind_kph + " KPH";
    Humidity.textContent = data.current.humidity + "%";
}


button.addEventListener("click", getWeather);

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        getWeather();
    }
});
