import { useHttp } from '../hooks/http.hook';

import notFound from '../assets/not-found.png';
import avatarIcon from '../assets/avatar-icon.jpg';

const useMovieService = () => {
    const apiBase = 'https://api.themoviedb.org/3/';
    const apiKey = 'api_key=a5ac3cd4dd4b5b42af35146da0290f00';

    const { request } = useHttp();

    const getTrendingMovies = async (period) => {
        const res = await request(`${apiBase}trending/movie/${period}?${apiKey}`);
        return await res.results.map(transformMovieData);
    };

    const getPopularMovies = async (page = 1) => {
        const res = await request(`${apiBase}movie/popular?${apiKey}&language=en-US&page=${page}`);
        return await res.results.map(transformMovieData);
    };

    const getTopRatedMovies = async (page = 1) => {
        const res = await request(
            `${apiBase}movie/top_rated?${apiKey}&language=en-US&page=${page}`
        );
        return await res.results.map(transformMovieData);
    };

    const getNowPlayingMovies = async (page = 1) => {
        const res = await request(
            `${apiBase}movie/now_playing?${apiKey}&language=en-US&page=${page}`
        );
        return await res.results.map(transformMovieData);
    };

    const getInfoAboutMovie = async (id) => {
        const res = await request(`${apiBase}movie/${id}?${apiKey}&language=en-US`);
        return await transformMovieData(res);
    };

    const getRecMovies = async (id) => {
        const res = await request(
            `${apiBase}movie/${id}/recommendations?${apiKey}&language=en-US&page=1`
        );
        return await res.results.map(transformMovieData);
    };

    const getSimilarMovies = async (id) => {
        const res = await request(`${apiBase}movie/${id}/similar?${apiKey}&language=en-US&page=1`);
        return await res.results.map(transformMovieData);
    };

    const getReviewsAboutMovie = async (id) => {
        const res = await request(`${apiBase}movie/${id}/reviews?${apiKey}&language=en-US&page=1`);
        return res.results.map(transformReviewData);
    };

    const getMovieGenres = async () => {
        const res = await request(`${apiBase}genre/movie/list?${apiKey}&language=en-US`);
        return await res.genres;
    };

    const transformMovieData = (movie) => {
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

    const transformReviewData = (review) => {
        return {
            id: review.author,
            name: review.author,
            avatar: avatarIcon,
            content: review.content,
        };
    };

    return {
        getTrendingMovies,
        getMovieGenres,
        getPopularMovies,
        getTopRatedMovies,
        getNowPlayingMovies,
        getInfoAboutMovie,
        getReviewsAboutMovie,
        getRecMovies,
        getSimilarMovies,
    };
};

export default useMovieService;
