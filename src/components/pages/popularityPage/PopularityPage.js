import { useState } from 'react';

import { useGetPopularMoviesQuery } from '../../../redux/api/apiSlice';

import PopularityItem from '../../popularityItem/PopularityItem';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import PagePagination from '../../pagePagination/PagePagination';


import './popularityPage.scss';

const PopularityPage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const { data: popularMovies, isLoading, isError } = useGetPopularMoviesQuery(currentPage);

    if (isLoading) {
        return <Spinner />;
    }
    if (isError) {
        return <ErrorMessage />;
    }

    const renderItems = (arr) => {
        const movies = arr.map((movie) => {
            return <PopularityItem movie={movie} key={movie.id} />;
        });

        return <ul className='popular-films__list'>{movies}</ul>;
    };

    const elements = renderItems(popularMovies);

    return (
        <section className='popular-films'>
            <h2 className='title title_fz24'>Popular films</h2>
            <div className='popular-films__header'>
                <div className='popular-films__header popular-films__header__block'>Poster</div>
                <div className='popular-films__header popular-films__header__block'>Title</div>
                <div className='popular-films__header popular-films__header__block'>Popularity</div>
                <div className='popular-films__header popular-films__header__block'>Votes</div>
                <div className='popular-films__header popular-films__header__block'>Rating</div>
                <div className='popular-films__header popular-films__header__block'>
                    Description
                </div>
                <div className='popular-films__header popular-films__header__block'>Details</div>
            </div>
            {elements}
            <PagePagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </section>
    );
};

export default PopularityPage;
