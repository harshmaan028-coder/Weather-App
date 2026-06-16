import "./style.css";

let map;

const mapContainer = document.getElementById("map");

if (mapContainer) {
    map = L.map("map").setView([13.0827, 80.2707], 10);

    L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "&copy; OpenStreetMap"
        }
    ).addTo(map);

    window.addEventListener("load", () => {
        map.invalidateSize();
    });
}

function setGaugeValue(value) {
    value = Math.max(0, Math.min(100, value));

    const fill = document.querySelector(".gauge-fill");
    const indicator = document.querySelector(".gauge-indicator");

    if (!fill || !indicator) return;

    fill.style.height = `${value}%`;
    indicator.textContent = `${value}%`;
}

setGaugeValue(24);

class ForecastCard {

    constructor() {

        this.line = document.getElementById("line");
        this.area = document.getElementById("area");
        this.points = document.getElementById("points");
        this.timeline = document.getElementById("timeline");
        this.tooltip = document.getElementById("tooltip");
        this.currentTemp = document.getElementById("currentTemp");
    }

    setData(data){

                if (
            !this.line ||
            !this.area ||
            !this.points ||
            !this.timeline ||
            !this.tooltip ||
            !this.currentTemp
        ) 
        {
            return;
        }

        const width = 400;
        const height = 220;

        const temps =
            data.map(d=>d.temp);

        const max =
            Math.max(...temps);

        const min =
            Math.min(...temps);

        const step =
            width/(data.length-1);

        let linePath = "";
        let areaPath = "";

        this.points.innerHTML="";
        this.timeline.innerHTML="";

        data.forEach((item,index)=>{

            const x =
                index*step;

            const y =
                height -
                ((item.temp-min)/
                (max-min||1))
                *150 - 20;

            if(index===0){

                linePath +=
                    `M ${x} ${y}`;

                areaPath +=
                    `M ${x} ${height}
                     L ${x} ${y}`;

            }else{

                linePath +=
                    ` L ${x} ${y}`;

                areaPath +=
                    ` L ${x} ${y}`;
            }

            const point =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "circle"
                );

            point.setAttribute("cx",x);
            point.setAttribute("cy",y);
            point.setAttribute("r",6);
            point.classList.add("point");

            point.addEventListener(
                "mouseenter",
                ()=>{

                    this.tooltip.style.opacity=1;

                    this.tooltip.innerHTML=
                        `${item.icon}
                         ${item.temp}°
                         <br>
                         ${item.time}`;

                    this.tooltip.style.left=
                        `${x}px`;

                    this.tooltip.style.top=
                        `${y}px`;

                    this.currentTemp.textContent=
                        `${item.temp}°`;
                }
            );

            point.addEventListener(
                "mouseleave",
                ()=>{
                    this.tooltip.style.opacity=0;
                }
            );

            this.points.appendChild(point);

            const label =
                document.createElement("div");

            label.innerHTML=
                `${item.icon}<br>${item.time}`;

            this.timeline.appendChild(label);
        });

        areaPath +=
            ` L ${width} ${height}
              Z`;

        this.line.setAttribute(
            "d",
            linePath
        );

        this.area.setAttribute(
            "d",
            areaPath
        );

        this.currentTemp.textContent =
            `${data[0].temp}°`;
    }
}

const forecast =
    new ForecastCard();

// forecast.setData([
//     {
//         time:"8 AM",
//         temp:12,
//         icon:"☼"
//     },
//     {
//         time:"12 PM",
//         temp:24,
//         icon:"☼"
//     },
//     {
//         time:"4 PM",
//         temp:16,
//         icon:"✦"
//     },
//     {
//         time:"8 PM",
//         temp:21,
//         icon:"☾"
//     }
// ]);

function setProgress(percent) {
  const circle = document.querySelector(".progress-ring");
  if(circle){
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = circumference;

  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}}

window.addEventListener("DOMContentLoaded", () => {
setProgress(80);   
})

const search = document.getElementById("searchbtn")
const input = document.querySelector(".input-box")
const input2 = document.querySelector(".input-box2")
const sidebar = document.querySelector(".sidebar-icon")
const temperature = document.getElementById("temperature")
const city_name = document.getElementById("city_name")
const feels_like = document.getElementById("feels_like")
const weatherIcon = document.getElementById("sky-icon")
const weatherStatus = document.getElementById("sky-status")
const rain_percent = document.getElementById("rain_percent")
const time = document.getElementById("time")
const continentImage = document.getElementById("continent-image")

