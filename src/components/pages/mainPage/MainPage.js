import AppFilters from '../../appFilters/AppFilters';
import TrendingMovieList from '../../trendingMovieList/TrendingMovieList';

const MainPage = () => {
    return (
        <>
            <h1 className='title title_fz36'>Trending films</h1>
            <AppFilters filtersName={['Popularity', 'Release date']} />
            <TrendingMovieList />
        </>
    );
};

export default MainPage;
