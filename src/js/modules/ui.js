import { CONFIG } from '../config.js';
import { 
    getWeatherDescription, 
    getVisibilityFromWeatherCode,
    formatDay,
    formatTime
} from './utils.js';
import { getWeatherIconClass, getSnarkyForecast, getWeatherType } from './weather.js';
import { updateChartData, processHourlyData } from './charts.js';
import { getMoonPhase } from './astronomy.js';

/**
 * Show loading overlay
 * @param {HTMLElement} loadingElement - Loading overlay element
 */
export function showLoading(loadingElement) {
    loadingElement.classList.add('active');
}

/**
 * Hide loading overlay
 * @param {HTMLElement} loadingElement - Loading overlay element
 */
export function hideLoading(loadingElement) {
    loadingElement.classList.remove('active');
}

/**
 * Update theme icon based on current theme
 * @param {HTMLElement} themeButton - Theme toggle button
 */
export function updateThemeIcon(themeButton) {
    const isDarkTheme = !document.body.classList.contains('light-theme');
    themeButton.innerHTML = isDarkTheme 
        ? '<i class="ri-sun-line"></i>' 
        : '<i class="ri-moon-line"></i>';
}

/**
 * Update the UI with weather data
 * @param {Object} current - Current weather data
 * @param {Object} forecast - Forecast data
 * @param {Object} hourly - Hourly forecast data
 * @param {Object} elements - DOM elements
 * @param {Object} charts - Chart instances
 */
export function updateUI(current, forecast, hourly, elements, charts) {
    updateCurrentWeather(current, elements);
    updateForecast(forecast, elements);
    updateHourlyCharts(hourly, charts);
    updateDateTime(elements);
    
    // Update UI elements based on data
    updateUVIndex(forecast.daily.uv_index_max[0], elements);
    updateWindStatus(current.current.wind_speed_10m, current.current.wind_direction_10m, elements);
    updateHumidity(current.current.relative_humidity_2m, elements);
    updateVisibility(current.current.weather_code, elements);
    updateSunTimes(forecast.daily.sunrise[0], forecast.daily.sunset[0], elements);
    
    // Update mock AQI data and moon phase
    updateAirQuality(elements, charts);
    updateMoonPhase(elements);
}

/**
 * Update current weather display
 * @param {Object} data - Current weather data
 * @param {Object} elements - DOM elements
 */
export function updateCurrentWeather(data, elements) {
    const currentTemp = Math.round(data.current.temperature_2m);
    const weatherCode = data.current.weather_code;
    const weatherDesc = getWeatherDescription(weatherCode);
    const weatherIconClass = getWeatherIconClass(weatherCode, data.current.is_day);
    
    // Get weather type for snarky forecast
    const weatherType = getWeatherType(
        weatherCode, 
        currentTemp, 
        data.current.is_day,
        data.current.wind_speed_10m,
        data.current.relative_humidity_2m
    );
    
    // Update DOM elements
    elements.currentTemp.textContent = `${currentTemp}${CONFIG.units === 'metric' ? '°C' : '°F'}`;
    elements.weatherDesc.textContent = weatherDesc;
    elements.weatherIcon.className = `${weatherIconClass} current-weather-icon`;
    
    // Update snarky forecast
    elements.snarkyForecast.textContent = getSnarkyForecast(weatherType);
}

/**
 * Update the forecast cards
 * @param {Object} data - Forecast data
 * @param {Object} elements - DOM elements
 */
