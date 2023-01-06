import { useState } from 'react';

import { useGetTopRatedMoviesQuery } from '../../../redux/api/apiSlice';

import TopRatedItem from '../../topRatedItem/TopRatedItem';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import PagePagination from '../../pagePagination/PagePagination';


import './topRatedPage.scss';

const TopRatedPage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const { data: topRatedMovies, isLoading, isError } = useGetTopRatedMoviesQuery(currentPage);

    if (isLoading) {
        return <Spinner />;
    }
    if (isError) {
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