const todayImages = document.querySelectorAll(".today-weather-image")
const pastImage = document.querySelector(".past-day-image")
const nextImage1 = document.querySelector(".next-day-image-1")
const nextImage2 = document.querySelector(".next-day-image-2")
const nextImage3 = document.querySelector(".next-day-image-3")
const nextImage4 = document.querySelector(".next-day-image-4")
const nextImage5 = document.querySelector(".next-day-image-5")

const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const currentDay = document.querySelector(".current-day-name")
const weekDaysReference = document.querySelectorAll(".weekDays")
const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"]

const ImageReferenceVariables = [pastImage,todayImages,nextImage1,nextImage2,nextImage3,nextImage4,nextImage5]

const ArrayOfHighs = ["high1", "high2", "high3", "high4", "high5", "high6", "high7"]
let receivedHighs;
const ArrayOfLows = ["low1", "low2", "low3", "low4", "low5", "low6", "low7"]
let receivedLows;

const card1 = document.querySelector(".morning")
const card2 = document.querySelector(".evening")
const card3 = document.querySelector(".night")

const ArrayOfCards = [card1, card2, card3]

let todayWeatherCode;

let cityname = "";
let skytime;

const tempPeriod = [];

const todaybtn = document.querySelector(".today")
const weekbtn = document.querySelector(".week")
const todayline = document.querySelector(".today-line")
const weekline = document.querySelector(".week-line")

const celsius = document.querySelector(".celsius")
const fahrenheit = document.querySelector(".fahrenheit")

const days_7 = document.querySelector(".days-7")
const current_3 = document.querySelector(".day-periods")

let cardTemps;
let cardApparentTemps;
let cardHumidity;
let cardWind;

let feel;

function gotohomepage(){
    window.location.href = "/homepage.html"
}

if(search){
search.addEventListener("click", () => {
    cityname = input.value;
    localStorage.setItem("cityname", cityname)
    gotohomepage();
})
}

if(input){
input.addEventListener("keydown", (event) => {
    if(event.key === "Enter")
    {
        cityname = input.value;
        localStorage.setItem("cityname", cityname)
        gotohomepage();
    }
})
}

cityname = localStorage.getItem("cityname")

