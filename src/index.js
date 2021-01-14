import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import fileUploaderReducer from './store/reducers/fileUploader'; 
import jokeFetchReducer from './store/reducers/fetchJokes';
import adminAuthReducer from './store/reducers/adminAuth';
import userAdminCRUDReducer from './store/reducers/user-admin-CRUD';
import userAuthenticationReducer from './store/reducers/userAuth';
import fetchUserQuestionsReducer from './store/reducers/fetchUserQuestions';
import questionsReducer from './store/reducers/questions';

const rootReducer= combineReducers({
  fileUploader:fileUploaderReducer,
  jokeFethch: jokeFetchReducer,
  userAuth : userAuthenticationReducer,
  userQuestions : fetchUserQuestionsReducer,
  adminAuth: adminAuthReducer,
  userAdminCRUD: userAdminCRUDReducer,
  questions: questionsReducer
});

const store= createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));

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
