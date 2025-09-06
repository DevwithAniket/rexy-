/**
 * @copyright 2025 Aniket Chakraborty
 */

/**
 * Node modules
 */
import { Form, useNavigation, useActionData } from 'react-router-dom';
import { use, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

/**
 * Assets
 */
import { banner } from '../assets/assets';

/**
 * Custom Hooks
 */
import { useSnackbar } from '../hooks/useSnackbar';

/**
 * Components
 */
import PageTitle from '../components/PageTitle';
import TextField from '../components/TextField';
import {Button} from '../components/Button';
import { CircularProgress, LinearProgress } from '../components/Progress';
import Logo from '../components/Logo';

const ResetPassword = () => {
  // Get error data from form submission using useActionData (Likelly from react router)
  const error = useActionData();

  //Get Navigate state e.g. loading/ submitting etc
  const navigation = useNavigation();

  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    //Show snackbar with the Provider error message
    if (error?.message) {
      showSnackbar({
        message: error.message,
        type: 'error',
      });
    }
  }, [error, showSnackbar]);

  return (
    <>
      <PageTitle title='New Password' />

      <div className='relative w-screen h-dvh p-2 grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] lg:gap-2'>
        <div className='flex flex-col p-4'>
          <Logo classes='mb-auto mx-auto lg:mx-0'/>

          <div className='flex flex-col gap-2 max-w-[480px] w-full mx-auto'>
            <h2 className='text-displaySmall font-semibold text-light-onBackground dark:text-dark-onBackground text-center'>
              Set a new Password.
            </h2>

            <p className='text-bodyLarge text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mt-1 mb-5 text-center px-2'>
              Please, Choose a new password for your Rexy account. Must be atleast 8 characters.
            </p>

            <Form
              method='POST'
              className=' grid grid-cols-1 gap-4'
            >              
              <TextField
                type='password'
                name='password'
                label='Password'
                placeholder='New Password'
                required={true}
                autoFocus={true}
              />
              <Button
                type='submit'
                disabled={navigation.state === 'submitting'}
              >
                {navigation.state === 'submitting' ? (
                  <CircularProgress size='small' />
                ) : (
                  'Reset Password'
                )}
              </Button>
            </Form>
          </div>

          <p className='mt-auto mx-auto text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant text-bodyMedium lg:mx-0'>
            &copy; 2025 Aniket Chakraborty. All rights reserved.
          </p>
        </div>

        <div className='hidden img-box lg:block lg:relative lg:rounded-large'>
          <img
            src={banner}
            alt=''
            className='img-cover'
          />

          <p
            className='absolute bottom-10 left-12 right-12 z-10 text-displayMedium font-semibold leading-tight text-right
           text-light-onSurface drop-shadow-sm 2xl:text-[68px] '
          >
            Chat with Rexy to Boost your imagination.
          </p>
        </div>
      </div>

      <AnimatePresence>
      {navigation.state === 'loading' &&  (
        <LinearProgress classes='absolute top-0 left-0 right-0'/>
      )}
      </AnimatePresence>
    </>
  );
};

export default ResetPassword;