function callApi()
{
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityname}&count=1&language=en&format=json`)
    .then((response) => (response.json()))
    .then((data) => {
        console.log(data)
        const latitude = data.results[0].latitude;
        const longitude = data.results[0].longitude;
        city_name.textContent = data.results[0].name;
        const timezone = data.results[0].timezone;
        console.log(timezone)
        map.flyTo([latitude, longitude], 10);

        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`)
         .then(res => res.json())
         .then(data => {
            console.log(data.continent)
            updateContinentImage(data.continent, continentImage)
        });
        fetch(`https://timeapi.io/api/Time/current/zone?timeZone=${encodeURI(timezone)}`)
        .then(respone => respone.json())
        .then(data2 => {
            const index = weekDays.indexOf(data2.dayOfWeek)
            console.log(data2)
            currentDay.textContent = weekDays[index];
            updateWeekDays(weekDays, weekDaysReference, index);
            const localTimeVar = convertTime(data2.time)
            time.textContent = localTimeVar
        })   
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,apparent_temperature,relative_humidity_2m,surface_pressure,weather_code,wind_speed_10m,wind_direction_10m,visibility
&hourly=temperature_2m,apparent_temperature,precipitation_probability,weather_code,relative_humidity_2m,wind_speed_10m
&daily=sunrise,sunset,daylight_duration,weather_code,temperature_2m_max,temperature_2m_min,uv_index_max
&past_days=1&forecast_days=6
&timezone=auto`)
                .then((response) => response.json())
                .then((data) => {                   
                    console.log(data) // shadows earlier data variable
                    temperature.textContent = data.current.temperature_2m;
                    feel = data.current.apparent_temperature + "° ✨";
                    feels_like.textContent = feel
                    const hour = data.current.time.split(":")[0];
                    const index = data.hourly.time.indexOf(hour+":00");
                    console.log(index)
                    rain_percent.textContent = data.hourly.precipitation_probability[index] + " %";
                    console.log(data.hourly.precipitation_probability[index] + " %")

                    receivedHighs = data.daily.temperature_2m_max;
                    receivedLows = data.daily.temperature_2m_min;

                    skytime= checktime(data.current.is_day)
                    updatesun(skytime);
                    const weather_codes = data.daily.weather_code;
                    todayWeatherCode = data.current.weather_code;
                    updateImages(weather_codes, ImageReferenceVariables, ArrayOfHighs, ArrayOfLows);

                    const uv = data.daily.uv_index_max[1].toString().slice(0,3);
                    updateUV(uv);
                    const info = getUVInfo(uv);
                    document.querySelector(".uv-status").textContent = info.level;
                    document.querySelector(".uv-desc").textContent = info.advice;

                    getPressureStatus(data.current.surface_pressure.toString().split(".")[0]);
                    setPressure(data.current.surface_pressure)

                    updatehumidity(data.current.relative_humidity_2m);

                    setDirection(data.current.wind_speed_10m, data.current.wind_direction_10m);

                    getVisibilityStatus(data.current.visibility)

                    document.getElementById("currentTemp").textContent = data.current.temperature_2m + "°C";
                    document.getElementById("high").textContent = data.daily.temperature_2m_max[1];
                    document.getElementById("low").textContent = data.daily.temperature_2m_min[1];

                    tempPeriod.push({
                                        time:"8 AM",
                                        temp:data.hourly.temperature_2m[56],
                                        icon:"☼"
                                    },
                                    {
                                        time:"12 PM",
                                        temp:data.hourly.temperature_2m[60],
                                        icon:"☼"
                                    },
                                    {
                                        time:"4 PM",
                                        temp:data.hourly.temperature_2m[64],
                                        icon:"✦"
                                    },
                                    {
                                        time:"8 PM",
                                        temp:data.hourly.temperature_2m[68],
                                        icon:"☾"
                                    })
                    forecast.setData(tempPeriod)

                    document.getElementById("daylight").textContent = formatDuration(data.daily.daylight_duration[1]);
                    console.log(data.daily.sunset[1].split("T")[1])
                    document.querySelector(".sunset-time").textContent = convertTime2(data.daily.sunset[1].split("T")[1]);
                    document.querySelector(".sunrise-time").textContent = convertTime2(data.daily.sunrise[1].split("T")[1]);
                    const currentTime = data.current.time;
                    const sunriseTime = data.daily.sunrise[1];
                    const diffMs = new Date(sunriseTime) - new Date(currentTime);
                    document.querySelector(".sunrise-lefttime").textContent = formatDuration2(diffMs)

                    cardTemps = [data.hourly.temperature_2m[56],data.hourly.temperature_2m[64],data.hourly.temperature_2m[70]];
                    cardApparentTemps = [data.hourly.apparent_temperature[56],data.hourly.apparent_temperature[64],data.hourly.apparent_temperature[70]];
                    cardHumidity = [data.hourly.relative_humidity_2m[56],data.hourly.relative_humidity_2m[64],data.hourly.relative_humidity_2m[70]];
                    cardWind = [data.hourly.wind_speed_10m[56],data.hourly.wind_speed_10m[64],data.hourly.wind_speed_10m[70]];
                    const cardCodes = [data.hourly.weather_code[56],data.hourly.weather_code[64],data.hourly.weather_code[70]];
                    updatecards(ArrayOfCards, cardCodes, cardTemps,cardApparentTemps,cardHumidity,cardWind);

                    fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=us_aqi,pm10,pm2_5`)
                    .then(response => (response.json()))
                    .then(data => {
                        document.querySelector(".aqi-value").textContent = data.current.us_aqi;
                        document.querySelector(".aqi-status").textContent = getAQIStatus(data.current.us_aqi);

                        document.querySelector(".loading").style.visibility = "hidden";
                        document.body.style.visibility = "visible"; 

                    })
                })
    })
}

