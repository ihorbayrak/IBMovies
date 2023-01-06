import notFound from '../../assets/not-found.png';
import avatarIcon from '../../assets/avatar-icon.jpg';

export const formatNumbers = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const createPages = (pagesArr, pagesCount, current) => {
    if (pagesCount > 5) {
        if (current >= 5) {
            for (let i = current - 2; i <= current + 2; i++) {
                pagesArr.push(i);
                if (i === pagesCount) break;
            }
        } else {
            for (let i = 1; i <= 5; i++) {
                pagesArr.push(i);
                if (i === pagesCount) break;
            }
        }
    } else {
        for (let i = 1; i <= pagesCount; i++) {
            pagesArr.push(i);
        }
    }
};

export const transformMovieData = (movie) => {
    return {
        id: movie.id,
        title: movie.title || 'There is no title for this movie',
        description: movie.overview || 'There is no description',
        popularity: movie.popularity || 'No data for this movie',
        released: movie['release_date'] || 'No data for this movie',
        rating: movie['vote_average'] || 'No data for this movie',
        votes: movie['vote_count'] || 'No data for this movie',
        poster: `https://image.tmdb.org/t/p/original/${movie['poster_path']}`.includes('null')
            ? notFound
            : `https://image.tmdb.org/t/p/original/${movie['poster_path']}`,
        backdrop: `https://image.tmdb.org/t/p/original/${movie['backdrop_path']}`,
        genresIds: movie['genre_ids'],
        genreNames: movie.genres,
        budget: movie.budget,
        revenue: movie.revenue,
    };
};

export const transformReviewData = (review) => {
    return {
        id: review.author,
        name: review.author,
        avatar: avatarIcon,
        content: review.content,
    };
};
