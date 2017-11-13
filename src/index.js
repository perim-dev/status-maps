import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';

import reducers from './reducers/reducers';
const store = applyMiddleware(promise)(createStore)(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,document.getElementById('root')
);
