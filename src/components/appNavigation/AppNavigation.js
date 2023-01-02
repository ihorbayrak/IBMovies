import { useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';
import HamburgerMenu from '../hamburgerMenu/HamburgerMenu';

import './appNavigation.scss';

const AppNavigation = () => {
    const { menuLinks, hamburgerMenuActive } = useSelector((state) => state.navMenu);

    let activeClassName = 'app__menu-link app__menu-link_active';

    const renderLinks = (arr) => {
        return arr.map(({ id, label, route }) => {
            return (
                <li key={id}>
                    <NavLink
                        to={`${route}`}
                        className={({ isActive }) =>
                            isActive ? activeClassName : 'app__menu-link'
                        }
                    >
                        {label}
                    </NavLink>
                </li>
            );
        });
    };

    const elements = renderLinks(menuLinks);

    return (
        <>
            <nav className='app__menu'>
                <ul>{elements}</ul>
            </nav>
            {hamburgerMenuActive && <HamburgerMenu />}
        </>
    );
};

export default AppNavigation;
