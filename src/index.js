import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import fileUploaderReducer from './store/reducers/fileUploader'; 
import jokeFetchReducer from './store/reducers/fetchJokes';
import superAdminAuthReducer from './store/reducers/superAdminAuth';

const rootReducer= combineReducers({
  fileUploader:fileUploaderReducer,
  jokeFethch: jokeFetchReducer,
  superAdminAuth: superAdminAuthReducer
});

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store= createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
