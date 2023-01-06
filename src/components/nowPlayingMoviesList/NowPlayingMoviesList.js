import { useEffect, useState } from 'react';

import { useGetNowPlayingMoviesQuery } from '../../redux/api/apiSlice';

import MovieListItem from '../movieListItem/MovieListItem';
import MovieGridList from '../moviesGridList/MoviesGridList';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './nowPlayingMoviesList.scss';

const NowPlayingMoviesList = () => {
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [moviesEnd, setMoviesEnd] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(10);

    const { data, isLoading, isError } = useGetNowPlayingMoviesQuery(currentPage, {
        skip: moviesEnd,
    });

    useEffect(() => {
        if (data && data.length) {
            setNowPlayingMovies([...nowPlayingMovies, ...data]);
        }
        if (currentPage === totalCount) {
            setMoviesEnd(true);
        }
    }, [data]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return function () {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = (e) => {
        if (
            e.target.documentElement.scrollHeight -
                (e.target.documentElement.scrollTop + window.innerHeight) <
            100
        ) {
            setCurrentPage((prevState) => prevState + 1);
        }
    };

    if (isLoading) {
        return <Spinner />;
    }
    if (isError) {
        return <ErrorMessage />;
    }

    const renderItems = (arr) => {
        const movies = arr.map((movie) => {
            return <MovieListItem movie={movie} key={movie.id} />;
        });

        return <MovieGridList className='movie__grid'>{movies}</MovieGridList>;
    };

    const elements = renderItems(nowPlayingMovies);

    return <section className='movie__list'>{elements}</section>;
};

export default NowPlayingMoviesList;
