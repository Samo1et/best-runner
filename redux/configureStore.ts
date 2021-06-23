import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const configureStore = (preloadedState) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares: Middleware[] = [
    sagaMiddleware,
    store => next => action => {
      next(action);
    },
  ];
  const composeEnhancers = composeWithDevTools({});
  const enhancer =
    process.env.NODE_ENV !== 'production'
      ? composeEnhancers(applyMiddleware(...middlewares))
      : compose(applyMiddleware(...middlewares));

  const store = createStore(rootReducer, preloadedState, enhancer);

  (store as any).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;

// const bindMiddleware = (middleware) => {
//   if (process.env.NODE_ENV !== 'production') {
//     const { composeWithDevTools } = require('redux-devtools-extension')
//     return composeWithDevTools(applyMiddleware(...middleware))
//   }
//   return applyMiddleware(...middleware)
// }

// export const makeStore = (context) => {
//   const sagaMiddleware = createSagaMiddleware()
//   const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]))

//   store.sagaTask = sagaMiddleware.run(rootSaga)

//   return store
// }

// export const wrapper = createWrapper(makeStore, { debug: true })
