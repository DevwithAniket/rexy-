/**
 * @copyright 2025 Aniket Chakraborty
 */

/**
 * Node Modules
 */
import { redirect } from 'react-router-dom';

/**
 * Custom modules
 */
import { account } from '../../lib/appwrite';

/**
 * Handle the login action
 */
const loginAction = async ({ request }) =>{
    //Retrieve the from data from the incoming request
    const formData = await request.formData();

    try {
        //Attempt to create a session using email and password from the form data
        await account.createEmailPasswordSession(
            formData.get('email'),
            formData.get('password')
        );

        //On successful login, redirect the user to the home page
        return redirect('/');
    } catch (error) {
        //Return an error response if login fails
        return{
            message: error.message,
        }
    }
};

export default loginAction;