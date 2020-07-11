// Note: This project follows the redux ducks pattern.
// This involves reducers, action types, action creators and async action creators in each file categorized by reducer
// For more details: https://github.com/erikras/ducks-modular-redux

import {
    createStore,
    combineReducers,
    compose,
    applyMiddleware,
    Store,
} from "redux";
import thunk from "redux-thunk";

import authReducer from "./auth";
import searchReducer from "./search";
import courseReducer from "./course";
import { updateStateMiddleware } from "../utils/helpers/store.helpers";

const rootReducer = combineReducers({
    auth: authReducer,
    search: searchReducer,
    course: courseReducer,
});

// Configuring redux devtools
const composeEnhancers =
    (typeof window !== "undefined" &&
        window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]) ||
    compose;

const store: Store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, updateStateMiddleware))
);

export default store;