if(window.location.href.includes("homepage"))
{ 
    callApi();

    weekbtn.addEventListener("click",()=>{
        weekbtn.classList.toggle("active")
        weekbtn.classList.toggle("non-active")
        weekline.classList.toggle("blue-line")
        todaybtn.classList.toggle("active")
        todaybtn.classList.toggle("non-active")
        todayline.classList.toggle("blue-line")
        weekbtn.disabled = true;
        todaybtn.disabled = false;
        days_7.style.display = "flex"
        current_3.style.display = "none";
    })
    todaybtn.addEventListener("click",()=>{
        todaybtn.classList.toggle("active")
        todaybtn.classList.toggle("non-active")
        todayline.classList.toggle("blue-line")
        weekbtn.classList.toggle("active")
        weekbtn.classList.toggle("non-active")
        weekline.classList.toggle("blue-line")
        weekbtn.disabled = false;
        todaybtn.disabled = true;
        days_7.style.display = "none"
        current_3.style.display = "grid";
    })

    celsius.addEventListener("click",() => {
        celsius.classList.toggle("non-active2")
        celsius.classList.toggle("active2")
        fahrenheit.classList.toggle("non-active2")
        fahrenheit.classList.toggle("active2")
        celsius.disabled = true;
        fahrenheit.disabled= false;
        const tempInC = fahrenheitToCelsius(temperature.textContent).toFixed(0)
        temperature.textContent = tempInC
        document.querySelector(".temperatureC").textContent = "°C"
        document.getElementById("feels_like").textContent = (feel);

        card1.querySelector(".temp-7").textContent = cardTemps[0].toFixed(0) + "°"
        card1.querySelector(".card-feels").textContent = cardApparentTemps[0] + "°";

        card2.querySelector(".temp-7").textContent = cardTemps[1].toFixed(0) + "°"
        card2.querySelector(".card-feels").textContent = cardApparentTemps[1] + "°";

        card3.querySelector(".temp-7").textContent = cardTemps[2].toFixed(0) + "°"
        card3.querySelector(".card-feels").textContent = cardApparentTemps[2] + "°";

    })
    fahrenheit.addEventListener("click",() => {
        fahrenheit.classList.toggle("non-active2")
        fahrenheit.classList.toggle("active2")
        celsius.classList.toggle("non-active2")
        celsius.classList.toggle("active2")
        fahrenheit.disabled = true;
        celsius.disabled = false;
        const tempInF = celsiusToFahrenheit(temperature.textContent).toFixed(0)
        temperature.textContent = tempInF
        document.querySelector(".temperatureC").textContent = "°F"
        document.getElementById("feels_like").textContent = celsiusToFahrenheit(feel.split("°")[0]).toFixed(0) + "° ✨";

        const card1Temp = celsiusToFahrenheit(cardTemps[0]).toFixed(0)+"°"
        card1.querySelector(".temp-7").textContent = card1Temp;
        const card1feel = celsiusToFahrenheit(cardApparentTemps[0]).toFixed(1)+"°";
        card1.querySelector(".card-feels").textContent = card1feel;

        const card2Temp = celsiusToFahrenheit(cardTemps[1]).toFixed(0)+"°"
        card2.querySelector(".temp-7").textContent = card2Temp;
        const card2feel = celsiusToFahrenheit(cardApparentTemps[1]).toFixed(1)+"°";
        card2.querySelector(".card-feels").textContent = card2feel;

        const card3Temp = celsiusToFahrenheit(cardTemps[2]).toFixed(0)+"°"
        card3.querySelector(".temp-7").textContent = card3Temp;
        const card3feel = celsiusToFahrenheit(cardApparentTemps[2]).toFixed(1)+"°";
        card3.querySelector(".card-feels").textContent = card3feel;
    })
}

if(input2)
{
    input2.addEventListener("keydown", (event) => 
    {
        if(event.key === "Enter")
        {
            document.body.style.visibility = "hidden";
            document.querySelector(".loading").style.visibility = "visible";
            cityname = input2.value
            callApi();
            input2.value = null;
            tempPeriod.length = 0;
            celsius.classList.remove("non-active2")
            celsius.classList.add("active2")
            fahrenheit.classList.add("non-active2")
            fahrenheit.classList.remove("active2")
            celsius.disabled = true;
            fahrenheit.disabled= false;
        }
    })
}

let isopen = false;
let rotated = false

if(sidebar)
{
    const icon = document.querySelector(".sidebar-icon")
    icon.style.transition = "transform 0.5s ease";
    
    sidebar.addEventListener("click", ()=>
    {
        if(isopen)
        {
            document.querySelector(".all").style.gridTemplateColumns = "1fr 2fr"
            document.querySelector(".sidebar").style.display = "none"
            icon.style.transform = "rotate(0deg)";
        }
        else
        {
            document.querySelector(".all").style.gridTemplateColumns = "1fr 3fr 1fr"
            document.querySelector(".sidebar").style.display = "flex"
            icon.style.transform = "rotate(-90deg)";
        }

        isopen = !isopen;

    })
}

