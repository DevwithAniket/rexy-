/**
 * @copyright 2025 Aniket Chakraborty
 */

/**
 * Node Modules
 */
import { redirect } from 'react-router-dom';

/**
 * Custom Modules
 */
import { account } from '../../lib/appwrite';

const resetPasswordLoader = async ({ request }) => {
    const url = new URL(request.url);

    try{
        //Attempt to retrieve the user's Acoount information
      await account.get();

      
    //If account retrieval is successful, redirect to the home page('/')
    return redirect('/');
    }catch(error){
        console.log(`Error getting user session: ${error.message}`);
    };

    if (!url.searchParams.get('userId') && !url.searchParams.get('secret')) {
        // If the email parameter is not present, redirect to the reset link page
        return redirect('/reset-link');
    }

    return null;
};

export default resetPasswordLoader;