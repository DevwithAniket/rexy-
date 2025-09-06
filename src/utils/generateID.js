/**
 * @copyright 2025 Aniket Chakraborty
 */

/**
 * Generates a unique ID for a user by combining a random number and the current timestamp.
 * 
 * this function is used to create a unique identifier for a user, using th current time in miliseconds
 * (converted to a base 36 string) concatenated a random number,
 * also converted to a base 36 string sliced to remove unnecessary numbers.
 * 
 * @returns {string} A unique identifier string.
 */

export default function generateID() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
}