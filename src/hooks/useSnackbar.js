/**
 * @copyright 2025 Aniket Chakraborty
 */

/**
 * Node Modules
 */
import { useContext } from "react";

/**
 * Context
 */
import { SnackbarContext } from "../contexts/SnackbarContext";

export const useSnackbar = () => useContext(SnackbarContext);