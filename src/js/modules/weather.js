import { CONFIG, WEATHER_CONDITIONS } from '../config.js';

/**
 * Check if weather code indicates clear sky
 * @param {number} code - WMO weather code
 * @returns {boolean} True if clear sky
 */
export function isClearSky(code) {
    return code === 0 || code === 1;
}

/**
 * Check if weather code indicates cloudy conditions
 * @param {number} code - WMO weather code
 * @returns {boolean} True if cloudy
 */
export function isCloudy(code) {
    return code >= 2 && code <= 3;
}

/**
 * Check if weather code indicates rain
 * @param {number} code - WMO weather code
 * @returns {boolean} True if rainy
 */
export function isRainy(code) {
    return (code >= 51 && code <= 67) || (code >= 80 && code <= 82);
}

/**
 * Check if weather code indicates snow
 * @param {number} code - WMO weather code
 * @returns {boolean} True if snowy
 */
export function isSnowy(code) {
    return (code >= 71 && code <= 77) || (code >= 85 && code <= 86);
}

/**
 * Check if weather code indicates extreme weather
 * @param {number} code - WMO weather code
 * @returns {boolean} True if extreme weather
 */
export function isExtreme(code) {
    return code >= 95 && code <= 99;
}

/**
 * Check if weather code indicates fog
 * @param {number} code - WMO weather code
 * @returns {boolean} True if foggy
 */
export function isFoggy(code) {
    return code >= 45 && code <= 48;
}

/**
 * Map weather code to weather type using helper functions
 * @param {number} code - WMO weather code
 * @param {boolean} isDay - Whether it's daytime
 * @returns {string} Weather type constant
 */
export function mapCodeToWeatherType(code, isDay) {
    if (isClearSky(code)) {
        return isDay ? WEATHER_CONDITIONS.CLEAR_SKY : WEATHER_CONDITIONS.NIGHT_CLEAR;
    }
    
    if (isCloudy(code)) {
        return WEATHER_CONDITIONS.CLOUDY;
    }
    
    if (isRainy(code)) {
        return WEATHER_CONDITIONS.RAIN;
    }
    
    if (isSnowy(code)) {
        return WEATHER_CONDITIONS.SNOW;
    }
    
    if (isExtreme(code)) {
        return WEATHER_CONDITIONS.EXTREME;
    }
    
    if (isFoggy(code)) {
        return WEATHER_CONDITIONS.FOG;
    }
    
    return WEATHER_CONDITIONS.CLOUDY; // Default
}

/**
 * Determine basic weather type from weather code and day/night
 * @param {number} weatherCode - WMO weather code
 * @param {boolean} isDay - Whether it's daytime
 * @returns {string} Weather type identifier
 */
export function determineWeatherType(weatherCode, isDay) {
    return mapCodeToWeatherType(weatherCode, isDay);
}

/**
 * Check for high wind conditions
 * @param {number} windSpeed - Wind speed (km/h or mph)
 * @returns {boolean} True if windy
 */
export function isWindy(windSpeed) {
    return (CONFIG.units === 'metric' && windSpeed > 40) || 
           (CONFIG.units === 'imperial' && windSpeed > 25);
}

/**
 * Get temperature-based weather condition
 * @param {number} temperature - Temperature value
 * @returns {string|null} Weather condition or null
 */
export function getTemperatureCondition(temperature) {
    if (temperature > 30 && CONFIG.units === 'metric') {
        return WEATHER_CONDITIONS.HOT;
    } 
    
    if (temperature > 86 && CONFIG.units === 'imperial') {
        return WEATHER_CONDITIONS.HOT;
    } 
    
    if (temperature < 0 && CONFIG.units === 'metric') {
        return WEATHER_CONDITIONS.COLD;
    } 
    
    if (temperature < 32 && CONFIG.units === 'imperial') {
        return WEATHER_CONDITIONS.COLD;
    }
    
    return null;
}

