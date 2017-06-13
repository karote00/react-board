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

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    })
    throw err
  }
}

const store = createStore(
  reducer,
  applyMiddleware(logger, crashReporter)
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