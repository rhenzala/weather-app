
async function getWeather (city, tempUnit) {
    const API_KEY = 'YY3ZSPFBRS3934E42YAVMXKTH';
    try{
        const unitGroup = tempUnit === 'celsius' ? 'metric': 'us';
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${unitGroup}&key=${API_KEY}
        `, {mode: 'cors'});
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const weatherData = await response.json();
        return weatherData
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; 
    }
    
}

export default getWeather