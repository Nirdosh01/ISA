const apikey = "fa32fdfacc64f4d279a1c2582fd3f06b";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");

let city = "greenville";

async function checkWeather(city){
    if (document.querySelector(".error").style.display == "block") {
        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }

    const response = await fetch(apiurl + city + `&appid=${apikey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
        var data = await response.json();

    console.log(data);

    const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
    document.querySelector(".date").innerHTML = new Date().toLocaleDateString('en-US', options);

    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&deg;C";
    document.querySelector(".city").innerHTML = data.name + ", " + data.sys.country;
    document.querySelector(".pressure").innerHTML = "Pressure - " + data.main.pressure;
    document.querySelector(".humidity").innerHTML = "Humidity - " + data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = "Wind Speed - " + data.wind.speed + " Km/h";
    document.querySelector(".icon-name").innerHTML = data.weather[0].description;

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "img/clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "img/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "img/rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "img/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "img/mist.png";
    }
    document.querySelector(".error").style.display = "none";
    }  
}

checkWeather(city);

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})









