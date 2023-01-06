import { useGetReviewsAboutMovieQuery } from '../../redux/api/apiSlice';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './reviews.scss';

const Reviews = ({ movieId }) => {
    const { data: movieReviews, isLoading, isError } = useGetReviewsAboutMovieQuery(movieId);

    if (isLoading) {
        return <Spinner />;
    }
    if (isError) {
        return <ErrorMessage />;
    }

    const renderReviews = (arr) => {
        if (arr.length === 0) {
            return <h3 className='title title_blue'>No reviews for this movie.</h3>;
        }

        return arr.map(({ id, name, avatar, content }) => {
            return (
                <div key={id} className='movie-reviews__content'>
                    <img src={avatar} alt={name} />
                    <div>
                        <h3 className='movie-reviews__name'>{name}</h3>
                        <p className='movie-reviews__text'>{content}</p>
                    </div>
                </div>
            );
        });
    };

    const elements = renderReviews(movieReviews);

    return (
        <section className='movie-reviews'>
            <h2 className='title title_fz20'>Reviews</h2>
            <div className='movie-reviews__wrapper'>{elements}</div>
        </section>
    );
};

export default Reviews;