function updateUV(uv)
{
// uv is API value

document.querySelector(".uv-value").textContent = uv;

const percentage = (uv / 11) * 100;

document.querySelector(".uv-fill").style.height = `${percentage}%`;

document.querySelector(".uv-thumb").style.top =
  `${100 - percentage}%`;
}

function getUVInfo(uvIndex) {
    if (uvIndex <= 2) {
        return {
            level: "Low",
            advice: "Minimal protection needed."
        };
    }

    if (uvIndex <= 5) {
        return {
            level: "Moderate",
            advice: "Consider sunscreen outdoors."
        };
    }

    if (uvIndex <= 7) {
        return {
            level: "High",
            advice: "Protection recommended."
        };
    }

    if (uvIndex <= 10) {
        return {
            level: "Very High",
            advice: "Extra sun protection needed."
        };
    }

    return {
        level: "Extreme",
        advice: "Avoid direct sun exposure."
    };
}

function getPressureStatus(pressure) {
    
    document.querySelector(".pressure-value").textContent = pressure;

    if (pressure < 1000) {
        document.querySelector(".pressure-label").textContent = "Low";
    } else if (pressure < 1013) {
        document.querySelector(".pressure-label").textContent = "Normal";
    } else if (pressure < 1025) {
        document.querySelector(".pressure-label").textContent = "High";
    } else {
        document.querySelector(".pressure-label").textContent = "Very High";
    }
}

function setPressure(value) {

    const orbit1 = document.querySelector(".orbit-1");
    const orbit2 = document.querySelector(".orbit-2");
    const orbit3 = document.querySelector(".orbit-3");
    const label = document.querySelector(".pressure-label");

    if (value < 1000) {
        orbit1.style.borderColor = "#60a5fa";
        orbit2.style.borderColor = "#93c5fd";
        orbit3.style.borderColor = "#bfdbfe";
    }
    else if (value > 1025) {
        orbit1.style.borderColor = "#f59e0b";
        orbit2.style.borderColor = "#fbbf24";
        orbit3.style.borderColor = "#fde68a";
    }
    else {
        orbit1.style.borderColor = "#10b981";
        orbit2.style.borderColor = "#34d399";
        orbit3.style.borderColor = "#a7f3d0";
    }

    const scale = 0.9 + ((value - 980) / 70) * 0.2;

    orbit1.style.transform = `scale(${scale})`;
    orbit2.style.transform = `scale(${scale * 0.95})`;
    orbit3.style.transform = `scale(${scale * 0.9})`;
}

function updatehumidity(humidity)
{
    document.getElementById("value").textContent = humidity + "%";

    function getHumidityStatus(humidity) {
    if (humidity < 30) {
        return "Dry";
    } else if (humidity < 60) {
        return "Comfortable";
    } else if (humidity < 80) {
        return "Humid";
    } else {
        return "Muggy";
    }
    }

    document.querySelector(".humidity-status").textContent = getHumidityStatus(humidity);

    const progress = document.getElementById("progress");
    const valueText = document.getElementById("value");

    if (progress && valueText) {
        const length = progress.getTotalLength();
    
        progress.style.strokeDasharray = length;
        progress.style.strokeDashoffset = length;
    
        function setGauge(value) {
            value = Math.max(0, Math.min(100, value));
    
            const offset = length * (1 - value / 100);
    
            progress.style.strokeDashoffset = offset;
        }
    
    setGauge(humidity);
}
}

function setDirection(value, degrees) {
    
    document.querySelector(".wind-value").textContent = value + " Km/h";

  document
    .getElementById("needle")
    .setAttribute(
      "transform",
      `rotate(${degrees} 100 100)`
    );
}

function getVisibilityStatus(visibility) {

    const value = visibility/1000
    document.querySelector(".visibility-value").textContent = value.toFixed(1) + " "

    function VisibilityStatus(visibility){
    if (visibility < 1000) return "Poor";
    if (visibility < 4000) return "Moderate";
    if (visibility < 10000) return "Good";
    return "Excellent";
    }

    document.querySelector(".visibility-status").textContent = VisibilityStatus(visibility) + " visiblity"
}

function getAQIStatus(aqi) {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy";
    if (aqi <= 200) return "Poor";
    if (aqi <= 300) return "Very Poor";
    return "Hazardous";
}

function checktime(time)
{
    if(time)
        return "day"
    else
        return "night"
}

