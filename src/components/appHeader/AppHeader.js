import { useEffect } from 'react';

import { NavLink, Link } from 'react-router-dom';
import {
    onAuthStateChangedListener,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, removeCurrentUser } from '../../redux/reducers/authSlice/authSlice';
import { toggleHamburgerMenu } from '../../redux/reducers/navMenuSlice/navMenuSlice';

import LoggedUser from '../loggedUser/LoggedUser';
import AppNavigation from '../appNavigation/AppNavigation';

import './appHeader.scss';

import logo from '../../assets/blue-logo.svg';

const AppHeader = () => {
    const { isLoggedIn, authUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                const { displayName, email, uid } = user;

                createUserDocumentFromAuth(user);

                const authUserObj = {
                    id: uid,
                    userName: displayName ? displayName : email.slice(0, email.indexOf('@')),
                    email,
                };
                dispatch(setCurrentUser(authUserObj));
            }

            if (!user) {
                dispatch(removeCurrentUser());
            }
        });

        return unsubscribe;
    }, []);

    return (
        <header className='app__header'>
            <div className='hamburger' onClick={() => dispatch(toggleHamburgerMenu())}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <NavLink to='/' className='app__logo'>
                <img src={logo} alt='TMDB Logo' />
            </NavLink>

            <AppNavigation />

            {isLoggedIn ? (
                <LoggedUser userName={authUser.userName} />
            ) : (
                <Link className='app__auth' to='authentication'>
                    Sign In / Sign Up
                </Link>
            )}
        </header>
    );
};

export default AppHeader;
