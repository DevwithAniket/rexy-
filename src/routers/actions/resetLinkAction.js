/**
 * @copyright 2025 Aniket Chakraborty
 */

/**
 * Custom Modules
 */
import { account } from "../../lib/appwrite";

const resetLinkAction = async ({ request }) => {
    const formData = await request.formData();

    const email = formData.get('email');

    try{
        await account.createRecovery(email, `${location.origin}/reset-password`);

        return{
            ok: true,
            message: 'Recovery email sent successfully. Please check your inbox.'
        }
    }catch(error){
        console.log(`Error in getting password reset link : ${error.message}`);

        return {
            ok: false,
            message: error.message,
        }
    }
};

export default resetLinkAction;