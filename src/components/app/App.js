import { useEffect, useState, useRef } from 'react';

import { Route, Routes } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import MainPage from '../pages/mainPage/MainPage';
import PopularityPage from '../pages/popularityPage/PopularityPage';
import NowPlayingPage from '../pages/nowPlaying/NowPlayingPage';
import TopRatedPage from '../pages/topRatedPage/TopRatedPage';
import AuthenticationPage from '../pages/authenticationPage/AuthenticationPage';
import SingleMoviePage from '../pages/singleMoviePage/SingleMoviePage';
import WatchListPage from '../pages/watchListPage/WatchListPage';
import Page404 from '../pages/404/Page404';

import { FaArrowAltCircleUp } from 'react-icons/fa';

const App = () => {

    const [showButton, setShowButton] = useState(false);
    const divForAutoScroll = useRef();

    useEffect(() => {

        window.addEventListener('scroll', scrollHandler)

        return () => {
            window.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollTop >= 300) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    }

    const scrollToTop = () => {
        divForAutoScroll.current.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div className='app'>
            <div ref={divForAutoScroll}></div>
            <AppHeader />
            <main>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/popular-films' element={<PopularityPage />} />
                    <Route path='/top-rated-films' element={<TopRatedPage />} />
                    <Route path='/now-playing' element={<NowPlayingPage />} />
                    <Route path='/authentication' element={<AuthenticationPage />} />
                    <Route path='/movie/:id' element={<SingleMoviePage />} />
                    <Route path='/watch-list' element={<WatchListPage />} />
                    <Route path='*' element={<Page404 />} />
                </Routes>
            </main>
            <button onClick={scrollToTop} className={showButton ? 'arrow arrow_visible' : 'arrow'}><FaArrowAltCircleUp /></button>
        </div>
    )
}

export default App