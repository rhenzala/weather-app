import HandleWeatherDisplay from "./display_weather";

let isFahrenheit = true;

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const toggleBtn = document.getElementById('toggleBtn');
const errorMessage = document.querySelector('.error-message');


const validateCity = (city) => city.length > 0 && /^[a-zA-Z\s-]+$/.test(city);

const setLoading = (isLoading) => {
    searchButton.disabled = isLoading;
    searchButton.textContent = isLoading ? 'Loading...': 'Search'
}
const handleSearch = async () => {
    const city = searchInput.value.trim();

    if (!validateCity(city)){
        errorMessage.textContent = 'Please enter a valid city name';
        return;
    } if (validateCity(city)) {
        errorMessage.textContent = '';
    }
    const formattedCity = city.toLowerCase().split(' ').join('-');
    const tempUnit = isFahrenheit ? 'fahrenheit' : 'celsius';
    try {
        setLoading(true);
        await HandleWeatherDisplay.init(formattedCity, tempUnit);
    } catch (error) {
        errorMessage.textContent = 'Failed to fetch weather data. Please try again.'
    } finally {
        setLoading(false)
    }
}
searchButton.addEventListener('click', handleSearch);
searchButton.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
})

toggleBtn.addEventListener('click', () => {
    isFahrenheit = !isFahrenheit;
    toggleBtn.textContent = isFahrenheit ? '°F' : '°C';
    toggleBtn.classList.toggle('active');

    if (searchInput.value.trim()) {
        handleSearch();
    }
});

