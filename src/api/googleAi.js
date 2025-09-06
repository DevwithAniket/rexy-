/**
 * @copyright 2025 Aniket Chakraborty
 */

import model from "../lib/googleAi";

/**
 * Generates a short conversation title based on the user prompt.
 * 
 * This function utilizes the Google Generative AI model to create a concise title
 * for a conversation. It sends the user prompt to the to the model and request a
 * generated response containign a single short title.
 * 
 * @async
 * @function getConversationTitle
 * @param {string} userPrompt - The text input from which the title will be generated.
 * @returns {Promise<string>} - A promise that resolves to the generated conversation title as a plain text string 
 */
const getConversationTitle = async (userPrompt) => {
    try{    
        const result = await model.generateContent(
            `Given a user prompt , generate a concise and informative title that accurately describes the conversation. Consider the keywords, topics, and the overall intent of the prompt. Response in plain text format, not makrdown.
            
            Prompt: ${userPrompt}`,
        );
        return result.response.text();
    }catch (error) {
        console.log(`Error generating conversation title: ${error.message}`);
    }
};

/**
 * Generates a response from AI model based on the user's prompt and chat history
 * 
 * @param {string} userPrompt: The user's input prompt  
 * @param {Array<{ user_prompt: string, ai_response: string }>} chats An Array of previous user prompts and AI responses, used to provide context to the model
 * @returns {Promise<string>}  A promise that resolves with AI's response, or rejects with an error.
 */
const getAiResponse = async (userPrompt, chats = [])=>{
    const history = [];
    chats.forEach(({ user_prompt, ai_response }) => {
        history.push(
            {
                role: 'user',
                parts: [{ text: user_prompt }]
            },
            {
                role: 'model',
                parts: [{ text: ai_response }]
            },
        );
    });

    try{
        model.generationConfig = { temperature: 1.5 }
        const chat = model.startChat({ history });
        const result = await chat.sendMessage(userPrompt);

        return result.response.text();
    } catch (error){
        console.log(`Error Generating AI response: ${error.message}`);
    }
}

export { getConversationTitle, getAiResponse };