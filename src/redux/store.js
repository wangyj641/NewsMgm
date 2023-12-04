import { combineReducers, createStore, } from 'redux'
import { CollapsedReducer } from "./reducers/CollapsedReducer"

const reducer = combineReducers({
    CollapsedReducer
})

const store = createStore(reducer);

export default store