function updatesun(skytime){
    console.log(skytime)
    if(skytime==="day")
    {
        sunrise.style.display = "none";
        sunset.style.display = "block";
    }
    else if(skytime==="night")
    {
        sunset.style.display = "none";
        sunrise.style.display = "block";
    }
}

function getcodeCategory(code) {
    if (code === 0) return "clear";

    if ([1, 2].includes(code)) return "partly cloudy";

    if (code === 3) return "cloudy";

    if ([45, 48].includes(code)) return "fog";

    if ([51, 53, 55, 56, 57].includes(code))
        return "drizzle";

    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code))
        return "rain";

    if ([71, 73, 75, 77, 85, 86].includes(code))
        return "snow";

    if ([95, 96, 99].includes(code))
        return "thunderstorm";

    return "unknown";
}

function getWeatherIcon(code) {

    if (code === 0) return "☀️";

    if ([1, 2].includes(code)) return "⛅";

    if (code === 3) return "☁️";

    if ([45, 48].includes(code)) return "🌫️";

    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "🌧️";

    if ([71, 73, 75].includes(code)) return "🌨️";

    if ([95, 96, 99].includes(code)) return "⛈️";

    return "❓";
}

function updateTodayImage(weatherCode, todayimages, high, highvalue, low, lowvalue)
{
    const skystatus = getcodeCategory(weatherCode)
    const icon = getWeatherIcon(weatherCode)

    weatherIcon.textContent = icon;
    weatherStatus.textContent = skystatus;

    document.querySelector(`.${high}`).textContent = highvalue + "°";
    document.querySelector(`.${low}`).textContent = lowvalue + "°";

    if(skystatus === "clear")
    {
        todayImages.forEach((current) => {
             current.src = "/Image/sun (1).png";
        })
    }
    else if(skystatus === "partly cloudy")
    {
        todayImages.forEach((current) => {
             current.src = "/Image/weather.png";
        })
    }
    else if(skystatus === "cloudy")
    {
        todayImages.forEach((current) => {
             current.src = "/Image/cloudy.png";
        })
    }
    else if(skystatus === "fog")
    {
        todayImages.forEach((current) => {
             current.src = "/Image/fog.png";
        })
    }
    else if(skystatus === "drizzle")
    {
        todayImages.forEach((current) => {
             current.src = "/Image/cloudy (1).png";
        })
    }
    else if(skystatus === "rain")
    {
        todayImages.forEach((current) => {
             current.src = "/Image/rainy-day.png";
        })
    }
    else if(skystatus === "snow")
    {
        todayImages.forEach((current) => {
             current.src = "/Image/snow.png";
        })
    }
    else if(skystatus === "thunderstorm")
    {
        todayImages.forEach((current) => {
             current.src = "/Image/thunder.png";
        })
    }
    else{
        return "unknwon";
    }
}

function updateOtherImage(weatherCode, otherimage, high, highvalue, low, lowvalue)
{
    const skystatus= getcodeCategory(weatherCode)
    document.querySelector(`.${high}`).textContent = highvalue + "°";
    document.querySelector(`.${low}`).textContent = lowvalue + "°";

    if(skystatus === "clear")
    {
        otherimage.src = "/Image/sun (1).png";
    }
    else if(skystatus === "partly cloudy")
    {
        otherimage.src = "/Image/weather.png";
    }
    else if(skystatus === "cloudy")
    {
        otherimage.src = "/Image/cloudy.png";
    }
    else if(skystatus === "fog")
    {
        otherimage.src = "/Image/fog.png";
    }
    else if(skystatus === "drizzle")
    {
        otherimage.src = "/Image/cloudy (1).png";
    }
    else if(skystatus === "rain")
    {
        otherimage.src = "/Image/rainy-day.png";
    }
    else if(skystatus === "snow")
    {
        otherimage.src = "  /Image/snow.png";
    }
    else if(skystatus === "thunderstorm")
    {
        otherimage.src = "/Image/thunder.png";
    }
    else{
        return "unknwon";
    }    
}