/**
 * Check if conditions are humid
 * @param {number} humidity - Humidity percentage
 * @param {number} temperature - Temperature value
 * @returns {boolean} True if humid
 */
export function isHumid(humidity, temperature) {
    if (humidity <= 80) {
        return false;
    }
    
    return (temperature > 20 && CONFIG.units === 'metric') || 
           (temperature > 68 && CONFIG.units === 'imperial');
}

/**
 * Get final weather type including all factors
 * @param {number} weatherCode - WMO weather code
 * @param {number} temperature - Temperature value
 * @param {boolean} isDay - Whether it's daytime
 * @param {number} windSpeed - Wind speed
 * @param {number} humidity - Humidity percentage
 * @returns {string} Weather type identifier
 */
export function getWeatherType(weatherCode, temperature, isDay, windSpeed, humidity) {
    // Check for special conditions first
    if (isWindy(windSpeed)) {
        return WEATHER_CONDITIONS.WINDY;
    }
    
    const tempCondition = getTemperatureCondition(temperature);
    if (tempCondition) {
        return tempCondition;
    }
    
    if (isHumid(humidity, temperature)) {
        return WEATHER_CONDITIONS.HUMID;
    }
    
    // Use basic weather type as fallback
    return determineWeatherType(weatherCode, isDay);
}

/**
 * Get a random snarky forecast message
 * @param {string} weatherType - Weather type identifier
 * @returns {string} Snarky message
 */
export function getSnarkyForecast(weatherType) {
    // Get available sayings for this weather type (or cloudy as fallback)
    const sayings = CONFIG.snarkySayings[weatherType] || CONFIG.snarkySayings.cloudy;
    
    // Pick a random saying
    const randomIndex = Math.floor(Math.random() * sayings.length);
    return sayings[randomIndex];
}

/**
 * Get icon for clear or partly cloudy weather
 * @param {number} code - Weather code
 * @returns {string} Icon name
 */
function getClearOrPartlyCloudyIcon(code) {
    if (code === 0) return 'sun-line';
    if (code === 1) return 'sun-cloudy-line';
    return 'cloudy-line'; // For code 2-3
}

/**
 * Get icon for precipitation weather
 * @param {number} code - Weather code
 * @returns {string} Icon name
 */
function getPrecipitationIcon(code) {
    // Rain (51-67 or 80-82)
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
        return 'rainy-line';
    }
    
    // Snow and freezing precipitation (56-57, 66-67, 71-77, 85-86)
    if ((code >= 56 && code <= 57) || (code >= 66 && code <= 67) || 
        (code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
        return 'snowy-line';
    }
    
    return 'cloudy-line'; // Default fallback
}

/**
 * Select appropriate weather icon based on weather code
 * @param {number} code - WMO weather code
 * @returns {string} Icon class name without prefix
 */
export function selectWeatherIcon(code) {
    // Clear to cloudy (0-3)
    if (code <= 3) {
        return getClearOrPartlyCloudyIcon(code);
    }
    
    // Fog (45-48)
    if (code >= 45 && code <= 48) {
        return 'mist-line';
    }
    
    // Precipitation (51-86)
    if (code >= 51 && code <= 86) {
        return getPrecipitationIcon(code);
    }
    
    // Thunderstorm (95-99)
    if (code >= 95) {
        return 'thunderstorms-line';
    }
    
    return 'cloudy-line'; // Default
}

/**
 * Get complete weather icon class
 * @param {number} code - WMO weather code
 * @param {boolean} isDay - Whether it's daytime
 * @returns {string} Complete icon class
 */
export function getWeatherIconClass(code, isDay) {
    // Base class prefix
    const iconPrefix = 'ri-';
    
    // Get the base weather icon
    let iconClass = selectWeatherIcon(code);
    
    // Adjust for night time
    if (!isDay && code === 0) {
        iconClass = 'moon-clear-line';
    } else if (!isDay && code === 1) {
        iconClass = 'moon-cloudy-line';
    }

    // Return the complete icon class
    return iconPrefix + iconClass;
}