import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from '@redux-saga/core';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

//trayendo saga
const sagaMiddleware = createSagaMiddleware();

export const middlewares = [thunk, logger, sagaMiddleware]

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
//just after that one must run saga
sagaMiddleware.run(rootSaga);

export default store