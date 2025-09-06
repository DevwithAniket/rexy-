/**
 * @copyright 2025 Aniket Chakraborty
 */

/**
 * Node modules
 */
import { Client, Account, Avatars, Databases } from "appwrite";

/**
 * Initial appwrite client
 */
const client = new Client();

client.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID).setEndpoint('https://cloud.appwrite.io/v1');

/**
 * Appwrite account instance
 */
const account = new Account(client);

/**
 * Initial appwrite avatars instance
 */
const avatars = new Avatars(client);

/**
 * Initial appwrite Databases
 */
const databases = new Databases(client);

export { account, avatars, databases };