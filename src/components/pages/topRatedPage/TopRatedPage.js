import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchTopRatedMovies } from '../../../utils/reducers/topRatedMoviesSlice/topRatedMoviesSlice';

import TopRatedItem from '../../topRatedItem/TopRatedItem';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import PagePagination from '../../pagePagination/PagePagination';

import './topRatedPage.scss';

const TopRatedPage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const { topRatedMoviesLoadingStatus, topRatedMovies } = useSelector((state) => state.topRated);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTopRatedMovies(currentPage));
    }, [currentPage]);

    if (topRatedMoviesLoadingStatus === 'loading') {
        return <Spinner />;
    } else if (topRatedMoviesLoadingStatus === 'error') {
        return <ErrorMessage />;
    }

    const renderItems = (arr) => {
        const movies = arr.map((movie) => {
            return <TopRatedItem movie={movie} key={movie.id} />;
        });

        return <ul className='top-rated__list'>{movies}</ul>;
    };

    const elements = renderItems(topRatedMovies);

    return (
        <section className='top-rated'>
            <h2 className='title title_fz24'>Top rated films</h2>
            <div className='top-rated__header'>
                <div className='top-rated__header top-rated__header__block'>Poster</div>
                <div className='top-rated__header top-rated__header__block'>Title</div>
                <div className='top-rated__header top-rated__header__block'>Release date</div>
                <div className='top-rated__header top-rated__header__block'>Rating</div>
                <div className='top-rated__header top-rated__header__block'>Genres</div>
                <div className='top-rated__header top-rated__header__block'>Description</div>
                <div className='top-rated__header top-rated__header__block'>Details</div>
            </div>
            {elements}
            <PagePagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </section>
    );
};

export default TopRatedPage;
