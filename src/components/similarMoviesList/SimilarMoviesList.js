import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchSimilarMovies } from '../../utils/reducers/similarMoviesSlice/similarMoviesSlice';

import { Link } from 'react-router-dom';

import MoviesGridList from '../moviesGridList/MoviesGridList';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './similarMoviesList.scss';

const SimilarMoviesList = ({ movieId }) => {
    const { similarMoviesLoadingStatus, similarMovies } = useSelector(
        (state) => state.similarMovies
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSimilarMovies(movieId));
    }, [movieId]);

    if (similarMoviesLoadingStatus === 'loading') {
        return <Spinner />;
    } else if (similarMoviesLoadingStatus === 'error') {
        return <ErrorMessage />;
    }

    const renderItems = (arr) => {
        const movies = arr.map(({ poster, id, released, description, title }) => {
            return (
                <li key={id} className='similar-movies__item'>
                    <Link to={`/movie/${id}`}>
                        <h3 className='title similar-movies__title'>
                            {title.length >= 21 ? `${title.slice(0, 21)}...` : title}
                        </h3>
                        <div className='similar-movies__img'>
                            <img width='100px' src={poster} alt={title} />
                        </div>
                        <div className='similar-movies__date'>{released}</div>
                        <div className='similar-movies__descr'>{description}</div>
                    </Link>
                </li>
            );
        });

        return <MoviesGridList>{movies}</MoviesGridList>;
    };

    const elements = renderItems(similarMovies);

    return (
        <section className='similar-movies'>
            <h2 className='title'>Similar Movies</h2>
            {elements}
        </section>
    );
};

export default SimilarMoviesList;
