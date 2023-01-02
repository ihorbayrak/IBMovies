import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupSchema } from '../../utils/yupSchema/yupSchema';

import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase';

import './signUpForm.scss';

const SignUpForm = () => {
    const [errorType, setErrorType] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(yupSchema),
    });

    const onSubmitForm = async (data) => {
        const { displayName, email, password } = data;

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await setErrorType('');
            await createUserDocumentFromAuth(user, { displayName });
        } catch (error) {
            setErrorType(error.code);
        }

        reset();
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
        <section className='sign-up'>
            <h2 className='title'>Don't have an account?</h2>
            <span>Register now</span>
            <form className='authentication__form' onSubmit={handleSubmit(onSubmitForm)}>
                <p className='error-message'>{errorType && error}</p>
                <input
                    type='text'
                    {...register('displayName')}
                    placeholder='Please type your name'
                />
                <p className='authentication__error'>{errors.displayName?.message}</p>
                <input type='email' {...register('email')} placeholder='Please type your email' />
                <p className='authentication__error'>{errors.email?.message}</p>
                <input
                    type='password'
                    {...register('password')}
                    placeholder='Please type your password'
                />
                <p className='authentication__error'>{errors.password?.message}</p>

                <input
                    type='password'
                    {...register('confirmPassword')}
                    placeholder='Confirm your password'
                />
                <p className='authentication__error'>
                    {errors.confirmPassword && errors.confirmPassword.message}
                </p>

                <button className='authentication__button'>Sign Up</button>
            </form>
        </section>
    );
};

export default SignUpForm;
