import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchRecMovies } from '../../utils/reducers/recMoviesSlice/recMoviesSlice';

import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './recMoviesList.scss';

const RecMoviesList = ({ movieId }) => {
    const { movieInfoLoadingStatus, recMovies } = useSelector((state) => state.recMovies);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRecMovies(movieId));
    }, [movieId]);

    if (movieInfoLoadingStatus === 'loading') {
        return <Spinner />;
    } else if (movieInfoLoadingStatus === 'error') {
        return <ErrorMessage />;
    }

    const renderRecMovies = (arr) => {
        if (arr.length === 0) {
            return <h3 className='title title_green'>No recommendations for this movie.</h3>;
        }

        return arr.map(({ poster, title, released, description, id }) => {
            return (
                <li key={id} className='rec-movies__item'>
                    <Link className='rec-movies__item-img' to={`/movie/${id}`}>
                        <img src={poster} alt={title} />
                    </Link>
                    <div className='rec-movies__title'>{title}</div>
                    <div className='rec-movies__date'>{released}</div>
                    <div className='rec-movies__descr'>{description}</div>
                    <Link to={`/movie/${id}`} className='rec-movies__details'>
                        More...
                    </Link>
                </li>
            );
        });
    };

    const elements = renderRecMovies(recMovies);

    return (
        <section className='rec-movies'>
            <h2 className='title title_fz20'>Movie Recommendation</h2>
            <ul className='rec-movies__list'>{elements}</ul>
        </section>
    );
};

export default RecMoviesList;
