import { CONFIG } from '../config.js';

/**
 * Initialize temperature chart
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @returns {Chart} Chart instance
 */
export function initializeTempChart(ctx) {
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Temperature',
                data: [],
                borderColor: 'rgba(255, 255, 255, 0.8)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: 'white',
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { display: false },
                x: { 
                    display: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            size: 10
                        }
                    }
                }
            },
            elements: {
                line: {
                    borderWidth: 2
                }
            }
        }
    });
}

/**
 * Initialize hourly temperature chart
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @returns {Chart} Chart instance
 */
export function initializeHourlyChart(ctx) {
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Temperature',
                data: [],
                borderColor: '#75b4e3',
                backgroundColor: 'rgba(117, 180, 227, 0.2)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#8fe0ff',
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y + (CONFIG.units === 'metric' ? '°C' : '°F');
                            }
                            return label;
                        }
                    }
                },
                legend: { display: false }
            },
            scales: {
                y: { 
                    display: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        callback: function(value) {
                            return value + (CONFIG.units === 'metric' ? '°C' : '°F');
                        }
                    }
                },
                x: { 
                    display: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        maxRotation: 0
                    }
                }
            }
        }
    });
}

/**
 * Initialize precipitation chance chart
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @returns {Chart} Chart instance
 */
export function initializePrecipChart(ctx) {
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Precipitation Chance',
                data: [],
                backgroundColor: '#8fe0ff',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + '%';
                        }
                    }
                },
                legend: { display: false }
            },
            scales: {
                y: { 
                    display: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    min: 0,
                    max: 100,
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: { 
                    display: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        maxRotation: 0
                    }
                }
            }
        }
    });
}

/**
 * Initialize air quality index chart
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @returns {Chart} Chart instance
 */
export function initializeAQIChart(ctx) {
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['PM2.5', 'PM10', 'SO₂', 'NO₂', 'O₃', 'CO'],
            datasets: [{
                label: 'Air Quality',
                data: [0, 0, 0, 0, 0, 0],
                backgroundColor: [
                    'rgba(74, 222, 128, 0.7)',   // PM2.5 - green
                    'rgba(96, 165, 250, 0.7)',   // PM10 - blue
                    'rgba(245, 158, 11, 0.7)',   // SO2 - amber
                    'rgba(248, 113, 113, 0.7)',  // NO2 - red
                    'rgba(139, 92, 246, 0.7)',   // O3 - purple
                    'rgba(236, 72, 153, 0.7)'    // CO - pink
                ],
                borderWidth: 0,
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',  // This makes the bars horizontal
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw.toFixed(1);
                            // CO is measured in mg/m³, others in µg/m³
                            return `${value} ${context.dataIndex === 5 ? 'mg/m³' : 'µg/m³'}`;
                        }
                    }
                }
            },
            scales: {
                y: { 
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            size: 12
                        }
                    }
                },
                x: { 
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

/**
 * Initialize all charts
 * @param {Object} elements - DOM elements for chart canvases
 * @returns {Object} Chart instances
 */
export function initializeCharts(elements) {
    const charts = {};
    
    if (elements.tempChart) {
        const tempCtx = elements.tempChart.getContext('2d');
        charts.tempChart = initializeTempChart(tempCtx);
    }
    
    if (elements.hourlyChart) {
        const hourlyCtx = elements.hourlyChart.getContext('2d');
        charts.hourlyChart = initializeHourlyChart(hourlyCtx);
    }
    
    if (elements.precipChart) {
        const precipCtx = elements.precipChart.getContext('2d');
        charts.precipChart = initializePrecipChart(precipCtx);
    }
    
    if (elements.aqiChart) {
        const aqiCtx = elements.aqiChart.getContext('2d');
        charts.aqiChart = initializeAQIChart(aqiCtx);
    }
    
    return charts;
}

/**
 * Process hourly data for charts
 * @param {Object} data - Hourly weather data
 * @returns {Object} Processed data for charts
 */
export function processHourlyData(data) {
    const currentHour = new Date().getHours();
    
    // Get 24 hours of data starting from current hour
    const hours = data.hourly.time
        .slice(currentHour, currentHour + 24)
        .map(time => new Date(time).getHours() + 'h');
    
    const temps = data.hourly.temperature_2m.slice(currentHour, currentHour + 24);
    const precip = data.hourly.precipitation_probability.slice(currentHour, currentHour + 24);
    
    return { hours, temps, precip };
}

/**
 * Update chart data and redraw
 * @param {Chart} chart - Chart.js instance
 * @param {Array} labels - X-axis labels
 * @param {Array} data - Y-axis data points
 */
export function updateChartData(chart, labels, data) {
    if (!chart) return;
    
    if (labels) {
        chart.data.labels = labels;
    }
    chart.data.datasets[0].data = data;
    chart.update();
}