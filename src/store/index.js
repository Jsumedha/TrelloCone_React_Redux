// import { createStore } from 'redux';
// import rootReducer from '../reducers';

// const store = createStore(rootReducer)

// export default store;


import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {

    let store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
    let persistor = persistStore(store);
    return { store, persistor };
};
