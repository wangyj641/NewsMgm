//import { combineReducers, createStore, } from 'redux'
import { CollapsedReducer } from "./reducers/CollapsedReducer"
import { LoadingReducer } from "./reducers/LoadingReducer"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { combineReducers, legacy_createStore as createStore } from 'redux'

const reducer = combineReducers({
    CollapsedReducer,
    LoadingReducer
})

const persistConfig = {
    key: 'wyj',
    storage,
    blacklist: ['LoadingReducer']
}

const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(persistedReducer);
const persistor = persistStore(store)

export {
    store,
    persistor
}