export function updateForecast(data, elements) {
    // Clear loading skeletons
    elements.forecastContainer.innerHTML = '';
    
    // Loop through each day in the forecast
    for (let i = 0; i < 7; i++) {
        const date = new Date(data.daily.time[i]);
        const dayName = formatDay(date, i);
        const weatherCode = data.daily.weather_code[i];
        const maxTemp = Math.round(data.daily.temperature_2m_max[i]);
        const minTemp = Math.round(data.daily.temperature_2m_min[i]);
        const weatherIconClass = getWeatherIconClass(weatherCode, true);
        
        // Create forecast card
        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
            <p class="forecast-day">${dayName}</p>
            <i class="${weatherIconClass}"></i>
            <p class="forecast-temp">${maxTemp}${CONFIG.units === 'metric' ? '°C' : '°F'}</p>
            <div class="forecast-temp-range">
                <span class="forecast-high">${maxTemp}°</span>
                <span class="forecast-low">${minTemp}°</span>
            </div>
        `;
        
        elements.forecastContainer.appendChild(forecastCard);
    }
}

/**
 * Update hourly charts
 * @param {Object} data - Hourly data
 * @param {Object} charts - Chart instances
 */
export function updateHourlyCharts(data, charts) {
    const { hours, temps, precip } = processHourlyData(data);
    
    // Update temperature chart
    updateChartData(charts.hourlyChart, hours, temps);
    
    // Update precipitation chart
    updateChartData(charts.precipChart, hours, precip);
    
    // Update temp chart in the current weather card (just 6 hours)
    updateChartData(charts.tempChart, hours.slice(0, 6), temps.slice(0, 6));
}

/**
 * Update UV index display
 * @param {number} uvIndex - UV index value
 * @param {Object} elements - DOM elements
 */
export function updateUVIndex(uvIndex, elements) {
    elements.uvValue.textContent = uvIndex;
    
    // Calculate percentage for UV fill (max UV index is 11)
    const percentage = (uvIndex / 11) * 100;
    elements.uvFill.style.width = `${percentage}%`;
    
    // Set status text and class
    let statusText, statusClass;
    
    if (uvIndex <= 2) {
        statusText = 'Low';
        statusClass = 'low';
    } else if (uvIndex <= 5) {
        statusText = 'Moderate';
        statusClass = 'normal';
    } else if (uvIndex <= 7) {
        statusText = 'High';
        statusClass = 'normal';
    } else if (uvIndex <= 10) {
        statusText = 'Very High';
        statusClass = 'high';
    } else {
        statusText = 'Extreme';
        statusClass = 'high';
    }
    
    elements.uvStatus.textContent = statusText;
    elements.uvStatus.className = `status ${statusClass}`;
}

/**
 * Update wind status
 * @param {number} speed - Wind speed
 * @param {number} direction - Wind direction in degrees
 * @param {Object} elements - DOM elements
 */
export function updateWindStatus(speed, direction, elements) {
    // Import required utility
    import('./utils.js').then(utils => {
        // Update wind speed
        elements.windSpeed.textContent = `${speed} ${CONFIG.units === 'metric' ? 'km/h' : 'mph'}`;
        
        // Update wind direction text
        elements.windDirection.textContent = utils.getWindDirection(direction);
        
        // Rotate the compass icon to match the wind direction
        const compassIcon = document.querySelector('.wind-direction i');
        compassIcon.style.transform = `rotate(${direction}deg)`;
    });
}

/**
 * Update humidity display
 * @param {number} humidity - Humidity percentage
 * @param {Object} elements - DOM elements
 */
export function updateHumidity(humidity, elements) {
    elements.humidityValue.textContent = `${humidity}%`;
    elements.humidityFill.style.width = `${humidity}%`;
}

/**
 * Update visibility display based on weather code
 * @param {number} code - Weather code
 * @param {Object} elements - DOM elements
 */
export function updateVisibility(code, elements) {
    const visibility = getVisibilityFromWeatherCode(code, CONFIG.units);
    
    elements.visibilityValue.textContent = `${visibility} ${CONFIG.units === 'metric' ? 'km' : 'mi'}`;
    
    let visibilityText;
    if (visibility <= 1) {
        visibilityText = 'Poor';
    } else if (visibility <= 5) {
        visibilityText = 'Moderate';
    } else {
        visibilityText = 'Good';
    }
    
    elements.visibilityText.textContent = visibilityText;
}

/**
 * Update sunrise and sunset times
 * @param {string} sunrise - Sunrise time ISO string
 * @param {string} sunset - Sunset time ISO string
 * @param {Object} elements - DOM elements
 */
export function updateSunTimes(sunrise, sunset, elements) {
    elements.sunriseTime.textContent = formatTime(new Date(sunrise));
    elements.sunsetTime.textContent = formatTime(new Date(sunset));
}

/**
 * Update date and time
 * @param {Object} elements - DOM elements
 */
export function updateDateTime(elements) {
    // Import required utility
    import('./utils.js').then(utils => {
        const now = new Date();
        elements.date.textContent = utils.formatDate(now);
        elements.time.textContent = `Local time: ${utils.formatTime(now)}`;
    });
}

/**
 * Update moon phase information
 * @param {Object} elements - DOM elements
 */
export function updateMoonPhase(elements) {
    const today = new Date();
    const moonPhase = getMoonPhase(today);
    
    // Update moon icon
    const moonIcon = document.querySelector('.moon-icon i');
    if (moonIcon) {
        moonIcon.className = moonPhase.icon;
    }
    
    // Update moon phase name and description
    const moonPhaseName = document.querySelector('.moon-phase-name');
    const moonPhaseDesc = document.querySelector('.moon-phase-desc');
    
    if (moonPhaseName) {
        moonPhaseName.textContent = moonPhase.name;
    }
    
    if (moonPhaseDesc) {
        moonPhaseDesc.textContent = moonPhase.description;
    }
}

/**
 * Generate mock AQI values
 * @returns {Object} Mock AQI data
 */
function generateMockAQIData() {
    return {
        value: Math.floor(Math.random() * 100),
        metrics: [
            Math.random() * 50,    // PM2.5
            Math.random() * 100,   // PM10
            Math.random() * 40,    // NO2
            Math.random() * 60,    // O3
            Math.random() * 20,    // SO2
            Math.random() * 30     // CO
        ]
    };
}

/**
 * Determine AQI status based on value
 * @param {number} value - AQI value
 * @returns {Object} Status text and class
 */
function determineAQIStatus(value) {
    if (value <= 50) {
        return {
            text: 'Good',
            class: 'good'
        };
    } 
    
    if (value <= 100) {
        return {
            text: 'Moderate',
            class: 'moderate'
        };
    } 
    
    return {
        text: 'Poor',
        class: 'poor'
    };
}

/**
 * Update UI with AQI information
 * @param {Object} elements - DOM elements
 * @param {Object} charts - Chart instances
 */
export function updateAirQuality(elements, charts) {
    const aqi = generateMockAQIData();
    const status = determineAQIStatus(aqi.value);
    
    // Update AQI badge
    const aqiBadge = document.querySelector('.aqi-badge');
    if (aqiBadge) {
        aqiBadge.textContent = status.text;
        aqiBadge.className = `aqi-badge ${status.class}`;
    }
    
    // Update AQI chart
    if (charts.aqiChart) {
        updateChartData(charts.aqiChart, undefined, aqi.metrics);
    }
    
    // Update AQI metrics
    updateAQIMetrics(aqi.metrics);
}

/**
 * Update AQI metric displays
 * @param {Array} metrics - Array of AQI metrics
 */
function updateAQIMetrics(metrics) {
    const metricElements = {
        pm25: document.querySelector('.pm25-value'),
        pm10: document.querySelector('.pm10-value'),
        no2: document.querySelector('.no2-value'),
        o3: document.querySelector('.o3-value'),
        so2: document.querySelector('.so2-value'),
        co: document.querySelector('.co-value')
    };
    
    if (metricElements.pm25) metricElements.pm25.textContent = `${metrics[0].toFixed(1)} µg/m³`;
    if (metricElements.pm10) metricElements.pm10.textContent = `${metrics[1].toFixed(1)} µg/m³`;
    if (metricElements.no2) metricElements.no2.textContent = `${metrics[3].toFixed(1)} µg/m³`;
    if (metricElements.o3) metricElements.o3.textContent = `${metrics[4].toFixed(1)} µg/m³`;
    if (metricElements.so2) metricElements.so2.textContent = `${metrics[2].toFixed(1)} µg/m³`;
    if (metricElements.co) metricElements.co.textContent = `${metrics[5].toFixed(1)} mg/m³`;
}