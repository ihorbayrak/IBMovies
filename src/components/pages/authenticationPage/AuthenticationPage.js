import SignInForm from '../../signInForm/SignInForm';
import SignUpForm from '../../signUpForm/SignUpForm';

import './authenticationPage.scss';

const AuthenticationPage = () => {
    return (
        <div className='authentication__container'>
            <SignInForm />
            <SignUpForm />
        </div>
    );
};

export default AuthenticationPage;
