async function getWeather (city, tempUnit) {
    let response;
    if (tempUnit === 'celsius') {
        response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=YY3ZSPFBRS3934E42YAVMXKTH
    `, {mode: 'cors'});
    } else if (tempUnit === 'fahrenheit') {
        response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=YY3ZSPFBRS3934E42YAVMXKTH
    `, {mode: 'cors'});
    }
    const weatherData = await response.json();
    console.log(weatherData)
    const cityName = weatherData.resolvedAddress;
    const weatherDesc = weatherData.description;
    const condition = weatherData.days[0].conditions;
    const feelsLike = weatherData.days[0].feelslike;
    const temperature = weatherData.days[0].temp;
    const cityHumidity = weatherData.days[0].humidity;
    const cityVisibility = weatherData.days[0].visibility;
    const cityWindspeed = weatherData.days[0].windspeed;
    const citySunrise = weatherData.days[0].sunrise;
    const citySunset = weatherData.days[0].sunset;
    console.log('city:', cityName)
    console.log('description:', weatherDesc)
    console.log('condition:', condition)
    console.log('feels like:', feelsLike)
    console.log('temp:', temperature)
    console.log('humidity:', cityHumidity)
    console.log('visibility:', cityVisibility)
    console.log('windspeed:', cityWindspeed)
    console.log('sunrise:', citySunrise)
    console.log('sunset:', citySunset)
}

export default getWeather