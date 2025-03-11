// Import from modules
import { CONFIG } from './config.js';
import { getGeocodingData, getAllWeatherData } from './modules/api.js';
import { initializeCharts } from './modules/charts.js';
import { 
    updateUI, 
    showLoading, 
    hideLoading, 
    updateThemeIcon,
    updateDateTime 
} from './modules/ui.js';

// Global state
let charts = {};
let weatherData = {
    current: null,
    hourly: null
};

// DOM Elements
const DOM = {
    location: document.querySelector('.location'),
    currentTemp: document.querySelector('.current-temp'),
    weatherDesc: document.querySelector('.weather-desc'),
    weatherIcon: document.querySelector('.current-weather-icon'),
    snarkyForecast: document.querySelector('.snarky-forecast p'),
    date: document.querySelector('.current-date'),
    time: document.querySelector('.current-time'),
    searchInput: document.getElementById('location-search'),
    forecastContainer: document.querySelector('.forecast-cards'),
    uvValue: document.querySelector('.uv-value'),
    uvStatus: document.querySelector('.status'),
    uvFill: document.querySelector('.uv-fill'),
    windSpeed: document.querySelector('.wind-speed'),
    windDirection: document.querySelector('.wind-dir-text'),
    humidityValue: document.querySelector('.humidity-value'),
    humidityFill: document.querySelector('.humidity-fill'),
    visibilityValue: document.querySelector('.visibility-value'),
    visibilityText: document.querySelector('.visibility-text'),
    sunriseTime: document.querySelector('.sunrise-time'),
    sunsetTime: document.querySelector('.sunset-time'),
    unitsToggle: document.querySelector('.units-toggle'),
    themeToggle: document.querySelector('.theme-toggle'),
    loadingOverlay: document.querySelector('.loading-overlay')
};

// Chart elements
const chartElements = {
    tempChart: document.getElementById('tempChart'),
    hourlyChart: document.getElementById('hourlyChart'),
    precipChart: document.getElementById('precipChart'),
    aqiChart: document.getElementById('aqiChart')
};

/**
 * Initialize the app
 */
async function initializeApp() {
    // Show loading overlay
    showLoading(DOM.loadingOverlay);

    // Initialize charts
    charts = initializeCharts(chartElements);

    // Set up event listeners
    setupEventListeners();

    // Get weather data for default location
    await getWeatherData(
        CONFIG.defaultLocation.latitude, 
        CONFIG.defaultLocation.longitude, 
        CONFIG.defaultLocation.name
    );

    // Hide loading overlay
    hideLoading(DOM.loadingOverlay);
    
    // Set up auto-refresh
    setAutoRefresh();
}

/**
 * Set up automatic data refresh and time updates
 */
function setAutoRefresh() {
    // Update date and time every minute
    setInterval(() => {
        updateDateTime(DOM);
    }, 60000);
    
    // Refresh weather data every 30 minutes
    setInterval(() => {
        // Using optional chaining for better readability
        if (weatherData.current?.current) {
            getWeatherData(
                weatherData.current.current.latitude,
                weatherData.current.current.longitude,
                DOM.location.textContent
            );
        }
    }, 1800000); // 30 minutes
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
    // Search input
    DOM.searchInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            handleSearch(e.target.value.trim());
        }
    });

    // Units toggle
    DOM.unitsToggle.addEventListener('click', () => {
        toggleUnits();
    });

    // Theme toggle
    DOM.themeToggle.addEventListener('click', () => {
        toggleTheme();
    });
}

/**
 * Handle search input
 * @param {string} location - Location to search for
 */
async function handleSearch(location) {
    if (!location) return;
    
    showLoading(DOM.loadingOverlay);
    
    try {
        const geoData = await getGeocodingData(location);
        if (geoData) {
            await getWeatherData(geoData.latitude, geoData.longitude, geoData.name);
        }
    } catch (error) {
        console.error('Error getting location data:', error);
        alert('Could not find location. Please try again.');
    }
    
    hideLoading(DOM.loadingOverlay);
}

/**
 * Toggle between metric and imperial units
 */
function toggleUnits() {
    CONFIG.units = CONFIG.units === 'metric' ? 'imperial' : 'metric';
    DOM.unitsToggle.textContent = CONFIG.units === 'metric' ? '°C' : '°F';
    
    // Update UI with new units
    if (weatherData.current && weatherData.hourly) {
        updateUI(
            weatherData.current, 
            weatherData.current, 
            weatherData.hourly, 
            DOM, 
            charts
        );
    }
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    updateThemeIcon(DOM.themeToggle);
}
/**
* Get weather data from API and update UI
* @param {number} latitude - Location latitude
* @param {number} longitude - Location longitude
* @param {string} locationName - Location name to display
*/
async function getWeatherData(latitude, longitude, locationName) {
   try {
       const data = await getAllWeatherData(latitude, longitude);
       
       // Store data globally
       weatherData.current = data.current;
       weatherData.hourly = data.hourly;
       
       // Update the UI - passing the correct data structure
       // data.current is the API response with the current weather data
       updateUI(data.current, data.current, data.hourly, DOM, charts);
       
       // Set location name
       DOM.location.textContent = locationName;
   } catch (error) {
       console.error('Weather data fetch error:', error);
       alert('Error fetching weather data. Please try again.');
   }
}

/**
 * Handle errors gracefully
 * @param {Error} error - Error object
 * @param {string} context - Context where error occurred
 */
function handleError(error, context = 'Application') {
    console.error(`${context} error:`, error);
    
    // Show error message to user
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerHTML = `
        <div class="error-content">
            <i class="ri-error-warning-line"></i>
            <h3>Something went wrong</h3>
            <p>${error.message || 'An unexpected error occurred.'}</p>
            <button id="dismiss-error">Dismiss</button>
        </div>
    `;
    
    document.body.appendChild(errorMessage);
    
    // Add dismiss functionality
    document.getElementById('dismiss-error').addEventListener('click', () => {
        errorMessage.remove();
    });
    
    // Auto dismiss after 10 seconds
    setTimeout(() => {
        if (document.body.contains(errorMessage)) {
            errorMessage.remove();
        }
    }, 10000);
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeApp().catch(error => handleError(error, 'Initialization'));
});

// Setup additional styling for loading state if not in CSS
document.addEventListener('DOMContentLoaded', function() {
    // Add loading overlay styles if not already present
    if (!document.querySelector('#loading-styles')) {
        const style = document.createElement('style');
        style.id = 'loading-styles';
        style.textContent = `
            .loading-overlay {
                opacity: 0;
                visibility: hidden;
            }
            
            .loading-overlay.active {
                opacity: 1;
                visibility: visible;
            }
        `;
        document.head.appendChild(style);
    }
});

// Export anything needed for testing
export {
    initializeApp,
    getWeatherData,
    toggleUnits,
    toggleTheme
};