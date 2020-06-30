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

const rootReducer = combineReducers({
    auth: authReducer,
    search: searchReducer,
});

// Configuring redux devtools
const composeEnhancers =
    (typeof window !== "undefined" &&
        window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]) ||
    compose;

const store: Store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
