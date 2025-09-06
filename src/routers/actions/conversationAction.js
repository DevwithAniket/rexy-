/**
 * @copyright 2025 Aniket Chakraborty
 */

/**
 * Custom Modules
 */
import { databases } from "../../lib/appwrite";
import { getAiResponse } from "../../api/googleAi";
import generateID from "../../utils/generateID";

/**
 * Handles the conversation Action, processing the user's prompt and storing the AI response in the database.
 * 
 * @async
 * @param {Object} context - the context object containing the request and params.
 * @param {Object} request - the request object containing the form data of the client 
 * @param {Object} params - The route parameters
 * @returns {Promise<null>} Returns numm after processing and storing data
 * 
 * @throws will log an error message to the console if storing data fails.    
 */
const conversationAction = async ({ request, params }) => {
    const { conversationId } = params;
    const formData = await request.formData();
    const userPrompt = formData.get('user_prompt');

    let chatHistory = [];
    let aiResponse = '';

    try{
        const { chats } = await databases.getDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            'conversations',
            conversationId
        );
        chatHistory = chats.map(({ user_prompt, ai_response }) =>{
            return { user_prompt, ai_response }
        });
    } catch (error) {
        console.log(`Error getting chats: ${error.message}`);
    }

    try {
        aiResponse = await getAiResponse(userPrompt, chatHistory);

    } catch (error){
        console.log(`Error getting Gemini response: ${error.message}`);
    }

    try{
        await databases.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            'chats',
            generateID(),
            {
                user_prompt: userPrompt,
                ai_response: aiResponse,
                conversation: conversationId
            }
        )
    } catch (error){
        console.log(`Error storing chat: ${error.message}`);
    }

    return null;
};

export default conversationAction;