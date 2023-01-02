import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { removeFromWatchList } from '../../utils/reducers/watchListSlice/watchListSlice';

import { AiFillDelete } from 'react-icons/ai';

import './watchListItem.scss';

const WatchListItem = ({ movieInfo }) => {
    const dispatch = useDispatch();

    const { id, poster, title } = movieInfo;

    return (
        <li className='watch-list__item'>
            <Link className='watch-list__img' to={`/movie/${id}`}>
                <img src={poster} alt={title} />
            </Link>
            <h3 className='title title_fz14 watch-list__title'>{title}</h3>
            <div className='watch-list__delete'>
                <AiFillDelete onClick={() => dispatch(removeFromWatchList(id))} />
            </div>
        </li>
    );
};

export default WatchListItem;
