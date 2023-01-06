import { useGetTrendingMoviesQuery } from '../../redux/api/apiSlice';

import { useSelector } from 'react-redux';

import MovieListItem from '../movieListItem/MovieListItem';
import MoviesGridList from '../moviesGridList/MoviesGridList';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './trendingMovieList.scss';

const TrendingMovieList = () => {
    const { activeFilter } = useSelector((state) => state.filters);

    const {
        data: trendingMovies,
        isLoading,
        isError,
    } = useGetTrendingMoviesQuery(activeFilter);

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

        return <MoviesGridList className='film__grid'>{movies}</MoviesGridList>;
    };

    const elements = renderItems(trendingMovies);

    return <section className='film__list'>{elements}</section>;
};

export default TrendingMovieList;
