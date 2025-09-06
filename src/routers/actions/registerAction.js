/**
 * @copyright 2025 Aniket Chakraborty
 */

/**
 * Node modules
 */
import { redirect } from 'react-router-dom';

/**
 * Custom modules
 */
import { account } from '../../lib/appwrite';
import generateID from '../../utils/generateID';

/**
 * Handles user registration 
 */
const registerAction = async ({request})=> {
    //Retrieve the form data from the incoming request
    const formData = await request.formData();
    
    try {
        //Create a new user using the provided email, password and name
        await account.create(
            generateID(), //Generates a unique ID for the user
            formData.get('email'), //Retrieve Email from form data
            formData.get('password'), //Retrieve Password from form data
            formData.get('name'), //Retrieve Name from form data
        );
    }catch(error) {
        //Returns an error object if account creation fails
        return{
            message: error.message, //Error message from the caught error
        }

    }

    //After successfully creating an account, login the user and redirect them to the HomePage
    try{
        //Create a sesssion for new user with provided email and password
        await account.createEmailPasswordSession(
            formData.get('email'),
            formData.get('password'),
        );
    }catch(error){
        //Logs any error during session creation and redirect to login page
        console.log(`Error creating email session : ${err.message}`);
            return redirect('/login');
    }

    //redirect the user to the home page upon successful registration and login 
    return redirect('/');
};

export default registerAction;