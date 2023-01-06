import { useGetInfoAboutMovieQuery } from '../../redux/api/apiSlice';

import WatchListButtons from '../watchListButtons/WatchListButtons';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { TfiCup } from 'react-icons/tfi';
import { CiDollar } from 'react-icons/ci';

import { formatNumbers } from '../../utils/functions/functions';

import './singleMovieInfo.scss';

const SingleMovieInfo = ({ movieId }) => {
    const { data: movieInfo, isLoading, isError } = useGetInfoAboutMovieQuery(movieId);

    if (isLoading) {
        return <Spinner />;
    }
    if (isError) {
        return <ErrorMessage />;
    }

    const {
        poster,
        title,
        description,
        popularity,
        released,
        rating,
        votes,
        genreNames,
        budget,
        revenue,
    } = movieInfo;
    const genres = genreNames ? genreNames.map((item) => item.name).join(', ') : '-';

    return (
        <section className='movie-info'>
            <div className='movie-info__grid'>
                <div className='movie-info__header'>
                    <h2 className='title title_fz28 movie-info__title'>{title}</h2>
                    <img src={poster} alt={title} />
                    <WatchListButtons movieInfo={movieInfo} />
                </div>
                <div className='movie-info__block'>
                    <div className='movie-info__date'>Release date: {released}</div>
                    <div className='movie-info__rating'>Rating: {rating}</div>
                    <div className='movie-info__votes'>Votes: {votes}</div>
                    <div className='movie-info__genres'>Genres: {genres}</div>
                    <div className='movie-info__descr'>{description}</div>
                </div>
            </div>
            <div className='movie-info__footer'>
                <div className='movie-info__general'>
                    Popularity
                    <span className='movie-info__popularity'>
                        {' '}
                        <TfiCup /> {popularity ? formatNumbers(popularity) : 'No information'}
                    </span>
                </div>
                <div className='movie-info__general'>
                    Budget
                    <span className='movie-info__budget'>
                        {' '}
                        <CiDollar /> {budget ? formatNumbers(budget) : 'No information'}
                    </span>
                </div>
                <div className='movie-info__general'>
                    Revenue
                    <span className='movie-info__revenue'>
                        {' '}
                        <CiDollar /> {revenue ? formatNumbers(revenue) : 'No information'}
                    </span>
                </div>
            </div>
        </section>
    );
};

export default SingleMovieInfo;
