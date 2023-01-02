import { useState } from 'react';

import { useForm } from 'react-hook-form';

import {
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
} from '../../utils/firebase/firebase';

import './signInForm.scss';

const SignInForm = () => {
    const [errorType, setErrorType] = useState('');

    const { register, handleSubmit, reset } = useForm();

    const onSubmitForm = async (data) => {
        const { email, password } = data;

        try {
            await signInAuthUserWithEmailAndPassword(email, password);

            await setErrorType('');
            reset();
        } catch (error) {
            setErrorType(error.code);
        }
    };

    const errorMessage = (errorType) => {
        switch (errorType) {
            case 'auth/email-already-in-use':
                return 'This email already in use';
            default:
                return 'Something went wrong during registration, try again';
        }
    };

    const error = errorMessage(errorType);

    return (
        <section className='sign-in'>
            <h2 className='title'>Already have an account?</h2>
            <span>Sign in with your email</span>
            <form className='authentication__form' onSubmit={handleSubmit(onSubmitForm)}>
                <p className='error-message'>{errorType && error}</p>
                <input type='email' {...register('email')} placeholder='Please type your email' />
                <input
                    type='password'
                    {...register('password')}
                    placeholder='Please type your password'
                />
                <div className='button__group'>
                    <button type='submit' className='authentication__button'>
                        Sign In
                    </button>
                    <button
                        type='button'
                        className='authentication__button authentication__button_blue'
                        onClick={signInWithGooglePopup}
                    >
                        Sign In with Google
                    </button>
                </div>
            </form>
        </section>
    );
};

export default SignInForm;
