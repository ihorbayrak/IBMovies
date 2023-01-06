import { useGetRecMoviesQuery } from '../../redux/api/apiSlice';

import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './recMoviesList.scss';

const RecMoviesList = ({ movieId }) => {
    const { data: recMovies, isLoading, isError } = useGetRecMoviesQuery(movieId);

    if (isLoading) {
        return <Spinner />;
    }
    if (isError) {
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
