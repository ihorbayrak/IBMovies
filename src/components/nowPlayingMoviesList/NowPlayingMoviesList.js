import { useEffect, useState, useMemo } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchNowPlayingMovies } from '../../utils/reducers/nowPlayingMoviesSlice/nowPlayingMoviesSlice';

import MovieListItem from '../movieListItem/MovieListItem';
import MovieGridList from '../moviesGridList/MoviesGridList';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './nowPlayingMoviesList.scss';

const setContent = (status, Component, newMovieLoading) => {
    switch (status) {
        case 'loading':
            return newMovieLoading ? <Component /> : <Spinner />;
        case 'idle':
            return <Component />;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected process state');
    }
};

const NowPlayingMoviesList = () => {
    let { nowPlayingMoviesLoadingStatus, nowPlayingMovies, currentPage } = useSelector(
        (state) => state.nowPlaying
    );
    const dispatch = useDispatch();

    const [newMovieLoading, setNewMovieLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(10);

    useEffect(() => {
        dispatch(fetchNowPlayingMovies(currentPage));
    }, []);

    useEffect(() => {
        if (currentPage === totalCount) return;

        if (newMovieLoading) {
            setNewMovieLoading(false);
            dispatch(fetchNowPlayingMovies(currentPage));
        }
    }, [newMovieLoading, currentPage]);

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
            setNewMovieLoading(true);
        }
    };

    const renderItems = (arr) => {
        const movies = arr.map((movie) => {
            return <MovieListItem movie={movie} key={movie.id} />;
        });

        return <MovieGridList className='movie__grid'>{movies}</MovieGridList>;
    };

    const elements = useMemo(() => {
        return setContent(
            nowPlayingMoviesLoadingStatus,
            () => renderItems(nowPlayingMovies),
            newMovieLoading
        );
    }, [nowPlayingMoviesLoadingStatus]);

    return <section className='movie__list'>{elements}</section>;
};

export default NowPlayingMoviesList;
