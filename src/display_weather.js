// eslint-disable-next-line import/no-extraneous-dependencies
import { format } from 'date-fns';
import getWeather from './fetch_data';
import cloudy from '../assets/cloud.svg';
import sunny from '../assets/sun.svg';
import rain from '../assets/rain.svg';
import thunder from '../assets/thunder.svg';
import wind from '../assets/wind.svg';
import snow from '../assets/snow.svg'

const HandleWeatherDisplay = (() => {
    const content = document.getElementById('content');

    const createWeatherDetailGrid = (weatherDetailsList, weatherDetails, tempUnit) => {
        Object.entries(weatherDetailsList).forEach(([key, value]) => {
            const name = document.createElement('p');
            const data = document.createElement('p');
            name.classList.add('name');
            data.classList.add('value');
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item';
            if (key === 'Max' || key === 'Min' || key === 'Feels Like') {
                data.textContent = `${value}°`;
            } else if (key === 'Windspeed') {
                if (tempUnit === 'celsius') {
                    data.textContent = `${value} kph`;
                } else {
                    data.textContent = `${value} mph`;
                }
            } else if (key === 'Visibility') {
                if (tempUnit === 'celsius') {
                    data.textContent = `${value} km`;
                } else {
                    data.textContent = `${value} miles`;
                }
            } else if (key === 'Humidity') {
                data.textContent = `${value} %`;
            } else {
                data.textContent = value;
            }
            name.textContent = key;
            gridItem.appendChild(data)
            gridItem.appendChild(name)
            weatherDetails.appendChild(gridItem);
        })
    }
    const createCard = (image, cityName, date, temperature, condition, weatherDetailsList, tempUnit) => {
        const weatherCard = document.createElement('div');
        const generalDetails = document.createElement('div');
        const weatherTemp = document.createElement('div');
        const weatherDetails = document.createElement('div');

        weatherCard.classList.add('weather-card');
        generalDetails.classList.add('general-details');
        weatherTemp.classList.add('weather-temp');
        weatherDetails.classList.add('weather-details');

        const img = document.createElement('img');
        const location = document.createElement('p');
        const dateToday = document.createElement('p');
        const temp = document.createElement('p');
        const cond = document.createElement('p');

        img.classList.add('image');
        location.classList.add('city');
        dateToday.classList.add('date');
        temp.classList.add('temperature');
        cond.classList.add('condition');

        img.src = image;
        location.textContent = cityName;
        dateToday.textContent = date;
        temp.textContent = `${temperature}°`;
        cond.textContent = condition;
        createWeatherDetailGrid(weatherDetailsList, weatherDetails, tempUnit);

        generalDetails.appendChild(location)
        generalDetails.appendChild(dateToday)
        weatherTemp.appendChild(img)
        weatherTemp.appendChild(temp)
        weatherTemp.appendChild(cond)
        weatherCard.appendChild(generalDetails)
        weatherCard.appendChild(weatherTemp)
        weatherCard.appendChild(weatherDetails)
        content.appendChild(weatherCard)
    }
    const handleWeatherIcon = (weatherIcon) => {
        let weatherImg = sunny;
        if (weatherIcon.includes('cloudy')) {
            weatherImg = cloudy
        } else if (weatherIcon.includes('rain')){
            weatherImg = rain
        } else if (weatherIcon.includes('thunder')) {
            weatherImg = thunder
        } else if (weatherIcon.includes('wind')) {
            weatherImg = wind
        } else if (weatherIcon.includes('snow')) {
            weatherImg = snow
        } else if (weatherIcon.includes('clear')) {
            weatherImg = sunny
        }
        return weatherImg;
    }
    const formatDate = (date) => {
        const newDate = new Date(date);
        return format(newDate, 'MMMM d, yyyy')
    }
    const displayWeather = (weatherData, tempUnit) => {
        content.replaceChildren();
        const cityName = weatherData.resolvedAddress;
        const date = weatherData.days[0].datetime;
        const condition = weatherData.days[0].conditions;
        const weatherIcon = weatherData.days[0].icon;
        const temperature = weatherData.days[0].temp;
        const maxTemp = weatherData.days[0].tempmax;
        const minTemp = weatherData.days[0].tempmin;
        const feelsLike = weatherData.days[0].feelslike;
        const cityHumidity = weatherData.days[0].humidity;
        const cityVisibility = weatherData.days[0].visibility;
        const cityWindspeed = weatherData.days[0].windspeed;
        const citySunrise = weatherData.days[0].sunrise;
        const citySunset = weatherData.days[0].sunset;
        const weatherDetailsList = {
            'Max':maxTemp, 
            'Min':minTemp, 
            'Feels Like':feelsLike, 
            'Humidity':cityHumidity, 
            'Visibility':cityVisibility, 
            'Windspeed':cityWindspeed, 
            'Sunrise':citySunrise, 
            'Sunset':citySunset
        };
        const weatherImage = handleWeatherIcon(weatherIcon);
        const formatedDate = formatDate(date);
        createCard(weatherImage, cityName, formatedDate, temperature, condition, weatherDetailsList, tempUnit);
    }
    const init = async (city, tempUnit) => {
        const weatherData = await getWeather(city, tempUnit);
        displayWeather(weatherData, tempUnit);
    }
    return {
        init
    }
})();

export default HandleWeatherDisplay;
