import { createStore, combineReducers, compose, applyMiddleware, Store } from 'redux';

import authReducer from './auth';

const rootReducer = combineReducers({
    auth: authReducer
})

const composeEnhancers = (typeof window !== 'undefined' && window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]) || compose;

const store: Store = createStore(rootReducer, composeEnhancers())

export default store;