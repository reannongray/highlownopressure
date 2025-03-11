import { CONFIG } from '../config.js';

/**
 * Get geocoding data from location name
 * @param {string} location - Location name or zipcode to search
 * @returns {Promise<Object>} Location data with latitude, longitude, and name
 */
export async function getGeocodingData(location) {
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const result = data.results[0];
            return {
                latitude: result.latitude,
                longitude: result.longitude,
                name: `${result.name}, ${result.country}`
            };
        }
        throw new Error('Location not found');
    } catch (error) {
        console.error('Geocoding error:', error);
        throw error;
    }
}

/**
 * Get current weather and forecast data
 * @param {number} latitude - Location latitude
 * @param {number} longitude - Location longitude
 * @returns {Promise<Object>} Weather data
 */
export async function getCurrentWeatherData(latitude, longitude) {
    const temperatureUnit = CONFIG.units === 'metric' ? 'celsius' : 'fahrenheit';
    const windSpeedUnit = CONFIG.units === 'metric' ? 'kmh' : 'mph';
    
    // Updated URL with correct parameters for the Open Meteo API
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&timezone=auto&forecast_days=7&temperature_unit=${temperatureUnit}&wind_speed_unit=${windSpeedUnit}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }
        
        return response.json();
    } catch (error) {
        console.error('Error fetching current weather:', error);
        throw error;
    }
}

/**
 * Get hourly forecast data
 * @param {number} latitude - Location latitude
 * @param {number} longitude - Location longitude
 * @returns {Promise<Object>} Hourly forecast data
 */
export async function getHourlyForecastData(latitude, longitude) {
    const temperatureUnit = CONFIG.units === 'metric' ? 'celsius' : 'fahrenheit';
    
    // Updated URL for hourly forecast
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,weather_code&temperature_unit=${temperatureUnit}&forecast_days=1&timezone=auto`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }
        
        return response.json();
    } catch (error) {
        console.error('Error fetching hourly forecast:', error);
        throw error;
    }
}

/**
 * Get all weather data for a location
 * @param {number} latitude - Location latitude
 * @param {number} longitude - Location longitude
 * @returns {Promise<Object>} Object containing all weather data
 */
export async function getAllWeatherData(latitude, longitude) {
    try {
        const [currentData, hourlyData] = await Promise.all([
            getCurrentWeatherData(latitude, longitude),
            getHourlyForecastData(latitude, longitude)
        ]);
        
        return {
            current: currentData,
            hourly: hourlyData
        };
    } catch (error) {
        console.error('Weather data fetch error:', error);
        throw error;
    }
}