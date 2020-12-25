import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';


import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import fileUploaderReducer from './store/reducers/fileUploader'; 
import jokeFetchReducer from './store/reducers/fetchJokes';

const rootReducer= combineReducers({
  fileUploader:fileUploaderReducer,
  jokeFethch: jokeFetchReducer
});


const store= createStore(rootReducer,applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
