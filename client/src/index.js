import '../public/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import axios from 'axios';

import App from './components/App';
import reducers from './reducers';
import { AUTH } from './actions';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({ type: AUTH });
  axios.defaults.headers.common['Authorization'] = token;
} else {
  axios.defaults.headers.common['Authorization'] = null;
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
