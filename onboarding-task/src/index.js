import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import 'babel-polyfill';
import { rootReducer } from './reducers/rootReducer.ts';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

let store = createStore(
  rootReducer,
  applyMiddleware(logger, thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
