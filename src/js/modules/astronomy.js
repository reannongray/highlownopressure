import { MOON_PHASES, PHASE_RANGES } from '../config.js';

/**
 * Helper function for calculating Julian date
 * @param {Date} date - Date to calculate for
 * @returns {number} Julian date
 */
export function calculateJulianDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    const day = date.getDate();
    
    if (month < 3) {
        year--;
        month += 12;
    }
    
    const a = Math.floor(year / 100);
    const b = Math.floor(a / 4);
    const c = 2 - a + b;
    const e = 365.25 * (year + 4716);
    const f = 30.6001 * (month + 1);
    
    return c + day + e + f - 1524.5;
}

/**
 * Calculate the moon phase value (0-1)
 * @param {Date} date - Date to calculate moon phase for
 * @returns {number} Moon phase as value between 0-1
 */
export function calculateMoonPhaseValue(date) {
    const jd = calculateJulianDate(date);
    
    // Days since new moon on Jan 6, 2000
    const daysSinceNew = jd - 2451549.5;
    const newMoons = daysSinceNew / 29.53;
    return newMoons - Math.floor(newMoons);
}

/**
 * Check if phase is a new moon at end of cycle
 * @param {number} phase - Moon phase value (0-1)
 * @returns {boolean} True if new moon at end of cycle
 */
export function isNewMoonAtEndOfCycle(phase) {
    return phase > 0.975;
}

/**
 * Get moon phase category based on phase value
 * @param {number} phase - Moon phase value (0-1)
 * @returns {Object} Moon phase details object
 */
export function getMoonPhaseCategory(phase) {
    // Special case for new moon at end of cycle
    if (isNewMoonAtEndOfCycle(phase)) {
        return MOON_PHASES.NEW_MOON;
    }
    
    // Check each phase range
    for (const range of PHASE_RANGES) {
        if (phase < range.max) {
            return MOON_PHASES[range.phase];
        }
    }
    
    // Fallback (shouldn't happen with proper ranges)
    return MOON_PHASES.WANING_CRESCENT;
}

/**
 * Get complete moon phase information
 * @param {Date} date - Date to get moon phase for
 * @returns {Object} Moon phase details object
 */
export function getMoonPhase(date) {
    const phase = calculateMoonPhaseValue(date);
    return getMoonPhaseCategory(phase);
}