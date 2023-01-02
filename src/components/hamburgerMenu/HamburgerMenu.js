import { useDispatch, useSelector } from 'react-redux';
import { closeHamburgerMenu } from '../../utils/reducers/navMenuSlice/navMenuSlice';

import { NavLink } from 'react-router-dom';

import './hamburgerMenu.scss';

const HamburgerMenu = () => {
    const { menuLinks, hamburgerMenuActive } = useSelector((state) => state.navMenu);
    const dispatch = useDispatch();

    const renderLinks = (arr) => {
        return arr.map(({ id, label, route }) => {
            return (
                <li key={id}>
                    <NavLink to={`${route}`} className='hamburger__link'>
                        {label}
                    </NavLink>
                </li>
            );
        });
    };

    const elements = renderLinks(menuLinks);

    return (
        <div
            className={
                hamburgerMenuActive ? 'hamburger__menu hamburger__menu_active' : 'hamburger__menu'
            }
            onClick={() => dispatch(closeHamburgerMenu())}
        >
            <div className='hamburger__overlay'></div>

            <div className='hamburger__menu-content' onClick={(e) => e.stopPropagation()}>
                <ul>{elements}</ul>
            </div>
        </div>
    );
};

export default HamburgerMenu;
