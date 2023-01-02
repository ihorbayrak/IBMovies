import { Link } from 'react-router-dom';

import './movieListItem.scss';

const MovieListItem = ({ movie }) => {

    const { id, poster, title, rating, released } = movie;

    return (
        <li className="movie__item">
            <Link to={`/movie/${id}`}>
                <div className="movie__img">
                    <img src={poster} alt={title} />
                </div>
                <h3 className="title title_fz14 movie_title">
                    {title}
                </h3>
                <div className="movie__rating">{rating}</div>
                <div className="movie__year">{released}</div>
            </Link>
        </li>
    )
}

export default MovieListItem