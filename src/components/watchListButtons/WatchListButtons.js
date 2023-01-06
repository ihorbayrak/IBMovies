import { useSelector, useDispatch } from 'react-redux';
import {
    addToWatchList,
    removeFromWatchList,
} from '../../redux/reducers/watchListSlice/watchListSlice';

import { BsBookmarkHeart, BsBookmarkX } from 'react-icons/bs';

import './watchListButtons.scss';

const WatchListButtons = ({ movieInfo }) => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { watchList } = useSelector((state) => state.watchList);
    const dispatch = useDispatch();

    const { id, poster, title } = movieInfo;

    const addMovieToWatchlist = () => {
        if (watchList.some((item) => item.id === id)) return;

        if (!isLoggedIn) return;

        dispatch(addToWatchList({ id, poster, title }));
    };

    const removeMovieFromWatchList = () => {
        if (!isLoggedIn) return;

        dispatch(removeFromWatchList(id));
    };

    const renderButtonFromCondition = () => {
        if (watchList.some((item) => item.id === id)) {
            return (
                <button
                    onClick={removeMovieFromWatchList}
                    className='movie-info__watchlist movie-info__watchlist_removed'
                >
                    Remove from watchlist <BsBookmarkX />
                </button>
            );
        }

        return (
            <button onClick={addMovieToWatchlist} className='movie-info__watchlist'>
                Add to watchlist <BsBookmarkHeart />
            </button>
        );
    };

    return <>{renderButtonFromCondition()}</>;
};

export default WatchListButtons;
