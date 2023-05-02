const weather_api_key = config.WEATHER_API_KEY;

let weather = {
    "apiKey": weather_api_key,
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&lang=ru&appid="
            + this.apiKey
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data))
    },

    displayWeather: function (data) {
        
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity, pressure } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, speed, temp, humidity, pressure);
        document.querySelector(".city").innerText = `${name}`;
        document.querySelector(".temp").innerText = `${Math.round(temp)}°C`;
        document.querySelector(".description").innerText = `${description}`;
        document.querySelector(".wind").innerText = `Ветер: ${speed} м/с`;
        document.querySelector(".pressure").innerText = `Давление: ${pressure} мм рт.ст.`;
        document.querySelector(".humidity").innerText = `Влажность: ${humidity}%`;
        document.querySelector(".icon").src =`http://openweathermap.org/img/wn/${icon}.png`;

        document.querySelector(".weather").classList.remove("loading");


        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },

    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value)
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather('Moscow');
