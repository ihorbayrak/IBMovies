import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchTrendingMovies } from '../../utils/reducers/trendingMoviesSlice/trendingMoviesSlice';

import MovieListItem from '../movieListItem/MovieListItem';
import MoviesGridList from '../moviesGridList/MoviesGridList';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './trendingMovieList.scss';

const TrendingMovieList = () => {
    const { activeFilter } = useSelector((state) => state.filters);
    const { trendingMoviesLoadingStatus, trendingMovies } = useSelector(
        (state) => state.trendingMovies
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTrendingMovies(activeFilter));
    }, [activeFilter]);

    if (trendingMoviesLoadingStatus === 'loading') {
        return <Spinner />;
    } else if (trendingMoviesLoadingStatus === 'error') {
        return <ErrorMessage />;
    }

    const renderItems = (arr) => {
        const movies = arr.map((movie) => {
            return <MovieListItem movie={movie} key={movie.id} />;
        });

        return <MoviesGridList className='film__grid'>{movies}</MoviesGridList>;
    };

    const elements = renderItems(trendingMovies);

    return <section className='film__list'>{elements}</section>;
};

export default TrendingMovieList;
