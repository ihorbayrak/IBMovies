import { useParams } from 'react-router-dom';

import SingleMovieInfo from '../../singleMovieInfo/SingleMovieInfo';
import SimilarMoviesList from '../../similarMoviesList/SimilarMoviesList';
import RecMoviesList from '../../recMoviesList/RecMoviesList';
import Reviews from '../../reviews/Reviews';

const SingleMoviePage = () => {
    const { id } = useParams();

    return (
        <section className='single-movie'>
            <SingleMovieInfo movieId={id} />
            <Reviews movieId={id} />
            <RecMoviesList movieId={id} />
            <SimilarMoviesList movieId={id} />
        </section>
    );
};

export default SingleMoviePage;
