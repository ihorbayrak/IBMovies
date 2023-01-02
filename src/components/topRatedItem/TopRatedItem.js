import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchMovieGenres } from '../../utils/reducers/movieGenresSlice/movieGenresSlice';

import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './topRatedItem.scss';

const TopRatedItem = ({ movie }) => {
    const { movieGenresLoadingStatus, movieGenres } = useSelector((state) => state.movieGenres);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMovieGenres());
    }, []);

    if (movieGenresLoadingStatus === 'loading') {
        return <Spinner />;
    } else if (movieGenresLoadingStatus === 'error') {
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
