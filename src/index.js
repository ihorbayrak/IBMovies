import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './redux/store';
import { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import App from './components/app/App';
import Spinner from './components/spinner/Spinner';

import './styles/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
            <Router>
                <App />
            </Router>
        </PersistGate>
    </Provider>
);
