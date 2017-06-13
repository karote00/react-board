import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Board from './pages/board.js';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import mySaga from './sagas';

// const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware()
  // applyMiddleware(sagaMiddleware)
);

// then run the saga
// sagaMiddleware.run(mySaga);

ReactDOM.render(
	<Provider store={store}>
		<Board />
	</Provider>,
	document.getElementById('root')
);

if (module.hot) {
	module.hot.accept();
}