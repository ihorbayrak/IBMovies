import React from 'react';

import NowPlayingMovieList from '../../nowPlayingMoviesList/NowPlayingMoviesList';

const NowPlayingPage = () => {
    return (
        <>
            <h1 className='title title_fz36'>Now playing</h1>
            <NowPlayingMovieList />
        </>
    );
};

export default NowPlayingPage;