function updateImages(ArrayOfWeatherCodes, ArrayOfImageReferenceVariables, ArrayOfHighs, ArrayOfLows)
{
    for(let i = 0; i<ArrayOfWeatherCodes.length; i++)
    {
        const localImageReferenceVariable = ArrayOfImageReferenceVariables[i];

        if(i === 1)
        {
            updateTodayImage(todayWeatherCode, localImageReferenceVariable, 
                    ArrayOfHighs[i], receivedHighs[i].toString().split(".")[0], ArrayOfLows[i], receivedLows[i].toString().split(".")[0]);
            continue;
        }
        updateOtherImage(ArrayOfWeatherCodes[i], localImageReferenceVariable, 
                        ArrayOfHighs[i], receivedHighs[i].toString().split(".")[0], ArrayOfLows[i], receivedLows[i].toString().split(".")[0]);
    }
}

function updateWeekDays(ArrayOfDays, ArrayOfReferences, index)
{
    let start;

    if(index===0)
        start = (ArrayOfDays.length)-1;
    else
        start = index - 1;

    for(let i = 0; i< ArrayOfDays.length; i++) // Circular loop
    {
        console.log(ArrayOfReferences[i].textContent)
        let current = (start + i) % ArrayOfDays.length;
        ArrayOfReferences[i].textContent = ArrayOfDays[current];
        
        console.log(ArrayOfDays[start+i])
        console.log(ArrayOfReferences[i].textContent)
    }
}

function convertTime(time)
{
    const [hour, minute] = time.split(":");

    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    
    return (`${hour12}:${minute} ${ampm}`);
}

function convertTime2(time)
{
    const [hour, minute] = time.split(":");

    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    
    return (`${hour12}:${minute}`);
}

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${hours}h ${minutes}m`;
}

function formatDuration2(mseconds) {
    const hours = Math.floor(mseconds / 3600000);
    const minutes = Math.floor((mseconds % 3600000) / 60000);

    return `${hours}h ${minutes}m`;
}

function updateContinentImage(continent, imageElement) {
  const continentImages = {
    Asia: "/image/vector-banner-on-themes-trip-260nw-301497002.jpg",
    Europe: "/image/travel-banner-trip-to-europe-vector-themes-sights-vacations-summer-adventure-modern-flat-style-64312513.webp",
    Africa: "/image/travel-banner-trip-to-europe-vector-themes-sights-vacations-summer-adventure-modern-flat-style-64312513.webp",
    "North America": "/image/vector-banner-on-themes-trip-260nw-336649379.jpg",
    "South America": "/image/vector-banner-on-themes-trip-260nw-336649379.jpg",
    "Australian continent": "/image/Gemini_Generated_Image_ywwnkaywwnkaywwn.png",
    Antarctica: "/image/penguin-animals-antarctic-cold-landscape-260nw-2211904261.jpg",
    "Insular Oceania": "/image/Gemini_Generated_Image_ywwnkaywwnkaywwn.png"
  };

  imageElement.src =
    continentImages[continent] || "/images/default.png";
}

//Cards update
function updatecards(Array, codes, temp, feels, humidity, wind)
{
    let localCard;
    let status;

    for(let i = 0; i < 3; i++)
    {
        localCard = Array[i];
        localCard.querySelector(".temp-7").textContent = temp[i].toString().split(".")[0] + "°"
        localCard.querySelector(".card-feels").textContent = feels[i] + "°"
        localCard.querySelector(".card-humidity").textContent = humidity[i] + "%"
        localCard.querySelector(".card-wind").textContent = wind[i] + " km/h"

        status = getcodeCategory(codes[i])

        localCard.querySelector(".condition-7").textContent = status;

        function updatecardimage(status)
        {
    
        if(status === "clear")
        {
            localCard.querySelector(".card-img").src = "/Image/sun (1).png";
        }
        else if(status === "partly cloudy")
        {
            localCard.querySelector(".card-img").src = "/Image/weather.png";
        }
        else if(status === "cloudy")
        {
            localCard.querySelector(".card-img").src = "/Image/cloudy.png";
        }
        else if(status === "fog")
        {
            localCard.querySelector(".card-img").src = "/Image/fog.png";
        }
        else if(status === "drizzle")
        {
            localCard.querySelector(".card-img").src = "/Image/cloudy (1).png";
        }
        else if(status === "rain")
        {
            localCard.querySelector(".card-img").src = "/Image/rainy-day.png";
        }
        else if(status === "snow")
        {
            localCard.querySelector(".card-img").src = "/Image/snow.png";
        }
        else if(status === "thunderstorm")
        {
            localCard.querySelector(".card-img").src = "/Image/thunder.png";
        }
        else{
            return "unknwon";
        }    
        }
        updatecardimage(status);
    }
}

function celsiusToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}