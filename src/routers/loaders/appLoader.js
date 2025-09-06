/**
 * @copyright 2025 Aniket Chakraborty
 */

/**
 * Node Modules
 */
import { redirect } from "react-router-dom";
import { Query } from "appwrite";

/**
 * Custom Modules
 */
import { account, databases } from "../../lib/appwrite";

const appLoader = async () => {
    const data = {};

    try {
        //Attemp to retrieve the current user account's information
        data.user = await account.get();
    } catch (error) {
        console.log(`Error getting user session: ${error.message}`);
        //redirect the login page if login retrieval fails
        return redirect("/login");
    }

    try {
        data.conversations = await databases.listDocuments(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            'conversations',
            [
                Query.select(['$id', 'title']),
                Query.orderDesc('$createdAt'),
                Query.equal('user_id', data.user.$id),
            ],
        );
    } catch (error) {
        console.log(`Error getting conversation: ${error.message}`);
    }

    return data;
};

export default appLoader;