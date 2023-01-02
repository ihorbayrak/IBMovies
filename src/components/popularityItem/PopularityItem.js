import { Link } from 'react-router-dom';

import './popularityItem.scss';

const PopularityItem = ({ movie }) => {
    const { poster, title, popularity, votes, rating, description, id } = movie;

    return (
        <li className='popular-films__item'>
            <Link to={`/movie/${id}`}>
                <img src={poster} alt={title} />
            </Link>
            <div className='popular-films__title'>{title}</div>
            <div className='popular-films__popularity'>{popularity}</div>
            <div className='popular-films__votes'>{votes}</div>
            <div className='popular-films__rating'>{rating}</div>
            <p className='popular-films__descr'>
                {description.length > 297 ? `${description.slice(0, 297)}...` : description}
            </p>
            <Link to={`/movie/${id}`} className='popular-films__details'>
                More...
            </Link>
        </li>
    );
};

export default PopularityItem;
