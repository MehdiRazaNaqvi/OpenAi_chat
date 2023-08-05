import React from 'react';
import ReactDOM from 'react-dom/client';

import Router from './router.jsx';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store from "../src/store/store.jsx"

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';



let persistor = persistStore(store);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>


        <PersistGate loading={null} persistor={persistor}>


            <Router />


        </PersistGate>
    </Provider>



);




reportWebVitals();
