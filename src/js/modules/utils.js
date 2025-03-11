/**
 * Format date in long format (e.g., "Monday, February 5")
 * @param {Date} date - Date object to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Format day name based on index (Today, Tomorrow, or day name)
 * @param {Date} date - Date object to format
 * @param {number} index - Index in the forecast array
 * @returns {string} Formatted day name
 */
export function formatDay(date, index) {
    if (index === 0) return 'Today';
    if (index === 1) return 'Tomorrow';
    return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
}

/**
 * Format time in 12-hour format with AM/PM
 * @param {Date} date - Date object to format
 * @returns {string} Formatted time string
 */
export function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

/**
 * Get weather description from WMO code
 * @param {number} code - WMO weather code
 * @returns {string} Weather description
 */
export function getWeatherDescription(code) {
    const weatherCodes = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        56: 'Light freezing drizzle',
        57: 'Dense freezing drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        66: 'Light freezing rain',
        67: 'Heavy freezing rain',
        71: 'Slight snow fall',
        73: 'Moderate snow fall',
        75: 'Heavy snow fall',
        77: 'Snow grains',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail'
    };
    
    return weatherCodes[code] || 'Unknown';
}

/**
 * Get wind direction text from degrees
 * @param {number} degrees - Wind direction in degrees
 * @returns {string} Cardinal direction (N, NE, E, etc.)
 */
export function getWindDirection(degrees) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round((degrees % 360) / 22.5) % 16;
    return directions[index];
}

/**
 * Estimate visibility based on weather code
 * @param {number} code - WMO weather code
 * @param {string} units - 'metric' or 'imperial'
 * @returns {number} Estimated visibility in km or miles
 */
export function getVisibilityFromWeatherCode(code, units) {
    const isMetric = units === 'metric';
    
    // Visibility values by condition for metric/imperial
    const visibilityValues = {
        fog: isMetric ? 1 : 0.6,         // 1 km or 0.6 miles
        rain: isMetric ? 5 : 3.1,         // 5 km or 3.1 miles
        snow: isMetric ? 3 : 1.9,         // 3 km or 1.9 miles
        thunderstorm: isMetric ? 2 : 1.2, // 2 km or 1.2 miles
        default: isMetric ? 10 : 6.2      // 10 km or 6.2 miles (good visibility)
    };
    
    // Determine weather condition
    if (code >= 45 && code <= 48) { 
        return visibilityValues.fog;
    }
    
    if ((code >= 51 && code <= 55) || (code >= 61 && code <= 65)) {
        return visibilityValues.rain;
    }
    
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
        return visibilityValues.snow;
    }
    
    if (code >= 95 && code <= 99) {
        return visibilityValues.thunderstorm;
    }
    
    return visibilityValues.default;
}