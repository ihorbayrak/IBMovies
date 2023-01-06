import { useGetSimilarMoviesQuery } from '../../redux/api/apiSlice';

import { Link } from 'react-router-dom';

import MoviesGridList from '../moviesGridList/MoviesGridList';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './similarMoviesList.scss';

const SimilarMoviesList = ({ movieId }) => {
    const { data: similarMovies, isLoading, isError } = useGetSimilarMoviesQuery(movieId);

    if (isLoading) {
        return <Spinner />;
    }
    if (isError) {
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
