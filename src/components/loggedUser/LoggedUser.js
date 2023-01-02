import { useState } from 'react';

import { signOutUser } from '../../utils/firebase/firebase';
import { Link } from 'react-router-dom';

import { BiUserCircle } from 'react-icons/bi';

import './loggedUser.scss';

const LoggedUser = ({ userName }) => {
    const [isMenuActive, setIsMenuActive] = useState(false);

    const onActiveMenu = () => {
        setIsMenuActive((state) => !state);
    };

    return (
        <div className='app__auth'>
            <div className='logged-user'>
                <span>Hi {userName}</span>
                <button onClick={onActiveMenu} className='logged-user__icon'>
                    <BiUserCircle />
                </button>

                {isMenuActive && (
                    <div className='logged-user__menu'>
                        <ul>
                            <li>
                                <Link to='/watch-list' className='logged-user__menu-item'>
                                    Watch list
                                </Link>
                            </li>
                            <li className='logged-user__menu-item' onClick={signOutUser}>
                                Sign Out
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoggedUser;
