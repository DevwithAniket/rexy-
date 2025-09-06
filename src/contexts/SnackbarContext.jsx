/**
 * @copyright 2025 Aniket Chakraborty
 */

/**
 * Node modules
 */
import {
  createContext,
  useState,
  useRef,
  useCallback,
  useMemo,
  use,
} from 'react';
import PropTypes from 'prop-types';

/**
 * Components
 */
import Snackbar from '../components/Snackbar';

const initialCtxValue = {
  snackbar: {
    open: false,
    message: '',
    type: 'info',
  },
  showSnackbar: ({ message, type = 'info', timeOut = 5000 }) => {},
  closeSnackbar: () => {},
};

export const SnackbarContext = createContext(initialCtxValue);

const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: 'info',
  });

  const timeoutRef = useRef();

  //Show Snackbar
  const showSnackbar = useCallback(
    ({ message, type = 'info', timeOut = 5000 }) => {
      //Clear any existing timeout to avoid multiple timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      //set the new snackbar messagw and type
      setSnackbar({ open: true, message, type });

      //Automatically close the snackbar after the timeout
      timeoutRef.current = setTimeout(() => {
        setSnackbar((prev) => {
          return {
            ...prev,
            open: false,
          };
        });
      }, timeOut);
    },
    []
  );

  //Hide snackbar auitomatically if needed
  const closeSnackbar = useCallback(() => {
    //Clear any existong timeout to prevent overlap
    if (timeoutRef.current)clearTimeout(timeoutRef.current);
    setSnackbar({open: false, message: '', type: 'info'});
  },[])

  //Memorize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => {
    return { showSnackbar, closeSnackbar };
  }, [showSnackbar, closeSnackbar]);

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}

      <Snackbar snackbar={snackbar}/>
    </SnackbarContext.Provider>
  );
};

SnackbarProvider.propTypes = {
  children: PropTypes.any,
};

export default SnackbarProvider;
