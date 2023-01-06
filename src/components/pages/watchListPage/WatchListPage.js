import { useSelector } from 'react-redux';

import MoviesGridList from '../../moviesGridList/MoviesGridList';

import WatchListItem from '../../watchListItem/WatchListItem';

import './watchListPage.scss';

const WatchListPage = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { watchList } = useSelector((state) => state.watchList);

    if (watchList.length === 0) {
        return <h2 className='title title_fz32'>Your watchlist is empty</h2>;
    }

    if (!isLoggedIn) {
        return <h2 className='title title_red'>Please Sign In to see your Watchlist</h2>;
    }

    const renderWatchListItems = (arr) => {
        return arr.map((movieInfo) => {
            return <WatchListItem key={movieInfo.id} movieInfo={movieInfo} />;
        });
    };

    const elements = renderWatchListItems(watchList);

    return (
        <section className='watch-list'>
            <MoviesGridList>{elements}</MoviesGridList>
        </section>
    );
};

export default WatchListPage;
