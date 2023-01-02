import * as yup from 'yup';

export const yupSchema = yup.object({
    displayName: yup.string().min(2, 'Min length is 2!').required('Please type your name'),
    email: yup.string().email('Invalid email address').required('Please type your email'),
    password: yup
        .string()
        .min(5, 'Must be 6 or more')
        .max(15, 'Must be 15 or less')
        .required('Please type your email'),
    confirmPassword: yup
        .string()
        .required('You must confirm your password')
        .oneOf([yup.ref('password')], 'Your passwords should match'),
});
