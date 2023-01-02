import { useSelector, useDispatch } from 'react-redux';

import { filterChanged } from '../../utils/reducers/filtersSlice/filtersSlice';

import './appFIlters.scss';

const AppFilters = () => {
    const { filters, activeFilter } = useSelector((state) => state.filters);
    const dispatch = useDispatch();

    const renderFilters = (arr) => {
        return arr.map(({ label, period }) => {
            const classNames =
                period === activeFilter ? 'app__filter app__filter_active' : 'app__filter';

            return (
                <li
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            dispatch(filterChanged(period));
                        }
                    }}
                    tabIndex={0}
                    key={period}
                    className={classNames}
                    onClick={() => dispatch(filterChanged(period))}
                >
                    {label}
                </li>
            );
        });
    };

    const elements = renderFilters(filters);

    return (
        <nav className='app__filters'>
            <ul className='filters__wrapper'>{elements}</ul>
        </nav>
    );
};

export default AppFilters;
