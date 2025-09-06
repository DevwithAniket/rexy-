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

const loginLoader = async () => {
    try{
        //Attempt to retrieve the user's Acoount information
      await account.get();
    }catch(error){
        console.log(`Error getting user session: ${error.message}`);
        return null;
    };

    //If account retrieval is successful, redirect to the home page('/')
    return redirect('/');
};

export default loginLoader;