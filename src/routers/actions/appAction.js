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
import { account, databases } from '../../lib/appwrite';
import { getConversationTitle, getAiResponse } from '../../api/googleAi';
import generateID from '../../utils/generateID';


/**
 * Handles the user promt action, creating a conversation and storing both the user's prompt and the AI- genarated response.
 * 
 * @async
 * @function userPromptAction
 * @param {FormData} formData - The formData containing the user's prompt.
 * @returns {Promise<void>} - Redirects user to the newly created conversation page.
 */
const userPromptAction = async (formData) => {
    const userPrompt = formData.get('user_prompt');

    // Get current user info
    const user = await account.get();

    //get a conversation title based on the user's prompt
    const conversationTitle = await getConversationTitle(userPrompt);
    let conversation = null; 
    
    try{
        //Create a new conversation document in the appwrite database 
        conversation = await databases.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            'conversations', 
            generateID(),
            {
                title: conversationTitle,
                user_id: user.$id,
            }
        )
    } catch (error) {
        console.log(`Error creating conversation: ${error.message}`);
    }

    //Generate an AI resposne based on the user's prompt
    const aiResponse = await getAiResponse(userPrompt);

    try{
        // Create a new chat document in the 'chats' collection
        await databases.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            'chats',
            generateID(),
            {
                user_prompt: userPrompt,
                ai_response: aiResponse,
                conversation: conversation.$id,
            }
        );
        
    } catch (error){
        console.log(`Error creating chat: ${error.message}`);
    }

    return redirect(`/${conversation.$id}`);
};

/**
 * Deletes a conversation document from the database and returns the conversation title.
 * 
 * @async
 * @function conversationAction
 * @param {FormData} formData - the form data containing the conversation details
 * @returns {Promise<Object>} Returns an object containing the conversation title after deletion
 * @throws Will throw an error if the deletion process fails. 
 */
const conversationAction = async (formData) => {
    const conversationId = formData.get('conversation_id');
    const conversationTitle = formData.get('conversation_title');

    try{
        await databases.deleteDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            'conversations',
            conversationId
        );

        return { conversationTitle }
    } catch(error) {
        console.log(`Error in deleting conversation: ${error.message}`);
    }
}

/**
 * Handles incoming requests based on the request type. form data
 * 
 * @async
 * @function appAction
 * @param {Object} request - The incoming request object containing the form data.
 * @returns {Promise<*>} - Returns the result of the action based on the 'request_type' (e.g., 'userPromptAction' or 'conversationAction').
 */

const appAction = async ({ request }) => {
    const formData = await request.formData();
    const requestType = formData.get('request_type');

    if(requestType === 'user_prompt') {
        return await userPromptAction(formData);
    }

    if (requestType === 'delete_conversation') {
        return await conversationAction(formData);
    }
};

export default appAction;