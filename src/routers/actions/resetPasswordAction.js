/**
 * @copyright 2025 Aniket Chakraborty
 */

/**
 * Node modules
 */
import { redirect } from "react-router-dom";

/**
 * Custom Modules
 */
import { account } from "../../lib/appwrite";
import { form } from "framer-motion/client";

const resetPasswordAction = async ({ request }) => {
    const formData = await request.formData();
    const url = new URL(request.url);

    try {
        await account.updateRecovery(
            url.searchParams.get('userId'),
            url.searchParams.get('secret'),
            formData.get('password')
        );
        return redirect('/login');
    } catch (error) {
        console.log(`Error in resetting password: ${error.message}`);

        return{
            message: error.message,
        }
    }
};

export default resetPasswordAction;