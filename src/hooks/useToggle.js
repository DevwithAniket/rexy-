/**
 * @copyright 2025 Aniket Chakraborty
 */

/**
 * Node Modules 
 */
import { useState, useCallback } from 'react';

/**
 * A custom React hook for managing a toggle state.
 * 
 * @returns {[boolean, Function]} An array containing the current toggle state and a function to toggle it.
 */
const useToggle = () => {
    const [isToggled, setIsToggled] = useState(false);

    const toggle = useCallback(() => {
        setIsToggled(prevState => !prevState);
    }, []);

    return [isToggled, toggle];
};

export { useToggle };
