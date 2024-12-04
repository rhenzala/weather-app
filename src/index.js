import getWeather from "./fetch_data";

let city = '';
let isFahrenheit = true;
let tempUnit = 'fahrenheit';
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const content = document.getElementById('content');
const toggleBtn = document.getElementById('toggleBtn');
searchButton.addEventListener('click', () => {
    city = searchInput.value.trim().toLowerCase().split(' ').join('-');
    content.textContent = city;
    if (toggleBtn.textContent === '°C') {
        tempUnit = 'celsius';
    } else {
        tempUnit = 'fahrenheit';
    }
    getWeather(city, tempUnit)
});

toggleBtn.addEventListener('click', () => {
    isFahrenheit = !isFahrenheit;
    toggleBtn.textContent = isFahrenheit ? '°F' : '°C';
    toggleBtn.classList.toggle('active');
});

