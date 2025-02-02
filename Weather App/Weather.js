const apiKey = "48a311e933f3092b02be3d3a4d6e8cd1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search-btn");
const clearBtn = document.querySelector(".clear-btn");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    if (!city.trim()) {
        document.querySelector(".error").innerHTML = "Please enter a valid city name!";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
        document.querySelector(".error").innerHTML = "City not found!";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Weather icons
        const weatherCondition = data.weather[0].main.toLowerCase();
        const iconMap = {
            "clouds": "weather-icons/clouds.png",
            "clear": "weather-icons/clear.png",
            "rain": "weather-icons/rain.png",
            "drizzle": "weather-icons/drizzle.png",
            "mist": "weather-icons/mist.png",
            "thunderstorm": "weather-icons/thunderstorm.png",
            "snow": "weather-icons/snow.png",
            "fog": "weather-icons/fog.png",
            "haze": "weather-icons/haze.png"
        };
        
        weatherIcon.src = iconMap[weatherCondition] || "default-icon.png";

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
    clearBtn.style.display = "block";  // Display clear button after search
});

// Event listener for enter key press in search box
searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
        clearBtn.style.display = "block";  // Display clear button after search
    }

    if (searchBox.value !== "") {
        document.querySelector(".error").style.display = "none";
    }
});

// Event listener for clear button
clearBtn.addEventListener("click", () => {
    searchBox.value = "";
    clearBtn.style.display = "none";
    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "none"; 
});

// Event listener to show/hide clear button based on input in search box
searchBox.addEventListener("input", () => {
    if (searchBox.value !== "") {
        clearBtn.style.display = "block";
    } else {
        clearBtn.style.display = "none";
    }
});
