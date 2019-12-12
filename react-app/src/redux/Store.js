import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import reducer from "./Reducer";
import thunk from "redux-thunk";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const allReducers = combineReducers({
  reducer: reducer
});
const store = createStore(allReducers, enhancer);
export default store;
