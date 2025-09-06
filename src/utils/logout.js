/**
 * @copyright 2025 Aniket Chakraborty
 */

/**
 * Custom modules
 */
import { account } from "../lib/appwrite";

/**
 * Logs out the user by deleting the current session. and navigates them to the login page
 * 
 * @async
 * @function logout
 * @param {Function} navigate - The navigation function to redirect the user after logout.
 * @returns {Promise<void>} A promise that resolves when the logout is complete and the user is redirected.
 * @throws {Error} If there is an error while deleting the session.The error will be logged to the console.
 */
const logout = async (navigate) => {
    try{
        await account.deleteSession('current');
    } catch (error) {
        return console.log(`Error deleting user session: ${error.message}`);
    }

    return navigate('/login');
};

export default logout;