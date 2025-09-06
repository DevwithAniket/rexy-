/**
 * @copyright 2025 Aniket Chakraborty
 */

/**
 * Node Modules
 */
import { redirect } from "react-router-dom";

/**
 * Cusotm Modules
 */
import { account, databases } from "../../lib/appwrite";

const conversationLoader = async({ params }) => {
    const { conversationId } = params;
    const data = {}

    try{
        //Attempt to retrieve the user's account information
        data.user = await account.get();
    } catch (error){
        console.log(`Error Getting User Account: ${error.message}`);
        //If there's an error gettign the user, log it and redirect to the login page.
        return redirect('/login');
    }

    try{
        //Attempt to fetch the conversation document from the Appwrite database
        data.conversation = await databases.getDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            'conversations',
            conversationId
        );
    } catch (error){
        //If there's an error fetching the conversation, log it and re-throw the error.
        console.log(`Error getting Conversation: ${error.message}`);
        throw error; // Re-throw the error so it can be handled by the Error Boundary or a suitable componenet.
    }

    //Return the data object containing user and conversation information
    return data;
}

export default conversationLoader;