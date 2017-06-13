import 'babel-polyfill';
import { createStore, applyMiddleware } from 'redux';
import mySaga from '../sagas';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers';
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

export default (preloadedState) => {
  return createStore(
    reducer,
    preloadedState,
    applyMiddleware(logger, crashReporter)
    // applyMiddleware(sagaMiddleware)
  )
}

// then run the saga
// sagaMiddleware.run(mySaga);

