import { useGetMovieGenresQuery } from '../../redux/api/apiSlice';

import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './topRatedItem.scss';

const TopRatedItem = ({ movie }) => {
    const { data: movieGenres, isLoading, isError } = useGetMovieGenresQuery();

    if (isLoading) {
        return <Spinner />;
    }
    if (isError) {
        return <ErrorMessage />;
    }

    const { id, title, poster, released, rating, genresIds, description } = movie;

    const handleMovieGenres = (arr) => {
        return arr
            .filter((item) => genresIds.includes(item.id))
            .map((genre) => genre.name)
            .join(', ');
    };

    const genres = handleMovieGenres(movieGenres);

    return (
        <li className='top-rated__item'>
            <Link to={`/movie/${id}`}>
                <img src={poster} alt={title} />
            </Link>
            <div className='top-rated__title'>{title}</div>
            <div className='top-rated__date'>{released}</div>
            <div className='top-rated__rating'>{rating}</div>
            <div className='top-rated__genres'>{genres}</div>
            <p className='top-rated__descr'>
                {description.length > 297 ? `${description.slice(0, 297)}...` : description}
            </p>
            <Link to={`/movie/${id}`} className='top-rated__details'>
                More...
            </Link>
        </li>
    );
};

export default TopRatedItem;
